// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCS7IeeQRpyk0KIiZa1ki270D1OLRQE7X8",
  authDomain: "user-da1be.firebaseapp.com",
  databaseURL: "https://user-da1be-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "user-da1be",
  storageBucket: "user-da1be.appspot.com",
  messagingSenderId: "450992942284",
  appId: "1:450992942284:web:5ab32418ff630ec7932669",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
