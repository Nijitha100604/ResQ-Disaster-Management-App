import { View, Text, ScrollView, StyleSheet, Dimensions, Platform, KeyboardAvoidingView } from 'react-native'
import React from 'react';
import { Image } from "expo-image";
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get("window");

export default function Home() {

  const incidents = [
    {
      description: "Flood reported on Main Street",
      status: "In Progress",
      duration: "Just now"
    },
    {
      description: "Power outage in Downtown area",
      status: "Resolved",
      duration: "4 hours ago"
    },
    {
      description: "Road blockage due to fallen tree",
      status: "Resolved",
      duration: "6 hours ago"
    }
  ];

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
        
        {/* Incident header */}
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

        {/* Incidents list */}
        
        <Text className="text-gray-900 text-lg font-bold mt-2 mb-5">Your Incidents</Text>

        {incidents.length > 0 ? 

        (incidents.map((item, index)=>(
          <View key={index} className="mb-4 rounded-xl bg-white p-4 shadow-md">
            <View className="flex-row">
              <View style={{ width: width * 0.55 }}>
                <Text className="text-base font-semibold text-gray-800">{item.description}</Text>  
              </View>
            
              <View style={{ width: 100 }} className={`rounded-lg items-center justify-center px-3 ${item.status === "Resolved"? "bg-green-200 border border-green-700": "bg-yellow-200 border border-yellow-500"}`}>
                <Text className={`text-sm font-medium ${item.status === "Resolved" ? "text-green-700" : "text-orange-500"}`} >{item.status}</Text>
              </View>
            </View>
            <Text className="mt-1 text-xs text-gray-500">{item.duration}</Text>
          </View>
        )))

        :
        (
          <View className="items-center mt-20">
            <Ionicons name="document-text-outline" size={55} color="gray" />
            <Text className="text-gray-600 mt-3 text-base font-medium">Youre all caught up! No new incidents.</Text>
          </View>
        )
        
        }     
      </ScrollView>
    </KeyboardAvoidingView>
  )
}