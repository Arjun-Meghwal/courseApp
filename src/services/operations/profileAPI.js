import { apiConnector } from "../apiconnector";
import { profileEndpoints } from "../apis";
import toast from "react-hot-toast";

// GET ENROLLED COURSES
export async function getUserEnrolledCourse(token) {
  const toastId=toast.loading("loding..")
  let result = [];
  try {
    console.log(" before calling bakend api");
    const response = await apiConnector(
      "GET",
      profileEndpoints.GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log(" after calling bakend api");
    if (!response?.data?.success) {
      throw new Error("Could not fetch enrolled courses");
    }

    result = response.data.data;
  } catch (error) {
    console.log("GET ENROLLED COURSES ERROR ", error);
    toast.error("Unable to fetch enrolled courses");
  }
  toast.dismiss(toastId)
  return result;
};
