import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        await signInWithEmailAndPassword(auth, email, password);
        const last = localStorage.getItem("lastRoute");
        navigate(last || "/projects");
    };

    return (
        <div className="auth">
            <h2>Login</h2>
            <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
            <p>New user? <Link to="/signup">Signup</Link></p>
        </div>
    );
}
