import React, { useReducer } from "react";
import "./index.css";

const initialState = {
  email: "",
  password: "",
  submitted: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "submit":
      return { ...state, submitted: true };
    case "reset":
      return initialState;
    default:
      throw new Error("invalid action type");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.email.trim() === "" || state.password.trim() === "") return;
    dispatch({ type: "submit" });
  };

  const handleReset = () => {
    dispatch({ type: "reset" });
  };

  return (
    <div className="form-container">
      <h2>useReducer Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter email"
          value={state.email}
          onChange={(e) =>
            dispatch({ type: "email", payload: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Enter password"
          value={state.password}
          onChange={(e) =>
            dispatch({ type: "password", payload: e.target.value })
          }
        />
        <div className="btn-group">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>

      <div className="output">
        {state.submitted ? (
          <div>
            <div>User Email: {state.email}</div>
            <div>User Password: {state.password}</div>
          </div>
        ) : (
          <div>No details found</div>
        )}
      </div>
    </div>
  );
}
