// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLjMKT_ag5tzCdCcA4kZ8FMOCuHMhEWpI",
  authDomain: "netflixgpt-f1e1b.firebaseapp.com",
  projectId: "netflixgpt-f1e1b",
  storageBucket: "netflixgpt-f1e1b.appspot.com",
  messagingSenderId: "380169101821",
  appId: "1:380169101821:web:216615b742c8f3fa06f994",
  measurementId: "G-MSTSKE1EF3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();