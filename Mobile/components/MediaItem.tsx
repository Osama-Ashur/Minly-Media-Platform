import { View, Text, Image, TouchableOpacity } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import moment from "moment";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function MediaItem({ item, onLike }: any) {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);

  const player = useVideoPlayer(item.filePath, (player) => {
    player.loop = true;
    player.play();
  });

  useEffect(() => {
    if (user?.username && item.likedBy.includes(user.username)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [item.likedBy, user]);

  return (
    <View className="mb-4 bg-white rounded-xl shadow p-4">
      <Text className="font-bold text-lg">{item.ownerName}</Text>
      <Text className="text-gray-400 text-xs">
        {moment(item.createdAt).calendar()}
      </Text>
      <Text className="mt-2  text-sm">{item.title}</Text>
      <Text className="text-gray-600 my-2">{item.description}</Text>

      {item.filePath ? (
        item.type === "video" ? (
          <VideoView
            className="w-full h-60 rounded-lg"
            player={player}
            allowsFullscreen
            allowsPictureInPicture
          />
        ) : (
          <Image
            source={{ uri: item.filePath }}
            className="w-full h-60 rounded-lg"
            resizeMode="contain"
          />
        )
      ) : null}

      {isLiked ? (
        <TouchableOpacity
          className="border rounded-full border-[#e02037] bg-[#e02037] w-1/4 mt-5 py-2 transition-colors duration-200"
          onPress={() => onLike(item._id)}
        >
          <Text className="text-white text-center  text-nowrap">
            {item.likes} Likes
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          className="border rounded-full border-gray-600 w-1/4 mt-5 py-2 transition-colors duration-200"
          onPress={() => onLike(item._id)}
        >
          <Text className="text-gray-600 text-center text-nowrap">
            {item.likes} Likes
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
