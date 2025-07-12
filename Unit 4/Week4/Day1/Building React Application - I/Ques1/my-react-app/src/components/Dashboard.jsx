import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, onValue, remove } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

export default function Dashboard() {
    const [projects, setProjects] = useState([]);
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const projectsRef = ref(db, 'projects');
        onValue(projectsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const loadedProjects = Object.entries(data).map(([id, project]) => ({
                    id,
                    ...project,
                }));
                setProjects(loadedProjects);
            } else {
                setProjects([]);
            }
        });
    }, []);

    const handleDelete = async (id) => {
        await remove(ref(db, `projects/${id}`));
    };

    return (
        <div className="dashboard">
            <h2>Projects</h2>
            <div className="actions">
                <button onClick={() => navigate('/add-project')}>Add Project</button>
                <button onClick={logout}>Logout</button>
            </div>
            <ul className="project-list">
                {projects.map((proj) => (
                    <li className="project-item" key={proj.id}>
                        <h3>{proj.title}</h3>
                        <p>{proj.description}</p>
                        <button onClick={() => navigate(`/project/${proj.id}`)}>Details</button>
                        <button onClick={() => navigate(`/edit-project/${proj.id}`)}>Edit</button>
                        <button onClick={() => handleDelete(proj.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
