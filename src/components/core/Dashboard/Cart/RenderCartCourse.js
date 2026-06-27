import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../../../slices/cartSlice";
import toast from "react-hot-toast"
import {
  removeCourseFromCart,
} from "../../../../services/operations/cartApi";

import ReactStars from "react-rating-stars-component";

import { RiDeleteBin6Line } from "react-icons/ri";
import { GiNinjaStar } from "react-icons/gi";
// import { useSelector } from "react-redux";
const RenderCartCourse = () => {

  const { cart } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const handleRemoveFromCart = async (courseId) => {

    const response = await removeCourseFromCart(
      courseId,
      token
    );

    if (response?.success) {

      dispatch(setCart(response.cart));

      toast.success(response.message);

    } else {

      toast.error("Unable to remove course");

    }

  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6 w-full">
      {cart.map((course) => (
        <div
          key={course._id}
          className="
          flex
          flex-col
          sm:flex-row
          justify-between
          gap-4
          rounded-2xl
          border
          border-richblack-700
          bg-richblack-800
          p-4
          shadow-md
        "
        >
          {/* Left Section */}
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <img
              src={course.thumbnail}
              alt={course.courseName}
              className="
              w-full
              h-[180px]
              sm:w-40
              sm:h-24
              rounded-xl
              object-cover
            "
            />

            <div className="flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-richblack-5 break-words">
                  {course.courseName}
                </h3>

                <p className="mt-1 text-sm text-richblack-300">
                  {course.category?.name}
                </p>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <ReactStars
                  count={5}
                  size={18}
                  edit={false}
                  value={4}
                  activeColor="#ffd700"
                  emptyIcon={<GiNinjaStar />}
                  fullIcon={<GiNinjaStar />}
                />

                <span className="text-xs sm:text-sm text-richblack-200">
                  ({course.ratingAndReviews?.length || 0} Ratings)
                </span>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div
            className="
            flex
            flex-row
            sm:flex-col
            items-center
            sm:items-end
            justify-between
            gap-4
            w-full
            sm:w-auto
          "
          >
            <button
              onClick={() =>
                handleRemoveFromCart(course._id)
              }
              className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-pink-600
              px-4
              py-2
              text-sm
              font-semibold
              text-white
              transition-all
              hover:bg-pink-700
            "
            >
              <RiDeleteBin6Line size={18} />
              Remove
            </button>

            <p className="text-xl sm:text-2xl font-bold text-yellow-50">
              ₹ {course?.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RenderCartCourse;