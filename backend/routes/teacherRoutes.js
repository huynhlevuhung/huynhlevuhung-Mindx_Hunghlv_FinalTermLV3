import express from "express";
import {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from "../controllers/teacherController.js";

const router = express.Router();

// GET teachers (có phân trang)
router.get("/", getAllTeachers);

// GET one teacher by id
router.get("/:id", getTeacherById);

// POST create new teacher
router.post("/", createTeacher);

// PUT update teacher
router.put("/:id", updateTeacher);

// DELETE (soft delete) teacher
router.delete("/:id", deleteTeacher);

export default router;
