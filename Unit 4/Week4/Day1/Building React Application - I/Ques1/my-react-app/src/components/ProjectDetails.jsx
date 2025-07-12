import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import {
    ref,
    onValue,
    push,
    update,
    remove,
    serverTimestamp,
} from 'firebase/database';

export default function ProjectDetails() {
    const { id } = useParams();
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');
    const [priority, setPriority] = useState('low');

    useEffect(() => {
        const taskRef = ref(db, `projects/${id}/tasks`);
        onValue(taskRef, (snapshot) => {
            const data = snapshot.val();
            const loaded = data
                ? Object.entries(data).map(([taskId, task]) => ({ id: taskId, ...task }))
                : [];
            setTasks(loaded);
        });
    }, [id]);

    const handleAddTask = async (e) => {
        e.preventDefault();
        const task = {
            title: taskInput,
            completed: false,
            priority,
            createdAt: serverTimestamp(),
        };
        await push(ref(db, `projects/${id}/tasks`), task);
        setTaskInput('');
    };

    const toggleTask = (taskId, current) => {
        update(ref(db, `projects/${id}/tasks/${taskId}`), { completed: !current });
    };

    const deleteTask = (taskId) => {
        remove(ref(db, `projects/${id}/tasks/${taskId}`));
    };

    return (
        <div>
            <h2>Project Tasks</h2>
            <form onSubmit={handleAddTask}>
                <input
                    placeholder="New Task"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    required
                />
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <button type="submit">Add Task</button>
            </form>

            <ul>
                {tasks.map((t) => (
                    <li key={t.id}>
                        <span style={{ textDecoration: t.completed ? 'line-through' : 'none' }}>
                            {t.title} ({t.priority})
                        </span>
                        <button onClick={() => toggleTask(t.id, t.completed)}>
                            {t.completed ? 'Undo' : 'Complete'}
                        </button>
                        <button onClick={() => deleteTask(t.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
