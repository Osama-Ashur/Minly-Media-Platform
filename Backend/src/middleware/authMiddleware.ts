import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/UserModel";
import appError from "../utils/appError";
import { ERROR } from "../utils/httpStatus";
import { UserDocument } from "../models/UserModel";

interface AuthRequest extends Request {
  user?: UserDocument;
}
export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token;

    // Get token from headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(
        appError.create(
          "You are not logged in! Please log in to get access",
          401,
          ERROR
        )
      );
    }

    // Verify token
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);

    // Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        appError.create(
          "You are not logged in! Please log in to get access",
          401,
          ERROR
        )
      );
    }

    // Grant access to protected route
    req.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
};
