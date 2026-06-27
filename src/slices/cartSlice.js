import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cart: [],
  total: 0,
  totalItems: 0,
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {

    setCart(state, action) {

      state.cart = action.payload;

      state.totalItems = action.payload.length;

      state.total = action.payload.reduce(
        (acc, item) => acc + Number(item.price),
        0
      );
    },

    removeFromCart(state, action) {

      const { courseId, userId } = action.payload;

      state.cart = state.cart.filter(
        (item) => item._id !== courseId
      );

      state.totalItems = state.cart.length;

      state.total = state.cart.reduce(
        (acc, curr) => acc + Number(curr.price),
        0
      );

      localStorage.setItem(
        `cart_${userId}`,
        JSON.stringify(state.cart)
      );

      localStorage.setItem(
        `total_${userId}`,
        JSON.stringify(state.total)
      );

      localStorage.setItem(
        `totalItems_${userId}`,
        JSON.stringify(state.totalItems)
      );

      toast.success("Item removed");
    },

    resetCart(state) {
      state.cart = [];
      state.total = 0;
      state.totalItems = 0;
    },
  },
});

export const {
  setCart,
  loadCart,
  addToCart,
  removeFromCart,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;