import React from "react";
import { useSelector } from "react-redux";
import RenderCartCourse from "./RenderCartCourse";
import RenderTotalAmount from "./RenderTotalAmount";

export default function Cart() {
  const { totalItems, cart } = useSelector((state) => state.cart);

  return (
    <div className="w-full flex flex-col gap-6 p-6 text-richblack-5">

      {/* Heading */}
      <div>
        <h1 className="text-3xl font-semibold">Your Cart</h1>
        <p className="text-richblack-300 mt-1">
          {totalItems} course(s) in cart
        </p>
      </div>

      {/* Cart Content */}
      {cart.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left - Courses List */}
          <div className="w-full lg:w-[70%]">
            <RenderCartCourse />
          </div>

          {/* Right - Total Amount Box */}
          <div className="w-full lg:w-[30%] rounded-xl bg-richblack-800 p-5 h-fit shadow-md">
            <RenderTotalAmount />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[200px] rounded-xl bg-richblack-800">
          <p className="text-lg text-richblack-300">
            Your cart is empty 🛒
          </p>
        </div>
      )}
    </div>
  );
}
