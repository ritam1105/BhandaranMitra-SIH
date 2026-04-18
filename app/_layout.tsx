import { Stack } from 'expo-router';
import { useAuth } from './hooks/useAuth';
import LoadingScreen from './screens/LoadingScreen';
import './globals.css';

export default function RootLayout() {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          animation: 'none',
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen
        name="dashboard"
        options={{
          animation: 'fade',
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="market"
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="history"
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          animation: 'slide_from_right',
        }}
      />
    </Stack>
  );
}
