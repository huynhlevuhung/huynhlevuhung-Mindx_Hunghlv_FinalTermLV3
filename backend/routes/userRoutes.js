import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// GET all users
router.get("/", getAllUsers);

// GET one user by id
router.get("/:id", getUserById);

// POST create new user
router.post("/", createUser);

// PUT update user
router.put("/:id", updateUser);

// DELETE (soft delete) user
router.delete("/:id", deleteUser);

export default router;
