import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import User from "../models/UserModel";
import appError from "../utils/appError";
import { SUCCESS, ERROR } from "../utils/httpStatus";
import generateJWT from "../utils/generateJWT";
import { UserDocument } from "../models/UserModel";

interface AuthRequest extends Request {
  user?: UserDocument;
}

// Register new user
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;

    // Check if all required fields are provided
    if (!username || !email || !password) {
      return next(
        appError.create("Please provide all required fields", 400, ERROR)
      );
    }

    // Check if Email is unique in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(appError.create("Email already exists", 400, ERROR));
    }

    // Check if Username is unique in the database
    const existingUserName = await User.findOne({ username });
    if (existingUserName) {
      return next(
        appError.create("Username is taken, try another Username", 400, ERROR)
      );
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // If JWT_SECRET_KEY is not set, throw an error
    if (!process.env.JWT_SECRET_KEY) {
      return next(appError.create("JWT_SECRET_KEY is not set", 500, ERROR));
    }
    // Generate JWT token
    const token = await generateJWT({
      id: newUser._id,
      username: newUser.username,
      JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    });

    res.status(201).json({
      status: SUCCESS,
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

// Login user
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    // Check if email and password exist
    if (!email || !password) {
      return next(
        appError.create("Please provide email and password", 400, ERROR)
      );
    }

    // Find user by email and select password
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return next(appError.create("Incorrect email or password", 401, ERROR));
    }
    // Check if password matches
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return next(appError.create("Incorrect email or password", 401, ERROR));
    }

    // If JWT_SECRET_KEY is not set, throw an error
    if (!process.env.JWT_SECRET_KEY) {
      return next(appError.create("JWT_SECRET_KEY is not set", 500, ERROR));
    }

    // Generate JWT token
    const token = await generateJWT({
      id: user._id,
      username: user.username,
      JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    });

    res.status(200).json({
      status: SUCCESS,
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Delete user account
export const deleteUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const id = req.params.id;

    // Validate user ID
    if (!userId) {
      return next(appError.create("User not authenticated", 401, ERROR));
    }

    // Find and delete user
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return next(appError.create("User not found", 404, ERROR));
    }

    res.status(200).json({
      status: SUCCESS,
      message: "User deleted successfully",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

// Get current user
export const getCurrentUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;

    // Validate user ID
    if (!userId) {
      return next(appError.create("User not authenticated", 401, ERROR));
    }

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return next(appError.create("User not found", 404, ERROR));
    }

    // Generate JWT token
    const token = await generateJWT({
      id: user._id,
      username: user.username,
      JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    });

    res.status(200).json({
      status: SUCCESS,
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};
