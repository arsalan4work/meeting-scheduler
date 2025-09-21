// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "meeting-scheduler-f246d.firebaseapp.com",
  projectId: "meeting-scheduler-f246d",
  storageBucket: "meeting-scheduler-f246d.firebasestorage.app",
  messagingSenderId: "214154663365",
  appId: "1:214154663365:web:a8be0ee0da7c9d83ed67ac"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);