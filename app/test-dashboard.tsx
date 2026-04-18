import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function TestDashboard() {
  return (
    <LinearGradient
      colors={['#388E3C', '#4CAF50']}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
          Dashboard Test - Success! 🎉
        </Text>
        <Text style={{ color: 'white', fontSize: 16, marginTop: 10 }}>
          The routing issue has been resolved!
        </Text>
      </View>
    </LinearGradient>
  );
}