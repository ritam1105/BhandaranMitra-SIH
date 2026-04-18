import { Stack } from "expo-router";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import './globals.css';

export default function RootLayout() {
  // This is important for NativeWind to work
  useEffect(() => {
    StyleSheet.create({});
  }, []);

  return <Stack />;
}