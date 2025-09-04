const express = require("express");
const { addBook, getAllBooks, updateBook, deleteBook } = require("../controllers/adminController");
const router = express.Router();

router.post("/books", addBook);
router.get("/books", getAllBooks);
router.patch("/books/:id", updateBook);
router.delete("/books/:id", deleteBook);

module.exports = router;
