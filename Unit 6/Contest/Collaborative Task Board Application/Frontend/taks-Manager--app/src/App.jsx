import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import BoardView from "./components/BoardView";

export default function App() {
  const { user } = useContext(AuthContext);

  // Protected Route wrapper
  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/board/:boardId"
        element={
          <PrivateRoute>
            <BoardViewWrapper />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

// Wrapper to get boardId from URL
import { useParams } from "react-router-dom";
function BoardViewWrapper() {
  const { boardId } = useParams();
  return <BoardView boardId={boardId} />;
}
