import React, { useReducer } from "react";
import "./index.css";

const initialState = {
  theme: "light",
};

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_THEME":
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isDark = state.theme === "dark";

  return (
    <div className={`app-container ${state.theme}`}>
      <h1>Current Theme: {state.theme}</h1>
      <button
        className="toggle-btn"
        onClick={() => dispatch({ type: "TOGGLE_THEME" })}
      >
        Toggle Theme
      </button>
    </div>
  );
}
