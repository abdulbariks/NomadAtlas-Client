// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

// Helper wrappers (optional)
export const firebaseRegister = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const firebaseLogin = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const firebaseGoogleSignIn = () => signInWithPopup(auth, googleProvider);

export const firebaseSendPasswordReset = (email) =>
  sendPasswordResetEmail(auth, email);

export const firebaseLogout = () => signOut(auth);

export const firebaseOnAuthStateChanged = (cb) => onAuthStateChanged(auth, cb);
