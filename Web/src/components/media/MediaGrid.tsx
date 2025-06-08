import MediaCard from "./MediaCard";
import type { Media } from "../../types/mediaTypes";

export default function MediaGrid({ mediaList }: { mediaList: Media[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 ">
      {mediaList.map((media) => (
        <MediaCard key={media._id} media={media} />
      ))}
    </div>
  );
}
