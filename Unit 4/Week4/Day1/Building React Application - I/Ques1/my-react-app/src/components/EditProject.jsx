import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { ref, get, update } from 'firebase/database';

export default function EditProject() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProject = async () => {
            const snapshot = await get(ref(db, `projects/${id}`));
            const data = snapshot.val();
            if (data) {
                setTitle(data.title);
                setDescription(data.description);
            }
        };
        fetchProject();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        await update(ref(db, `projects/${id}`), {
            title,
            description,
        });
        navigate('/dashboard');
    };

    return (
        <form onSubmit={handleUpdate}>
            <h2>Edit Project</h2>
            <input value={title} onChange={(e) => setTitle(e.target.value)} required />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
            <button type="submit">Update</button>
        </form>
    );
}
