import { 
  View, Text, Dimensions, ScrollView, Platform, 
  KeyboardAvoidingView, StyleSheet, TouchableOpacity 
} from 'react-native';
import React, { useState } from 'react';
import { Image } from "expo-image";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function Tasks() {
  const [taskStatus, setTaskStatus] = useState("start"); 

  const styles = StyleSheet.create({
    illustrationImage: {
      width: width * 0.15,
      height: width * 0.15,
    },
    imageWrapper: {
      width: width * 0.15,
      height: width * 0.15,
      backgroundColor: "#E5E5E5",
      borderRadius: (width * 0.20) / 2,
      overflow: "hidden",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 6,
    },
  });

  // Handle button press to cycle task states
  const handleTaskPress = () => {
    if (taskStatus === "start") {
      setTaskStatus("inProgress");
    } else if (taskStatus === "inProgress") {
      setTaskStatus("completed");
    }
  };

  // Map status to button label + styles
  const getButtonConfig = () => {
    switch (taskStatus) {
      case "start":
        return { label: "Start Task", bgColor: "bg-black" };
      case "inProgress":
        return { label: "In Progress", bgColor: "bg-yellow-500" };
      case "completed":
        return { label: "Completed", bgColor: "bg-green-600" };
      default:
        return { label: "Start Task", bgColor: "bg-black" };
    }
  };

  const { label, bgColor } = getButtonConfig();
  const router = useRouter();

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={{ flex: 1 }}
    >
      <ScrollView 
        className="flex-1 bg-green-200 p-6" 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ flexGrow: 1 , paddingBottom: 50}}
        keyboardShouldPersistTaps="handled"
      >
        {/* Task header */}
        <View className="flex-row items-center gap-3 mb-3">
          <View style={styles.imageWrapper}>
            <Image 
              source={require("../../assets/images/logo.png")}
              style={styles.illustrationImage}
              resizeMode="contain"
            />
          </View>
          <Text className="text-gray-600 text-md font-semibold">
            Disaster Response Platform
          </Text>
        </View>

        {/* Task title */}
        <View className="mt-5 mb-5">
          <Text className="font-semibold text-lg">Assigned tasks</Text>
        </View>

        {/* Task details */}
        <View className="bg-white rounded-2xl shadow-md p-4 mb-4">
          <View className="flex-row justify-between items-center mb-2">
            <View>
              <Text className="text-md font-semibold text-gray-900">
                Flood reported on Main Street
              </Text>
              <View className="mt-2 flex-row gap-1">
                <Ionicons name="location-outline" size={15} color="gray" />
                <Text className="text-sm text-gray-600">
                  123, Main Street, Springfield
                </Text>
              </View>
            </View>

            <View>
              <Text className="px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-md text-center mb-2">
                HIGH
              </Text>
              <Text className="px-2 py-1 text-xs font-bold text-blue-500 bg-blue-100 rounded-md text-center">
                Assigned
              </Text>
            </View>  
          </View>

          <View className="flex-row mt-4 gap-8">
            <View className="flex-row gap-1">
              <Ionicons name="time-outline" size={15} color="gray" />
              <Text className="text-gray-500 text-sm">Assigned 1 hour ago</Text>
            </View>

            <View className="flex-row gap-1">
              <Ionicons name="warning-outline" size={15} color="gray" />
              <Text className="text-gray-500 text-sm">Est. 4-5 hours</Text>
            </View>
          </View>

          <View className="mt-3 flex-row gap-2">
            <Ionicons name="call-outline" size={15} color="gray" />
            <Text className="text-gray-500 text-sm">
              Contact: +91 9876543210
            </Text>
          </View>

          {/* Buttons */}
          <View className="mt-5 flex-row justify-between">
            <TouchableOpacity className="flex-1 flex-row items-center justify-center border border-gray-300 rounded-xl py-2 mr-2" onPress={() => router.push("/mapScreen")} >
              <Ionicons name="navigate-outline" size={18} color="black" />
              <Text className="ml-1 font-medium text-black">Navigate</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              className={`flex-1 ${bgColor} rounded-xl py-2 ml-2`} 
              onPress={handleTaskPress}
              disabled={taskStatus === "completed"}
            >
              <Text className="text-center font-medium text-white">
                {label}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
