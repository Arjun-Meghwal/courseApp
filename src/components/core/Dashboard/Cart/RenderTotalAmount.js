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

    <div className="w-full rounded-xl bg-richblack-800 p-6 shadow-lg">

      <p className="text-lg font-semibold text-richblack-5">
        Total Amount
      </p>

      <p className="mt-2 text-3xl font-bold text-yellow-50">
        ₹ {total}
      </p>

      <p className="mt-1 text-sm text-richblack-300">
        Includes all courses currently in your cart
      </p>

      <div className="mt-6">

        <IconBtn
          text="Buy Now"
          onClick={handleBuyCourse}
          customClasses="w-full justify-center bg-yellow-50 text-richblack-900 font-semibold"
        />

      </div>

    </div>
  );
};

export default RenderTotalAmount;