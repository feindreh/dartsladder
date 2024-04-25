// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.fbkey,
  authDomain: "darts-81c1f.firebaseapp.com",
  projectId: "darts-81c1f",
  storageBucket: "darts-81c1f.appspot.com",
  messagingSenderId: "177647384951",
  appId: "1:177647384951:web:95ff77c93eef0570174972"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app
