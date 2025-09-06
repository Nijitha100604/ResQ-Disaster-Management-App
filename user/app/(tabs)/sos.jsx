import { View, Text, Dimensions, Platform, StyleSheet, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import { Image } from "expo-image";
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get("window");

export default function Sos() {

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

  const [helpRequested, setHelpRequested] = useState(false);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <ScrollView className="flex-1 bg-green-200 p-6" showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 , paddingBottom: 50}} keyboardShouldPersistTaps="handled">
      
      {/* SOS header */}
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

      {/* Title */}

      <View className="mt-2 items-center flex-col gap-2">
        <Text className="text-gray-900 text-xl font-bold">Emergency Report Center</Text>
        <Text className="text-sm text-gray-600">Request immediate assistance</Text>
      </View>

      {/* SOS content */}

      {helpRequested &&

      <View className="mt-10 flex-row gap-7 justify-center items-center border bg-white border-red-600 p-5 rounded-lg">
        <Ionicons 
          name="warning-outline"
          color="red"
          size={20}
          className="ml-10"
        />
        <Text className="text-lg text-red-500">Emergency services have been contacted. Help is on the way!</Text>
      </View>
      
      }

      <View className={`${helpRequested ? "mt-6" : "mt-20" }`}>
        <View className="w-full items-center rounded-2xl bg-white p-6 shadow-lg">
          <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <Ionicons name="call-outline" size={28} color="red" />
          </View>
          <Text className="text-lg font-semibold text-gray-900">Emergency SOS</Text>
          <Text className="mt-2 text-center text-sm text-gray-500">Press for immediate emergency assistance</Text>

          {/* Button */}
          <TouchableOpacity className={`mt-6 w-full rounded-lg py-6 ${helpRequested ? "bg-gray-400" : "bg-red-600"}`} onPress={()=>setHelpRequested(!helpRequested)}>
            <Text className="text-center text-base font-semibold text-white">{helpRequested ? "Help Requested" : "SOS EMERGENCY"}</Text>
          </TouchableOpacity>
        </View>
      </View>


      </ScrollView>
    </KeyboardAvoidingView>
  )
}