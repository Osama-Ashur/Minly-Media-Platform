import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import api from "../services/api";
import MediaItem from "../components/MediaItem";
import Header from "../components/Header";
import { router } from "expo-router";
import { Media } from "@/constant/Media";
import Upload from "../components/Upload";
import Spinner from "@/components/Spinner";
import Footer from "@/components/Footer";

export default function MediaFeed() {
  const [media, setMedia] = useState<Media[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    api
      .get("/media")
      .then((res) => {
        setMedia(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching media:", error);
        router.push("/Login");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleLike = async (id: string) => {
    try {
      const newPost = await api.put(`/media/${id}/like`);
      setMedia((prevMedia) =>
        prevMedia.map((item) =>
          item._id === id
            ? {
                ...item,
                likes: newPost.data.data.likes,
                likedBy: newPost.data.data.likedBy,
              }
            : item
        )
      );
    } catch (error) {
      console.error("Error liking media:", error);
      alert("Failed to like the media. Please try again.");
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <View className="flex-1 bg-gray-100">
      <Header />
      <FlatList
        data={media}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <MediaItem item={item} onLike={handleLike} />}
        className="p-4"
        ListHeaderComponent={() => (
          <View>
            <Upload setMedia={setMedia} />
          </View>
        )}
        ListFooterComponent={() => (
          <View>
            <Footer />
          </View>
        )}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
}
