import mongoose, { Document, Model, Schema } from "mongoose";
import validator from "validator";

// Define TypeScript interface for User document
export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserModel extends Model<UserDocument> {}

// User Schema definition
const userSchema = new Schema<UserDocument, UserModel>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username Taken"],
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [30, "Username cannot exceed 30 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Create and export the model
const User = mongoose.model<UserDocument, UserModel>("User", userSchema);
export default User;
