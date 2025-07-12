import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, toggleTask, removeTask } from '../features/tasks/taskSlice';

const TaskList = () => {
    const tasks = useSelector(state => state.tasks);
    const dispatch = useDispatch();
    const [text, setText] = useState('');

    const handleAdd = () => {
        if (text.trim()) {
            dispatch(addTask(text));
            setText('');
        }
    };

    return (
        <div className="task-app">
            <h1>Task List</h1>
            <input
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Add a task"
            />
            <button onClick={handleAdd}>Add Task</button>

            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <span
                            style={{
                                textDecoration: task.completed ? 'line-through' : 'none',
                                cursor: 'pointer'
                            }}
                            onClick={() => dispatch(toggleTask(task.id))}
                        >
                            {task.text}
                        </span>
                        <button onClick={() => dispatch(removeTask(task.id))}>❌</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
