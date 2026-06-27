import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import IconBtn from "../../../common/IconBtn";

import { buyCourse } from "../../../../services/operations/studentFeatureAPI";

const RenderTotalAmount = () => {

  const { total, cart } = useSelector((state) => state.cart);

  const { token } = useSelector((state) => state.auth);

  const { user } = useSelector((state) => state.profile);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleBuyCourse = async () => {

    const courses = cart.map((course) => course._id);

    await buyCourse(
      token,
      courses,
      user,
      navigate,
      dispatch
    );
  };

  return (
    <div
      className="
      w-full
      rounded-2xl
      border
      border-richblack-700
      bg-richblack-800
      p-4
      sm:p-6
      shadow-lg
    "
    >
      <div className="border-b border-richblack-700 pb-4">
        <p className="text-base sm:text-lg font-medium text-richblack-300">
          Total Amount
        </p>

        <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-yellow-50">
          ₹ {total}
        </h2>

        <p className="mt-2 text-xs sm:text-sm text-richblack-400">
          Includes all courses currently in your cart
        </p>
      </div>

      <div className="mt-5">
        <IconBtn
          text="Buy Now"
          onClick={handleBuyCourse}
          customClasses="
          w-full
          justify-center
          rounded-xl
          bg-yellow-400
          text-richblack-900
          font-bold
          py-3
          hover:scale-[1.02]
          transition-all
        "
        />
      </div>

      <div className="mt-4 rounded-xl bg-richblack-900 p-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-richblack-300">
            Courses
          </span>

          <span className="font-semibold text-richblack-5">
            {cart.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RenderTotalAmount;