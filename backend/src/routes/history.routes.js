import express from "express";
import { getExpenseHistory } from "../controllers/history.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/history", authMiddleware, getExpenseHistory);

export default router;
