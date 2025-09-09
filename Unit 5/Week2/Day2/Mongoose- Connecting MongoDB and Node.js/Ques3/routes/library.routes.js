const express = require("express");
const router = express.Router();
const controller = require("../controllers/library.controller");
const { validateBookData, checkBorrowRequest, preventDeleteIfBorrowed } = require("../middleware/library.middleware");

router.post("/books", validateBookData, controller.addBook);

router.patch("/borrow/:id", checkBorrowRequest, controller.borrowBook);

router.patch("/return/:id", controller.returnBook);

router.get("/books", controller.getBooks);

router.delete("/books/:id", preventDeleteIfBorrowed, controller.deleteBook);

module.exports = router;
