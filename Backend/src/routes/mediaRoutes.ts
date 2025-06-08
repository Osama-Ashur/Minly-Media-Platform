import express from "express";
import {
  uploadPost,
  getAllPosts,
  likePost,
  deletePost,
} from "../controllers/mediaController";
import { protect } from "../middleware/authMiddleware";
import upload from "../utils/multerConfig"; // Use local multer config

const router = express.Router();

router.use(protect);

router.route("/upload").post(upload.single("filePath"), uploadPost);

router.route("/").get(getAllPosts);
router.route("/:id/like").put(likePost);
router.route("/:id").delete(deletePost);

export default router;
