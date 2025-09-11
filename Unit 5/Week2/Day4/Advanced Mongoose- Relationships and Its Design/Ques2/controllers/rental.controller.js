import User from "../models/User.js";
import Book from "../models/Book.js";

// Add User
export const addUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

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

// Rent Book
export const rentBook = async (req, res) => {
    const { userId, bookId } = req.body;
    try {
        const user = await User.findById(userId);
        const book = await Book.findById(bookId);

        if (!user || !book) return res.status(404).json({ message: "User or Book not found" });

        if (!user.rentedBooks.includes(bookId)) user.rentedBooks.push(bookId);
        if (!book.rentedBy.includes(userId)) book.rentedBy.push(userId);

        await user.save();
        await book.save();

        res.status(200).json({ message: "Book rented successfully", user, book });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Return Book
export const returnBook = async (req, res) => {
    const { userId, bookId } = req.body;
    try {
        const user = await User.findById(userId);
        const book = await Book.findById(bookId);

        if (!user || !book) return res.status(404).json({ message: "User or Book not found" });

        user.rentedBooks = user.rentedBooks.filter(b => b.toString() !== bookId);
        book.rentedBy = book.rentedBy.filter(u => u.toString() !== userId);

        await user.save();
        await book.save();

        res.status(200).json({ message: "Book returned successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get User Rentals
export const getUserRentals = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate("rentedBooks");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get Book Renters
export const getBookRenters = async (req, res) => {
    try {
        const book = await Book.findById(req.params.bookId).populate("rentedBy");
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

        // Remove book from all users
        await User.updateMany(
            { rentedBooks: book._id },
            { $pull: { rentedBooks: book._id } }
        );

        await book.deleteOne();
        res.json({ message: "Book deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
