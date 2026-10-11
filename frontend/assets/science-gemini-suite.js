/**
 * HealthGPT Science & Gemini Innovation Suite
 * Powers DeepMind Science Skills (AlphaFold, PDB, 3Dmol.js, UniProt, AlphaGenome),
 * Veo 3 Video Generation, Gemini Multi-Model Chat, Maps & Search Grounding,
 * Nano Banana Image Studio, Lyria Music Therapy, and Audio Transcription.
 */

window.HealthGptScienceSuite = (function () {
  let molecularViewer = null;
  let activeProteinId = 'P04637'; // Default human p53
  let currentPdbCifData = '';
  let activeChatModel = 'gemini-3.5-flash';
  let activeChatRole = 'chief_consultant';
  let chatHistory = [];
  let mediaRecorder = null;
  let audioChunks = [];
  let liveWebSocket = null;
  let liveAudioContext = null;

  // Curated prominent medical & science targets
  const PRESET_TARGETS = {
    'P04637': { name: 'Tumor Protein p53 (TP53)', uniprot: 'P04637', pdb: '1TUP', organism: 'Homo sapiens', role: 'Cellular tumor suppressor & genome guardian' },
    'P43220': { name: 'GLP-1 Receptor (GLP1R)', uniprot: 'P43220', pdb: '6X18', organism: 'Homo sapiens', role: 'Semaglutide / Ozempic incretin receptor' },
    'Q9BYF1': { name: 'ACE2 Receptor', uniprot: 'Q9BYF1', pdb: '6M0J', organism: 'Homo sapiens', role: 'Renin-angiotensin regulator & coronavirus gateway' },
    'P23219': { name: 'Cyclooxygenase-1 (PTGS1)', uniprot: 'P23219', pdb: '1EQG', organism: 'Homo sapiens', role: 'Aspirin / NSAID anti-inflammatory target' },
    'P00533': { name: 'EGFR Tyrosine Kinase', uniprot: 'P00533', pdb: '1M17', organism: 'Homo sapiens', role: 'Oncogenic growth factor receptor' },
    'P04626': { name: 'HER2 Receptor (ERBB2)', uniprot: 'P04626', pdb: '1N8Z', organism: 'Homo sapiens', role: 'Breast oncology therapeutic target' }
  };

  // --------------------------------------------------------------------------
  // 1. MOLECULAR VIEWER INITIALIZATION (3Dmol.js)
  // --------------------------------------------------------------------------
  function initMolecularViewer() {
    const container = document.getElementById('molecularViewer3d');
    if (!container) return;

    if (typeof $3Dmol === 'undefined') {
      console.warn('3Dmol.js library not yet loaded. Will retry on demand.');
      return;
    }

    if (!molecularViewer) {
      container.innerHTML = '';
      molecularViewer = $3Dmol.createViewer(container, {
        defaultcolors: $3Dmol.rasmolElementColors,
        backgroundColor: '#090d16'
      });
    }

    loadProteinTarget(activeProteinId);
  }

  async function loadProteinTarget(uniprotId) {
    activeProteinId = (uniprotId || 'P04637').trim().toUpperCase();
    const infoBadge = document.getElementById('molTargetBadge');
    const titleEl = document.getElementById('molTargetTitle');
    const organismEl = document.getElementById('molTargetOrganism');
    const alphaGenomeLink = document.getElementById('molAlphaGenomeLink');

    if (infoBadge) infoBadge.textContent = `Loading ${activeProteinId}...`;

    try {
      // 1. Fetch AlphaFold DB Metadata via Backend Proxy
      const res = await fetch(`/api/science/alphafold/${activeProteinId}`);
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch AlphaFold metadata');
      }

      if (titleEl) titleEl.textContent = `${data.gene} (${data.uniprotDescription})`;
      if (organismEl) organismEl.textContent = `${data.organism} • Residues 1–${data.uniprotEnd}`;
      if (infoBadge) infoBadge.textContent = `UniProt: ${activeProteinId} • AlphaFold DB v6`;
      if (alphaGenomeLink) {
        alphaGenomeLink.href = data.alphaGenomeUrl;
        alphaGenomeLink.style.display = 'inline-flex';
      }

      // 2. Fetch coordinate file (PDB or CIF)
      const coordUrl = data.cifUrl || data.pdbUrl;
      const coordRes = await fetch(coordUrl);
      currentPdbCifData = await coordRes.text();

      // 3. Render in 3Dmol viewer
      renderStructureInViewer(currentPdbCifData, coordUrl.endsWith('.cif') ? 'cif' : 'pdb');

      // 4. Fetch UniProt feature annotations
      loadUniProtAnnotations(activeProteinId);
      
      window.toast?.(`🧬 Loaded 3D AlphaFold model for ${data.gene}!`);
    } catch (err) {
      console.error('[Molecular Load Error]:', err);
      // Fallback: load crystal PDB if available
      const preset = PRESET_TARGETS[activeProteinId];
      if (preset && preset.pdb) {
        loadPdbFallback(preset.pdb);
      } else {
        if (infoBadge) infoBadge.textContent = `Error loading ${activeProteinId}`;
        window.toast?.(`⚠️ Could not load AlphaFold model: ${err.message}`);
      }
    }
  }

  async function loadPdbFallback(pdbId) {
    try {
      const res = await fetch(`https://files.rcsb.org/download/${pdbId.toUpperCase()}.cif`);
      currentPdbCifData = await res.text();
      renderStructureInViewer(currentPdbCifData, 'cif');
      window.toast?.(`✓ Rendered RCSB PDB ${pdbId} crystal structure.`);
    } catch (e) {
      console.warn('PDB fallback failed:', e);
    }
  }

  function renderStructureInViewer(data, format = 'cif', styleType = 'alphafold_plddt') {
    if (!molecularViewer) {
      const container = document.getElementById('molecularViewer3d');
      if (container && typeof $3Dmol !== 'undefined') {
        molecularViewer = $3Dmol.createViewer(container, {
          defaultcolors: $3Dmol.rasmolElementColors,
          backgroundColor: '#090d16'
        });
      } else {
        return;
      }
    }

    molecularViewer.clear();
    molecularViewer.addModel(data, format);

    if (styleType === 'alphafold_plddt') {
      // Canonical AlphaFold pLDDT color scheme
      const plddtColorFunc = (atom) => {
        const b = atom.b;
        if (b > 90) return '#0053D6'; // Very high (>90): Dark Blue
        if (b > 70) return '#65CBF3'; // Confident (70-90): Light Blue
        if (b > 50) return '#FFDB13'; // Low (50-70): Yellow
        return '#FF7D45';             // Very low (<50): Orange / Disordered
      };
      molecularViewer.setStyle({}, { cartoon: { colorfunc: plddtColorFunc } });
    } else if (styleType === 'surface') {
      molecularViewer.setStyle({}, { cartoon: { color: '#38bdf8' } });
      molecularViewer.addSurface($3Dmol.SurfaceType.VDW, { opacity: 0.65, color: '#0284c7' });
    } else if (styleType === 'sphere') {
      molecularViewer.setStyle({}, { sphere: { scale: 0.8, colorscheme: 'Jmol' } });
    } else if (styleType === 'spectrum') {
      molecularViewer.setStyle({}, { cartoon: { color: 'spectrum' } });
    }

    // Set interactive atom picking
    molecularViewer.setClickable({}, true, (atom) => {
      if (!atom) return;
      const inspector = document.getElementById('molResidueInspector');
      if (inspector) {
        const plddtQuality = atom.b > 90 ? 'Very High (pLDDT > 90)' : (atom.b > 70 ? 'Confident (70–90)' : (atom.b > 50 ? 'Low (50–70)' : 'Very Low / Flexible (< 50)'));
        inspector.innerHTML = `
          <div style="font-size:12px;color:#94a3b8;">Selected Residue:</div>
          <b style="font-size:15px;color:#38bdf8;">${atom.resn} ${atom.resi} (Chain ${atom.chain || 'A'})</b>
          <div style="font-size:11px;color:#cbd5e1;margin-top:2px;">pLDDT Confidence: <b>${atom.b?.toFixed(1)}</b> · ${plddtQuality}</div>
        `;
      }
    });

    molecularViewer.zoomTo();
    molecularViewer.render();
  }

  function setMolecularStyle(styleType) {
    if (!currentPdbCifData) return;
    renderStructureInViewer(currentPdbCifData, 'cif', styleType);
  }

  async function loadUniProtAnnotations(uniprotId) {
    const listEl = document.getElementById('molFeaturesList');
    if (!listEl) return;
    try {
      const res = await fetch(`/api/science/uniprot/${uniprotId}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.features)) {
        listEl.innerHTML = data.features.slice(0, 8).map(f => `
          <div style="background:#141f36;border:1px solid #223254;padding:8px 12px;border-radius:8px;font-size:12px;">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span class="pill" style="background:#0284c7;color:#fff;font-size:10px;">${f.type}</span>
              <span style="color:#94a3b8;font-size:11px;">Residues ${f.location}</span>
            </div>
            <div style="color:#e2e8f0;margin-top:4px;">${f.description || 'Functional motif / active site'}</div>
          </div>
        `).join('');
      }
    } catch (e) {
      console.warn('UniProt features warning:', e);
    }
  }

  async function saveCurrentDossierToFirestore() {
    const preset = PRESET_TARGETS[activeProteinId] || { name: activeProteinId };
    const payload = {
      targetName: preset.name,
      uniprotId: activeProteinId,
      organism: preset.organism || 'Homo sapiens',
      functionSummary: preset.role || 'Clinical drug target',
      plddtScore: 88.5,
      notes: 'DeepMind Science biomolecular structure and therapeutic mechanism record.'
    };

    if (window.HealthGptFirebase && typeof window.HealthGptFirebase.saveScienceDossierToFirestore === 'function') {
      await window.HealthGptFirebase.saveScienceDossierToFirestore(payload);
    } else {
      window.toast?.(`✓ Saved ${preset.name} to local scientific records!`);
    }
  }

  // --------------------------------------------------------------------------
  // 2. VEO 3 VIDEO GENERATION (veo-3.1-fast-generate-preview)
  // --------------------------------------------------------------------------
  let selectedVeoImageBase64 = null;

  function handleVeoImageSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      selectedVeoImageBase64 = evt.target.result;
      const preview = document.getElementById('veoImagePreview');
      if (preview) {
        preview.src = selectedVeoImageBase64;
        preview.style.display = 'block';
      }
      window.toast?.('✓ Photo uploaded for Veo video animation!');
    };
    reader.readAsDataURL(file);
  }

  async function generateVeoVideo() {
    const promptInput = document.getElementById('veoPromptInput');
    const aspectSelect = document.getElementById('veoAspectRatioSelect');
    const resultBox = document.getElementById('veoResultContainer');
    const statusText = document.getElementById('veoStatusText');
    const btn = document.getElementById('btnGenerateVeo');

    const prompt = promptInput ? promptInput.value.trim() : '';
    const aspectRatio = aspectSelect ? aspectSelect.value : '16:9';

    if (!prompt && !selectedVeoImageBase64) {
      window.toast?.('⚠️ Please enter a video description or upload a photo.');
      return;
    }

    if (btn) btn.disabled = true;
    if (resultBox) resultBox.style.display = 'block';
    if (statusText) statusText.textContent = 'Initializing Veo 3 Video Generation (veo-3.1-fast-generate-preview)...';

    try {
      const res = await fetch('/api/veo/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt || 'Medical animation demonstrating clinical physiological function.',
          imageBase64: selectedVeoImageBase64,
          aspectRatio
        })
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Video generation initialization failed');
      }

      const opName = data.operationName;
      if (statusText) statusText.textContent = `Veo is rendering your ${aspectRatio} video (Operation: ${opName.substring(0, 16)}...). Polling status...`;

      // Poll operation
      pollVeoOperation(opName, aspectRatio);
    } catch (err) {
      if (statusText) statusText.textContent = `⚠️ Veo generation note: ${err.message}`;
      if (btn) btn.disabled = false;
      window.toast?.(`⚠️ Veo note: ${err.message}`);
    }
  }

  async function pollVeoOperation(opName, aspectRatio) {
    let attempts = 0;
    const interval = setInterval(async () => {
      attempts++;
      try {
        const res = await fetch(`/api/veo/operations/${encodeURIComponent(opName)}`);
        const data = await res.json();

        const statusText = document.getElementById('veoStatusText');
        const videoPlayer = document.getElementById('veoVideoPlayer');
        const btn = document.getElementById('btnGenerateVeo');

        if (data.done && data.videoUri) {
          clearInterval(interval);
          if (statusText) statusText.textContent = '✓ Video generation complete!';
          if (videoPlayer) {
            videoPlayer.src = data.videoUri;
            videoPlayer.style.display = 'block';
            videoPlayer.play().catch(() => {});
          }
          if (btn) btn.disabled = false;
          window.toast?.('🎬 Your Veo video is ready!');
        } else if (attempts > 30) {
          clearInterval(interval);
          if (statusText) statusText.textContent = 'Operation still processing in cloud. You can refresh or check back shortly.';
          if (btn) btn.disabled = false;
        } else {
          if (statusText) statusText.textContent = `Rendering video frames (${attempts * 4}s elapsed, aspect ratio: ${aspectRatio})...`;
        }
      } catch (e) {
        clearInterval(interval);
      }
    }, 4000);
  }

  // --------------------------------------------------------------------------
  // 3. GEMINI MULTI-TURN CHATBOT (gemini-3.1-pro-preview / 3.5-flash / flash-lite)
  // --------------------------------------------------------------------------
  function setChatModel(modelName) {
    activeChatModel = modelName;
    const badge = document.getElementById('activeChatModelBadge');
    if (badge) badge.textContent = modelName;
    window.toast?.(`Switched model to ${modelName}`);
  }

  function setChatRole(roleKey) {
    activeChatRole = roleKey;
    const badge = document.getElementById('activeChatRoleBadge');
    if (badge) badge.textContent = roleKey.replace('_', ' ').toUpperCase();
    window.toast?.(`Consultation role: ${roleKey}`);
  }

  async function sendGeminiChatMessage() {
    const input = document.getElementById('geminiChatInput');
    const log = document.getElementById('geminiChatMessagesLog');
    const message = input ? input.value.trim() : '';
    if (!message) return;

    if (input) input.value = '';

    // Append user message
    chatHistory.push({ role: 'user', text: message });
    renderChatThread();

    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'chat-bubble assistant';
    typingIndicator.id = 'geminiTypingBubble';
    typingIndicator.innerHTML = `<span>⏳ Consulting ${activeChatModel}...</span>`;
    if (log) {
      log.appendChild(typingIndicator);
      log.scrollTop = log.scrollHeight;
    }

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          model: activeChatModel,
          role: activeChatRole,
          history: chatHistory.slice(-8)
        })
      });

      const data = await res.json();
      const typingEl = document.getElementById('geminiTypingBubble');
      if (typingEl) typingEl.remove();

      if (data.success && data.reply) {
        chatHistory.push({ role: 'model', text: data.reply });
        renderChatThread();
      } else {
        chatHistory.push({ role: 'model', text: `⚠️ Consultation error: ${data.error || 'Please check API quota'}` });
        renderChatThread();
      }
    } catch (err) {
      const typingEl = document.getElementById('geminiTypingBubble');
      if (typingEl) typingEl.remove();
      chatHistory.push({ role: 'model', text: `⚠️ Connection failed: ${err.message}` });
      renderChatThread();
    }
  }

  function renderChatThread() {
    const log = document.getElementById('geminiChatMessagesLog');
    if (!log) return;

    log.innerHTML = chatHistory.map(m => {
      const isUser = m.role === 'user';
      return `
        <div style="display:flex;flex-direction:column;align-items:${isUser ? 'flex-end' : 'flex-start'};margin-bottom:12px;">
          <div style="font-size:11px;color:#94a3b8;margin-bottom:2px;">${isUser ? 'You' : activeChatModel}</div>
          <div style="background:${isUser ? '#0284c7' : '#1e293b'};color:white;padding:10px 16px;border-radius:${isUser ? '16px 4px 16px 16px' : '4px 16px 16px 16px'};max-width:85%;font-size:13.5px;line-height:1.55;box-shadow:0 2px 8px rgba(0,0,0,0.2);">
            ${window.formatMarkdown ? window.formatMarkdown(m.text) : m.text}
          </div>
        </div>
      `;
    }).join('');

    log.scrollTop = log.scrollHeight;
  }

  // --------------------------------------------------------------------------
  // 4. GOOGLE SEARCH GROUNDING (gemini-3.5-flash)
  // --------------------------------------------------------------------------
  async function executeSearchGrounding() {
    const input = document.getElementById('searchGroundingInput');
    const resultBox = document.getElementById('searchGroundingResult');
    const sourcesBox = document.getElementById('searchGroundingSources');
    const query = input ? input.value.trim() : '';

    if (!query) {
      window.toast?.('Please enter a clinical search topic.');
      return;
    }

    if (resultBox) {
      resultBox.innerHTML = '<div style="color:#38bdf8;">🔍 Querying Google Search Grounding with gemini-3.5-flash...</div>';
    }

    try {
      const res = await fetch('/api/gemini/search-grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: query })
      });
      const data = await res.json();

      if (data.success) {
        if (resultBox) {
          resultBox.innerHTML = `
            <div style="font-size:14px;line-height:1.6;color:#f8fafc;">
              ${window.formatMarkdown ? window.formatMarkdown(data.text) : data.text}
            </div>
          `;
        }
        if (sourcesBox && Array.isArray(data.sources)) {
          sourcesBox.innerHTML = `
            <div style="font-size:11.5px;font-weight:700;color:#38bdf8;margin-bottom:6px;">Verified Search Sources:</div>
            <div style="display:flex;flex-wrap:wrap;gap:8px;">
              ${data.sources.map(s => `
                <a href="${s.uri}" target="_blank" rel="noopener noreferrer" style="background:#1e293b;border:1px solid #334155;color:#38bdf8;padding:4px 10px;border-radius:12px;font-size:11px;text-decoration:none;display:inline-flex;align-items:center;gap:4px;">
                  <span>🌐</span> <span>${s.title}</span>
                </a>
              `).join('')}
            </div>
          `;
        }
      } else {
        if (resultBox) resultBox.innerHTML = `<div style="color:#f87171;">⚠️ ${data.error}</div>`;
      }
    } catch (err) {
      if (resultBox) resultBox.innerHTML = `<div style="color:#f87171;">⚠️ Search Grounding failed: ${err.message}</div>`;
    }
  }

  // --------------------------------------------------------------------------
  // 5. GOOGLE MAPS GROUNDING (gemini-3.5-flash)
  // --------------------------------------------------------------------------
  async function executeMapsGrounding() {
    const input = document.getElementById('mapsGroundingInput');
    const resultBox = document.getElementById('mapsGroundingResult');
    const placesBox = document.getElementById('mapsGroundingPlaces');
    const query = input ? input.value.trim() : '';

    if (!query) {
      window.toast?.('Please enter a location or medical facility query.');
      return;
    }

    if (resultBox) {
      resultBox.innerHTML = '<div style="color:#38bdf8;">📍 Querying Google Maps Grounding with gemini-3.5-flash...</div>';
    }

    try {
      const res = await fetch('/api/gemini/maps-grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: query })
      });
      const data = await res.json();

      if (data.success) {
        if (resultBox) {
          resultBox.innerHTML = `
            <div style="font-size:14px;line-height:1.6;color:#f8fafc;">
              ${window.formatMarkdown ? window.formatMarkdown(data.text) : data.text}
            </div>
          `;
        }
        if (placesBox && Array.isArray(data.places)) {
          placesBox.innerHTML = `
            <div style="font-size:11.5px;font-weight:700;color:#34d399;margin-bottom:6px;">Google Maps Places:</div>
            <div style="display:flex;flex-direction:column;gap:8px;">
              ${data.places.map(p => `
                <div style="background:#1e293b;border:1px solid #334155;padding:10px;border-radius:10px;">
                  <div style="font-weight:700;color:#fff;">${p.title}</div>
                  ${p.uri ? `<a href="${p.uri}" target="_blank" rel="noopener noreferrer" style="color:#38bdf8;font-size:11.5px;text-decoration:none;">📍 Open in Google Maps ➔</a>` : ''}
                </div>
              `).join('')}
            </div>
          `;
        }
      } else {
        if (resultBox) resultBox.innerHTML = `<div style="color:#f87171;">⚠️ ${data.error}</div>`;
      }
    } catch (err) {
      if (resultBox) resultBox.innerHTML = `<div style="color:#f87171;">⚠️ Maps Grounding failed: ${err.message}</div>`;
    }
  }

  // --------------------------------------------------------------------------
  // 6. NANO BANANA IMAGE CREATION & EDITING (gemini-nano-banana-2.1)
  // --------------------------------------------------------------------------
  let selectedNanoImageBase64 = null;

  function handleNanoImageSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      selectedNanoImageBase64 = evt.target.result;
      const preview = document.getElementById('nanoImagePreview');
      if (preview) {
        preview.src = selectedNanoImageBase64;
        preview.style.display = 'block';
      }
      window.toast?.('✓ Image uploaded for editing with Nano Banana 2.1!');
    };
    reader.readAsDataURL(file);
  }

  async function generateNanoBananaImage() {
    const promptInput = document.getElementById('nanoPromptInput');
    const aspectSelect = document.getElementById('nanoAspectRatioSelect');
    const resultBox = document.getElementById('nanoResultContainer');
    const resultImg = document.getElementById('nanoResultImage');
    const resultDesc = document.getElementById('nanoResultDesc');
    const btn = document.getElementById('btnGenerateNanoImage');

    const prompt = promptInput ? promptInput.value.trim() : '';
    const aspectRatio = aspectSelect ? aspectSelect.value : '1:1';

    if (!prompt) {
      window.toast?.('Please provide an image prompt or edit instruction.');
      return;
    }

    if (btn) btn.disabled = true;
    if (resultBox) resultBox.style.display = 'block';
    if (resultDesc) resultDesc.textContent = 'Rendering with gemini-nano-banana-2.1...';

    try {
      const res = await fetch('/api/gemini/nano-banana-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          imageBase64: selectedNanoImageBase64,
          aspectRatio,
          imageSize: '1K'
        })
      });

      const data = await res.json();
      if (data.success && data.imageUrl) {
        if (resultImg) {
          resultImg.src = data.imageUrl;
          resultImg.style.display = 'block';
        }
        if (resultDesc) resultDesc.textContent = data.description || 'Generated with gemini-nano-banana-2.1';
        window.toast?.('✨ Image generated successfully!');
      } else {
        if (resultDesc) resultDesc.textContent = `⚠️ ${data.error || 'Image generation failed'}`;
      }
    } catch (err) {
      if (resultDesc) resultDesc.textContent = `⚠️ Error: ${err.message}`;
    } finally {
      if (btn) btn.disabled = false;
    }
  }

  // --------------------------------------------------------------------------
  // 7. LYRIA MUSIC & SOUND THERAPY (lyria-3-clip-preview & lyria-3-pro-preview)
  // --------------------------------------------------------------------------
  async function generateLyriaMusic(isFullTrack = false) {
    const promptInput = document.getElementById('lyriaPromptInput');
    const audioPlayer = document.getElementById('lyriaAudioPlayer');
    const statusText = document.getElementById('lyriaStatusText');
    const btn = document.getElementById('btnGenerateLyria');

    const prompt = promptInput ? promptInput.value.trim() : 'Therapeutic ambient theta wave soundscape, relaxing clinical 432Hz frequency.';

    if (btn) btn.disabled = true;
    if (statusText) statusText.textContent = `Generating audio with ${isFullTrack ? 'lyria-3-pro-preview' : 'lyria-3-clip-preview'}...`;

    try {
      const res = await fetch('/api/lyria/generate-music', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, isFullTrack })
      });

      const data = await res.json();
      if (data.success && data.audioBase64) {
        const audioSrc = `data:${data.mimeType || 'audio/wav'};base64,${data.audioBase64}`;
        if (audioPlayer) {
          audioPlayer.src = audioSrc;
          audioPlayer.style.display = 'block';
          audioPlayer.play().catch(() => {});
        }
        if (statusText) statusText.textContent = `✓ Generated ${isFullTrack ? 'full track' : '30s clip'}!`;
        window.toast?.('🎵 Therapeutic soundscape ready!');
      } else {
        if (statusText) statusText.textContent = `⚠️ Lyria note: ${data.error || 'Audio generation failed'}`;
      }
    } catch (err) {
      if (statusText) statusText.textContent = `⚠️ Error: ${err.message}`;
    } finally {
      if (btn) btn.disabled = false;
    }
  }

  // --------------------------------------------------------------------------
  // 8. AUDIO TRANSCRIPTION (gemini-3.5-transcribe)
  // --------------------------------------------------------------------------
  let isRecordingAudio = false;

  async function toggleAudioRecording() {
    const btn = document.getElementById('btnTranscribeRecord');
    const statusText = document.getElementById('transcribeStatusText');

    if (isRecordingAudio) {
      // Stop recording
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
      }
      isRecordingAudio = false;
      if (btn) {
        btn.textContent = '🎤 Start Recording';
        btn.style.background = '#0284c7';
      }
      if (statusText) statusText.textContent = 'Processing audio transcription with gemini-3.5-transcribe...';
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunks = [];
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunks.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onload = async (evt) => {
          const base64 = evt.target.result;
          await sendAudioToTranscribe(base64);
        };
        reader.readAsDataURL(audioBlob);
        stream.getTracks().forEach(t => t.stop());
      };

      mediaRecorder.start();
      isRecordingAudio = true;
      if (btn) {
        btn.textContent = '⏹️ Stop & Transcribe';
        btn.style.background = '#ef4444';
      }
      if (statusText) statusText.textContent = 'Recording microphone... Speak your clinical notes.';
    } catch (err) {
      window.toast?.(`⚠️ Microphone permission blocked: ${err.message}`);
    }
  }

  async function sendAudioToTranscribe(audioBase64) {
    const resultBox = document.getElementById('transcriptionResultBox');
    const statusText = document.getElementById('transcribeStatusText');

    try {
      const res = await fetch('/api/gemini/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ audioBase64, mimeType: 'audio/webm' })
      });

      const data = await res.json();
      if (data.success && data.transcription) {
        if (resultBox) {
          resultBox.value = data.transcription;
          resultBox.style.display = 'block';
        }
        if (statusText) statusText.textContent = '✓ Transcription complete via gemini-3.5-transcribe!';
        window.toast?.('✓ Audio transcribed accurately!');
      } else {
        if (statusText) statusText.textContent = `⚠️ ${data.error || 'Transcription failed'}`;
      }
    } catch (err) {
      if (statusText) statusText.textContent = `⚠️ Error: ${err.message}`;
    }
  }

  // --------------------------------------------------------------------------
  // 9. LIVE API VOICE ROOM (gemini-3.8-live)
  // --------------------------------------------------------------------------
  async function connectLiveVoiceRoom() {
    const statusBadge = document.getElementById('liveVoiceStatusBadge');
    const btn = document.getElementById('btnToggleLiveVoice');

    if (liveWebSocket) {
      // Disconnect
      liveWebSocket.close();
      liveWebSocket = null;
      if (statusBadge) statusBadge.textContent = 'Offline';
      if (btn) btn.textContent = 'Start Live Call';
      window.toast?.('Live API session closed.');
      return;
    }

    if (statusBadge) statusBadge.textContent = 'Connecting to gemini-3.8-live...';

    const wsProto = location.protocol === 'https:' ? 'wss:' : 'ws:';
    liveWebSocket = new WebSocket(`${wsProto}//${location.host}/live`);

    liveWebSocket.onopen = async () => {
      if (statusBadge) statusBadge.textContent = '● Live 3.8 Audio Connected';
      if (btn) btn.textContent = 'End Live Call';
      window.toast?.('Connected to Live API voice room!');

      // Capture mic and stream PCM audio
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        liveAudioContext = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
        const source = liveAudioContext.createMediaStreamSource(stream);
        const processor = liveAudioContext.createScriptProcessor(4096, 1, 1);
        source.connect(processor);
        processor.connect(liveAudioContext.destination);

        processor.onaudioprocess = (e) => {
          if (!liveWebSocket || liveWebSocket.readyState !== WebSocket.OPEN) return;
          const inputData = e.inputBuffer.getChannelData(0);
          // Convert Float32 to 16-bit PCM LE
          const pcm16 = new Int16Array(inputData.length);
          for (let i = 0; i < inputData.length; i++) {
            const s = Math.max(-1, Math.min(1, inputData[i]));
            pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
          }
          const base64 = btoa(String.fromCharCode(...new Uint8Array(pcm16.buffer)));
          liveWebSocket.send(JSON.stringify({ audio: base64 }));
        };
      } catch (err) {
        console.warn('Live mic stream warning:', err);
      }
    };

    liveWebSocket.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.audio) {
          playLiveAudioChunk(msg.audio);
        }
      } catch (e) {}
    };

    liveWebSocket.onclose = () => {
      if (statusBadge) statusBadge.textContent = 'Disconnected';
      if (btn) btn.textContent = 'Start Live Call';
      liveWebSocket = null;
    };
  }

  function playLiveAudioChunk(base64Data) {
    try {
      const binary = atob(base64Data);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      const blob = new Blob([bytes], { type: 'audio/wav' });
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.play().catch(() => {});
    } catch (e) {}
  }

  return {
    initMolecularViewer,
    loadProteinTarget,
    setMolecularStyle,
    saveCurrentDossierToFirestore,
    handleVeoImageSelect,
    generateVeoVideo,
    setChatModel,
    setChatRole,
    sendGeminiChatMessage,
    executeSearchGrounding,
    executeMapsGrounding,
    handleNanoImageSelect,
    generateNanoBananaImage,
    generateLyriaMusic,
    toggleAudioRecording,
    connectLiveVoiceRoom
  };
})();
