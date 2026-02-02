import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function Profile() {
    const { user } = useAuth();

    return (
        <>
            <Navbar />
            <h2>Profile</h2>
            <p>Email: {user.email}</p>
            <p>User ID: {user.uid}</p>
        </>
    );
}
