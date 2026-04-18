import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { Platform } from 'react-native';

// Your Firebase configuration
// Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD5tvcLU8KBty5RF-pPvk16d6Wcb6idGKM",
  authDomain: "sanrakshaks.firebaseapp.com",
  projectId: "sanrakshaks",
  storageBucket: "sanrakshaks.firebasestorage.app",
  messagingSenderId: "612204511011",
  appId: "1:612204511011:web:046ee069afa091556d9696"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

export { auth, db, app };
