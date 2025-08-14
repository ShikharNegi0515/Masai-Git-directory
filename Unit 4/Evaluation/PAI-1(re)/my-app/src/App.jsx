import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import UserDetail from "./pages/UserDetail";
import Following from "./pages/Following";
import { FollowProvider } from "./context/FollowContext";

export default function App() {
  return (
    <FollowProvider>
      <div className="app-shell">
        <Header />
        <nav className="top-nav">
          <Link to="/">Home</Link>
          <Link to="/following">Following</Link>
        </nav>
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users/:userId" element={<UserDetail />} />
            <Route path="/following" element={<Following />} />
          </Routes>
        </main>
      </div>
    </FollowProvider>
  );
}
