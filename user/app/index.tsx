import { ActivityIndicator, View } from 'react-native';
import { Redirect } from 'expo-router';

// This component will be the first screen to load.
// It will immediately check where to send the user.
export default function Index() {
  
  // For now, we will always redirect to the authentication flow.
  // Your main `_layout.jsx` will then take over and decide if the
  // user should be redirected further to the (tabs) section.
  return <Redirect href="/(auth)" />;

  // --- Optional: A better UX with a loading spinner ---
  // If your app had more complex startup logic, you could show a spinner.
  // In your case, the redirect is so fast this isn't strictly necessary.
  /*
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
  */
}