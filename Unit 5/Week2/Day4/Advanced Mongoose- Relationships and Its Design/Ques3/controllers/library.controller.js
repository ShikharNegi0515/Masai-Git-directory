import Book from "../models/Book.js";
import Member from "../models/Member.js";

// Add Book
export const addBook = async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Add Member
export const addMember = async (req, res) => {
    try {
        const member = new Member(req.body);
        await member.save();
        res.status(201).json(member);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Borrow Book
export const borrowBook = async (req, res) => {
    const { memberId, bookId } = req.body;
    try {
        const book = await Book.findById(bookId);
        const member = await Member.findById(memberId);

        if (!book || !member) return res.status(404).json({ message: "Book or Member not found" });
        if (book.status === "borrowed") return res.status(400).json({ message: "Book already borrowed" });

        book.status = "borrowed";
        book.borrowers.push(member._id);
        member.borrowedBooks.push(book._id);

        await book.save();
        await member.save();

        res.json({ message: "Book borrowed successfully", book, member });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Return Book
export const returnBook = async (req, res) => {
    const { memberId, bookId } = req.body;
    try {
        const book = await Book.findById(bookId);
        const member = await Member.findById(memberId);

        if (!book || !member) return res.status(404).json({ message: "Book or Member not found" });

        book.status = "available";
        book.borrowers = book.borrowers.filter(b => b.toString() !== memberId);
        member.borrowedBooks = member.borrowedBooks.filter(b => b.toString() !== bookId);

        await book.save();
        await member.save();

        res.json({ message: "Book returned successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get Member Borrowed Books
export const getMemberBorrowedBooks = async (req, res) => {
    try {
        const member = await Member.findById(req.params.memberId).populate("borrowedBooks");
        if (!member) return res.status(404).json({ message: "Member not found" });
        res.json(member);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get Book Borrowers
export const getBookBorrowers = async (req, res) => {
    try {
        const book = await Book.findById(req.params.bookId).populate("borrowers");
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update Book
export const updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true });
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete Book
export const deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.bookId);
        if (!book) return res.status(404).json({ message: "Book not found" });

        await Member.updateMany(
            { borrowedBooks: book._id },
            { $pull: { borrowedBooks: book._id } }
        );

        await book.deleteOne();
        res.json({ message: "Book deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
