import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:4000", 
  withCredentials: true,
});

export const apiConnector = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    method,
    url,
    data: bodyData ?? null,
    headers: headers ??{},
    params: params ?? {},
  });
};