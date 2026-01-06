import {combineReducers} from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlices";



const rootReducer=combineReducers({
  auth: authReducer,
  profile:profileReducer,
  cart:cartReducer,
});



// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     profile: profileReducer, 
//   }
// });

export default rootReducer