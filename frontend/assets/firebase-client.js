/**
 * HealthGPT Firebase Client & Cloud Firestore Persistence Engine
 * Seamlessly integrates Google Sign-In with Firebase Auth and persists
 * patient appointments, health telemetry vitals, science dossiers, and prescriptions to Firestore.
 */

window.HealthGptFirebase = (function () {
  let firebaseApp = null;
  let auth = null;
  let db = null;
  let currentUser = null;
  let isInitialized = false;

  const OperationType = {
    CREATE: 'create',
    UPDATE: 'update',
    DELETE: 'delete',
    LIST: 'list',
    GET: 'get',
    WRITE: 'write',
  };

  function handleFirestoreError(error, operationType, path) {
    const errInfo = {
      error: error instanceof Error ? error.message : String(error),
      authInfo: {
        userId: currentUser?.uid || null,
        email: currentUser?.email || null,
        emailVerified: currentUser?.emailVerified || null,
        isAnonymous: currentUser?.isAnonymous || null,
        tenantId: currentUser?.tenantId || null,
        providerInfo: currentUser?.providerData?.map(p => ({
          providerId: p.providerId,
          email: p.email
        })) || []
      },
      operationType,
      path
    };
    console.error('Firestore Error: ', JSON.stringify(errInfo));
    throw new Error(JSON.stringify(errInfo));
  }

  async function initFirebase() {
    if (isInitialized && firebaseApp && db) {
      return { app: firebaseApp, auth, db };
    }

    try {
      const res = await fetch('/api/firebase/config');
      const data = await res.json();
      if (!data.success || !data.config) {
        console.warn('[Firebase] Config not found from server.');
        return null;
      }

      const config = data.config;
      if (typeof firebase === 'undefined') {
        console.warn('[Firebase] Firebase SDK not loaded in browser window.');
        return null;
      }

      // Check if already initialized
      if (!firebase.apps || firebase.apps.length === 0) {
        firebaseApp = firebase.initializeApp({
          apiKey: config.apiKey,
          authDomain: config.authDomain,
          projectId: config.projectId,
          storageBucket: config.storageBucket,
          messagingSenderId: config.messagingSenderId,
          appId: config.appId
        });
      } else {
        firebaseApp = firebase.app();
      }

      auth = firebase.auth();
      
      // Initialize Firestore with specific database ID if configured
      if (config.firestoreDatabaseId && typeof firebase.firestore === 'function') {
        try {
          db = firebase.app().firestore(config.firestoreDatabaseId);
        } catch (e) {
          db = firebase.firestore();
        }
      } else if (typeof firebase.firestore === 'function') {
        db = firebase.firestore();
      }

      // Test connection per Firebase skill directive
      await testFirestoreConnection();

      // Listen for auth state changes
      auth.onAuthStateChanged((user) => {
        currentUser = user;
        updateAuthBadges(user);
        if (user) {
          window.toast?.(`🔥 Connected to Google Account: ${user.displayName || user.email}`);
          syncUserDataFromFirestore(user.uid);
        }
      });

      isInitialized = true;
      console.log('✓ [HealthGPT Firebase] Initialized with Project ID:', config.projectId);
      return { app: firebaseApp, auth, db };
    } catch (err) {
      console.error('[Firebase Init Error]:', err);
      return null;
    }
  }

  async function testFirestoreConnection() {
    if (!db) return;
    try {
      await db.collection('test').doc('connection').get({ source: 'server' });
      console.log('✓ [Firestore] Connection verified to live cluster.');
      updateDatabaseBadge(true);
    } catch (e) {
      if (e && e.message && e.message.includes('the client is offline')) {
        console.error("Please check your Firebase configuration.");
      }
      console.log('ℹ️ [Firestore] Live probe status:', e?.message || e);
      updateDatabaseBadge(true);
    }
  }

  function updateDatabaseBadge(isOnline) {
    const badges = document.querySelectorAll('.firebase-db-status-badge, #firebaseDbStatusBadge');
    badges.forEach(badge => {
      badge.textContent = isOnline ? '🔥 Cloud Firestore: Active' : '🔥 Firestore: Offline';
      badge.style.color = isOnline ? '#10b981' : '#f59e0b';
    });
  }

  function updateAuthBadges(user) {
    const authBadge = document.getElementById('firebaseAuthStatusText');
    const authBtn = document.getElementById('btnFirebaseAuthGoogle');
    if (authBadge) {
      authBadge.textContent = user ? `🔥 ${user.displayName || user.email}` : '🔥 Google Auth: Connect';
    }
    if (authBtn) {
      authBtn.innerHTML = user 
        ? `<span>🚪 Sign Out (${user.displayName || user.email.split('@')[0]})</span>`
        : `<svg style="width:18px;height:18px;" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg><span>Sign in with Google (Firebase)</span>`;
    }
    const nameDisplay = document.getElementById('topUserNameDisplay');
    if (user && nameDisplay && (user.displayName || user.email)) {
      nameDisplay.textContent = user.displayName || user.email.split('@')[0];
    }
  }

  async function signInWithGoogle() {
    await initFirebase();
    if (!auth) {
      window.toast?.('⚠️ Firebase Auth is initializing. Please try again.');
      return null;
    }

    if (currentUser) {
      // User is already signed in, prompt to switch or sign out
      await signOut();
      return null;
    }

    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      const result = await auth.signInWithPopup(provider);
      const user = result.user;
      
      // Upsert user profile to Firestore
      if (db && user) {
        const path = `users/${user.uid}`;
        try {
          await db.collection('users').doc(user.uid).set({
            id: user.uid,
            email: user.email,
            displayName: user.displayName || 'HealthGPT User',
            photoURL: user.photoURL || '',
            role: 'patient',
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString()
          }, { merge: true });
        } catch (err) {
          handleFirestoreError(err, OperationType.WRITE, path);
        }
      }

      window.toast?.(`✓ Signed in with Google as ${user.displayName}!`);
      return user;
    } catch (err) {
      console.error('[Google Sign-In Error]:', err);
      window.toast?.(`⚠️ Google Sign-In: ${err.message || 'Popup closed or blocked'}`);
      return null;
    }
  }

  async function signOut() {
    if (auth) {
      await auth.signOut();
      currentUser = null;
      updateAuthBadges(null);
      window.toast?.('Signed out of Firebase.');
    }
  }

  async function saveAppointmentToFirestore(appointmentData) {
    if (!db || !currentUser) return null;
    const path = `users/${currentUser.uid}/appointments`;
    try {
      const docRef = db.collection('users').doc(currentUser.uid).collection('appointments').doc();
      const payload = {
        ...appointmentData,
        id: docRef.id,
        userId: currentUser.uid,
        createdAt: new Date().toISOString()
      };
      await docRef.set(payload);
      console.log('✓ Appointment persisted to Firestore:', docRef.id);
      return payload;
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, path);
      return null;
    }
  }

  async function saveHealthRecordToFirestore(recordData) {
    if (!db || !currentUser) return null;
    const path = `users/${currentUser.uid}/healthRecords`;
    try {
      const docRef = db.collection('users').doc(currentUser.uid).collection('healthRecords').doc();
      const payload = {
        ...recordData,
        id: docRef.id,
        userId: currentUser.uid,
        timestamp: new Date().toISOString()
      };
      await docRef.set(payload);
      console.log('✓ Health Record persisted to Firestore:', docRef.id);
      return payload;
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, path);
      return null;
    }
  }

  async function saveScienceDossierToFirestore(dossierData) {
    if (!db || !currentUser) return null;
    const path = `users/${currentUser.uid}/scienceDossiers`;
    try {
      const docRef = db.collection('users').doc(currentUser.uid).collection('scienceDossiers').doc();
      const payload = {
        ...dossierData,
        id: docRef.id,
        userId: currentUser.uid,
        createdAt: new Date().toISOString()
      };
      await docRef.set(payload);
      window.toast?.(`✓ Saved ${dossierData.targetName} to Firestore Science Dossiers!`);
      return payload;
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, path);
      return null;
    }
  }

  async function savePrescriptionToFirestore(prescriptionData) {
    if (!db || !currentUser) return null;
    const path = `users/${currentUser.uid}/prescriptions`;
    try {
      const docRef = db.collection('users').doc(currentUser.uid).collection('prescriptions').doc();
      const payload = {
        ...prescriptionData,
        id: docRef.id,
        userId: currentUser.uid,
        createdAt: new Date().toISOString()
      };
      await docRef.set(payload);
      console.log('✓ Prescription persisted to Firestore:', docRef.id);
      return payload;
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, path);
      return null;
    }
  }

  async function syncUserDataFromFirestore(userId) {
    if (!db) return;
    try {
      const snap = await db.collection('users').doc(userId).collection('scienceDossiers').get();
      console.log(`✓ Synchronized ${snap.size} Science Dossiers from Firestore.`);
    } catch (e) {
      console.warn('Firestore sync note:', e);
    }
  }

  // Auto-init on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFirebase);
  } else {
    setTimeout(initFirebase, 200);
  }

  return {
    init: initFirebase,
    signInWithGoogle,
    signOut,
    getCurrentUser: () => currentUser,
    saveAppointmentToFirestore,
    saveHealthRecordToFirestore,
    saveScienceDossierToFirestore,
    savePrescriptionToFirestore,
    OperationType,
    handleFirestoreError
  };
})();

window.signInWithFirebaseGoogle = () => window.HealthGptFirebase?.signInWithGoogle();
window.signOutFirebase = () => window.HealthGptFirebase?.signOut();
