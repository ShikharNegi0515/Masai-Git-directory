const { readDB, writeDB } = require("../models/bookModel");

// GET /reader/books -> only available
function getAvailableBooks(_req, res) {
    const db = readDB();
    res.json(db.books.filter(b => b.status === "available"));
}

// POST /reader/borrow/:id
function borrowBook(req, res, next) {
    const id = parseInt(req.params.id);
    const { readerName } = req.body;
    if (!readerName) return res.status(400).json({ error: "readerName is required" });

    const db = readDB();
    const idx = db.books.findIndex(b => b.id === id);
    if (idx === -1) return res.status(404).json({ error: "Book not found" });

    const book = db.books[idx];
    if (book.status !== "available")
        return res.status(400).json({ error: "Book is not available" });

    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    db.books[idx] = {
        ...book,
        status: "borrowed",
        borrowedBy: readerName,
        borrowedDate: today
    };

    writeDB(db);

    res.locals.payload = db.books[idx];
    res.locals.transaction = { action: "borrow", readerName, title: book.title };
    next(); // transactionLogger will log + respond
}

// POST /reader/return/:id  (returnCheck middleware runs BEFORE this)
function returnBook(req, res, next) {
    const id = parseInt(req.params.id);
    const db = readDB();
    const idx = db.books.findIndex(b => b.id === id);
    if (idx === -1) return res.status(404).json({ error: "Book not found" });

    const book = db.books[idx];
    if (book.status !== "borrowed")
        return res.status(400).json({ error: "Book is not currently borrowed" });

    const readerName = book.borrowedBy || "Unknown";

    db.books[idx] = {
        ...book,
        status: "available",
        borrowedBy: null,
        borrowedDate: null
    };

    writeDB(db);

    res.locals.payload = db.books[idx];
    res.locals.transaction = { action: "return", readerName, title: book.title };
    next(); // transactionLogger will log + respond
}

module.exports = { getAvailableBooks, borrowBook, returnBook };
