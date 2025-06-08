import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";
import Logo from "../assets/images/minly_logo1.png";
import { useAuth } from "@/context/AuthContext";
import Spinner from "@/components/Spinner";

export default function Login() {
  const [email, setEmail] = useState("osama2k2@gmail.com");
  const [password, setPassword] = useState("osama123");
  const { login, user, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  if (user) {
    router.replace("/MediaFeed");
  }

  const handleLogin = async () => {
    if (email && password) {
      try {
        await login(email, password);
        router.replace("/MediaFeed");
      } catch (error) {
        console.error("Login failed:", error);
        alert("Login failed. Please check your credentials.");
      }
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <View className="flex items-center mb-6">
        <Image
          source={Logo}
          className="items-center "
          style={{ width: 80, height: 80 }}
          alt="Minly Logo"
          resizeMode="contain"
        />
      </View>
      <Text className="text-3xl font-bold mb-6 text-center">Login</Text>
      <TextInput
        placeholder="Your email address"
        value={email}
        onChangeText={setEmail}
        className="border p-3 mb-4 rounded"
      />
      <TextInput
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="border p-3 mb-6 rounded"
      />
      <TouchableOpacity className="bg-black p-3 rounded" onPress={handleLogin}>
        <Text className="text-white text-center">Log in</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/Register")}>
        <Text className="text-center text-[#e02037] mt-4">
          Don't have an account? Register
        </Text>
      </TouchableOpacity>
    </View>
  );
}
