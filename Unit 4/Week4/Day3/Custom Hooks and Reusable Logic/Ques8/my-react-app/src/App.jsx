import React from "react";
import { useToggleItems } from "./hooks/useToggleItems";

function App() {
  const [state, toggleState] = useToggleItems(["A", "B", "C"], 1);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Custom Hook: useToggleItems</h2>
      <h3>Current Item: {state}</h3>
      <button onClick={toggleState}>Toggle</button>
    </div>
  );
}

export default App;
