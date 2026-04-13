import React from "react";
import { useSelector } from "react-redux";
import IconBtn from "../../../common/IconBtn";

const RenderTotalAmount = () => {
  const { totalItems, cart } = useSelector((state) => state.cart);

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id);
    console.log("Bought courses:", courses);
    // todo api integrate ->payment getway tal leke jaegi
  };

  return (
    <div className="w-full max-w-sm rounded-xl bg-richblack-800 p-6 shadow-lg">

      {/* Heading */}
      <p className="text-lg font-semibold text-richblack-5">
        Total Amount
      </p>

      {/* Total Price */}
      <p className="mt-2 text-3xl font-bold text-yellow-50">
        ₹ {totalItems}
      </p>

      {/* Small Info */}
      <p className="mt-1 text-sm text-richblack-300">
        Includes all courses currently in your cart
      </p>

      {/* Button */}
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

