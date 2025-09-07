import "../global.css";
import { Slot, useRouter, useSegments, useRootNavigationState } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import SafeScreen from "../components/SafeScreen";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const rootNavigation = useRootNavigationState();

  const isSignedIn = true;

  useEffect(() => {
    if (!rootNavigation?.key) return;

    const inAuthGroup = segments[0] === "(auth)";

    setTimeout(() => {
      if (!isSignedIn && !inAuthGroup) {
        router.replace("/(auth)");
      } else if (isSignedIn && inAuthGroup) {
        router.replace("/(tabs)");
      }
    }, 0);
  }, [isSignedIn, segments,router, rootNavigation?.key]);

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Slot />
      </SafeScreen>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
