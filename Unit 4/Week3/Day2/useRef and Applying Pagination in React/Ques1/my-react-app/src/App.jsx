import React, { useEffect, useRef, useState } from "react";
import "./index.css";

const CHARACTERS_PER_PAGE = 10;

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [paginated, setPaginated] = useState([]);
  const currentPageRef = useRef(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data.results);
        setTotalPages(Math.ceil(data.results.length / CHARACTERS_PER_PAGE));
      });
  }, []);

  useEffect(() => {
    const start = (currentPageRef.current - 1) * CHARACTERS_PER_PAGE;
    const end = start + CHARACTERS_PER_PAGE;
    setPaginated(characters.slice(start, end));
  }, [characters]);

  const handlePageChange = (pageNum) => {
    if (pageNum < 1 || pageNum > totalPages) return;
    currentPageRef.current = pageNum;
    const start = (pageNum - 1) * CHARACTERS_PER_PAGE;
    const end = start + CHARACTERS_PER_PAGE;
    setPaginated(characters.slice(start, end));
  };

  return (
    <div className="container">
      <h2>Rick and Morty Characters</h2>

      <div className="grid">
        {paginated.map((char) => (
          <div key={char.id} className="card">
            <img src={char.image} alt={char.name} />
            <p>{char.name}</p>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPageRef.current - 1)}
          disabled={currentPageRef.current === 1}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={currentPageRef.current === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPageRef.current + 1)}
          disabled={currentPageRef.current === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
