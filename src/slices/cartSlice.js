import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cart:localStorage.getItem(("cart"))
  ? JSON.parse(localStorage.getItem("cart"))
  :[],
  total:localStorage.getItem("total")
  ?JSON.parse(localStorage.getItem("total"))
  :0,
  totalItems:localStorage.getItem("totalItems")
  ?JSON.parse(localStorage.getItem("totalItems"))
  :0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cart.push(action.payload);
      state.totalItems += 1;
      toast.success("Item added");
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter(
        (item) => item._id !== action.payload
      );
      state.totalItems = state.cart.length;
      toast.success("Item removed");
    },
    resetCart(state) {
      state.cart = [];
      state.totalItems = 0;
    },
  },
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
