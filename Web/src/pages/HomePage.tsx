import { useEffect, useState } from "react";
import MediaGrid from "../components/media/MediaGrid";
import { getMedia } from "../services/mediaService";
import type { Media } from "../types/mediaTypes";
import Spinner from "../components/ui/Spinner";
import UploadForm from "../components/media/UploadForm";

export default function HomePage() {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await getMedia();
        setMedia(response.data?.data);
      } catch (error) {
        console.error("Failed to fetch media", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col items-center justify-center container mx-auto p-4 space-y-10 ">
      <h1 className="text-2xl font-bold mb-4">Media Feed</h1>
      <UploadForm setMedia={setMedia} />
      <MediaGrid mediaList={media} />
    </div>
  );
}
