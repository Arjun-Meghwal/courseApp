import { apiConnector } from "../apiconnector";
import { cartEndpoints } from "../apis";

const {
  ADD_TO_CART_API,
  REMOVE_FROM_CART_API,
  GET_CART_API,
} = cartEndpoints;

export const addCourseToCart = async (
  courseId,
  token
) => {
  try {

    const response = await apiConnector(
      "POST",
      ADD_TO_CART_API,
      { courseId },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    return response.data;

  } catch (error) {

    console.log(error);

  }
};

export const removeCourseFromCart = async (
  courseId,
  token
) => {

  try {

    const response = await apiConnector(
      "POST",
      REMOVE_FROM_CART_API,
      { courseId },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    return response.data;

  } catch (error) {

    console.log(error);

  }
};

export const getCart = async (token) => {

  try {

    const response = await apiConnector(
      "GET",
      GET_CART_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    return response.data;

  } catch (error) {

    console.log(error);

  }
};