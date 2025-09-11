import express from "express";
import {
    addBook,
    addMember,
    borrowBook,
    returnBook,
    getMemberBorrowedBooks,
    getBookBorrowers,
    updateBook,
    deleteBook
} from "../controllers/library.controller.js";

const router = express.Router();

router.post("/add-book", addBook);
router.post("/add-member", addMember);
router.post("/borrow-book", borrowBook);
router.post("/return-book", returnBook);
router.get("/member-borrowed-books/:memberId", getMemberBorrowedBooks);
router.get("/book-borrowers/:bookId", getBookBorrowers);
router.put("/update-book/:bookId", updateBook);
router.delete("/delete-book/:bookId", deleteBook);

export default router;
