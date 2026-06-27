const User = require("../models/User");
const Course = require("../models/Course");


// Add To Cart


exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course Id is required",
      });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
 
    const user = await User.findById(userId);
    console.log("USER =>", user);
    console.log("USER CART =>", user.cart);
    console.log("COURSE ID =>", courseId);
    if (user.cart.includes(courseId)) {
      return res.status(400).json({
        success: false,
        message: "Course already in cart",
      });
    }

    user.cart.push(courseId);



    await user.save();

    const updatedUser = await User.findById(userId)
      .populate("cart");

    return res.status(200).json({
      success: true,
      message: "Course added to cart",
      cart: updatedUser.cart,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// Remove From Cart


exports.removeFromCart = async (req, res) => {
  try {

    const userId = req.user.id;
    const { courseId } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          cart: courseId,
        },
      },
      {
        new: true,
      }
    ).populate("cart");

    return res.status(200).json({
      success: true,
      message: "Course removed",
      cart: updatedUser.cart,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// Get Cart


exports.getCart = async (req, res) => {

  try {

    const userId = req.user.id;

    const user = await User.findById(userId)
      .populate({
        path: "cart",
        populate: [
          {
            path: "category",
          },
          {
            path: "instructor",
          },
        ],
      });

    return res.status(200).json({
      success: true,
      cart: user.cart,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};