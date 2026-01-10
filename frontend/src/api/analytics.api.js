import axios from "../api/api";

export const getAnalytics = () => {
  return axios.get("/analytics");
};
