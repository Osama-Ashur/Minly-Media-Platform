import { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import api from "../services/api";
import { useVideoPlayer, VideoView } from "expo-video";
import type { Media } from "@/constant/Media";
import type { Dispatch, SetStateAction } from "react";

export default function Upload({
  setMedia,
}: {
  setMedia: Dispatch<SetStateAction<Media[]>>;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filePath, setFilePath] = useState<File | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const player = useVideoPlayer(filePath?.uri, (player) => {
    player.loop = true;
    player.play();
  });

  useEffect(() => {
    if ((!title || !description) && !filePath) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [title, description, filePath]);

  const pickMedia = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, // allow both image & video
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setFilePath(result.assets[0]);
    }
  };

  const handleUpload = async () => {
    try {
      if (isDisabled) {
        alert("Please fill in all fields or select a media file.");
        return;
      }

      const formData = new FormData();
      formData.append("filePath", filePath?.file);
      formData.append("title", title);
      formData.append("description", description);
      formData.append(
        "type",
        filePath?.file?.type.startsWith("video") ? "video" : "image"
      );

      const newPost = await api.post("/media/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (newPost) {
        setMedia((prevMedia) => [...prevMedia, newPost.data.data]);
        setTitle("");
        setDescription("");
        setFilePath(null);
      }
    } catch (error) {
      console.error("Error uploading media:", error);
      alert("Failed to upload media. Please try again.");
    }
  };

  return (
    <View className="flex flex-col p-4 bg-white">
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        className="border p-3 mb-3 rounded"
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        className="border p-3 mb-3 rounded"
      />
      {!filePath ? (
        <TouchableOpacity onPress={pickMedia} className="p-3 mb-4 rounded">
          <Text className="text-center">📁 Upload Image or Video</Text>
        </TouchableOpacity>
      ) : (
        <View className="mb-4">
          {filePath.type.startsWith("image") ? (
            <Image
              source={{ uri: filePath.uri }}
              className="w-full h-48 rounded"
            />
          ) : (
            <VideoView
              className="w-full h-60 rounded-lg"
              player={player}
              allowsFullscreen
              allowsPictureInPicture
            />
          )}
          <TouchableOpacity
            onPress={() => setFilePath(null)}
            className="p-2 rounded mt-2"
          >
            <Text className="text-center">🚫 Remove Media</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity
        onPress={handleUpload}
        className={`${
          isDisabled ? "bg-[#adadad]" : "bg-[#333333]"
        }  p-3 rounded transition-colors duration-300 ease-in-out `}
        disabled={isDisabled}
      >
        <Text className="text-white text-center">Upload</Text>
      </TouchableOpacity>
    </View>
  );
}
