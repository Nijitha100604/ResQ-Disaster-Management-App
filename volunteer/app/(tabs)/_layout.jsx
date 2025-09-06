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
          title: "Dashboard",
          tabBarIcon: ({color, size}) =>(<Ionicons name="grid-outline" size={size} color={color}/>)
        }}
      />
      <Tabs.Screen name="tasks" 
        options={{
          title: "Tasks",
          tabBarIcon: ({color, size}) =>(<Ionicons name="create-outline" size={size} color={color}/>)
        }}
      />
      <Tabs.Screen name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({color, size}) =>(<Ionicons name="person-outline" size={size} color={color}/>)
        }} 
      />
    </Tabs>
  );
}
