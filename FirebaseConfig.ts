// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5tvcLU8KBty5RF-pPvk16d6Wcb6idGKM",
  authDomain: "sanrakshaks.firebaseapp.com",
  projectId: "sanrakshaks",
  storageBucket: "sanrakshaks.firebasestorage.app",
  messagingSenderId: "612204511011",
  appId: "1:612204511011:web:046ee069afa091556d9696"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app);