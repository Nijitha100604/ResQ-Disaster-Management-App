import {ScrollView,Platform, View, StyleSheet,Image, Dimensions, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView,} from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import {Link} from "expo-router";

const { width } = Dimensions.get("window");

export default function Signup() {

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

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [location, setLocation] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");


    const handleSubmit = () =>{
      if(!username.trim()){
        Alert.alert("Validation Error","Full Name is required");
        return;
      }
      if(!email.trim()){
        Alert.alert("Validation Error","Email is required");
        return;
      }
      if(!mobile.trim()){
        Alert.alert("Validation Error","Phone number is required");
        return;
      }
      if(!location.trim()){
        Alert.alert("Validation Error","Location is required");
        return;
      }
      if(!password.trim()){
        Alert.alert("Validation Error","Password is required");
        return;
      }
      if(!confirmPassword.trim()){
        Alert.alert("Validation Error","Please confirm password");
        return;
      }
      if(password !== confirmPassword){
        Alert.alert("Validation Error","Password mismatch");
        return;
      }
      Alert.alert("Success", "User Created");
    }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
    <ScrollView className="flex-1 bg-green-200" contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">

      {/* Signup header */}
      <View className="items-center mt-10 mb-6 gap-4">
        <View style={styles.imageWrapper}>
          <Image 
            source={require("../../assets/images/logo.png")}
            style={styles.illustrationImage}
            resizeMode = "contain"
          />
        </View>
        <Text className="text-gray-900 text-lg font-semibold">Join Disaster Relief Platform</Text>
        <Text className="text-md font-medium text-gray-600">Create an account</Text>
      </View>

      {/* Sign up details */}
      <View className="bg-white rounded-2xl p-6 mx-7 mb-10 shadow-md border border-gray-400 mt-2">
        <Text className="text-center font-semibold text-lg"><Text className="text-green-700 text-xl">User</Text> Signin</Text>
        <View className="mt-5">

          {/* Fullname details */}
          <View className="mb-6">
            <Text className="text-[14px] mb-4 text-gray-900 font-medium">Full Name <Text className="text-red-600">*</Text></Text>
            <View className="flex-row items-center bg-gray-200 rounded-xl px-3">
              <Ionicons 
                className="mr-5"
                name="person-outline"
                size={20}
                color="gray"
              />
              <TextInput 
                className="flex-1 h-14"
                placeholder="Enter your name"
                value={username}
                onChangeText={setUsername}
              />
            </View>
          </View>

          {/* Email details */}
          <View className="mb-6">
            <Text className="text-[14px] mb-4 text-gray-900 font-medium">Email Address <Text className="text-red-600">*</Text></Text>
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
              />
            </View>
          </View>

          {/* Mobile details */}

          <View className="mb-6">
            <Text className="text-[14px] mb-4 text-gray-900 font-medium">Phone Number <Text className="text-red-600">*</Text></Text>
            <View className="flex-row items-center bg-gray-200 rounded-xl px-3">
              <Ionicons 
                className="mr-5"
                name="call-outline"
                size={20}
                color="gray"
              />
              <TextInput 
                className="flex-1 h-14"
                placeholder="Enter your phone number"
                value={mobile}
                onChangeText={setMobile}
              />
            </View>
          </View>

          {/* Location details */}

          <View className="mb-6">
            <Text className="text-[14px] mb-4 text-gray-900 font-medium">Location <Text className="text-red-600">*</Text></Text>
            <View className="flex-row items-center bg-gray-200 rounded-xl px-3">
              <Ionicons 
                className="mr-5"
                name="location-outline"
                size={20}
                color="gray"
              />
              <TextInput 
                className="flex-1 h-14"
                placeholder="City, State"
                value={location}
                onChangeText={setLocation}
              />
            </View>
          </View>

          {/* Password details*/}
          <View className="mb-6">
            <Text className="text-[14px] mb-4 text-gray-900 font-medium">Password <Text className="text-red-600">*</Text></Text>
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

          {/* Confirm Password */}

          <View className="mb-6">
            <Text className="text-[14px] mb-4 text-gray-900 font-medium">Confirm Password <Text className="text-red-600">*</Text></Text>
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
                  value={confirmPassword}
                  onChangeText={setConfirmPassword} 
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

          {/* Signin button */}

          <TouchableOpacity className="bg-gray-700 rounded-xl py-4 mt-6" onPress={handleSubmit}>
            <Text className="text-white text-center font-semibold">Create account</Text>
          </TouchableOpacity>

          {/* Footer */}
          <View className="flex-row items-center justify-center mt-10 mb-5">
            <Text className="text-gray-600">Already have an account? </Text>
            <Link href="/(auth)" asChild>
              <TouchableOpacity>
                <Text className="text-green-700 font-semibold">Login here</Text>
              </TouchableOpacity>
            </Link>
          </View>

        </View>
      </View>

    </ScrollView>
    </KeyboardAvoidingView>
  )
}