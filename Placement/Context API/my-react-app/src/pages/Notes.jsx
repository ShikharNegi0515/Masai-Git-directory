import { ref, onValue, push, set } from "firebase/database";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Notes() {
    const { user } = useAuth();
    const [notes, setNotes] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const notesRef = ref(db, `users/${user.uid}/notes`);
        return onValue(notesRef, snap => setNotes(snap.val() || {}));
    }, []);

    const addNote = async () => {
        const newRef = push(ref(db, `users/${user.uid}/notes`));
        await set(newRef, { content: "New Note", createdAt: Date.now() });
    };

    return (
        <>
            <Navbar />
            <h2>Notes</h2>
            <button onClick={addNote}>+ Add Note</button>

            <ul>
                {Object.entries(notes).map(([id, n]) => (
                    <li
                        key={id}
                        onClick={() => {
                            localStorage.setItem("lastRoute", `/notes/${id}`);
                            navigate(`/notes/${id}`);
                        }}
                    >
                        {n.content}
                    </li>
                ))}
            </ul>
        </>
    );
}
