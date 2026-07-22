import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "ramphal-school-portal.firebaseapp.com",
  projectId: "ramphal-school-portal",
  storageBucket: "ramphal-school-portal.firebasestorage.app",
  messagingSenderId: "511689697813",
  appId: "1:511689697813:web:6ead91d323033506de7c1c",
  measurementId: "G-E7ZNNQLBKM"
};

const app = initializeApp(firebaseConfig);

export { app };