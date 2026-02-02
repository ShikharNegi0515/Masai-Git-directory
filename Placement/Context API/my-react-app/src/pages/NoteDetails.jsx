import { useParams } from "react-router-dom";
import { ref, onValue, update, remove } from "firebase/database";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function NoteDetails() {
    const { noteId } = useParams();
    const { user } = useAuth();
    const [note, setNote] = useState(null);

    useEffect(() => {
        localStorage.setItem("lastRoute", `/notes/${noteId}`);
        const noteRef = ref(db, `users/${user.uid}/notes/${noteId}`);
        return onValue(noteRef, snap => setNote(snap.val()));
    }, [noteId]);

    if (!note) return <p>Loading...</p>;

    return (
        <>
            <Navbar />
            <h2>{note.content}</h2>

            <button onClick={() =>
                update(ref(db, `users/${user.uid}/notes/${noteId}`), {
                    content: "Updated Note"
                })
            }>
                Edit
            </button>

            <button onClick={() =>
                remove(ref(db, `users/${user.uid}/notes/${noteId}`))
            }>
                Delete
            </button>
        </>
    );
}
