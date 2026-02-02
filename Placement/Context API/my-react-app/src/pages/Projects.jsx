import { ref, onValue, push, set } from "firebase/database";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Projects() {
    const { user } = useAuth();
    const [projects, setProjects] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const projectsRef = ref(db, `users/${user.uid}/projects`);
        return onValue(projectsRef, snap => setProjects(snap.val() || {}));
    }, []);

    const addProject = async () => {
        const newRef = push(ref(db, `users/${user.uid}/projects`));
        await set(newRef, { title: "New Project", createdAt: Date.now() });
    };

    return (
        <>
            <Navbar />
            <h2>Projects</h2>
            <button onClick={addProject}>+ Add Project</button>

            <ul>
                {Object.entries(projects).map(([id, p]) => (
                    <li
                        key={id}
                        onClick={() => {
                            localStorage.setItem("lastRoute", `/projects/${id}`);
                            navigate(`/projects/${id}`);
                        }}
                    >
                        {p.title}
                    </li>
                ))}
            </ul>
        </>
    );
}
