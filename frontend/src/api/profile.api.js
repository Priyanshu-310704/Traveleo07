import api from "./api"; // axios instance with baseURL + token

export const getProfile = () => api.get("/profile");

export const updateProfile = (data) =>
  api.put("/profile", data);

export const changePassword = (data) =>
  api.put("/profile/password", data);

export const deleteAccount = () =>
  api.delete("/profile");
