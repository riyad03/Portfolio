import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Log environment variables to debug (will be removed after verification)
console.log('🔍 Firebase Config Check:');
console.log('API Key:', import.meta.env.VITE_FIREBASE_API_KEY ? '✅ Loaded' : '❌ Missing');
console.log('Project ID:', import.meta.env.VITE_FIREBASE_PROJECT_ID || '❌ MISSING');

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Validate config before initializing
if (!firebaseConfig.projectId || firebaseConfig.projectId === 'undefined') {
    console.error('❌ Firebase environment variables not loaded! Check Vercel env vars.');
    console.error('Expected VITE_FIREBASE_PROJECT_ID but got:', firebaseConfig.projectId);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore (for data storage only)
export const db = getFirestore(app);

export default app;
