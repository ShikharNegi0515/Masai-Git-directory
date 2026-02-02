import { useParams } from "react-router-dom";
import { ref, onValue, update, remove } from "firebase/database";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function ProjectDetails() {
    const { projectId } = useParams();
    const { user } = useAuth();
    const [project, setProject] = useState(null);

    useEffect(() => {
        localStorage.setItem("lastRoute", `/projects/${projectId}`);
        const projectRef = ref(db, `users/${user.uid}/projects/${projectId}`);
        return onValue(projectRef, snap => setProject(snap.val()));
    }, [projectId]);

    if (!project) return <p>Loading...</p>;

    return (
        <>
            <Navbar />
            <h2>{project.title}</h2>

            <button onClick={() =>
                update(ref(db, `users/${user.uid}/projects/${projectId}`), {
                    title: "Updated Project"
                })
            }>
                Edit
            </button>

            <button onClick={() =>
                remove(ref(db, `users/${user.uid}/projects/${projectId}`))
            }>
                Delete
            </button>
        </>
    );
}
