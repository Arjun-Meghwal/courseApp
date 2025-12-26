const RatingAndReview = require("../models/ratingAndReview");

exports.getReviews = async (req, res) => {
  try {
    const reviews = await RatingAndReview.find({})
      .populate("user")
      .populate("course");

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
