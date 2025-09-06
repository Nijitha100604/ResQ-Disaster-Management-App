import { View, Text, Dimensions, Platform, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native'
import React from 'react';
import { Image } from "expo-image";
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get("window");

export default function profile() {

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
        
        {/* Profile header */}
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

        {/* Profile Title */}
        <View className="mt-5">
            <Text className="font-semibold text-lg">Volunteer Profile</Text>
        </View>

        {/* Volunteer details */}
        <View className="bg-white rounded-lg border border-gray-600 p-5 mt-5">
            
            {/* name and profile pic */}
            <View className="flex-row gap-5 items-center">
              <View className="w-14 h-14 border rounded-full items-center bg-gray-300">
                <Ionicons 
                  name="person-outline"
                  size={35}
                />
              </View>
              <View className=" flex-col gap-2">
                <Text className="font-semibold text-lg">Sarah Johnson</Text> 
                <Text className="text-white bg-green-700 border rounded-lg font-medium">Active Volunteer</Text>
              </View>
            </View>

            {/* email, mobile, location */}
            <View className="mt-3 p-3">
              {/* email */}
              <View className="flex-row gap-3 mb-2">
                <Ionicons 
                  name="mail-outline"
                  size={20}
                  color="gray"
                />
                <Text>sarah@gmail.com</Text>
              </View>

              {/* Mobile */}
              <View className="flex-row gap-3 mb-2">
                <Ionicons 
                  name="call-outline"
                  size={20}
                  color="gray"
                />
                <Text>9876543210</Text>
              </View>

              {/* Location */}
              <View className="flex-row gap-3">
                <Ionicons 
                  name="location-outline"
                  size={20}
                  color="gray"
                />
                <Text>123, Main Street, San Fransisco</Text>
              </View>

              
            </View>
            
        </View>

        {/* Completed tasks */}

        <Text className="font-semibold mt-5 text-lg mb-3">Completed Tasks</Text>

        <View className="bg-white rounded-lg border border-gray-600 p-2 mb-3">
          <View className="flex-row justify-between">
            <View>
              <Text className="font-semibold text-md">Power outage in Downtown area</Text>
            </View>
          
            <Text className="text-green-700 text-center font-semibold">Resolved</Text>
          </View>
          <View className="mt-2 flex-row gap-1">
            <Ionicons name="location-outline" size={15} color="gray" />
            <Text className="text-sm text-gray-600">123, Main Street, Downtown</Text>
          </View>
          <Text className="text-sm mt-2 ml-2 text-gray-500">2 hours ago</Text>
        </View>

        <View className="bg-white rounded-lg border border-gray-600 p-2 mb-3">
          <View className="flex-row justify-between">
            <View>
              <Text className="font-semibold text-md">Road blockage due to fallen tree</Text>
            </View>
          
            <Text className="text-green-700 text-center font-semibold">Resolved</Text>
          </View>
          <View className="mt-2 flex-row gap-1">
            <Ionicons name="location-outline" size={15} color="gray" />
            <Text className="text-sm text-gray-600">123, Main Street, Downtown</Text>
          </View>
          <Text className="text-sm mt-2 ml-2 text-gray-500">6 hours ago</Text>
        </View>

        <View className="bg-white rounded-lg border border-gray-600 p-2 mb-3">
          <View className="flex-row justify-between">
            <View>
              <Text className="font-semibold text-md">Flood reported on downtown</Text>
            </View>
          
            <Text className="text-green-700 text-center font-semibold">Resolved</Text>
          </View>
          <View className="mt-2 flex-row gap-1">
            <Ionicons name="location-outline" size={15} color="gray" />
            <Text className="text-sm text-gray-600">123, Main Street, Downtown</Text>
          </View>
          <Text className="text-sm mt-2 ml-2 text-gray-500">6 hours ago</Text>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  )
}