const { readDB } = require("../models/bookModel");

module.exports = function returnCheck(req, res, next) {
    const id = parseInt(req.params.id);
    const db = readDB();
    const book = db.books.find(b => b.id === id);

    if (!book) return res.status(404).json({ error: "Book not found" });
    if (book.status !== "borrowed")
        return res.status(400).json({ error: "Book is not currently borrowed" });

    const borrowedDate = new Date(book.borrowedDate);
    const diffDays = Math.floor((Date.now() - borrowedDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays < 3) {
        return res
            .status(400)
            .json({ error: "Book cannot be returned within 3 days of borrowing." });
    }
    next();
};
