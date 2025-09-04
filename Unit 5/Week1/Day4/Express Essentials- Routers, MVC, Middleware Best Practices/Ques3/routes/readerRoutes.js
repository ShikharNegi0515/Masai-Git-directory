const express = require("express");
const { getAvailableBooks, borrowBook, returnBook } = require("../controllers/readerController");
const returnCheck = require("../middlewares/returnCheckMiddleware");
const transactionLogger = require("../middlewares/transactionLogger");

const router = express.Router();

router.get("/books", getAvailableBooks);

// borrow -> controller sets locals -> transactionLogger logs & responds
router.post("/borrow/:id", borrowBook, transactionLogger);

// return -> guarded by returnCheck -> controller -> transactionLogger logs & responds
router.post("/return/:id", returnCheck, returnBook, transactionLogger);

module.exports = router;
