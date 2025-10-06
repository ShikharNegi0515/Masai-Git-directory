import { useState, useEffect } from "react";
import Task from "./Task";
import { getTasksByColumn, createTask } from "../api/task";

export default function Column({ column, boardId }) {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");

    const fetchTasks = async () => {
        const res = await getTasksByColumn(boardId, column._id);
        setTasks(res.data.tasks);
    };

    useEffect(() => { fetchTasks(); }, []);

    const handleCreateTask = async () => {
        if (!title) return;
        const res = await createTask({
            boardId,
            columnId: column._id,
            title,
            description: "",
            assignedTo: "", // set to a board member ID
            dueDate: ""
        });
        setTasks([...tasks, res.data.task]);
        setTitle("");
    };

    return (
        <div style={{ border: "1px solid gray", padding: "0.5rem" }}>
            <h3>{column.name}</h3>
            {tasks.map(task => <Task key={task._id} task={task} />)}
            <input placeholder="New Task" value={title} onChange={e => setTitle(e.target.value)} />
            <button onClick={handleCreateTask}>Add Task</button>
        </div>
    );
}
