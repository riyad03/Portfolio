import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
// Using hardcoded values because Vercel isn't passing env vars to Vite build
const firebaseConfig = {
    apiKey: "AIzaSyDUrIhH-oVQMynnzFfFgxZFMs4OT67RY4E",
    authDomain: "portfolio-81677.firebaseapp.com",
    projectId: "portfolio-81677",
    storageBucket: "portfolio-81677.firebasestorage.app",
    messagingSenderId: "278183631348",
    appId: "1:278183631348:web:1a73a4ec8ea80e66fe01a1"
};

console.log('🔍 Firebase Config:', firebaseConfig.projectId);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore (for data storage only)
export const db = getFirestore(app);

export default app;
