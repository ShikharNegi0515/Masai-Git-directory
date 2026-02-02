import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        await createUserWithEmailAndPassword(auth, email, password);
        navigate("/projects");
    };

    return (
        <div className="auth">
            <h2>Signup</h2>
            <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
            <button onClick={handleSignup}>Signup</button>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
}
