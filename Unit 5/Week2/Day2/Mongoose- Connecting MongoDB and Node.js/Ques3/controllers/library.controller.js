const Library = require("../models/library.model");

const calculateOverdueFees = (dueDate, returnDate) => {
  if (!dueDate || !returnDate) return 0;
  const msPerDay = 24 * 60 * 60 * 1000;
  const diff = returnDate - dueDate;
  if (diff <= 0) return 0;
  const daysLate = Math.ceil(diff / msPerDay);
  return daysLate * 10;
};

const addBook = async (req, res) => {
  try {
    const { title, author, status } = req.body;

    const existing = await Library.findOne({ title });
    if (existing) {
      return res.status(409).json({ error: "A book with the same title already exists" });
    }

    const book = new Library({
      title,
      author,
      status: status || "available",
    });

    await book.save();
    res.status(201).json({ message: "Book added", book });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add book" });
  }
};

const borrowBook = async (req, res) => {
  try {
    const book = req.book || await Library.findById(req.params.id);
    const { borrowerName } = req.body;

    const borrowDate = new Date();
    const dueDate = new Date(borrowDate.getTime() + 14 * 24 * 60 * 60 * 1000); // 14 days

    book.status = "borrowed";
    book.borrowerName = borrowerName;
    book.borrowDate = borrowDate;
    book.dueDate = dueDate;
    book.returnDate = null;
    book.overdueFees = 0;

    await book.save();
    res.status(200).json({ message: "Book borrowed successfully", book });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to borrow book" });
  }
};

const returnBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Library.findById(bookId);
    if (!book) return res.status(404).json({ error: "Book not found" });

    if (book.status !== "borrowed") {
      return res.status(400).json({ error: "Book is not currently borrowed" });
    }

    const returnDate = new Date();

    const fee = calculateOverdueFees(book.dueDate, returnDate);

    book.status = "available";
    book.borrowerName = null;
    book.returnDate = returnDate;
    book.overdueFees = fee;
    book.borrowDate = null;
    book.dueDate = null;

    await book.save();
    res.status(200).json({ message: "Book returned successfully", overdueFees: fee, book });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to return book" });
  }
};

const getBooks = async (req, res) => {
  try {
    const { status, title } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (title) filter.title = new RegExp(title, "i");

    const books = await Library.find(filter);
    res.status(200).json({ count: books.length, books });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve books" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = req.book || await Library.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    if (book.status === "borrowed") {
      return res.status(409).json({ error: "Cannot delete a borrowed book" });
    }

    await Library.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete book" });
  }
};

module.exports = {
  addBook,
  borrowBook,
  returnBook,
  getBooks,
  deleteBook,
};
