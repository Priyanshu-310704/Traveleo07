import axios from "../api/api";

export const getExpenseHistory = (params) =>
  axios.get("/history", { params });
