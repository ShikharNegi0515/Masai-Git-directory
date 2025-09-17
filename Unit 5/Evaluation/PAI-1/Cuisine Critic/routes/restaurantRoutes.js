const express = require("express");
const router = express.Router();
const {
    createRestaurant,
    getRestaurants,
    getRestaurant,
    updateRestaurant,
} = require("../controllers/restaurantController");
const { createReview, getReviews } = require("../controllers/reviewController");

// Restaurant routes
router.route("/").post(createRestaurant).get(getRestaurants);
router.route("/:restaurantId").get(getRestaurant).put(updateRestaurant);

// Nested Review routes
router.route("/:restaurantId/reviews").post(createReview).get(getReviews);

module.exports = router;
