// middleware/library.middleware.js
const Library = require("../models/library.model");

const ALLOWED_STATUS = ["available", "borrowed", "reserved"];

const validateBookData = (req, res, next) => {
    const { title, author, status } = req.body;
    if (!title || !author) {
        return res.status(400).json({ error: "Incomplete Data" });
    }
    if (status && !ALLOWED_STATUS.includes(status)) {
        return res.status(400).json({ error: "Invalid status. Allowed: available, borrowed, reserved" });
    }
    next();
};

const checkBorrowRequest = async (req, res, next) => {
    try {
        const bookId = req.params.id;
        const { borrowerName } = req.body;
        if (!borrowerName) {
            return res.status(400).json({ error: "Borrower name required" });
        }

        const book = await Library.findById(bookId);
        if (!book) return res.status(404).json({ error: "Book not found" });

        if (book.status !== "available") {
            return res.status(409).json({ error: `Book is not available. Current status: ${book.status}` });
        }

        const borrowedCount = await Library.countDocuments({ borrowerName, status: "borrowed" });
        if (borrowedCount >= 3) {
            return res.status(409).json({ error: "Borrowing limit exceeded. A user can borrow up to 3 books." });
        }

        req.book = book;
        next();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error in borrow middleware" });
    }
};

const preventDeleteIfBorrowed = async (req, res, next) => {
    try {
        const book = await Library.findById(req.params.id);
        if (!book) return res.status(404).json({ error: "Book not found" });
        if (book.status === "borrowed") {
            return res.status(409).json({ error: "Cannot delete a borrowed book" });
        }
        req.book = book;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error in delete middleware" });
    }
};

module.exports = {
    validateBookData,
    checkBorrowRequest,
    preventDeleteIfBorrowed,
    ALLOWED_STATUS,
};
