// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlR-xJdCBrmVeCCeakAVRxHltR3KhLpuo",
  authDomain: "e-pharma-2629e.firebaseapp.com",
  projectId: "e-pharma-2629e",
  storageBucket: "e-pharma-2629e.appspot.com",
  messagingSenderId: "66071658042",
  appId: "1:66071658042:web:411d5b3dfaee31699f7f03",
  measurementId: "G-KJ4XSKC5ZD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);