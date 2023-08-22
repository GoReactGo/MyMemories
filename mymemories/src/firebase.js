// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
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
  appId: "1:243196753698:web:918028b14a412c5149977b",
  measurementId: "G-NR9ZR76DXD"
};

// 파이어베이스 초기화
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 파이어베이스 서비스 사용
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage, doc, setDoc, getDoc, getFirestore, createUserWithEmailAndPassword };