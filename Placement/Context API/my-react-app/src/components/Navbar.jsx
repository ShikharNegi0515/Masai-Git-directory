import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        localStorage.removeItem("lastRoute");
        navigate("/login");
    };

    if (!user) return null;

    return (
        <nav className="navbar">
            <h3>🔐 PathGuard</h3>

            <div>
                <Link to="/projects">Projects</Link>
                <Link to="/notes">Notes</Link>
                <Link to="/profile">Profile</Link>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
}
