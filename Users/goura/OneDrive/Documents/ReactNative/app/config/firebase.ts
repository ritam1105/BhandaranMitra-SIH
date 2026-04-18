import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyD5tvcLU8KBty5RF-pPvk16d6Wcb6idGKM",
  authDomain: "sanrakshaks.firebaseapp.com",
  projectId: "sanrakshaks",
  storageBucket: "sanrakshaks.firebasestorage.app",
  messagingSenderId: "612204511011",
  appId: "1:612204511011:web:046ee069afa091556d9696"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth with AsyncStorage persistence
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };
export default app;