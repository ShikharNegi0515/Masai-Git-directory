const mongoose = require("mongoose");
const Restaurant = require("./restaurantModel");

const reviewSchema = new mongoose.Schema({
    text: { type: String, required: true, minlength: 10 },
    rating: { type: Number, required: true, min: 1, max: 5 },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
});

// Static method to calculate average rating
reviewSchema.statics.calculateAverageRating = async function (restaurantId) {
    const stats = await this.aggregate([
        { $match: { restaurant: restaurantId } },
        {
            $group: {
                _id: "$restaurant",
                avgRating: { $avg: "$rating" },
            },
        },
    ]);

    await Restaurant.findByIdAndUpdate(
        restaurantId,
        { averageRating: stats[0] ? stats[0].avgRating : 0 },
        { new: true }
    );
};

// Trigger average calculation after save
reviewSchema.post("save", function () {
    this.constructor.calculateAverageRating(this.restaurant);
});

// Trigger average calculation after remove
reviewSchema.post("remove", function () {
    this.constructor.calculateAverageRating(this.restaurant);
});

module.exports = mongoose.model("Review", reviewSchema);
