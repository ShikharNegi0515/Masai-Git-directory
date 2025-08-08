import React, { useReducer } from "react";
import "./index.css";

const initialState = {
  isVisible: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_VISIBILITY":
      return { ...state, isVisible: !state.isVisible };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="toggle-container">
      <button
        className="toggle-btn"
        onClick={() => dispatch({ type: "TOGGLE_VISIBILITY" })}
      >
        Toggle Message
      </button>

      {state.isVisible && <p className="message">Hello, World!</p>}
    </div>
  );
}
