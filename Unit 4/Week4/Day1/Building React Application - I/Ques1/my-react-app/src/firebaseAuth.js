// src/firebaseAuth.js
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Sign Up
export const register = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
};

// Login
export const login = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
};

// Logout
export const logout = async () => {
    return await signOut(auth);
};
