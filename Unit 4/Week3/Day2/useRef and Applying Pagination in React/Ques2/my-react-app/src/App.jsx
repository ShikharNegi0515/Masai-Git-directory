import React, { useEffect, useState, useRef } from "react";
import "./index.css";

const TODOS_PER_PAGE = 10;

export default function App() {
  const [todos, setTodos] = useState([]);
  const [paginatedTodos, setPaginatedTodos] = useState([]);
  const currentPageRef = useRef(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
        setTotalPages(Math.ceil(data.length / TODOS_PER_PAGE));
      });
  }, []);

  useEffect(() => {
    const start = (currentPageRef.current - 1) * TODOS_PER_PAGE;
    const end = start + TODOS_PER_PAGE;
    setPaginatedTodos(todos.slice(start, end));
  }, [todos]);

  const goToPage = (pageNum) => {
    if (pageNum < 1 || pageNum > totalPages) return;
    currentPageRef.current = pageNum;
    const start = (pageNum - 1) * TODOS_PER_PAGE;
    const end = start + TODOS_PER_PAGE;
    setPaginatedTodos(todos.slice(start, end));
  };

  return (
    <div className="container">
      <h2>Todo List (Paginated)</h2>

      <ul className="todo-list">
        {paginatedTodos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <span>{todo.id}.</span> {todo.title}
          </li>
        ))}
      </ul>

      <div className="pagination">
        <button
          onClick={() => goToPage(currentPageRef.current - 1)}
          disabled={currentPageRef.current === 1}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => goToPage(i + 1)}
            className={currentPageRef.current === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPageRef.current + 1)}
          disabled={currentPageRef.current === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
