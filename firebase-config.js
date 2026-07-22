// ==========================================
// Ramphal Memorial Inter College
// Firebase Configuration
// ==========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCZNiWy5TauhpfiZYaXBLiR6l919n8qTjs",
  authDomain: "ramphal-school-portal.firebaseapp.com",
  projectId: "ramphal-school-portal",
  storageBucket: "ramphal-school-portal.firebasestorage.app",
  messagingSenderId: "511689697813",
  appId: "1:511689697813:web:6ead91d323033506de7c1c",
  measurementId: "G-E7ZNNQLBKM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Export
export { app, auth };
