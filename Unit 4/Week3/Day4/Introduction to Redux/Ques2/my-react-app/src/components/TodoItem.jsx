import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, toggleTodo, deleteTodo } from "../redux/actions";

export const TodoApp = () => {
    const [text, setText] = useState("");
    const dispatch = useDispatch();
    const todos = useSelector(state => state.todos);

    const handleAdd = () => {
        if (text.trim() !== "") {
            dispatch(addTodo(text));
            setText("");
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
            <h2>Redux Todo App</h2>
            <input
                type="text"
                placeholder="Add todo..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{ padding: "8px", width: "70%" }}
            />
            <button onClick={handleAdd} style={{ padding: "8px 12px", marginLeft: "8px" }}>
                Add
            </button>

            <ul style={{ marginTop: "20px" }}>
                {todos.map((todo) => (
                    <li key={todo.id} style={{ marginBottom: "10px" }}>
                        <span
                            style={{
                                textDecoration: todo.status ? "line-through" : "none",
                                marginRight: "10px"
                            }}
                        >
                            {todo.title}
                        </span>
                        <button onClick={() => dispatch(toggleTodo(todo.id))}>Toggle</button>
                        <button onClick={() => dispatch(deleteTodo(todo.id))} style={{ marginLeft: "5px" }}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
