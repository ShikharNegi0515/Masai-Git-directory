import { useState, useEffect } from 'react';

export default function Tasks({ tasks, loading, addTask, toggleCompletion }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            addTask(title.trim(), description.trim());
            setTitle('');
            setDescription('');
        }
    };

    const completedCount = tasks.filter(task => task.completed).length;

    if (loading) return <p style={{ padding: '1rem' }}>Loading tasks...</p>;

    return (
        <div style={{ padding: '1rem' }}>
            <h2>My Tasks</h2>
            <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
                <input
                    type="text"
                    placeholder="Title (required)"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Description (optional)"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <button type="submit" disabled={!title.trim()}>Add Task</button>
            </form>

            {tasks.length === 0 ? (
                <p>No tasks yet! Add one to get started.</p>
            ) : (
                <ul>
                    {tasks.map(task => (
                        <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleCompletion(task.id)}
                            />
                            <strong>{task.title}</strong>: {task.description}
                        </li>
                    ))}
                </ul>
            )}

            <p>{completedCount} of {tasks.length} tasks completed</p>
        </div>
    );
}