import { apiConnector } from "../apiconnector";
import { aiEndpoints } from "../apis";

export const getRecommendations = async (token) => {
  try {

    const response = await apiConnector(
      "GET",
      aiEndpoints.RECOMMEND_COURSE_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    return response.data;

  } catch (error) {

    console.log(error);
    return null;

  }
};