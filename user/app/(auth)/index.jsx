import {ScrollView, Text, View, Dimensions, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform  } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from "expo-image";
import {Ionicons} from "@expo/vector-icons";
import {Link, useRouter} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width } = Dimensions.get("window");

export default function Login() {

  const styles = StyleSheet.create({
    illustrationImage: {
      width: width * 0.25,
      height: width * 0.25,
    },
    imageWrapper: {
      width: width * 0.25,
      height: width * 0.25,
      backgroundColor: "#E5E5E5",
      borderRadius: (width * 0.35) / 2,
      overflow: "hidden",

      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 6,
    },
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  useEffect(()=>{
    loadCredentials();
  }, []);

  const loadCredentials = async () => {
    try {
      const savedEmail = await AsyncStorage.getItem("email");
      const savedPassword = await AsyncStorage.getItem("password");
      if (savedEmail && savedPassword) {
        setEmail(savedEmail);
        setPassword(savedPassword);
        setRememberMe(true);
      }
    } catch (error) {
        console.log("Error loading saved credentials:", error);
    }
  };

  const handleLogin = async() =>{
    if(rememberMe){
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("password", password);
    }
    else {
      await AsyncStorage.removeItem("email");
      await AsyncStorage.removeItem("password");
    }
    router.replace("/(tabs)/index")
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
    <ScrollView className="flex-1 bg-green-200" contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">

      {/* Login header */}

      <View className="items-center mt-10 mb-6 gap-4">
        <View style={styles.imageWrapper}>
          <Image 
            source={require("../../assets/images/logo.png")}
            style={styles.illustrationImage}
            resizeMode = "contain"
          />
        </View>
        <Text className="text-gray-900 text-lg font-semibold">Disaster Response Platform</Text>
      </View>

      {/* login details */}

      <View className="bg-white rounded-2xl p-6 mx-7 shadow-md border border-gray-400 mt-5">
        <Text className="text-center font-semibold text-lg"><Text className="text-green-700 text-xl">User</Text> Login</Text>
        <View className="mt-5">

          {/* Email details */}

          <View className="mb-6">
            <Text className="text-[14px] mb-4 text-gray-900 font-medium">Email</Text>

            <View className="flex-row items-center bg-gray-200 rounded-xl px-3">
              <Ionicons 
                className="mr-5"
                name="mail-outline"
                size={20}
                color="gray"
              />
              <TextInput
                className="flex-1 h-14"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                autoCapitalize='none' 
              />
            </View>

          </View>

          {/* Password details */}
          <View className="mb-10">
            <Text className="text-[14px] mb-4 text-gray-900 font-medium">Password</Text>
            <View className="flex-row items-center bg-gray-200 rounded-xl px-3">
              <Ionicons 
                className="mr-5"
                name="lock-closed-outline"
                size={20}
                color="gray"
              />
              <TextInput
                className="flex-1 h-14"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword} 
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={()=>setShowPassword(!showPassword)} className="mr-3">
                <Ionicons 
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Options */}
          <View className="flex-row justify-between items-center">
            <TouchableOpacity className="flex-row items-center" onPress={() => setRememberMe(!rememberMe)}>
               <Ionicons
                name={rememberMe ? "checkbox" : "square-outline"}
                size={20}
                color={rememberMe ? "green" : "gray"}
                className="mr-2"
              />
              <Text className="text-gray-600 text-sm">Remember me</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text className="text-green-700 text-sm">Forgot password?</Text>
            </TouchableOpacity>
          </View>

          {/* Login button */}
          <TouchableOpacity className="bg-gray-700 rounded-xl py-4 mt-6" onPress={handleLogin}>
            <Text className="text-white text-center font-semibold">Login as user</Text>
          </TouchableOpacity>

          {/* Footer */}
          <View className="flex-row items-center justify-center mt-10 mb-5">
            <Text className="text-gray-600">Dont have an acount?  </Text>
            <Link href="/(auth)/signup" asChild>
              <TouchableOpacity>
                <Text className="text-green-700 font-semibold">Signup here</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>

      <View>
        
      </View>


    </ScrollView>
    </KeyboardAvoidingView>
  )
}