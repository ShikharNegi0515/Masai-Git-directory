import React, { useContext } from "react";
import { ThemeProvider, ThemeContext } from "./ThemeContext";
import Main from "./Components/Main";

const AppContent = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const appStyle = {
    minHeight: "100vh",
    backgroundColor: theme === "light" ? "#f0f0f0" : "#222",
    color: theme === "light" ? "#000" : "#fff",
    padding: "2rem",
    transition: "all 0.3s ease"
  };

  return (
    <div style={appStyle}>
      <h1>Theme Context Example</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <Main />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
