const BASE_URL = process.env.REACT_APP_BASE_URL;

// ================= AUTH =================
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
};

// ================= PROFILE =================
export const profileEndpoints = {
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  UPDATE_PROFILE_PICTURE_API: BASE_URL + "/profile/updateProfilePicture",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteAccount",
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_USER_ENROLLED_COURSE_API: BASE_URL + "/profile/getEnrolledCourse",
};

// ================= STUDENT =================
export const studentEndpoints = {
  COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",   
  COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",     
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail", 
};

// ================= COURSE =================
export const courseEndpoints = {
  COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
  COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
  GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",

  CREATE_COURSE_API: BASE_URL + "/course/createCourse",
  EDIT_COURSE_API: BASE_URL + "/course/editCourse",
  DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",

  CREATE_SECTION_API: BASE_URL + "/course/createSection", 
  UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
  DELETE_SECTION_API: BASE_URL + "/course/deleteSection",

  CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection", 
  UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
  DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",

  GET_ALL_INSTRUCTOR_COURSES_API:
    BASE_URL + "/course/getInstructorCourses",

  GET_FULL_COURSE_DETAILS_AUTHENTICATED:
    BASE_URL + "/course/getFullCourseDetails",

  CREATE_RATING_API: BASE_URL + "/course/createRating",
  LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
  ADD_COURSE_TO_CATEGORY_API: BASE_URL + "/course/addCourseToCategory",
  SEARCH_COURSES_API: BASE_URL + "/course/searchCourses",
};

// ================= RATINGS =================
export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",
};

export const categories={
  CATEGORIES_API: BASE_URL +"/course/showAllCategories"
}
// ================= CATALOG =================
export const catalogData = {
  CATALOG_PAGE_DATA_API: BASE_URL + "/course/getCategoryPageDetails",
};

// ================= CONTACT =================
export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/reach/contact",
};