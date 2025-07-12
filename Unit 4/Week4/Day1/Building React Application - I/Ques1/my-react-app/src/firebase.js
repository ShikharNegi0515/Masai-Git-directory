// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDhlMKRq8Da8S59BpV6U1bKip6ovR5qaNc",
  authDomain: "project-tracker-app-88302.firebaseapp.com",
  databaseURL: "https://project-tracker-app-88302-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "project-tracker-app-88302",
  storageBucket: "project-tracker-app-88302.firebasestorage.app",
  messagingSenderId: "804732222814",
  appId: "1:804732222814:web:67df0dbaf3652b61f723cf",
  measurementId: "G-TDH2MTY55E"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);