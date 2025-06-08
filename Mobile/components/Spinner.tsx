import { ActivityIndicator, View } from "react-native";

export default function Spinner() {
  return (
    <View className="flex justify-center items-center flex-1 ">
      <ActivityIndicator size="small" color="#e02037" />
    </View>
  );
}
