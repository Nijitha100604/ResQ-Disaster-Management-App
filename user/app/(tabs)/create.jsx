import { View, Text, Dimensions,StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { Image } from "expo-image";
import { Ionicons } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system"

const { width } = Dimensions.get("window");

export default function Create() {

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

    const [location, setLocation] = useState("");
    const [severity, setSeverity] = useState(null);
    const [contact, setContact] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [imageBase64, setImageBase64] = useState(null);

    const pickImage = async() =>{
    try{
      if(Platform.OS !== "web"){
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(status !== "granted"){
          Alert.alert("Permission Denied", "We need camera roll permissions to upload an image");
          return
        }
      }
      // launch image library
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [4,3],
        quality: 0.5,
        base64: true
      })

      if(!result.canceled)
      {
        setImage(result.assets[0].uri)
        if(result.assets[0].base64){
          setImageBase64(result.assets[0].base64)
        }
        else{
          const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri,{
            encoding: FileSystem.EncodingType.Base64,
          });
          setImageBase64(base64);
        }
      }
    } catch(error){
      console.log("Error picking image", error);
      Alert.alert("Error", "There was a problem selecting your image");
    }
  }


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

        {/* Title */}

        <View className="mt-2 items-center flex-col gap-2">
          <Text className="text-gray-900 text-lg font-bold">Submit Incident Report</Text>
          <Text className="text-sm text-gray-600">Provide the details about the emergency</Text>
        </View>

        {/* Incident details */}

        <View className="bg-white rounded-2xl p-6 shadow-md border border-gray-400 mt-5">
          
          {/* Title */}
          <View className="flex-row gap-2 items-center">
            <Ionicons 
              name="warning-outline"
              color="red"
              size={25}
            />
            <Text className="font-semibold text-lg text-gray-900">Incident details</Text>
          </View>

          {/* Instruction */}
           <Text className="mt-3 text-gray-500 text-sm leading-6 text-center">Please fill out all required fields to help us respond effectively</Text>

           {/* Input details */}
           <View className="mt-5">

            {/* Location details */}
            <View className="mb-6">
              <Text className="text-[14px] mb-4 text-gray-900 font-medium">Location  <Text className="text-red-600">*</Text></Text>
              <View className="flex-row items-center bg-gray-200 rounded-xl px-3">
                <Ionicons 
                  name="location-outline"
                  className="mr-5"
                  size={20}
                  color="gray"
                />
                <TextInput 
                  className="flex-1 h-14"
                  placeholder="Street address or landmark"
                  value={location}
                  onChangeText={setLocation}
                />
              </View>
            </View>

            {/* Severity level */}
            <View className="mb-6">
              <Text className="text-[14px] mb-4 text-gray-900 font-medium">Severity Level  <Text className="text-red-600">*</Text></Text>
              <View className="flex-row items-center bg-gray-200 rounded-xl px-3">
                <Ionicons 
                  name="alert-circle-outline"
                  className="mr-5"
                  size={20}
                  color="gray"
                />
                <Picker
                  selectedValue={severity}
                  onValueChange={(itemValue) => setSeverity(itemValue)}
                  style={{ flex: 1, minHeight: 46 }} // match TextInput height
                  dropdownIconColor="#4B5563" // arrow color
                >
                  <Picker.Item label="Select severity" value="" color="#4B5563" style={{ fontSize: 14 }} />
                  <Picker.Item label="Low" value="low" />
                  <Picker.Item label="Medium" value="medium" />
                  <Picker.Item label="High" value="high" />
                </Picker>
              </View>
            </View>

            {/* Description */}
            <View className="mb-6">
              <Text className="text-[14px] mb-4 text-gray-900 font-medium">Description  <Text className="text-red-600">*</Text></Text>
              <View className="flex-row items-center bg-gray-200 rounded-xl px-3">
                <Ionicons 
                  name="create-outline"
                  size={20}
                  color="gray"
                  className="mr-5"
                />
                <TextInput
                  className="flex-1 h-14"
                  placeholder="Enter detailed description..."
                  value={description}
                  onChangeText={setDescription}
                  multiline={true}
                  numberOfLines={5}
                />
              </View>
            </View>

            {/* Contact details */}
            <View className="mb-6">
              <Text className="text-[14px] mb-4 text-gray-900 font-medium">Contact Information <Text className="text-red-600">*</Text></Text>
                <View className="flex-row items-center bg-gray-200 rounded-xl px-3">
                  <Ionicons 
                    className="mr-5"
                    name="call-outline"
                    size={20}
                    color="gray"
                  />
                  <TextInput 
                    className="flex-1 h-14"
                    placeholder="Email or phone number"
                    value={contact}
                    onChangeText={setContact}
                  />
                </View>
            </View>

            {/* Photo proof */}
            <View className="mb-6">
              <Text className="text-[14px] mb-4 text-gray-900 font-medium">Photo evidence <Text className="text-red-600">*</Text></Text>
              <TouchableOpacity className=" w-full bg-gray-200 rounded-xl border border-gray-300 overflow-hidden" style={{ height: 150 }} onPress={pickImage}>
                {image ? (
                  <Image source={{uri: image}}style={{ width: "100%", height: "100%", borderRadius: 16 }} resizeMode="cover"/>
                ) : (
                  <View className="flex-1 justify-center items-center w-full">
                    <Ionicons name="image-outline" size={50} color="gray" />
                    <Text className="mt-2 text-gray-600">Tap to select image</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            {/* Buttons */}
            <View className="mb-6 mt-4 flex-row justify-between ">
              {/* Cancel button */}
              <TouchableOpacity className="bg-gray-300 px-6 py-3 rounded-lg">
                <Text className="font-semibold text-center">Cancel</Text>
              </TouchableOpacity>
              {/* Submit */}
              <TouchableOpacity className="bg-gray-900 px-6 py-3 rounded-lg">
                <Text className="text-white font-semibold text-center">Submit Incident </Text>
              </TouchableOpacity>
            </View>


           </View>

        </View>

        

      </ScrollView>
    </KeyboardAvoidingView>
  )
}