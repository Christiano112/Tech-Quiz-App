// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAZY-omSs0B_kBE9Wj4tvFIjOoMBI_eHRI",
    authDomain: "quiz-app-c20a3.firebaseapp.com",
    projectId: "quiz-app-c20a3",
    storageBucket: "quiz-app-c20a3.appspot.com",
    messagingSenderId: "27902142186",
    appId: "1:27902142186:web:2bf08d8c0a397ba7fe5993",
    measurementId: "G-21C1EGPLM3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);