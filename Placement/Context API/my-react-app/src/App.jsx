import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LoaderProvider } from "./context/LoaderContext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Notes from "./pages/Notes";
import NoteDetails from "./pages/NoteDetails";
import Profile from "./pages/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import LoadingOverlay from "./components/LoadingOverlay";

function App() {
  return (
    <AuthProvider>
      <LoaderProvider>
        <BrowserRouter>
          <LoadingOverlay />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
            <Route path="/projects/:projectId" element={<ProtectedRoute><ProjectDetails /></ProtectedRoute>} />

            <Route path="/notes" element={<ProtectedRoute><Notes /></ProtectedRoute>} />
            <Route path="/notes/:noteId" element={<ProtectedRoute><NoteDetails /></ProtectedRoute>} />

            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </LoaderProvider>
    </AuthProvider>
  );
}

export default App;
