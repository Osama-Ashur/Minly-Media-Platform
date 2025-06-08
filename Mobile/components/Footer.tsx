import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Footer() {
  return (
    <View className="bg-[#e02037] shadow-lg">
      <View className="px-5 md:px-10 py-3 flex-row justify-between items-center">
        <Text className="text-white font-bold">© Copyright 2025 Minly.</Text>
        <TouchableOpacity onPress={() => router.push("/Contact Us")}>
          <Text className="text-white font-semibold">Contact Us</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
