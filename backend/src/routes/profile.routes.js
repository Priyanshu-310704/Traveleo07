import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount
} from "../controllers/profile.controller.js";

const router = Router();

router.get("/", authMiddleware, getProfile);
router.put("/", authMiddleware, updateProfile);
router.put("/password", authMiddleware, changePassword);
router.delete("/", authMiddleware, deleteAccount);

export default router;
