export interface Media {
  _id: string;
  type: "image" | "video" | "textOnly";
  title?: string;
  likes: number;
  likedBy: string[];
  description?: string;
  filePath: string;
  owner: string;
  ownerName: string;
  createdAt: string;
  updatedAt: string;
}
