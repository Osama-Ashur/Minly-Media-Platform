import type { Media } from "../../types/mediaTypes";
import { likeMedia } from "../../services/mediaService";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import moment from "moment";

export default function MediaCard({ media }: { media: Media }) {
  const [post, setPost] = useState<Media>(media);
  const [isLiked, setIsLiked] = useState(false);
  const { user } = useAuth();

  const handleLike = async (_id: string) => {
    try {
      const postLike = await likeMedia(_id);
      if (postLike) {
        setPost((prevPost) => ({
          ...prevPost,
          likes: postLike.likes,
          likedBy: postLike.likedBy,
        }));
      }
    } catch (error) {
      console.error("Error liking media:", error);
    }
  };

  useEffect(() => {
    if (user?.username && post.likedBy.includes(user.username)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [post.likedBy, user]);

  return (
    <div className="bg-white mx-auto rounded-xl shadow-md overflow-hidden">
      <div className="p-4">
        <h2>{post.ownerName}</h2>

        <h3 className="text-xs text-gray-400">
          {moment(post.createdAt).calendar()}
        </h3>
        <div className="flex justify-between items-center py-2">
          <h3 className="font-semibold truncate">{post.title || "Untitled"}</h3>
        </div>

        <p className="text-gray-600 my-2">
          {post.description || "No description provided."}
        </p>

        {post.type === "image" ? (
          <img
            src={post.filePath}
            alt={post.title || "Media"}
            className="w-full h-96 object-cover"
          />
        ) : post.type === "video" ? (
          <video
            src={post.filePath}
            className="w-full h-96 object-cover"
            controls
          />
        ) : null}
        <div className="flex items-center justify-between mt-4">
          <div
            className={`border rounded-full mt-5 py-2 transition-colors duration-200 px-4 cursor-pointer ${
              isLiked
                ? "border-[#e02037] bg-[#e02037] text-white"
                : "text-gray-400"
            }`}
            onClick={() => handleLike(post._id)}
          >
            <span>{post.likes} likes</span>
          </div>
        </div>
      </div>
    </div>
  );
}
