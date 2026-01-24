const BASE_URL = process.env.REACT_APP_BASE_URL;

// ================= AUTH ENDPOINTS =================
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
};

// ================= PROFILE ENDPOINTS =================
export const profileEndpoints = {
  UPDATE_PROFILE_API: "/api/v1/profile/updateProfile",
  UPDATE_PROFILE_PICTURE_API: "/api/v1/profile/updateProfilePicture", // ✅ ADD
  DELETE_PROFILE_API: "/api/v1/profile/deleteAccount",
  GET_USER_DETAILS_API: "/api/v1/profile/getUserDetails",
};
// ================= COURSE CATEGORIES =================
export const categoriesEndpoints = {
  CATEGORIES_API: BASE_URL + "/course/showAllCategories",
};

// ================= RATINGS & REVIEWS =================
export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",
};

// ================= CATALOG PAGE =================
export const catalogData = {
  CATALOG_PAGE_DATA_API: BASE_URL + "/course/getCategoryPageDetails",
};

// ================= CONTACT US =================
export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/reach/contact",
};
