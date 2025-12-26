import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // set total items directly
    setTotalItems(state, action) {
      state.totalItems = action.payload;
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
    },

    // add item to cart
    addToCart(state, action) {
      const item = action.payload;
      const existingItem = state.cart.find(
        (cartItem) => cartItem._id === item._id
      );

      if (existingItem) {
        toast.error("Item already in cart");
        return;
      }

      state.cart.push(item);
      state.totalItems += 1;

      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

      toast.success("Item added to cart");
    },

    // remove item from cart
    removeFromCart(state, action) {
      const itemId = action.payload;

      state.cart = state.cart.filter(
        (item) => item._id !== itemId
      );

      state.totalItems = state.cart.length;

      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

      toast.success("Item removed from cart");
    },

    // reset cart
    resetCart(state) {
      state.cart = [];
      state.totalItems = 0;

      localStorage.removeItem("cart");
      localStorage.removeItem("totalItems");
    },
  },
});

export const {
  setTotalItems,
  addToCart,
  removeFromCart,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
