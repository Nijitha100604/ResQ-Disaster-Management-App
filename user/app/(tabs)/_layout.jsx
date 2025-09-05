import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs 
      screenOptions={{ 
        headerShown: false,
        tabBarActiveTintColor: "#4CAF50" ,
        headerTitleStyle:{
          color: "#2e5a2e",
          fontWeight: "600"
        },
        headerShadowVisible: false,
        tabBarStyle:{
          backgroundColor: "#f1f8f2",
          borderTopWidth: 1,
          borderTopColor: "#c8e6c9",
          paddingTop: 5,
          paddingBottom: insets.bottom,
          height: 60 + insets.bottom
        }
      }}
    >
      <Tabs.Screen name="index" 
        options={{
          title: "Home",
          tabBarIcon: ({color, size}) =>(<Ionicons name="home-outline" size={size} color={color}/>)
        }}
      />
      <Tabs.Screen name="create" 
        options={{
          title: "Create",
          tabBarIcon: ({color, size}) =>(<Ionicons name="add-circle-outline" size={size} color={color}/>)
        }}
      />
      <Tabs.Screen name="sos"
        options={{
          title: "SOS",
          tabBarIcon: ({color, size}) =>(<Ionicons name="warning" size={size} color={color}/>)
        }} 
      />
    </Tabs>
  );
}
