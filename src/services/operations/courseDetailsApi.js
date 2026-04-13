import { toast } from "react-hot-toast";
import { setProgress } from "../../slices/loadingBarSlice";
import { updateCompletedLectures } from "../../slices/courseSlice";
import { apiConnector } from '../apiconnector'; 
import { courseEndpoints } from "../apis";

const {
  COURSE_DETAILS_API,
  COURSE_CATEGORIES_API,
  CREATE_CATEGORY_API,
  GET_ALL_COURSE_API,
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  CREATE_RATING_API,
  LECTURE_COMPLETION_API,
  ADD_COURSE_TO_CATEGORY_API,
  SEARCH_COURSES_API,
} = courseEndpoints;

// -------------------- BASIC --------------------

export const getAllCourses = async () => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("GET", GET_ALL_COURSE_API);
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Courses");
    }
    result = response?.data?.data;
  } catch (error) {
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const fetchCourseCategories = async () => {
  let result = [];
  try {
    const response = await apiConnector("GET", COURSE_CATEGORIES_API);
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Categories");
    }
    result = response?.data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
  return result;
};

// -------------------- COURSE --------------------

export const addCourseDetails = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CREATE_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Could Not Add Course");
    }

    toast.success("Course Created");
    result = response?.data?.data;
  } catch (error) {
    toast.error(error.response?.data?.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const editcourseDetails = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", EDIT_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Could Not Update Course");
    }

    toast.success("Course Updated");
    result = response?.data?.data;
  } catch (error) {
    toast.error(error.response?.data?.message);
  }
  toast.dismiss(toastId);
  return result;
};

// -------------------- SECTION --------------------

export const createSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) throw new Error("Error");

    toast.success("Section Created");
    result = response?.data?.updatedCourse;
  } catch (error) {
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const updateSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) throw new Error("Error");

    toast.success("Section Updated");
    result = response?.data?.updatedCourse;
  } catch (error) {
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", DELETE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) throw new Error("Error");

    toast.success("Section Deleted");
    result = response?.data?.updatedCourse;
  } catch (error) {
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

// -------------------- SUBSECTION --------------------

export const createSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Uploading...");
  try {
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) throw new Error("Error");

    toast.success("Lecture Added");
    result = response?.data?.data;
  } catch (error) {
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const updateSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) throw new Error("Error");

    toast.success("Lecture Updated");
    result = response?.data?.data;
  } catch (error) {
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) throw new Error("Error");

    toast.success("Lecture Deleted");
    result = response?.data?.data;
  } catch (error) {
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteCourse = async ({ courseId }, token) => {
  let result = null;
  try {
    const response = await apiConnector(
      "DELETE",
      DELETE_COURSE_API,
      { courseId },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    result = response?.data?.data;
  } catch (error) {
    toast.error("Delete failed");
  }
  return result;
};

export const fetchInstructorCourses = async (token) => {
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_INSTRUCTOR_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    result = response?.data?.data;
  } catch (error) {
    toast.error("Fetch failed");
  }
  return result;
};

export const fetchCourseDetails = async (courseId) => {
  const response = await apiConnector(
    "POST",
    COURSE_DETAILS_API,
    { courseId }
  );
  return response?.data?.data;
};

export const getFullCourseDetails = async (courseId, token) => {
  const response = await apiConnector(
    "POST",
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    { courseId },
    {
      Authorization: `Bearer ${token}`,
    }
  );
  return response?.data?.data;
};

export const markLectureAsComplete = async (data, token) => {
  let result = null;

  try {
    const response = await apiConnector(
      "POST",
      LECTURE_COMPLETION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response?.data?.success) {
      throw new Error("Could not mark lecture complete");
    }

    result = response?.data;
  } catch (error) {
    toast.error("Error updating lecture progress");
  }

  return result;
};
export const getCatalogPageData = async (categoryId) => {
  let result = null;

  try {
    const response = await apiConnector(
      "POST",
      courseEndpoints.CATALOG_PAGE_DATA_API,
      { categoryId }
    );

    if (!response?.data?.success) {
      throw new Error("Could not fetch catalog page data");
    }

    result = response?.data;
  } catch (error) {
    console.log("CATALOG PAGE API ERROR....", error);
  }

  return result;
};
export const addCourseToCategory = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let success = false;
  try {
    const response = await apiConnector(
      "POST",
      ADD_COURSE_TO_CATEGORY_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("ADD COURSE TO CATEGORY API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Add Course To Category");
    }
    toast.success("Course Added To Category");
    success = true;
  } catch (error) {
    success = false;
    console.log("ADD COURSE TO CATEGORY API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return success;
};
export const createCategory = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let success = false;
  try {
    const response = await apiConnector("POST", CREATE_CATEGORY_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATE CATEGORY API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Create Category");
    }
    toast.success("Category Created");
    success = true;
  } catch (error) {
    success = false;
    console.log("CREATE CATEGORY API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return success;
};
export const createRating = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let success = false;
  try {
    const response = await apiConnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATE RATING API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Create Rating");
    }
    toast.success("Rating Posted");
    success = true;
  } catch (error) {
    success = false;
    console.log("CREATE RATING API ERROR............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return success;
};
export const searchCourses = async (searchQuery, dispatch) => {
  // const toastId = toast.loading("Loading...")
  dispatch(setProgress(50));
  let result = null;
  try {
    const response = await apiConnector("POST", SEARCH_COURSES_API, {
      searchQuery: searchQuery,
    });
    console.log("SEARCH COURSES API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Search Courses");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("SEARCH COURSES API ERROR............", error);
    toast.error(error.message);
  }
  // toast.dismiss(toastId)
  dispatch(setProgress(100));
  return result;
};