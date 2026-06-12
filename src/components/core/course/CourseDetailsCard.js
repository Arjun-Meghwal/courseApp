import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { addToCart } from "../../../slices/cartSlice";

const CourseDetailsCard = ({
  course,
  setConfirmationModel,
  handleBuyCourse,
}) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,
  } = course;

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are instructor, you can't buy a course");
      return;
    }

    if (token) {
      dispatch(addToCart(course));
      return;
    }

    setConfirmationModel({
      text1: "You are not logged in",
      text2: "Please login to add to cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModel(null),
    });
  };

  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link copied to clipboard");
  };

  const isEnrolled = course?.studentsEnrolled?.includes(user?._id);

  return (
    <div className="w-[360px] bg-richblack-700 border border-richblack-600">

      {/* Thumbnail */}
      <img
        src={ThumbnailImage}
        alt="course img"
        className="w-full h-[220px] object-cover"
      />

      {/* Content */}
      <div className="p-6">

        {/* Price */}
        <h2 className="text-3xl font-bold text-richblack-5 mb-5">
          ₹{CurrentPrice}
        </h2>

        {/* Buy Button */}
        <button
          onClick={
            isEnrolled
              ? () => navigate("/dashboard/enrolled-courses")
              : handleBuyCourse
          }
          className="w-full bg-yellow-500 text-richblack-900 py-3 rounded-md font-semibold"
        >
          {isEnrolled ? "Go to Course" : "Buy Now"}
        </button>

        {/* Add To Cart */}
        {!isEnrolled && (
          <button
            onClick={handleAddToCart}
            className="w-full bg-richblack-800 text-richblack-5 py-3 rounded-md font-semibold mt-3 border border-richblack-600"
          >
            Add to Cart
          </button>
        )}

        {/* Guarantee */}
        <p className="text-center text-xs text-richblack-300 mt-5">
          30-Day Money-Back Guarantee
        </p>

        {/* Includes */}
        <div className="mt-8">
          <p className="font-semibold text-richblack-5 mb-4">
            This course includes:
          </p>

          <div className="flex flex-col gap-3">
            {course?.instructions?.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-2 text-caribbeangreen-200 text-sm"
              >
                <span>✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Share */}
        <button
          onClick={handleShare}
          className="w-full text-center text-yellow-50 mt-8 font-medium"
        >
          Share
        </button>

      </div>
    </div>
  );
};

export default CourseDetailsCard;