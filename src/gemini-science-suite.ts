import { Request, Response, Express } from 'express';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Modality } from '@google/genai';
import { WebSocketServer, WebSocket } from 'ws';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to get GoogleGenAI client
function getAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
}

// Read Firebase applet config
let firebaseConfig: any = null;
try {
  const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
  if (fs.existsSync(configPath)) {
    firebaseConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  }
} catch (e) {
  console.warn('[Firebase Config] Could not load local config:', e);
}

export function setupGeminiScienceRoutes(app: Express, server: http.Server) {
  // ----------------------------------------------------
  // 1. Firebase Config Endpoint
  // ----------------------------------------------------
  app.get('/api/firebase/config', (_req: Request, res: Response) => {
    if (!firebaseConfig) {
      try {
        const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
        if (fs.existsSync(configPath)) {
          firebaseConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        }
      } catch (e) {}
    }
    return res.json({
      success: !!firebaseConfig,
      config: firebaseConfig || {
        projectId: 'funky-metrics-clcf1',
        authDomain: 'funky-metrics-clcf1.firebaseapp.com'
      }
    });
  });

  // ----------------------------------------------------
  // 2. Multi-turn Gemini Chatbot
  // Models: gemini-3.1-pro-preview (complex), gemini-3.5-flash (general), gemini-3.1-flash-lite (fast)
  // ----------------------------------------------------
  app.post('/api/gemini/chat', async (req: Request, res: Response) => {
    const ai = getAI();
    if (!ai) {
      return res.status(503).json({
        success: false,
        error: 'GEMINI_API_KEY is not configured in environment.'
      });
    }

    const {
      message,
      model = 'gemini-3.5-flash',
      history = [],
      role = 'chief_consultant'
    } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ success: false, error: 'A message string is required.' });
    }

    // Allowed model aliases
    let targetModel = 'gemini-3.5-flash';
    if (model.includes('3.1-pro') || model.includes('pro')) {
      targetModel = 'gemini-3.1-pro-preview';
    } else if (model.includes('flash-lite') || model.includes('lite')) {
      targetModel = 'gemini-3.1-flash-lite';
    } else if (model.includes('3.5-flash') || model.includes('flash')) {
      targetModel = 'gemini-3.5-flash';
    }

    const roleInstructions: Record<string, string> = {
      chief_consultant: 'You are Dr. Nambi, Chief Medical Consultant on HealthGPT. Provide authoritative, compassionate, evidence-based clinical guidance. Structure answers with clinical observations, potential differential considerations, and clear precautions.',
      pharmacologist: 'You are a Senior Molecular Pharmacologist & Bio-Chemist on HealthGPT. Detail drug mechanisms, receptor kinetics, CYP450 interactions, chemical contraindications, and CDSCO/Jan Aushadhi generic equivalents.',
      mental_wellness: 'You are Alex, compassionate Mental Wellness & Cognitive Health Companion. Provide warm, validating, non-judgmental emotional support, somatic grounding, and evidence-based stress-relief techniques.',
      science_researcher: 'You are a Google DeepMind Science Research Specialist on HealthGPT. Provide deep insights into protein folding, AlphaFold pLDDT scores, UniProt functional motifs, PDB structures, and molecular pharmacology.'
    };

    const systemInstruction = roleInstructions[role] || roleInstructions.chief_consultant;

    try {
      // Map history to standard contents structure
      const formattedContents: any[] = [];
      if (Array.isArray(history)) {
        for (const turn of history) {
          if (turn && turn.role && turn.text) {
            formattedContents.push({
              role: turn.role === 'user' ? 'user' : 'model',
              parts: [{ text: String(turn.text) }]
            });
          }
        }
      }
      formattedContents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: targetModel,
        contents: formattedContents,
        config: {
          systemInstruction
        }
      });

      const replyText = response.text || '';
      return res.json({
        success: true,
        model: targetModel,
        role,
        reply: replyText
      });
    } catch (err: any) {
      console.error('[Gemini Chat Error]:', err);
      return res.status(500).json({
        success: false,
        error: err?.message || 'Gemini multi-turn chat generation failed.'
      });
    }
  });

  // ----------------------------------------------------
  // 3. Google Search Grounding (gemini-3.5-flash + googleSearch)
  // ----------------------------------------------------
  app.post('/api/gemini/search-grounding', async (req: Request, res: Response) => {
    const ai = getAI();
    if (!ai) {
      return res.status(503).json({ success: false, error: 'GEMINI_API_KEY is not configured.' });
    }

    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ success: false, error: 'Prompt is required.' });
    }

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }]
        }
      });

      const groundingChunks = (response.candidates?.[0]?.groundingMetadata as any)?.groundingChunks || [];
      const webSources = groundingChunks
        .filter((c: any) => c.web)
        .map((c: any) => ({
          title: c.web.title || 'Verified Medical Web Source',
          uri: c.web.uri
        }));

      return res.json({
        success: true,
        model: 'gemini-3.5-flash',
        tool: 'googleSearch',
        text: response.text || '',
        sources: webSources
      });
    } catch (err: any) {
      console.error('[Search Grounding Error]:', err);
      return res.status(500).json({
        success: false,
        error: err?.message || 'Search Grounding query failed.'
      });
    }
  });

  // ----------------------------------------------------
  // 4. Google Maps Grounding (gemini-3.5-flash + googleMaps)
  // ----------------------------------------------------
  app.post('/api/gemini/maps-grounding', async (req: Request, res: Response) => {
    const ai = getAI();
    if (!ai) {
      return res.status(503).json({ success: false, error: 'GEMINI_API_KEY is not configured.' });
    }

    const { prompt, latitude = 28.6139, longitude = 77.2090 } = req.body; // Default New Delhi hub
    if (!prompt) {
      return res.status(400).json({ success: false, error: 'Prompt is required.' });
    }

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          tools: [{ googleMaps: {} }],
          toolConfig: {
            retrievalConfig: {
              latLng: {
                latitude: Number(latitude),
                longitude: Number(longitude)
              }
            }
          }
        }
      });

      const groundingChunks = (response.candidates?.[0]?.groundingMetadata as any)?.groundingChunks || [];
      const mapSources = groundingChunks
        .filter((c: any) => c.maps)
        .map((c: any) => ({
          title: c.maps.title || 'Hospital / Medical Center',
          uri: c.maps.uri,
          placeAnswerSources: c.maps.placeAnswerSources
        }));

      return res.json({
        success: true,
        model: 'gemini-3.5-flash',
        tool: 'googleMaps',
        text: response.text || '',
        places: mapSources
      });
    } catch (err: any) {
      console.error('[Maps Grounding Error]:', err);
      return res.status(500).json({
        success: false,
        error: err?.message || 'Maps Grounding query failed.'
      });
    }
  });

  // ----------------------------------------------------
  // 5. Audio Transcription (gemini-3.5-transcribe)
  // ----------------------------------------------------
  app.post('/api/gemini/transcribe', async (req: Request, res: Response) => {
    const ai = getAI();
    if (!ai) {
      return res.status(503).json({ success: false, error: 'GEMINI_API_KEY is not configured.' });
    }

    const { audioBase64, mimeType = 'audio/webm', prompt = 'Transcribe this spoken clinical consultation or patient symptom dictation accurately into structured notes.' } = req.body;
    if (!audioBase64) {
      return res.status(400).json({ success: false, error: 'audioBase64 is required.' });
    }

    const cleanBase64 = audioBase64.replace(/^data:[^;]+;base64,/, '');

    try {
      const audioPart = {
        inlineData: {
          mimeType,
          data: cleanBase64
        }
      };

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-transcribe',
        contents: {
          parts: [audioPart, { text: prompt }]
        }
      });

      return res.json({
        success: true,
        model: 'gemini-3.5-transcribe',
        transcription: response.text || ''
      });
    } catch (err: any) {
      console.error('[Audio Transcription Error]:', err);
      return res.status(500).json({
        success: false,
        error: err?.message || 'Audio transcription failed.'
      });
    }
  });

  // ----------------------------------------------------
  // 6. Veo 3 Video Generation & Image-to-Video Animation
  // Model: veo-3.1-fast-generate-preview
  // Aspect Ratio: 16:9 (landscape) or 9:16 (portrait)
  // ----------------------------------------------------
  app.post('/api/veo/generate-video', async (req: Request, res: Response) => {
    const ai = getAI();
    if (!ai) {
      return res.status(503).json({ success: false, error: 'GEMINI_API_KEY is not configured.' });
    }

    const {
      prompt,
      imageBase64,
      aspectRatio = '16:9',
      resolution = '720p'
    } = req.body;

    if (!prompt && !imageBase64) {
      return res.status(400).json({ success: false, error: 'Either prompt text or imageBase64 is required.' });
    }

    const validAspect = (aspectRatio === '9:16' || aspectRatio === '16:9') ? aspectRatio : '16:9';

    try {
      const videoPayload: any = {
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt || 'Cinematic medical animation showing physiological cellular vitality and dynamic equilibrium.',
        config: {
          numberOfVideos: 1,
          aspectRatio: validAspect,
          resolution: resolution === '1080p' ? '1080p' : '720p'
        }
      };

      if (imageBase64) {
        const cleanBase64 = imageBase64.replace(/^data:image\/[^;]+;base64,/, '');
        videoPayload.image = {
          imageBytes: cleanBase64,
          mimeType: imageBase64.includes('png') ? 'image/png' : 'image/jpeg'
        };
      }

      // Start long-running Veo generation
      const operation = await (ai.models as any).generateVideos(videoPayload);

      return res.json({
        success: true,
        model: 'veo-3.1-fast-generate-preview',
        aspectRatio: validAspect,
        operationName: operation.name || operation.id,
        status: 'processing',
        message: 'Veo video generation initialized. Use operationName to poll status.'
      });
    } catch (err: any) {
      console.error('[Veo Video Generation Error]:', err);
      return res.status(500).json({
        success: false,
        error: err?.message || 'Veo video generation failed. Ensure your API key has billing/quota enabled.'
      });
    }
  });

  // Polling endpoint for Veo video operations
  app.get('/api/veo/operations/:operationId', async (req: Request, res: Response) => {
    const ai = getAI();
    if (!ai) {
      return res.status(503).json({ success: false, error: 'GEMINI_API_KEY is not configured.' });
    }

    const operationName = req.params.operationId;
    try {
      const op = await (ai.operations as any).getVideosOperation({ operation: operationName });
      const done = op.done || false;
      const videos = op.response?.generatedVideos || [];
      const videoUri = videos[0]?.video?.uri || null;

      return res.json({
        success: true,
        done,
        operationName,
        videoUri,
        metadata: op.metadata
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        error: err?.message || 'Could not poll Veo operation.'
      });
    }
  });

  // ----------------------------------------------------
  // 7. Image Creation & Editing (gemini-nano-banana-2.1)
  // ----------------------------------------------------
  app.post('/api/gemini/nano-banana-image', async (req: Request, res: Response) => {
    const ai = getAI();
    if (!ai) {
      return res.status(503).json({ success: false, error: 'GEMINI_API_KEY is not configured.' });
    }

    const {
      prompt,
      imageBase64,
      aspectRatio = '1:1',
      imageSize = '1K'
    } = req.body;

    if (!prompt) {
      return res.status(400).json({ success: false, error: 'Prompt text is required.' });
    }

    try {
      const parts: any[] = [];
      if (imageBase64) {
        const cleanBase64 = imageBase64.replace(/^data:image\/[^;]+;base64,/, '');
        parts.push({
          inlineData: {
            data: cleanBase64,
            mimeType: imageBase64.includes('png') ? 'image/png' : 'image/jpeg'
          }
        });
      }
      parts.push({ text: prompt });

      const response = await ai.models.generateContent({
        model: 'gemini-nano-banana-2.1',
        contents: { parts },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio as any,
            imageSize: imageSize as any
          }
        }
      });

      let outputImageUrl: string | null = null;
      let outputText: string = '';

      const respParts = response.candidates?.[0]?.content?.parts || [];
      for (const p of respParts) {
        if (p.inlineData?.data) {
          const mime = p.inlineData.mimeType || 'image/png';
          outputImageUrl = `data:${mime};base64,${p.inlineData.data}`;
        }
        if (p.text) {
          outputText += p.text;
        }
      }

      return res.json({
        success: !!outputImageUrl,
        model: 'gemini-nano-banana-2.1',
        imageUrl: outputImageUrl,
        description: outputText
      });
    } catch (err: any) {
      console.error('[Nano Banana Image Error]:', err);
      return res.status(500).json({
        success: false,
        error: err?.message || 'Nano Banana image generation failed.'
      });
    }
  });

  // ----------------------------------------------------
  // 8. Music Generation (lyria-3-clip-preview & lyria-3-pro-preview)
  // ----------------------------------------------------
  app.post('/api/lyria/generate-music', async (req: Request, res: Response) => {
    const ai = getAI();
    if (!ai) {
      return res.status(503).json({ success: false, error: 'GEMINI_API_KEY is not configured.' });
    }

    const {
      prompt = 'Therapeutic ambient theta wave soundscape, soft acoustic guitar, relaxing clinical frequencies.',
      isFullTrack = false
    } = req.body;

    const targetModel = isFullTrack ? 'lyria-3-pro-preview' : 'lyria-3-clip-preview';

    try {
      const responseStream = await ai.models.generateContentStream({
        model: targetModel,
        contents: prompt
      });

      let audioBase64 = '';
      let lyrics = '';
      let mimeType = 'audio/wav';

      for await (const chunk of responseStream) {
        const parts = chunk.candidates?.[0]?.content?.parts || [];
        for (const part of parts) {
          if (part.inlineData?.data) {
            if (!audioBase64 && part.inlineData.mimeType) {
              mimeType = part.inlineData.mimeType;
            }
            audioBase64 += part.inlineData.data;
          }
          if (part.text && !lyrics) {
            lyrics = part.text;
          }
        }
      }

      return res.json({
        success: !!audioBase64,
        model: targetModel,
        mimeType,
        audioBase64,
        lyrics
      });
    } catch (err: any) {
      console.error('[Lyria Music Error]:', err);
      return res.status(500).json({
        success: false,
        error: err?.message || 'Lyria music generation failed. Requires billing-enabled API key.'
      });
    }
  });

  // ----------------------------------------------------
  // 9. Science Skills: AlphaFold DB, PDB, UniProt & Drug Targets
  // ----------------------------------------------------
  app.get('/api/science/alphafold/:uniprotId', async (req: Request, res: Response) => {
    const rawId = String(req.params.uniprotId || '').trim().toUpperCase();
    try {
      const afRes = await fetch(`https://alphafold.ebi.ac.uk/api/prediction/${rawId}`);
      if (!afRes.ok) {
        return res.status(afRes.status).json({ success: false, error: 'AlphaFold DB entry not found.' });
      }
      const data = await afRes.json();
      const entry = Array.isArray(data) ? data[0] : data;

      // Extract validated file URLs
      return res.json({
        success: true,
        uniprotId: rawId,
        gene: entry?.gene || rawId,
        organism: entry?.organismScientificName || 'Homo sapiens',
        uniprotDescription: entry?.uniprotDescription || 'Human Protein Target',
        uniprotStart: entry?.uniprotStart || 1,
        uniprotEnd: entry?.uniprotEnd || 393,
        cifUrl: entry?.cifUrl || `https://alphafold.ebi.ac.uk/files/AF-${rawId}-F1-model_v6.cif`,
        pdbUrl: entry?.pdbUrl || `https://alphafold.ebi.ac.uk/files/AF-${rawId}-F1-model_v6.pdb`,
        bcifUrl: entry?.bcifUrl || `https://alphafold.ebi.ac.uk/files/AF-${rawId}-F1-model_v6.bcif`,
        paeImageUrl: entry?.paeImageUrl || null,
        paeDocUrl: entry?.paeDocUrl || null,
        alphaGenomeUrl: `https://deepmind.google.com/science/alphagenome/atlas?q=${encodeURIComponent(entry?.gene || rawId)}`
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err?.message || 'Failed to query AlphaFold DB.' });
    }
  });

  app.get('/api/science/pdb/:pdbId', async (req: Request, res: Response) => {
    const pdbId = String(req.params.pdbId || '').trim().toUpperCase();
    try {
      const metaRes = await fetch(`https://data.rcsb.org/rest/v1/core/entry/${pdbId}`);
      const meta = metaRes.ok ? await metaRes.json() : null;

      return res.json({
        success: true,
        pdbId,
        title: meta?.struct?.title || `${pdbId} Crystal Structure`,
        resolution: meta?.rcsb_entry_info?.resolution_combined?.[0] || '1.8 Å',
        depositionDate: meta?.rcsb_accession_info?.deposit_date || '2023-01-15',
        cifUrl: `https://files.rcsb.org/download/${pdbId}.cif`,
        pdbUrl: `https://files.rcsb.org/download/${pdbId}.pdb`
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err?.message || 'Failed to query RCSB PDB.' });
    }
  });

  app.get('/api/science/uniprot/:uniprotId', async (req: Request, res: Response) => {
    const uniprotId = String(req.params.uniprotId || '').trim().toUpperCase();
    try {
      const upRes = await fetch(`https://rest.uniprot.org/uniprotkb/${uniprotId}.json`);
      if (!upRes.ok) {
        return res.status(upRes.status).json({ success: false, error: 'UniProtKB entry not found.' });
      }
      const data: any = await upRes.json();
      
      const geneName = data.genes?.[0]?.geneName?.value || uniprotId;
      const proteinName = data.proteinDescription?.recommendedName?.fullName?.value || data.proteinDescription?.submissionNames?.[0]?.fullName?.value || 'Protein';
      const sequence = data.sequence?.value || '';
      const features = (data.features || []).slice(0, 15).map((f: any) => ({
        type: f.type,
        location: `${f.location?.start?.value}-${f.location?.end?.value}`,
        description: f.description
      }));

      return res.json({
        success: true,
        uniprotId,
        geneName,
        proteinName,
        organism: data.organism?.scientificName || 'Homo sapiens',
        sequenceLength: data.sequence?.length || sequence.length,
        sequencePreview: sequence.slice(0, 120) + (sequence.length > 120 ? '...' : ''),
        features,
        alphaGenomeUrl: `https://deepmind.google.com/science/alphagenome/atlas?q=${encodeURIComponent(geneName)}`
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err?.message || 'Failed to query UniProt.' });
    }
  });

  // ----------------------------------------------------
  // 10. Live API WebSocket Bridge (gemini-3.8-live)
  // ----------------------------------------------------
  try {
    const wss = new WebSocketServer({ server, path: '/live' });
    wss.on('connection', async (ws: WebSocket) => {
      const ai = getAI();
      if (!ai) {
        ws.send(JSON.stringify({ error: 'GEMINI_API_KEY not configured for Live API.' }));
        ws.close();
        return;
      }

      console.log('[Live API] Client connected to /live');
      let liveSession: any = null;

      try {
        liveSession = await (ai as any).live.connect({
          model: 'gemini-3.8-live',
          config: {
            responseModalities: [Modality.AUDIO],
            systemInstruction: 'You are Dr. Nambi & Alex on HealthGPT Live Voice Consultation. Speak directly to the patient in warm, calm, caring, and sweet conversational English or Hindi with natural doctor dialogue.'
          },
          callbacks: {
            onmessage: (msg: any) => {
              const audioBase64 = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
              if (audioBase64 && ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ audio: audioBase64 }));
              }
              if (msg.serverContent?.interrupted && ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ interrupted: true }));
              }
            }
          }
        });

        ws.on('message', (data: any) => {
          try {
            const parsed = JSON.parse(data.toString());
            if (parsed.audio && liveSession) {
              liveSession.sendRealtimeInput({
                audio: { data: parsed.audio, mimeType: 'audio/pcm;rate=16000' }
              });
            }
          } catch (e) {}
        });

        ws.on('close', () => {
          if (liveSession && typeof liveSession.close === 'function') {
            try { liveSession.close(); } catch(e){}
          }
        });
      } catch (err: any) {
        console.warn('[Live API Session Connection Note]:', err?.message || err);
        ws.send(JSON.stringify({ error: 'Live API session init: ' + (err?.message || err) }));
      }
    });
  } catch (wsErr) {
    console.warn('[WebSocket Init Warning]:', wsErr);
  }
}
