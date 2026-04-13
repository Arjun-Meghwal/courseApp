import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../../../slices/cartSlice";
import ReactStars from "react-rating-stars-component";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GiNinjaStar } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
// import {user} from ""

const RenderCartCourse = () => {
  const { total, cart } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth)
  const navigat = useNavigate();
  const dispatch = useDispatch();
  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id)
    handleBuyCourse(token, courses, user, navigate, dispatch)
  }
  return (
    <div className="flex flex-col gap-6 w-full">
      {cart.map((course) => (
        <div
          key={course._id}
          className="flex items-center justify-between gap-6 rounded-xl bg-richblack-800 p-4 shadow-md"
        >
          {/* Left Side - Thumbnail + Info */}
          <div className="flex gap-4 items-center">

            {/* Thumbnail */}
            <img
              src={course.thumbnail}
              alt={course.courseName}
              className="h-20 w-32 rounded-lg object-cover"
            />

            {/* Course Details */}
            <div className="flex flex-col gap-1">
              <p className="text-lg font-semibold text-richblack-5">
                {course.courseName}
              </p>

              <p className="text-sm text-richblack-300">
                {course.category?.name}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <ReactStars
                  count={5}
                  size={18}
                  edit={false}
                  value={4}
                  activeColor="#ffd700"
                  emptyIcon={<GiNinjaStar />}
                  fullIcon={<GiNinjaStar />}
                />

                <span className="text-sm text-richblack-200">
                  ({course.ratingAndReviews?.length || 0} Ratings)
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Remove Button */}
          <button
            onClick={() => dispatch(removeFromCart(course._id))}
            className="flex items-center gap-2 rounded-lg bg-pink-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-700 transition-all"
          >
            <RiDeleteBin6Line size={18} />
            Remove
          </button>
          <p>Rs{course?.price}</p>
        </div>
      ))}
    </div>
  );
};

export default RenderCartCourse;
