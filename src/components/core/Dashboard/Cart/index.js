import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import RenderCartCourse from "./RenderCartCourse";
import RenderTotalAmount from "./RenderTotalAmount";

import { getCart } from "../../../../services/operations/cartApi";
import { setCart } from "../../../../slices/cartSlice";

export default function Cart() {

  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  const { totalItems, cart } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {

    const fetchCart = async () => {

      const response = await getCart(token);

      if (response?.success) {

        dispatch(setCart(response.cart));

      }

    };

    if (token) {

      fetchCart();

    }

  }, [token, dispatch]);

  return (
    <div className="w-full px-3 py-4 sm:px-6 sm:py-6 text-richblack-5">

      <div className="mb-5">

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          Your Cart
        </h1>

        <p className="mt-2 text-sm sm:text-base text-richblack-300">
          {totalItems} course(s) in cart
        </p>

      </div>

      {cart.length > 0 ? (

        <div className="flex flex-col xl:flex-row gap-6">

          <div className="w-full xl:w-[70%]">
            <RenderCartCourse />
          </div>

          <div className="w-full xl:w-[30%]">
            <div className="sticky xl:top-24">
              <RenderTotalAmount />
            </div>
          </div>

        </div>

      ) : (

        <div
          className="
            flex
            items-center
            justify-center
            rounded-2xl
            border
            border-richblack-700
            bg-richblack-800
            h-[180px]
            sm:h-[250px]
          "
        >
          <p className="text-base sm:text-xl text-richblack-300 text-center px-4">
            Your cart is empty 🛒
          </p>
        </div>

      )}

    </div>
  );
}