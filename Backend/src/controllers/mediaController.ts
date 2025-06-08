import { Request, Response, NextFunction } from "express";
import Media, { MediaDocument } from "../models/MediaModel";
import { SUCCESS, ERROR } from "../utils/httpStatus";
import appError from "../utils/appError";
import path from "path";
import fs from "fs";

import { UserDocument } from "../models/UserModel";

interface AuthRequest extends Request {
  user?: UserDocument;
}
// Upload media controller
export const uploadPost = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let media;
    if (req.file) {
      const relativePath = path
        .relative(path.join(__dirname, "../uploads"), req.file.path)
        .replace(/\\/g, "/");

      media = await Media.create({
        title: req.body.title,
        type: req.body.type || "textOnly", // Default to image if type not provided
        description: req.body.description || "",
        filePath: `http://localhost:3001/uploads/${relativePath}`, // Store server path for deletion
        owner: req.user?.id,
        ownerName: req.user?.username,
      });
    } else {
      media = await Media.create({
        title: req.body.title,
        type: "textOnly",
        description: req.body.description || "",
        owner: req.user?.id,
        ownerName: req.user?.username,
      });
    }

    res.status(201).json({
      status: SUCCESS,
      data: media,
    });
  } catch (err) {
    next(err);
  }
};

// Get all media
export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Query media with pagination
    const media = await Media.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    // Get total count for pagination info
    const total = await Media.countDocuments();

    res.json({
      status: SUCCESS,
      results: media.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: media,
    });
  } catch (err) {
    next(err);
  }
};

// Like Post controller
export const likePost = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const PostId = req.params.id;
    const userId = req.user;

    const media = await Media.findById(PostId);

    // Validate user ID
    if (!userId) {
      return next(appError.create("User not authenticated", 401, ERROR));
    }

    // Validate media exists
    if (!media) {
      return next(appError.create("Post not found", 404, ERROR));
    }

    // if user liked the post, remove like
    if (media.likedBy.includes(userId.username)) {
      // User has already liked, so remove the like
      media.likes = Math.max(0, media.likes - 1); // Ensure likes don't go below 0
      media.likedBy = media.likedBy.filter(
        (username: any) => username.toString() !== userId.username.toString()
      );
      await media.save();
    } else {
      // Update likes
      media.likes += 1;
      media.likedBy.push(userId.username);
      await media.save();
    }

    res.json({
      status: SUCCESS,
      data: media,
    });
  } catch (err) {
    next(err);
  }
};

// Delete Post controller
export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = req.params.id;

    const media = await Media.findOneAndDelete({
      _id: postId,
    });

    if (!media) {
      return next(appError.create("Post not found", 404, ERROR));
    }

    // Delete file from server
    const filePath = path.join(__dirname, "../", media.filePath);
    if (media.filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Synchronously delete the file
    }

    res.status(200).json({
      status: SUCCESS,
      message: "Post deleted successfully",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
