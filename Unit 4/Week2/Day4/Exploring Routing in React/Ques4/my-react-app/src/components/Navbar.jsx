import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/">🏠 Home</Link>
            <Link to="/profile">👤 Profile</Link>
            <Link to="/settings">⚙️ Settings</Link>
        </nav>
    );
}
