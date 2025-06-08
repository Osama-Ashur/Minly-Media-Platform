import mongoose, { Document, Model, Schema } from "mongoose";
import { UserDocument } from "./UserModel";

// Define TypeScript interface for Media document
export interface MediaDocument extends Document {
  title: string;
  type: "image" | "video" | "textOnly";
  description: string;
  filePath: string;
  likes: number;
  owner: UserDocument["_id"];
  ownerName: UserDocument["username"];
  likedBy: UserDocument["username"][];
  createdAt: Date;
  updatedAt: Date;
}

interface MediaModel extends Model<MediaDocument> {}

// Media Schema definition
const mediaSchema = new Schema<MediaDocument, MediaModel>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    type: {
      type: String,
      required: [false, "Media type is not required"],
      enum: {
        values: ["image", "video", "textOnly"],
        message: "Media type must be either 'image' or 'video'",
      },
    },
    description: {
      type: String,
      required: [false, "Description is not required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    filePath: {
      type: String,
      required: [false, "File path is required"],
    },
    likes: {
      type: Number,
      default: 0,
      min: [0, "Likes cannot be negative"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner is required"],
      index: true,
    },
    ownerName: {
      type: String,
      required: [true, "Owner name is required"],
      trim: true,
    },
    likedBy: [
      {
        type: Schema.Types.String,
        ref: "User",
        default: [],
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Create and export the model
const Media = mongoose.model<MediaDocument, MediaModel>("Media", mediaSchema);
export default Media;
