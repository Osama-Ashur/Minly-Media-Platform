import express from "express";
import {
  register,
  login,
  deleteUser,
  getCurrentUser,
} from "../controllers/authController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

// Authentication routes
router.route("/register").post(register);
router.route("/login").post(login);

router.route("/me").get(protect, getCurrentUser);
router.route("/user/:id").delete(protect, deleteUser);

export default router;
