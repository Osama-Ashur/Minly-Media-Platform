import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function NotFoundScreen() {
  return (
    <View className="flex-1 items-center justify-center p-5 bg-white">
      <Ionicons name="alert-circle-outline" size={80} color="#666" />
      <Text className="text-2xl font-bold mt-5 mb-2.5 text-gray-800">
        Page Not Found
      </Text>
      <Text className="text-base text-center text-gray-600 mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </Text>
      <TouchableOpacity
        onPress={() => router.back()}
        className="bg-[#e02037] px-5 py-3 rounded-lg shadow-md"
      >
        <Text className="text-white text-base font-semibold">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}
