import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

import teacherRoutes from "./routes/teacherRoutes.js";
import teacherPositionRoutes from "./routes/teacherPositionRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

// ✅ lấy URI từ .env
const mongoURI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

// ✅ truyền đúng tham số
connectDB(mongoURI);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/teachers", teacherRoutes);
app.use("/api/teacher-positions", teacherPositionRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
