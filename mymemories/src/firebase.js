// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbuTYCZMPfLnmCOW2OVjisc9mUKIZphDI",
  authDomain: "mymemories-40158.firebaseapp.com",
  projectId: "mymemories-40158",
  storageBucket: "mymemories-40158.appspot.com",
  messagingSenderId: "243196753698",
  appId: "1:243196753698:web:c74827138f49eb3449977b",
  measurementId: "G-2D49KKVN4M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = firebase.auth();