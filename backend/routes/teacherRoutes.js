const express = require("express");
const router = express.Router();
const {
  getAllTeachers,
  createTeacher,
} = require("../controllers/teacherController");

// GET teachers (có phân trang)
router.get("/", getAllTeachers);

// POST create new teacher
router.post("/", createTeacher);

module.exports = router;
