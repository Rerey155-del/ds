// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHVf6jiTYEfujnTcULqUNDI6tUjt8rfEA",
  authDomain: "dataapi-123.firebaseapp.com",
  databaseURL: "https://dataapi-123-default-rtdb.firebaseio.com",
  projectId: "dataapi-123",
  storageBucket: "dataapi-123.appspot.com",
  messagingSenderId: "960180436683",
  appId: "1:960180436683:web:6b2aabf46dfc5757d3e54e",
  measurementId: "G-9Q0766JTNE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);