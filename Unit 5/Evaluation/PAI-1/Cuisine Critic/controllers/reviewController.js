const Review = require("../models/reviewModel");

exports.createReview = async (req, res) => {
  try {
    const review = await Review.create({
      ...req.body,
      restaurant: req.params.restaurantId,
    });
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getReviews = async (req, res) => {
  const reviews = await Review.find({ restaurant: req.params.restaurantId });
  res.json(reviews);
};

exports.deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.reviewId);
  if (!review) return res.status(404).json({ message: "Review not found" });

  await review.remove(); 
  res.json({ message: "Review deleted" });
};
