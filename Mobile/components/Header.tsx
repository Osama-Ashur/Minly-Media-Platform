import { router } from "expo-router";
import { View, Text, TouchableOpacity, Image } from "react-native";
import logoImage from "../assets/images/minly_logo1.png";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  const Logout = async () => {
    await logout();
    router.replace("/Login");
  };

  return (
    <View className="bg-[#e02037] shadow-lg">
      <View className="px-5 md:px-10 py-3 flex-row justify-between items-center">
        {/* Logo Section */}
        <TouchableOpacity onPress={() => router.push("/MediaFeed")}>
          <Image
            source={logoImage}
            style={{ width: 80, height: 80 }}
            alt="Minly Logo"
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Navigation Section */}
        <View>
          {user ? (
            <View className="flex-row items-center space-x-4 md:space-x-10">
              <View>
                <Text className="text-white font-bold">{user?.username}</Text>
              </View>
              <TouchableOpacity
                onPress={Logout}
                className="bg-white px-4 py-2 rounded-lg"
              >
                <Text className="text-[#e02037] font-semibold">Logout</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => router.push("/Login")}
              className="bg-white px-4 py-2 rounded-lg"
            >
              <Text className="text-[#e02037] font-semibold">Login</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
