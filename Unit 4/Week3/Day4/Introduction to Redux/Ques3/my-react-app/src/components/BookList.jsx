import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteBook, toggleRead } from "../redux/actions";

const BookList = () => {
    const books = useSelector((state) => state.books);
    const filters = useSelector((state) => state.filters);
    const dispatch = useDispatch();

    const filteredBooks = books.filter((book) => {
        const authorMatch = filters.author === "" || book.author.includes(filters.author);
        const genreMatch = filters.genre === "" || book.genre.includes(filters.genre);
        const statusMatch =
            filters.status === "all" ||
            (filters.status === "read" && book.read) ||
            (filters.status === "unread" && !book.read);
        return authorMatch && genreMatch && statusMatch;
    });

    return (
        <div>
            {filteredBooks.map((book) => (
                <div key={book.id} style={{ border: "1px solid gray", padding: "10px", margin: "10px 0" }}>
                    <h3>{book.title}</h3>
                    <p>Author: {book.author}</p>
                    <p>Genre: {book.genre}</p>
                    <p>Status: {book.read ? "Read" : "Unread"}</p>
                    <button onClick={() => dispatch(toggleRead(book.id))}>Toggle Read</button>
                    <button onClick={() => dispatch(deleteBook(book.id))}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default BookList;
