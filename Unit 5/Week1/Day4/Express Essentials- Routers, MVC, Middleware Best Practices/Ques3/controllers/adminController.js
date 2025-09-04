const { readDB, writeDB } = require("../models/bookModel");

function addBook(req, res) {
    const { title, author, genre, publishedYear } = req.body;
    if (!title || !author || !genre || !publishedYear) {
        return res
            .status(400)
            .json({ error: "title, author, genre, publishedYear are required" });
    }

    const db = readDB();
    const id = db.books.length ? db.books[db.books.length - 1].id + 1 : 1;

    const newBook = {
        id,
        title,
        author,
        genre,
        publishedYear,
        status: "available",
        borrowedBy: null,
        borrowedDate: null
    };

    db.books.push(newBook);
    writeDB(db);
    res.status(201).json(newBook);
}

function getAllBooks(_req, res) {
    const db = readDB();
    res.json(db.books);
}

function updateBook(req, res) {
    const id = parseInt(req.params.id);
    const { title, author, genre, publishedYear, status } = req.body;

    const db = readDB();
    const idx = db.books.findIndex(b => b.id === id);
    if (idx === -1) return res.status(404).json({ error: "Book not found" });

    // Admin can update details; status only to valid values if provided
    db.books[idx] = {
        ...db.books[idx],
        title: title ?? db.books[idx].title,
        author: author ?? db.books[idx].author,
        genre: genre ?? db.books[idx].genre,
        publishedYear: publishedYear ?? db.books[idx].publishedYear,
        status: status === "available" || status === "borrowed" ? status : db.books[idx].status
    };

    writeDB(db);
    res.json(db.books[idx]);
}

function deleteBook(req, res) {
    const id = parseInt(req.params.id);
    const db = readDB();
    const before = db.books.length;
    db.books = db.books.filter(b => b.id !== id);
    if (db.books.length === before) return res.status(404).json({ error: "Book not found" });
    writeDB(db);
    res.json({ message: "Book removed" });
}

module.exports = { addBook, getAllBooks, updateBook, deleteBook };
