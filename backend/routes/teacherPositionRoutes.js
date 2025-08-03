
const express = require("express");
const router = express.Router();
const {
  getAllTeacherPositions,
  createTeacherPosition,
} = require("../controllers/teacherPositionController");

// GET all positions
router.get("/", getAllTeacherPositions);

// POST create new position
router.post("/", createTeacherPosition);

module.exports = router;
