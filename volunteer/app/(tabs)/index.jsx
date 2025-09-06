import { View, Text, Dimensions, Platform, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native'
import React from 'react';
import { Image } from "expo-image";
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get("window");

export default function dashboard() {

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

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <ScrollView className="flex-1 bg-green-200 p-6" showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 , paddingBottom: 50}} keyboardShouldPersistTaps="handled">

      {/* Dashboard header */}
      <View className="flex-row items-center gap-3 mb-3">
          <View style={styles.imageWrapper}>
          <Image 
            source={require("../../assets/images/logo.png")}
            style={styles.illustrationImage}
            resizeMode = "contain"
          />
          </View>
          <Text className="text-gray-600 text-md font-semibold">Disaster Response Platform</Text>
      </View>

      {/* Dashboard Title */}
      <View className="mt-5">
        <View className="flex-row justify-between">
          <Text className="font-semibold text-lg">Volunteer Dashboard</Text>
          <View className="border border-green-800 rounded-lg px-3 py-1 bg-green-900">
            <Text className="text-white font-medium">Active Volunteer</Text>
          </View>
        </View>
        <View className="mt-5 items-center">
          <Text className="text-gray-600 text-md">Welcome back, Sarah Johnson!</Text>
        </View>
      </View>

      {/* Dashboard details */}
      <View className="mt-8 mx-10">
      
        {/* Total tasks */}
        <View className="w-full bg-white border border-gray-300 rounded-2xl p-5 mb-5">
          <View className="flex-row gap-8">
            <View className="w-12 h-12 bg-sky-200 rounded-full items-center justify-center border border-blue-500">
              <Ionicons name="people-outline" size={24} color="#0369A1" />
            </View>
            <View className="flex-col gap-2">
              <Text className="text-gray-500 font-medium">Total tasks</Text>
              <Text className="font-semibold text-xl text-center">10</Text>
            </View>
          </View>
        </View>

        {/* Active tasks */}
        <View className="w-full bg-white border border-gray-300 rounded-2xl p-5 mb-5">
          <View className="flex-row gap-8">
            <View className="w-12 h-12 bg-yellow-200 rounded-full items-center justify-center border border-yellow-500">
              <Ionicons name="time-outline" size={24} color="orange" />
            </View>
            <View className="flex-col gap-2">
              <Text className="text-gray-500 font-medium">Active tasks</Text>
              <Text className="font-semibold text-xl text-center">1</Text>
            </View>
          </View>
        </View>

        {/* Completed tasks */}
        <View className="w-full bg-white border border-gray-300 rounded-2xl p-5 mb-5">
          <View className="flex-row gap-8">
            <View className="w-12 h-12 bg-green-200 rounded-full items-center justify-center border border-green-500">
              <Ionicons name="checkmark-circle-outline" size={24} color="green" />
            </View>
            <View className="flex-col gap-2">
              <Text className="text-gray-500 font-medium">Completed</Text>
              <Text className="font-semibold text-xl text-center">7</Text>
            </View>
          </View>
        </View>


        {/* Critical tasks */}
        <View className="w-full bg-white border border-gray-300 rounded-2xl p-5 mb-5">
          <View className="flex-row gap-8">
            <View className="w-12 h-12 bg-red-200 rounded-full items-center justify-center border border-red-500">
              <Ionicons name="warning-outline" size={24} color="red" />
            </View>
            <View className="flex-col gap-2">
              <Text className="text-gray-500 font-medium">Critical tasks</Text>
              <Text className="font-semibold text-xl text-center">2</Text>
            </View>
          </View>
        </View>

      </View>

      </ScrollView>
    </KeyboardAvoidingView>
  )
}