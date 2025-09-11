import express from "express";
import {
    addUser,
    addBook,
    rentBook,
    returnBook,
    getUserRentals,
    getBookRenters,
    updateBook,
    deleteBook
} from "../controllers/rental.controller.js";

const router = express.Router();

router.post("/add-user", addUser);
router.post("/add-book", addBook);
router.post("/rent-book", rentBook);
router.post("/return-book", returnBook);
router.get("/user-rentals/:userId", getUserRentals);
router.get("/book-renters/:bookId", getBookRenters);
router.put("/update-book/:bookId", updateBook);
router.delete("/delete-book/:bookId", deleteBook);

export default router;
