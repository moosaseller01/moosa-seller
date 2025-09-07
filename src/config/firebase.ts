// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_6fJ0CH97fRCEtOX6VBHdhFlwwStYSwo",
  authDomain: "moosa-seller-a94a7.firebaseapp.com",
  projectId: "moosa-seller-a94a7",
  storageBucket: "moosa-seller-a94a7.firebasestorage.app",
  messagingSenderId: "170469090135",
  appId: "1:170469090135:web:6364d7c064d37129f21412",
  measurementId: "G-RYC9JHSKTZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;