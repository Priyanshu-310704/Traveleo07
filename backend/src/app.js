import express from "express";
import cors from "cors";

const app = express();

//middleware
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://traveleo07.onrender.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

import userRoute from "./routes/user.route.js"; //users

app.use("/api", userRoute);

import tripRoute from "./routes/trip.route.js"; //trips

app.use("/api", tripRoute);

import categoryRoute from "./routes/category.route.js"; //category
app.use("/api", categoryRoute);

import expenseRoute from "./routes/expense.route.js"; //expenses

app.use("/api", expenseRoute);

import budgetRoute from "./routes/budget.route.js"; //budget

app.use("/api", budgetRoute);

import insightRoute from "./routes/insight.route.js"; //insights

app.use("/api", insightRoute);

import healthRoute from "./routes/health.route.js";

import profileRoutes from "./routes/profile.routes.js";

app.use("/api/profile", profileRoutes);

import historyRoutes from "./routes/history.routes.js";

app.use("/api", historyRoutes);

import analyticsRoutes from "./routes/analytics.routes.js";

app.use("/api/analytics", analyticsRoutes);

app.use("/api", healthRoute);
// test route
app.get("/", (req, res) => {
  res.send("Traveleo backend is running 🚀");
});

export default app;
