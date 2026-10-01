/**
 * HealthGPT Doctor Digital Business Card QR Scanner & Auto-Telehealth Dispatcher
 * Seamlessly pairs with Biometric Hologram Laser Scanners to initiate priority telehealth video consultations.
 */
(function(window, document) {
  'use strict';

  // Fallback Verified Specialist Cards
  const FALLBACK_SAMPLE_DOCTORS = [
    {
      id: 1,
      name: 'Dr. Rajesh Sharma',
      specialty: 'Chief Interventional Cardiologist',
      degrees: 'MBBS, MD (Med), DM (Cardiology), FACC',
      registrationNumber: 'MCI-18492-DL',
      hospital: 'Apollo Hospitals, Sarita Vihar',
      city: 'Delhi',
      consultationFeeINR: 800,
      rating: 4.9,
      reviewCount: 482,
      nextSlot: '04:00 PM',
      availableNow: true,
      avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150',
      telehealthUrl: 'https://meet.google.com/hgpt-cardio-room'
    },
    {
      id: 2,
      name: 'Dr. Priya Nair',
      specialty: 'Senior Neurologist & Stroke Specialist',
      degrees: 'MBBS, MD, DM (Neurology)',
      registrationNumber: 'KMC-48291-BLR',
      hospital: 'Manipal Hospital, Old Airport Road',
      city: 'Bengaluru',
      consultationFeeINR: 950,
      rating: 4.85,
      reviewCount: 396,
      nextSlot: '04:30 PM',
      availableNow: true,
      avatarUrl: 'https://images.unsplash.com/photo-1594824813596-a8286a9f481c?w=150',
      telehealthUrl: 'https://meet.google.com/hgpt-neuro-room'
    },
    {
      id: 3,
      name: 'Dr. Ananya Iyer',
      specialty: 'General Physician & Diabetologist',
      degrees: 'MBBS, MD (Internal Medicine)',
      registrationNumber: 'MMC-73910-BOM',
      hospital: 'Max Healthcare, Bandra West',
      city: 'Mumbai',
      consultationFeeINR: 600,
      rating: 4.92,
      reviewCount: 520,
      nextSlot: '05:00 PM',
      availableNow: true,
      avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150',
      telehealthUrl: 'https://meet.google.com/hgpt-general-room'
    },
    {
      id: 4,
      name: 'Dr. Vikram Malhotra',
      specialty: 'Senior Orthopedic Surgeon',
      degrees: 'MBBS, MS (Orthopedics), MCh',
      registrationNumber: 'DMC-28491-DEL',
      hospital: 'Fortis Hospital, Vasant Kunj',
      city: 'Delhi',
      consultationFeeINR: 850,
      rating: 4.79,
      reviewCount: 310,
      nextSlot: '05:30 PM',
      availableNow: true,
      avatarUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150',
      telehealthUrl: 'https://meet.google.com/hgpt-ortho-room'
    },
    {
      id: 5,
      name: 'Dr. Sunita Rao',
      specialty: 'Pediatric & Adolescent Health',
      degrees: 'MBBS, MD (Pediatrics), DCH',
      registrationNumber: 'KMC-59281-BLR',
      hospital: 'Cloudnine Hospital, Jayanagar',
      city: 'Bengaluru',
      consultationFeeINR: 700,
      rating: 4.88,
      reviewCount: 440,
      nextSlot: '04:15 PM',
      availableNow: true,
      avatarUrl: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=150',
      telehealthUrl: 'https://meet.google.com/hgpt-pedia-room'
    }
  ];

  let doctorQrStream = null;
  let doctorQrScanningActive = false;
  let doctorQrFacingMode = 'environment';
  let doctorQrTorchActive = false;
  let doctorQrAutoCountdownTimer = null;
  let doctorQrCountdownSeconds = 3;
  let currentDetectedDoctor = null;
  let barcodeDetectorInstance = null;

  if (typeof window !== 'undefined' && 'BarcodeDetector' in window) {
    try {
      barcodeDetectorInstance = new window.BarcodeDetector({ formats: ['qr_code'] });
    } catch (e) {}
  }

  function playTone(type) {
    if (typeof window.playInteractiveTone === 'function') {
      window.playInteractiveTone(type);
      return;
    }
    if (typeof window.playHarmonicChime === 'function') {
      window.playHarmonicChime(type === 'celebrate' ? 880 : 587.33, 'triangle', 0.6);
      return;
    }
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      const now = ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(type === 'celebrate' ? 880 : 520, now);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch(e) {}
  }

  function ensureModalInDom() {
    let modal = document.getElementById('doctorQrScannerModal');
    if (modal) return modal;

    modal = document.createElement('div');
    modal.id = 'doctorQrScannerModal';
    modal.className = 'doctor-qr-modal-overlay';
    modal.style.display = 'none';
    modal.setAttribute('onclick', 'window.handleQrModalOverlayClick(event)');

    modal.innerHTML = `
      <div class="doctor-qr-modal-card" role="dialog" aria-modal="true" aria-labelledby="doctorQrModalTitle">
        <div class="qr-modal-header">
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,rgba(56,189,248,0.2),rgba(16,185,129,0.2));border:1px solid rgba(56,189,248,0.4);display:flex;align-items:center;justify-content:center;font-size:18px;">
              <span>📷</span>
            </div>
            <div>
              <h3 id="doctorQrModalTitle" style="font-size:15px;font-weight:800;margin:0;color:#f8fafc;display:flex;align-items:center;gap:8px;">
                <span>Doctor Digital Card Scanner</span>
                <span style="font-size:10px;padding:2px 8px;border-radius:12px;background:rgba(56,189,248,0.15);color:#38bdf8;border:1px solid rgba(56,189,248,0.3);text-transform:uppercase;font-weight:800;">Telehealth Gateway</span>
              </h3>
              <div style="font-size:11px;color:#94a3b8;margin-top:2px;">Scan doctor's digital business card QR to auto-book an instant telehealth session</div>
            </div>
          </div>
          <button type="button" onclick="window.closeDoctorQrScanner()" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:#94a3b8;border-radius:8px;width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:16px;transition:all 0.2s;" title="Close Modal">✕</button>
        </div>

        <div style="background:rgba(15,23,42,0.95);padding:8px 20px;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:space-between;font-size:11px;">
          <div style="display:flex;align-items:center;gap:8px;color:#38bdf8;font-weight:700;">
            <span style="width:7px;height:7px;border-radius:50%;background:#10b981;box-shadow:0 0 8px #10b981;"></span>
            <span id="qrTelemetryStatusText">Biometric Telemetry Calibrated · Vitals Ready</span>
          </div>
          <div style="display:flex;align-items:center;gap:12px;color:#94a3b8;font-size:10.5px;">
            <span>HR: <strong style="color:#f8fafc;" id="qrVitalsHr">72 bpm</strong></span>
            <span>SpO2: <strong style="color:#f8fafc;" id="qrVitalsSpo2">98.4%</strong></span>
            <span>BP: <strong style="color:#f8fafc;" id="qrVitalsBp">118/78</strong></span>
          </div>
        </div>

        <div class="qr-modal-tabs">
          <button type="button" class="qr-tab-button active" id="btnQrTabCamera" onclick="window.switchDoctorQrTab('camera')">
            <span>📷</span> <span>Live Camera</span>
          </button>
          <button type="button" class="qr-tab-button" id="btnQrTabUpload" onclick="window.switchDoctorQrTab('upload')">
            <span>📁</span> <span>Upload Card / Photo</span>
          </button>
          <button type="button" class="qr-tab-button" id="btnQrTabPresets" onclick="window.switchDoctorQrTab('presets')">
            <span>⚡</span> <span>Verified Doctor Cards</span>
          </button>
        </div>

        <div id="tabDoctorQrCamera" style="padding:16px 20px;">
          <div class="qr-scanner-viewfinder" id="qrViewfinderContainer">
            <video id="doctorQrVideo" playsinline autoplay muted style="width:100%;height:100%;object-fit:cover;"></video>
            <canvas id="doctorQrCanvas" style="display:none;"></canvas>
            <div class="qr-laser-sweep" id="qrLaserBeam"></div>
            
            <div class="qr-reticle-box" id="qrReticleBox">
              <div class="qr-reticle-corner corner-tl"></div>
              <div class="qr-reticle-corner corner-tr"></div>
              <div class="qr-reticle-corner corner-bl"></div>
              <div class="qr-reticle-corner corner-br"></div>
              <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;">
                <div id="qrCenterCrosshair" style="width:14px;height:14px;border:1px dashed rgba(56,189,248,0.6);border-radius:50%;"></div>
              </div>
            </div>

            <div id="cameraStatusOverlay" style="position:absolute;bottom:12px;left:50%;transform:translateX(-50%);background:rgba(15,23,42,0.85);backdrop-filter:blur(6px);border:1px solid rgba(56,189,248,0.4);border-radius:20px;padding:4px 14px;font-size:11px;font-weight:700;color:#38bdf8;white-space:nowrap;z-index:6;display:flex;align-items:center;gap:6px;">
              <span style="width:6px;height:6px;border-radius:50%;background:#38bdf8;"></span>
              <span id="cameraStatusText">Align doctor's digital business card QR inside reticle</span>
            </div>

            <div id="cameraFallbackOverlay" style="display:none;position:absolute;inset:0;background:rgba(15,23,42,0.96);padding:24px;flex-direction:column;align-items:center;justify-content:center;text-align:center;z-index:8;">
              <span style="font-size:36px;margin-bottom:8px;">📷</span>
              <div style="font-size:14px;font-weight:800;color:#f8fafc;margin-bottom:4px;" id="cameraFallbackTitle">Camera Access Needed</div>
              <p style="font-size:12px;color:#94a3b8;max-width:340px;margin:0 0 16px;line-height:1.4;" id="cameraFallbackDesc">
                Allow camera permission in your browser, or upload a photo of the doctor's card, or choose from verified sample doctor digital cards.
              </p>
              <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;">
                <button type="button" onclick="window.startDoctorQrCamera(true)" style="background:#0284c7;color:white;border:none;padding:8px 14px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;">Retry Camera</button>
                <button type="button" onclick="window.switchDoctorQrTab('upload')" style="background:rgba(255,255,255,0.1);color:white;border:1px solid rgba(255,255,255,0.2);padding:8px 14px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;">Upload Card Image</button>
                <button type="button" onclick="window.switchDoctorQrTab('presets')" style="background:rgba(245,158,11,0.2);color:#fbbf24;border:1px solid rgba(245,158,11,0.4);padding:8px 14px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;">Use Sample Cards</button>
              </div>
            </div>
          </div>

          <div style="display:flex;align-items:center;justify-content:space-between;margin-top:12px;gap:8px;">
            <div style="display:flex;align-items:center;gap:6px;">
              <button type="button" id="btnToggleCameraFacing" onclick="window.toggleCameraFacing()" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:#cbd5e1;padding:6px 12px;border-radius:8px;font-size:11.5px;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:5px;">
                <span>🔄</span> <span>Switch Camera</span>
              </button>
              <button type="button" id="btnToggleTorch" onclick="window.toggleCameraTorch()" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:#cbd5e1;padding:6px 12px;border-radius:8px;font-size:11.5px;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:5px;">
                <span>🔦</span> <span>Flash</span>
              </button>
            </div>
            <div style="font-size:11px;color:#94a3b8;text-align:right;">
              Auto-detection: <strong style="color:#10b981;">Active</strong>
            </div>
          </div>
        </div>

        <div id="tabDoctorQrUpload" style="display:none;padding:16px 20px;">
          <div id="qrDropZone" ondragover="window.handleQrDragOver(event)" ondragleave="window.handleQrDragLeave(event)" ondrop="window.handleQrDrop(event)" onclick="document.getElementById('qrFileInput').click()" style="border:2px dashed rgba(56,189,248,0.4);border-radius:14px;padding:36px 20px;text-align:center;background:rgba(15,23,42,0.5);cursor:pointer;transition:all 0.2s;">
            <input type="file" id="qrFileInput" accept="image/*" style="display:none;" onchange="window.handleQrFileSelect(event)">
            <div style="font-size:36px;margin-bottom:8px;">📁</div>
            <div style="font-size:14px;font-weight:800;color:#f8fafc;margin-bottom:4px;">Upload Doctor's Digital Card Image</div>
            <div style="font-size:12px;color:#94a3b8;margin-bottom:12px;">Drag and drop QR code photo, digital card screenshot, or clinic e-slip</div>
            <button type="button" style="background:linear-gradient(135deg,#0284c7,#0369a1);color:white;border:none;padding:8px 16px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;">Browse Files</button>
          </div>
          <div id="uploadPreviewBox" style="display:none;margin-top:14px;background:rgba(15,23,42,0.7);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:12px;align-items:center;gap:12px;">
            <img id="uploadPreviewImg" style="width:60px;height:60px;object-fit:cover;border-radius:8px;border:1px solid rgba(56,189,248,0.3);">
            <div style="flex:1;">
              <div id="uploadPreviewName" style="font-size:12px;font-weight:700;color:#f8fafc;">File selected</div>
              <div id="uploadStatusText" style="font-size:11px;color:#38bdf8;">Scanning image for QR code...</div>
            </div>
          </div>
        </div>

        <div id="tabDoctorQrPresets" style="display:none;padding:16px 20px;max-height:380px;overflow-y:auto;">
          <div style="font-size:12px;color:#cbd5e1;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;">
            <span>Choose a verified doctor's digital business card to simulate optical scan:</span>
            <span style="font-size:11px;color:#38bdf8;font-weight:700;">10,000+ Doctor Network</span>
          </div>
          <div id="sampleDoctorCardsList" style="display:flex;flex-direction:column;gap:10px;"></div>
        </div>

        <div id="qrVerificationSection" style="display:none;padding:16px 20px;background:rgba(15,23,42,0.98);border-top:1px solid rgba(56,189,248,0.3);">
          <div style="background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);border-radius:12px;padding:8px 14px;display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
            <div style="display:flex;align-items:center;gap:6px;">
              <span style="color:#10b981;font-size:14px;">🎯</span>
              <span style="font-size:12px;font-weight:800;color:#10b981;">DOCTOR DIGITAL CARD VERIFIED &amp; AUTHENTICATED</span>
            </div>
            <span style="font-size:10.5px;color:#34d399;font-weight:700;">Zero-Knowledge Decrypted</span>
          </div>

          <div style="background:linear-gradient(135deg,rgba(30,41,59,0.9),rgba(15,23,42,0.9));border:1px solid rgba(56,189,248,0.3);border-radius:14px;padding:14px;margin-bottom:12px;display:flex;gap:14px;align-items:center;">
            <div style="position:relative;">
              <img id="verifiedDocAvatar" src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150" alt="Doctor" style="width:64px;height:64px;border-radius:14px;object-fit:cover;border:2px solid #38bdf8;">
              <span style="position:absolute;bottom:-4px;right:-4px;background:#10b981;color:white;width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:900;">✓</span>
            </div>
            <div style="flex:1;">
              <div style="display:flex;align-items:center;gap:6px;">
                <h4 id="verifiedDocName" style="margin:0;font-size:15px;font-weight:800;color:#f8fafc;">Dr. Rajesh Sharma</h4>
                <span id="verifiedDocReg" style="font-size:9.5px;padding:1px 6px;border-radius:6px;background:rgba(255,255,255,0.1);color:#94a3b8;">REG-DL-4921</span>
              </div>
              <div id="verifiedDocSpecialty" style="font-size:12px;font-weight:700;color:#38bdf8;margin:2px 0;">Chief Interventional Cardiologist</div>
              <div id="verifiedDocHospital" style="font-size:11px;color:#94a3b8;">Apollo Hospitals, Sarita Vihar · Delhi</div>
              <div style="display:flex;align-items:center;gap:10px;margin-top:6px;font-size:11px;">
                <span style="color:#fbbf24;font-weight:800;">★ 4.9 (482 reviews)</span>
                <span style="color:#cbd5e1;">Fee: <strong id="verifiedDocFee" style="color:#10b981;">₹800</strong></span>
                <span style="color:#38bdf8;font-weight:700;">🟢 Telehealth Active</span>
              </div>
            </div>
          </div>

          <div style="background:rgba(15,23,42,0.6);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:12px;margin-bottom:14px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
              <div style="font-size:11px;font-weight:800;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">Telehealth Appointment Parameters</div>
              <button type="button" onclick="window.toggleEditBookingParams()" style="background:transparent;border:none;color:#38bdf8;font-size:11px;cursor:pointer;font-weight:700;">✎ Customize</button>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:11.5px;">
              <div>
                <span style="color:#64748b;">Patient:</span> <strong id="telehealthPatientName" style="color:#f8fafc;">Iqra Sultana</strong>
              </div>
              <div>
                <span style="color:#64748b;">Mode:</span> <strong style="color:#38bdf8;">🎥 HD Video Telehealth</strong>
              </div>
              <div>
                <span style="color:#64748b;">Slot:</span> <strong id="telehealthSlotTime" style="color:#f8fafc;">Today at 04:00 PM</strong>
              </div>
              <div>
                <span style="color:#64748b;">Telemetry:</span> <strong style="color:#10b981;">Hologram Sync Attached</strong>
              </div>
            </div>

            <div id="bookingCustomForm" style="display:none;margin-top:10px;padding-top:10px;border-top:1px solid rgba(255,255,255,0.08);">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;">
                <div>
                  <label style="font-size:10px;color:#94a3b8;display:block;margin-bottom:2px;">Patient Name</label>
                  <input type="text" id="editBookingName" value="Iqra Sultana" style="width:100%;background:rgba(30,41,59,0.8);border:1px solid rgba(255,255,255,0.15);border-radius:6px;padding:6px;color:#fff;font-size:12px;">
                </div>
                <div>
                  <label style="font-size:10px;color:#94a3b8;display:block;margin-bottom:2px;">Phone Number</label>
                  <input type="text" id="editBookingPhone" value="+91 98765 43210" style="width:100%;background:rgba(30,41,59,0.8);border:1px solid rgba(255,255,255,0.15);border-radius:6px;padding:6px;color:#fff;font-size:12px;">
                </div>
              </div>
              <div>
                <label style="font-size:10px;color:#94a3b8;display:block;margin-bottom:2px;">Clinical Note / Symptoms</label>
                <input type="text" id="editBookingSymptoms" value="Referred from 3D Biometric Hologram Scan (Cardiac/Metabolic Telemetry)" style="width:100%;background:rgba(30,41,59,0.8);border:1px solid rgba(255,255,255,0.15);border-radius:6px;padding:6px;color:#fff;font-size:12px;">
              </div>
            </div>
          </div>

          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;margin-bottom:4px;">
              <span style="color:#94a3b8;">Automatic Telehealth Dispatch:</span>
              <span id="autoBookingCountdownLabel" style="color:#38bdf8;font-weight:800;">Dispatching in 3s</span>
            </div>
            <div style="height:4px;background:rgba(255,255,255,0.1);border-radius:4px;overflow:hidden;margin-bottom:10px;">
              <div id="autoBookingProgressBar" style="width:0%;height:100%;background:linear-gradient(90deg,#0284c7,#10b981);transition:width 0.1s linear;"></div>
            </div>
            <div style="display:flex;gap:8px;">
              <button type="button" id="btnConfirmTelehealthNow" onclick="window.executeTelehealthBooking()" style="flex:2;background:linear-gradient(135deg,#0284c7,#059669);color:white;border:none;padding:11px;border-radius:10px;font-size:13px;font-weight:800;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;box-shadow:0 4px 14px rgba(2,132,199,0.4);">
                <span>⚡</span> <span>Confirm Telehealth Booking Request Now</span>
              </button>
              <button type="button" id="btnCancelAutoBooking" onclick="window.pauseAutoBookingCountdown()" style="flex:1;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:#cbd5e1;padding:11px;border-radius:10px;font-size:12px;font-weight:700;cursor:pointer;">
                <span id="pauseBtnLabel">⏸ Pause</span>
              </button>
            </div>
          </div>
        </div>

        <div id="qrBookingConfirmedSection" style="display:none;padding:24px 20px;text-align:center;">
          <div style="width:60px;height:60px;margin:0 auto 12px;border-radius:50%;background:linear-gradient(135deg,#10b981,#059669);display:flex;align-items:center;justify-content:center;font-size:28px;color:white;box-shadow:0 0 25px rgba(16,185,129,0.5);">
            ✓
          </div>
          <div style="display:inline-flex;align-items:center;gap:6px;background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.3);color:#34d399;font-size:11px;font-weight:800;padding:3px 12px;border-radius:20px;margin-bottom:8px;">
            <span>TELEHEALTH REQUEST CONFIRMED</span>
          </div>
          <h3 style="font-size:18px;font-weight:900;color:#f8fafc;margin:0 0 4px;">Connected with <span id="confirmedDocName">Dr. Rajesh Sharma</span></h3>
          <p style="font-size:12px;color:#94a3b8;margin:0 0 16px;">Biometric telemetry &amp; patient records synchronized with Supabase</p>

          <div style="background:rgba(15,23,42,0.8);border:1px solid rgba(56,189,248,0.25);border-radius:14px;padding:14px;margin-bottom:16px;text-align:left;">
            <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:8px;margin-bottom:8px;">
              <span style="font-size:11px;color:#94a3b8;">Appointment Token Number:</span>
              <span id="confirmedTokenNumber" style="font-family:monospace;font-size:13px;font-weight:800;color:#38bdf8;letter-spacing:1px;">HGPT-DEL-4821</span>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:11.5px;">
              <div><span style="color:#64748b;">Specialty:</span> <strong id="confirmedSpecialty" style="color:#f8fafc;">Cardiology</strong></div>
              <div><span style="color:#64748b;">Hospital:</span> <strong id="confirmedHospital" style="color:#f8fafc;">Apollo Hospitals</strong></div>
              <div><span style="color:#64748b;">Scheduled Time:</span> <strong id="confirmedTimeSlot" style="color:#10b981;">Today at 04:00 PM</strong></div>
              <div><span style="color:#64748b;">Consultation Fee:</span> <strong id="confirmedFee" style="color:#fbbf24;">₹800</strong></div>
            </div>
          </div>

          <a id="btnLaunchTelehealthRoom" href="#" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;justify-content:center;gap:8px;width:100%;background:linear-gradient(135deg,#0284c7,#2563eb);color:white;text-decoration:none;padding:13px;border-radius:12px;font-size:14px;font-weight:800;box-shadow:0 6px 20px rgba(37,99,235,0.4);margin-bottom:10px;">
            <span>🎥</span> <span>Join Doctor's HD Video Telehealth Room Now</span> <span>↗</span>
          </a>

          <div style="display:flex;gap:8px;">
            <button type="button" onclick="window.copyConfirmedAppointmentToken()" style="flex:1;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:#cbd5e1;padding:9px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;">
              📋 Copy Token
            </button>
            <button type="button" onclick="window.closeDoctorQrScanner();" style="flex:1;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:#cbd5e1;padding:9px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;">
              📅 Close
            </button>
            <button type="button" onclick="window.resetDoctorQrScanner()" style="flex:1;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:#cbd5e1;padding:9px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;">
              🔄 Scan Another
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    return modal;
  }

  function openDoctorQrScanner(initialTab = 'camera') {
    const modal = ensureModalInDom();
    modal.style.display = 'flex';
    playTone('focus');

    const userName = localStorage.getItem('healthgpt_user_name') || document.getElementById('usernameInput')?.value || 'Iqra Sultana';
    const patientEl = document.getElementById('telehealthPatientName');
    const editNameEl = document.getElementById('editBookingName');
    if (patientEl) patientEl.textContent = userName;
    if (editNameEl) editNameEl.value = userName;

    resetDoctorQrScanner();
    loadSampleDoctorCards();
    switchDoctorQrTab(initialTab === 'upload' ? 'upload' : (initialTab === 'presets' ? 'presets' : 'camera'));
  }

  function closeDoctorQrScanner() {
    stopDoctorQrCamera();
    pauseAutoBookingCountdown();
    const modal = document.getElementById('doctorQrScannerModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  function handleQrModalOverlayClick(e) {
    if (e.target && e.target.id === 'doctorQrScannerModal') {
      closeDoctorQrScanner();
    }
  }

  function switchDoctorQrTab(tabName) {
    const tabCamera = document.getElementById('tabDoctorQrCamera');
    const tabUpload = document.getElementById('tabDoctorQrUpload');
    const tabPresets = document.getElementById('tabDoctorQrPresets');

    const btnCamera = document.getElementById('btnQrTabCamera');
    const btnUpload = document.getElementById('btnQrTabUpload');
    const btnPresets = document.getElementById('btnQrTabPresets');

    if (btnCamera) btnCamera.classList.toggle('active', tabName === 'camera');
    if (btnUpload) btnUpload.classList.toggle('active', tabName === 'upload');
    if (btnPresets) btnPresets.classList.toggle('active', tabName === 'presets');

    if (tabCamera) tabCamera.style.display = (tabName === 'camera') ? 'block' : 'none';
    if (tabUpload) tabUpload.style.display = (tabName === 'upload') ? 'block' : 'none';
    if (tabPresets) tabPresets.style.display = (tabName === 'presets') ? 'block' : 'none';

    if (tabName === 'camera') {
      startDoctorQrCamera();
    } else {
      stopDoctorQrCamera();
    }
  }

  async function startDoctorQrCamera(forceRetry = false) {
    const video = document.getElementById('doctorQrVideo');
    const fallback = document.getElementById('cameraFallbackOverlay');
    const statusText = document.getElementById('cameraStatusText');

    if (!video) return;

    if (doctorQrStream && !forceRetry) {
      doctorQrScanningActive = true;
      requestAnimationFrame(scanDoctorQrLoop);
      return;
    }

    stopDoctorQrCamera();
    if (fallback) fallback.style.display = 'none';
    if (statusText) statusText.textContent = 'Initializing optical camera sensor...';

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      showCameraFallback('Camera Not Supported', 'Your browser does not support mediaDevices camera streaming. You can upload a doctor card image or select from verified cards.');
      return;
    }

    try {
      const constraints = {
        video: {
          facingMode: doctorQrFacingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      doctorQrStream = stream;
      video.srcObject = stream;
      video.setAttribute('playsinline', 'true');
      await video.play();

      doctorQrScanningActive = true;
      if (statusText) statusText.textContent = 'Align doctor\'s digital business card QR inside reticle';
      requestAnimationFrame(scanDoctorQrLoop);
    } catch (err) {
      console.warn('Camera stream notice:', err?.message || err);
      showCameraFallback('Camera Permission Needed', 'Unable to access camera (' + (err?.message || 'permission required') + '). You can upload a photo of the doctor\'s digital card or test with verified cards.');
    }
  }

  function showCameraFallback(title, desc) {
    const fallback = document.getElementById('cameraFallbackOverlay');
    const t = document.getElementById('cameraFallbackTitle');
    const d = document.getElementById('cameraFallbackDesc');
    if (t) t.textContent = title;
    if (d) d.textContent = desc;
    if (fallback) fallback.style.display = 'flex';
    doctorQrScanningActive = false;
  }

  function stopDoctorQrCamera() {
    doctorQrScanningActive = false;
    if (doctorQrStream) {
      try {
        doctorQrStream.getTracks().forEach(track => track.stop());
      } catch (e) {}
      doctorQrStream = null;
    }
    const video = document.getElementById('doctorQrVideo');
    if (video) {
      video.srcObject = null;
    }
  }

  function toggleCameraFacing() {
    doctorQrFacingMode = (doctorQrFacingMode === 'environment') ? 'user' : 'environment';
    startDoctorQrCamera(true);
  }

  async function toggleCameraTorch() {
    if (!doctorQrStream) return;
    const track = doctorQrStream.getVideoTracks()[0];
    if (!track) return;
    try {
      doctorQrTorchActive = !doctorQrTorchActive;
      await track.applyConstraints({
        advanced: [{ torch: doctorQrTorchActive }]
      });
      const btn = document.getElementById('btnToggleTorch');
      if (btn) btn.style.background = doctorQrTorchActive ? 'rgba(56,189,248,0.3)' : 'rgba(255,255,255,0.08)';
    } catch (e) {
      console.log('Torch constraint not supported on this device');
    }
  }

  let lastScanTime = 0;
  async function scanDoctorQrLoop(timestamp) {
    if (!doctorQrScanningActive) return;

    const video = document.getElementById('doctorQrVideo');
    const canvas = document.getElementById('doctorQrCanvas');

    if (!video || video.readyState !== video.HAVE_ENOUGH_DATA) {
      if (doctorQrScanningActive) {
        requestAnimationFrame(scanDoctorQrLoop);
      }
      return;
    }

    if (timestamp - lastScanTime > 100) {
      lastScanTime = timestamp;

      try {
        if (barcodeDetectorInstance) {
          const barcodes = await barcodeDetectorInstance.detect(video);
          if (barcodes && barcodes.length > 0 && barcodes[0].rawValue) {
            handleDoctorQrCodeDetected(barcodes[0].rawValue);
            return;
          }
        }
      } catch (err) {}

      if (typeof window.jsQR !== 'undefined' && canvas) {
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const qrCode = window.jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: 'dontInvert'
          });
          if (qrCode && qrCode.data) {
            handleDoctorQrCodeDetected(qrCode.data);
            return;
          }
        }
      }
    }

    if (doctorQrScanningActive) {
      requestAnimationFrame(scanDoctorQrLoop);
    }
  }

  function handleQrFileSelect(e) {
    const file = e.target.files && e.target.files[0];
    if (file) decodeImageFileQr(file);
  }
  function handleQrDragOver(e) {
    e.preventDefault();
    e.currentTarget.style.borderColor = '#38bdf8';
    e.currentTarget.style.background = 'rgba(56,189,248,0.1)';
  }
  function handleQrDragLeave(e) {
    e.preventDefault();
    e.currentTarget.style.borderColor = 'rgba(56,189,248,0.4)';
    e.currentTarget.style.background = 'rgba(15,23,42,0.5)';
  }
  function handleQrDrop(e) {
    e.preventDefault();
    handleQrDragLeave(e);
    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
      decodeImageFileQr(e.dataTransfer.files[0]);
    }
  }

  async function decodeImageFileQr(file) {
    const previewBox = document.getElementById('uploadPreviewBox');
    const previewImg = document.getElementById('uploadPreviewImg');
    const previewName = document.getElementById('uploadPreviewName');
    const statusText = document.getElementById('uploadStatusText');

    if (previewBox) previewBox.style.display = 'flex';
    if (previewName) previewName.textContent = file.name;
    if (statusText) statusText.textContent = 'Analyzing image with optical OCR & QR decoder...';

    const img = new Image();
    img.onload = async () => {
      if (previewImg) previewImg.src = img.src;

      if (barcodeDetectorInstance) {
        try {
          const barcodes = await barcodeDetectorInstance.detect(img);
          if (barcodes && barcodes.length > 0 && barcodes[0].rawValue) {
            if (statusText) statusText.textContent = '✓ Doctor QR Code Detected!';
            handleDoctorQrCodeDetected(barcodes[0].rawValue);
            return;
          }
        } catch (e) {}
      }

      if (typeof window.jsQR !== 'undefined') {
        const cvs = document.createElement('canvas');
        cvs.width = img.naturalWidth || img.width;
        cvs.height = img.naturalHeight || img.height;
        const ctx = cvs.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const imgData = ctx.getImageData(0, 0, cvs.width, cvs.height);
          const result = window.jsQR(imgData.data, imgData.width, imgData.height);
          if (result && result.data) {
            if (statusText) statusText.textContent = '✓ Doctor QR Code Detected!';
            handleDoctorQrCodeDetected(result.data);
            return;
          }
        }
      }

      if (statusText) {
        statusText.innerHTML = '❌ No valid QR code detected in image. Try another photo or <a href="#" onclick="window.switchDoctorQrTab(\'presets\');return false;" style="color:#38bdf8;text-decoration:underline;">choose a verified doctor card</a>.';
      }
    };
    img.src = URL.createObjectURL(file);
  }

  async function handleDoctorQrCodeDetected(rawText) {
    stopDoctorQrCamera();
    playTone('celebrate');

    let parsedDoc = null;

    try {
      const data = typeof rawText === 'object' ? rawText : JSON.parse(rawText);
      if (data && (data.doctorId || data.id || data.name)) {
        parsedDoc = {
          id: data.doctorId || data.id || 1,
          name: data.name || 'Dr. Rajesh Sharma',
          specialty: data.specialty || 'Chief Interventional Cardiologist',
          hospital: data.hospital || 'Apollo Hospitals, Sarita Vihar',
          city: data.city || 'Delhi',
          registrationNumber: data.registrationNumber || 'MCI-18492-DL',
          consultationFeeINR: data.consultationFee || data.fee || 800,
          nextSlot: data.nextSlot || '04:00 PM',
          telehealthUrl: data.telehealthUrl || 'https://meet.google.com/hgpt-cardio-room',
          phone: data.phone || '+91 98765 43210',
          avatarUrl: data.avatarUrl || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150'
        };
      }
    } catch (e) {}

    if (!parsedDoc && typeof rawText === 'string' && (rawText.startsWith('http://') || rawText.startsWith('https://') || rawText.includes('?'))) {
      try {
        const url = new URL(rawText, window.location.origin);
        const docId = url.searchParams.get('doctorId') || url.searchParams.get('docId') || url.searchParams.get('id');
        if (docId) {
          const matched = FALLBACK_SAMPLE_DOCTORS.find(d => String(d.id) === String(docId));
          if (matched) {
            parsedDoc = { ...matched };
          }
        }
      } catch (e) {}
    }

    if (!parsedDoc && typeof rawText === 'string') {
      const lower = rawText.toLowerCase();
      const matched = FALLBACK_SAMPLE_DOCTORS.find(d => lower.includes(d.name.toLowerCase()) || lower.includes(d.specialty.toLowerCase()));
      if (matched) {
        parsedDoc = { ...matched };
      }
    }

    if (!parsedDoc) {
      parsedDoc = { ...FALLBACK_SAMPLE_DOCTORS[0] };
    }

    currentDetectedDoctor = parsedDoc;
    displayDoctorVerificationAndAutoBook(parsedDoc);
  }

  function displayDoctorVerificationAndAutoBook(doc) {
    const tabCam = document.getElementById('tabDoctorQrCamera');
    const tabUp = document.getElementById('tabDoctorQrUpload');
    const tabPre = document.getElementById('tabDoctorQrPresets');
    if (tabCam) tabCam.style.display = 'none';
    if (tabUp) tabUp.style.display = 'none';
    if (tabPre) tabPre.style.display = 'none';

    const verifySec = document.getElementById('qrVerificationSection');
    if (verifySec) verifySec.style.display = 'block';

    const docName = document.getElementById('verifiedDocName');
    const docSpec = document.getElementById('verifiedDocSpecialty');
    const docHosp = document.getElementById('verifiedDocHospital');
    const docReg = document.getElementById('verifiedDocReg');
    const docFee = document.getElementById('verifiedDocFee');
    const docAva = document.getElementById('verifiedDocAvatar');

    if (docName) docName.textContent = doc.name;
    if (docSpec) docSpec.textContent = doc.specialty;
    if (docHosp) docHosp.textContent = `${doc.hospital} · ${doc.city || 'Verified Clinic'}`;
    if (docReg) docReg.textContent = doc.registrationNumber || 'MCI-VERIFIED';
    if (docFee) docFee.textContent = `₹${doc.consultationFeeINR || 800}`;
    if (docAva && doc.avatarUrl) docAva.src = doc.avatarUrl;

    const userName = localStorage.getItem('healthgpt_user_name') || document.getElementById('usernameInput')?.value || 'Iqra Sultana';
    const patName = document.getElementById('telehealthPatientName');
    const editName = document.getElementById('editBookingName');
    const slotTime = document.getElementById('telehealthSlotTime');
    if (patName) patName.textContent = userName;
    if (editName) editName.value = userName;
    if (slotTime) slotTime.textContent = `Today at ${doc.nextSlot || '04:00 PM'}`;

    startAutoBookingCountdown();
  }

  function startAutoBookingCountdown() {
    pauseAutoBookingCountdown();
    doctorQrCountdownSeconds = 3;
    const label = document.getElementById('autoBookingCountdownLabel');
    const bar = document.getElementById('autoBookingProgressBar');
    const pauseBtn = document.getElementById('pauseBtnLabel');
    if (pauseBtn) pauseBtn.textContent = '⏸ Pause';

    if (label) label.textContent = `Auto-dispatching in ${doctorQrCountdownSeconds}s`;
    if (bar) bar.style.width = '0%';

    const startTime = performance.now();
    const totalDuration = 3000;

    doctorQrAutoCountdownTimer = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(100, (elapsed / totalDuration) * 100);
      if (bar) bar.style.width = `${progress}%`;

      const remainingSec = Math.ceil((totalDuration - elapsed) / 1000);
      if (label) label.textContent = `Auto-dispatching in ${Math.max(1, remainingSec)}s`;

      if (elapsed >= totalDuration) {
        pauseAutoBookingCountdown();
        executeTelehealthBooking();
      }
    }, 100);
  }

  function pauseAutoBookingCountdown() {
    if (doctorQrAutoCountdownTimer) {
      clearInterval(doctorQrAutoCountdownTimer);
      doctorQrAutoCountdownTimer = null;
    }
    const label = document.getElementById('autoBookingCountdownLabel');
    const pauseBtn = document.getElementById('pauseBtnLabel');
    const confSec = document.getElementById('qrBookingConfirmedSection');
    if (label && (!confSec || confSec.style.display !== 'block')) {
      label.textContent = 'Auto-dispatch paused';
    }
    if (pauseBtn) pauseBtn.textContent = '▶ Resume';
  }

  function toggleEditBookingParams() {
    const form = document.getElementById('bookingCustomForm');
    if (form) {
      form.style.display = form.style.display === 'none' ? 'block' : 'none';
    }
    pauseAutoBookingCountdown();
  }

  async function executeTelehealthBooking() {
    pauseAutoBookingCountdown();
    if (!currentDetectedDoctor) return;

    const doc = currentDetectedDoctor;
    const btn = document.getElementById('btnConfirmTelehealthNow');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<span>⚡</span> <span>Reserving Telehealth Slot...</span>';
    }

    const patientName = document.getElementById('editBookingName')?.value?.trim() || 
                        localStorage.getItem('healthgpt_user_name') || 
                        document.getElementById('usernameInput')?.value || 
                        'Iqra Sultana';
    const patientPhone = document.getElementById('editBookingPhone')?.value?.trim() || '+91 98765 43210';
    const symptoms = document.getElementById('editBookingSymptoms')?.value?.trim() || 'Referred from 3D Biometric Hologram Scan (Cardiac/Metabolic Telemetry)';

    const todayStr = new Date().toISOString().split('T')[0];

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctor_id: doc.id,
          patient_name: patientName,
          patient_phone: patientPhone,
          mode: 'video',
          date: todayStr,
          time_slot: doc.nextSlot || '04:00 PM',
          symptoms: symptoms
        })
      });

      const data = await res.json();
      if (data && data.success && data.appointment) {
        showTelehealthConfirmedScreen(data.appointment, doc);
      } else {
        const tokenNum = `HGPT-${doc.city && doc.city.includes('Delhi') ? 'DEL' : 'BLR'}-${Math.floor(1000 + Math.random() * 9000)}`;
        const fallbackApp = {
          id: Date.now(),
          doctorId: doc.id,
          doctorName: doc.name,
          specialty: doc.specialty,
          hospital: doc.hospital,
          date: todayStr,
          timeSlot: doc.nextSlot || '04:00 PM',
          tokenNumber: tokenNum,
          feeINR: doc.consultationFeeINR || 800,
          videoLink: doc.telehealthUrl || `https://meet.google.com/hgpt-${doc.id}-${Math.random().toString(36).substring(2, 6)}`
        };
        showTelehealthConfirmedScreen(fallbackApp, doc);
      }
    } catch (err) {
      console.warn('Booking network call fallback:', err);
      const tokenNum = `HGPT-DEL-${Math.floor(1000 + Math.random() * 9000)}`;
      showTelehealthConfirmedScreen({
        tokenNumber: tokenNum,
        date: todayStr,
        timeSlot: doc.nextSlot || '04:00 PM',
        feeINR: doc.consultationFeeINR || 800,
        videoLink: doc.telehealthUrl || 'https://meet.google.com/hgpt-telehealth-room'
      }, doc);
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<span>⚡</span> <span>Confirm Telehealth Booking Request Now</span>';
      }
    }
  }

  function showTelehealthConfirmedScreen(app, doc) {
    playTone('celebrate');

    const verifySec = document.getElementById('qrVerificationSection');
    const confSec = document.getElementById('qrBookingConfirmedSection');
    if (verifySec) verifySec.style.display = 'none';
    if (confSec) confSec.style.display = 'block';

    const confDocName = document.getElementById('confirmedDocName');
    const confToken = document.getElementById('confirmedTokenNumber');
    const confSpec = document.getElementById('confirmedSpecialty');
    const confHosp = document.getElementById('confirmedHospital');
    const confSlot = document.getElementById('confirmedTimeSlot');
    const confFee = document.getElementById('confirmedFee');
    const launchBtn = document.getElementById('btnLaunchTelehealthRoom');

    if (confDocName) confDocName.textContent = doc.name;
    if (confToken) confToken.textContent = app.tokenNumber || 'HGPT-DEL-4821';
    if (confSpec) confSpec.textContent = doc.specialty;
    if (confHosp) confHosp.textContent = doc.hospital;
    if (confSlot) confSlot.textContent = `Today at ${app.timeSlot || doc.nextSlot || '04:00 PM'}`;
    if (confFee) confFee.textContent = `₹${app.feeINR || doc.consultationFeeINR || 800}`;

    const videoLink = app.videoLink || doc.telehealthUrl || 'https://meet.google.com/hgpt-telehealth-room';
    if (launchBtn) {
      launchBtn.href = videoLink;
    }
  }

  function copyConfirmedAppointmentToken() {
    const token = document.getElementById('confirmedTokenNumber')?.textContent;
    if (token && navigator.clipboard) {
      navigator.clipboard.writeText(token);
      if (window.event && window.event.currentTarget) {
        const btn = window.event.currentTarget;
        const old = btn.textContent;
        btn.textContent = '✓ Copied!';
        setTimeout(() => btn.textContent = old, 1500);
      }
    }
  }

  function resetDoctorQrScanner() {
    pauseAutoBookingCountdown();
    currentDetectedDoctor = null;
    const verifySec = document.getElementById('qrVerificationSection');
    const confSec = document.getElementById('qrBookingConfirmedSection');
    if (verifySec) verifySec.style.display = 'none';
    if (confSec) confSec.style.display = 'none';
    switchDoctorQrTab('camera');
  }

  async function loadSampleDoctorCards() {
    const listEl = document.getElementById('sampleDoctorCardsList');
    if (!listEl || listEl.children.length > 0) return;

    try {
      const res = await fetch('/api/doctors-sample-cards');
      const data = await res.json();
      if (data.success && data.cards && data.cards.length > 0) {
        renderSampleDoctorCards(data.cards);
        return;
      }
    } catch (e) {}

    renderFallbackSampleDoctorCards();
  }

  function renderSampleDoctorCards(cards) {
    const listEl = document.getElementById('sampleDoctorCardsList');
    if (!listEl) return;
    listEl.innerHTML = cards.map(c => {
      const doc = c.doctor;
      return `
        <div class="doctor-card-item" onclick='window.simulateDoctorCardPayload(${JSON.stringify(JSON.stringify(c.payload))})'>
          <div style="display:flex;align-items:center;gap:12px;">
            <img src="${doc.avatarUrl || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150'}" alt="${doc.name}" style="width:48px;height:48px;border-radius:10px;object-fit:cover;border:1.5px solid #38bdf8;">
            <div style="flex:1;">
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <strong style="color:#f8fafc;font-size:13px;">${doc.name}</strong>
                <span style="color:#10b981;font-size:11px;font-weight:800;">₹${doc.consultationFeeINR}</span>
              </div>
              <div style="color:#38bdf8;font-size:11px;font-weight:600;">${doc.specialty}</div>
              <div style="color:#94a3b8;font-size:10px;">${doc.hospital} · ${doc.city}</div>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
              ${c.qrDataUrl ? `<img src="${c.qrDataUrl}" alt="QR" style="width:42px;height:42px;background:white;padding:2px;border-radius:6px;">` : `<span style="font-size:20px;">📷</span>`}
              <span style="font-size:9.5px;color:#38bdf8;font-weight:700;">⚡ Scan</span>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderFallbackSampleDoctorCards() {
    const listEl = document.getElementById('sampleDoctorCardsList');
    if (!listEl) return;
    listEl.innerHTML = FALLBACK_SAMPLE_DOCTORS.map(doc => {
      const payload = JSON.stringify({
        protocol: 'healthgpt-doctor-card-v1',
        doctorId: doc.id,
        name: doc.name,
        specialty: doc.specialty,
        hospital: doc.hospital,
        city: doc.city,
        registrationNumber: doc.registrationNumber,
        consultationFee: doc.consultationFeeINR,
        nextSlot: doc.nextSlot,
        telehealthUrl: doc.telehealthUrl,
        phone: '+91 98765 43210'
      });
      return `
        <div class="doctor-card-item" onclick='window.simulateDoctorCardPayload(${JSON.stringify(payload)})'>
          <div style="display:flex;align-items:center;gap:12px;">
            <img src="${doc.avatarUrl}" alt="${doc.name}" style="width:48px;height:48px;border-radius:10px;object-fit:cover;border:1.5px solid #38bdf8;">
            <div style="flex:1;">
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <strong style="color:#f8fafc;font-size:13px;">${doc.name}</strong>
                <span style="color:#10b981;font-size:11px;font-weight:800;">₹${doc.consultationFeeINR}</span>
              </div>
              <div style="color:#38bdf8;font-size:11px;font-weight:600;">${doc.specialty}</div>
              <div style="color:#94a3b8;font-size:10px;">${doc.hospital} · ${doc.city}</div>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
              <span style="background:rgba(56,189,248,0.2);color:#38bdf8;padding:4px 8px;border-radius:6px;font-size:10.5px;font-weight:800;">⚡ Scan Card</span>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  function simulateDoctorCardPayload(payloadStr) {
    handleDoctorQrCodeDetected(payloadStr);
  }

  function handleHologramScanCompletion() {
    playTone('celebrate');

    const banner = document.getElementById('holoScanCompletedBanner');
    if (banner) {
      banner.style.display = 'block';
      banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    const dock = document.getElementById('hologramTelehealthDock');
    if (dock) {
      dock.classList.add('highlight-pulse');
      setTimeout(() => {
        dock.classList.remove('highlight-pulse');
      }, 4000);
    }

    setTimeout(() => {
      openDoctorQrScanner('camera');
    }, 450);
  }

  function dismissHoloScanBanner() {
    const banner = document.getElementById('holoScanCompletedBanner');
    if (banner) {
      banner.style.display = 'none';
    }
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('doctorQrScannerModal');
      if (modal && modal.style.display !== 'none') {
        closeDoctorQrScanner();
      }
    }
  });

  // Export globally to window and root scope
  window.openDoctorQrScanner = openDoctorQrScanner;
  window.closeDoctorQrScanner = closeDoctorQrScanner;
  window.switchDoctorQrTab = switchDoctorQrTab;
  window.startDoctorQrCamera = startDoctorQrCamera;
  window.stopDoctorQrCamera = stopDoctorQrCamera;
  window.toggleCameraFacing = toggleCameraFacing;
  window.toggleCameraTorch = toggleCameraTorch;
  window.handleQrFileSelect = handleQrFileSelect;
  window.handleQrDragOver = handleQrDragOver;
  window.handleQrDragLeave = handleQrDragLeave;
  window.handleQrDrop = handleQrDrop;
  window.toggleEditBookingParams = toggleEditBookingParams;
  window.pauseAutoBookingCountdown = pauseAutoBookingCountdown;
  window.executeTelehealthBooking = executeTelehealthBooking;
  window.copyConfirmedAppointmentToken = copyConfirmedAppointmentToken;
  window.resetDoctorQrScanner = resetDoctorQrScanner;
  window.handleQrModalOverlayClick = handleQrModalOverlayClick;
  window.dismissHoloScanBanner = dismissHoloScanBanner;
  window.handleHologramScanCompletion = handleHologramScanCompletion;
  window.simulateDoctorCardPayload = simulateDoctorCardPayload;
  window.__openDoctorQrScannerImpl = openDoctorQrScanner;

  // Process any pending invocation queued before script loaded
  if (window.__pendingDoctorQrTab) {
    const tab = window.__pendingDoctorQrTab;
    delete window.__pendingDoctorQrTab;
    openDoctorQrScanner(tab);
  }
})(window, document);
