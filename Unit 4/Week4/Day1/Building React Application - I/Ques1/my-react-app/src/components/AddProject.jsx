import React, { useState } from 'react';
import { db } from '../firebase';
import { ref, push, serverTimestamp } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

export default function AddProject() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleAdd = async (e) => {
        e.preventDefault();
        const newProject = {
            title,
            description,
            createdAt: serverTimestamp(),
        };
        await push(ref(db, 'projects'), newProject);
        navigate('/dashboard');
    };

    return (
        <form onSubmit={handleAdd}>
            <h2>Add Project</h2>
            <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            <button type="submit">Add</button>
        </form>
    );
}
