import express from "express";
import {
  getAllTeacherPositions,
  getTeacherPositionById,
  createTeacherPosition,
  updateTeacherPosition,
  deleteTeacherPosition,
} from "../controllers/teacherPositionController.js";

const router = express.Router();

// GET all positions
router.get("/", getAllTeacherPositions);

// GET one position
router.get("/:id", getTeacherPositionById);

// POST create new position
router.post("/", createTeacherPosition);

// PUT update position
router.put("/:id", updateTeacherPosition);

// DELETE (soft delete) position
router.delete("/:id", deleteTeacherPosition);

export default router;
