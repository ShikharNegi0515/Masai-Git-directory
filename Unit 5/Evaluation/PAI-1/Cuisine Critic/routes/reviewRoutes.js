const express = require("express");
const router = express.Router();
const { deleteReview } = require("../controllers/reviewController");

router.route("/:reviewId").delete(deleteReview);

module.exports = router;
