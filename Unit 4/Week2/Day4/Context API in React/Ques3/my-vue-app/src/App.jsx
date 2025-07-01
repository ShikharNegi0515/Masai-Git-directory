import React from "react";
import { AuthProvider } from "./AuthContext";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Footer from "./components/Footer";

export default function App() {
  return (
    <AuthProvider>
      <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <Navbar />
        <Main />
        <Footer />
      </div>
    </AuthProvider>
  );
}