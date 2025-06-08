import { useState } from "react";
import { uploadMedia } from "../../services/mediaService";
import { CiNoWaitingSign } from "react-icons/ci";
import type { Media } from "../../types/mediaTypes";
import type { Dispatch, SetStateAction } from "react";
import Spinner from "../ui/Spinner";

export default function UploadForm({
  setMedia,
}: {
  setMedia: Dispatch<SetStateAction<Media[]>>;
}) {
  const [filePath, setFilePath] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [type, setType] = useState<"image" | "video" | "textOnly">("textOnly");
  const [loading, setLoading] = useState<boolean>(false);

  async function handelSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      if (!filePath) {
        setType("textOnly");
      }

      const post = await uploadMedia(filePath!, title, description, type);

      if (post) {
        setMedia((prevMedia) => [...prevMedia, post.data]);
        setFilePath(null);
        setTitle("");
        setDescription("");
        setType("textOnly");
      }
    } catch (error) {
      console.error("Error uploading Post:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <form className="flex flex-col space-y-5" onSubmit={handelSubmit}>
        <div className="flex flex-row gap-4 ">
          <label className="">Titel</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-200 rounded-md hover:border-gray-400  has-focus:border-gray-900 "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col ">
          <label className="">Description</label>
          <textarea
            rows={2}
            className="w-full text-xs p-2 border border-gray-200 rounded-md hover:border-gray-400  has-focus:border-gray-900 "
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-row justify-between">
          <label htmlFor="file" className="cursor-pointer text-gray-700">
            {filePath ? filePath.name : "📁 Upload Image or Video"}
          </label>
          {filePath && (
            <button
              onClick={() => {
                setFilePath(null);
                setType("textOnly");
              }}
            >
              <CiNoWaitingSign className="text-red-500 cursor-pointer" />
            </button>
          )}
          <input
            id="file"
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setFilePath(e.target.files[0]);
                setType(
                  e.target.files[0].type.startsWith("video") ? "video" : "image"
                );
              }
            }}
          />
        </div>
        <button
          className="disabled:bg-[#adadad] bg-[#333333] text-white py-2 px-4 rounded-full cursor-pointer transition-colors duration-300 ease-in-out"
          type="submit"
          disabled={(!title || !description) && !filePath}
        >
          Upload
        </button>
      </form>
    </div>
  );
}
