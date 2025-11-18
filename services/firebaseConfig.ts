import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB97BMrHYjWp9UO5pR10Ja3t5yEk5-gm6o",
  authDomain: "matrimony-ai-4f5a4.firebaseapp.com",
  projectId: "matrimony-ai-4f5a4",
  storageBucket: "matrimony-ai-4f5a4.firebasestorage.app",
  messagingSenderId: "179913465242",
  appId: "1:179913465242:web:72f5f3ee0f34db509a6e23",
  measurementId: "G-HRG0KZ2WDE"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const app = firebase.app();

export const analytics = firebase.analytics();
export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

export default app;