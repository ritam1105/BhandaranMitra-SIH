import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
  SlideInLeft,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { AlertThresholds } from '../types';
import { COLORS, DEFAULT_THRESHOLDS } from '../utils';

export default function SettingsScreen() {
  const [thresholds, setThresholds] = useState<AlertThresholds>(DEFAULT_THRESHOLDS);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const handleSaveSettings = () => {
    // In a real app, save to AsyncStorage or Firebase
    Alert.alert(
      'Settings Saved',
      'Your preferences have been updated successfully!',
      [{ text: 'OK' }]
    );
  };

  const handleResetDefaults = () => {
    Alert.alert(
      'Reset to Defaults',
      'Are you sure you want to reset all settings to default values?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            setThresholds(DEFAULT_THRESHOLDS);
            setNotificationsEnabled(true);
            setSoundEnabled(true);
            setDarkModeEnabled(false);
          },
        },
      ]
    );
  };

  const SettingItem = ({ 
    title, 
    description, 
    children, 
    delay = 0 
  }: { 
    title: string; 
    description?: string; 
    children: React.ReactNode;
    delay?: number;
  }) => (
    <Animated.View
      entering={FadeInDown.delay(delay).duration(600)}
      className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100"
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1 mr-4">
          <Text className="text-gray-800 text-base font-semibold mb-1">
            {title}
          </Text>
          {description && (
            <Text className="text-gray-600 text-sm">
              {description}
            </Text>
          )}
        </View>
        {children}
      </View>
    </Animated.View>
  );

  const ThresholdInput = ({ 
    label, 
    value, 
    unit, 
    onChangeText,
    delay = 0 
  }: { 
    label: string; 
    value: number; 
    unit: string; 
    onChangeText: (value: string) => void;
    delay?: number;
  }) => (
    <Animated.View
      entering={FadeInDown.delay(delay).duration(600)}
      className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100"
    >
      <Text className="text-gray-800 text-base font-semibold mb-3">
        {label} Threshold
      </Text>
      <View className="flex-row items-center">
        <View className="flex-1 mr-3">
          <TextInput
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-lg font-semibold"
            value={value.toString()}
            onChangeText={onChangeText}
            keyboardType="numeric"
            placeholder="0"
          />
        </View>
        <Text className="text-gray-600 text-lg font-medium">
          {unit}
        </Text>
      </View>
      <Text className="text-gray-500 text-xs mt-2">
        Alert when {label.toLowerCase()} exceeds this value
      </Text>
    </Animated.View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        className="pt-12 pb-6"
      >
        <Animated.View
          entering={SlideInLeft.duration(800)}
          className="flex-row items-center px-6"
        >
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-white/20 p-2 rounded-full mr-4"
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.white} />
          </TouchableOpacity>

          <View className="flex-1">
            <Text className="text-white text-2xl font-bold">
              Settings
            </Text>
            <Text className="text-white/80 text-sm">
              Configure alert thresholds and preferences
            </Text>
          </View>
        </Animated.View>
      </LinearGradient>

      <ScrollView className="flex-1 px-6 py-6" showsVerticalScrollIndicator={false}>
        {/* Alert Thresholds Section */}
        <Animated.View entering={FadeInUp.delay(200).duration(800)}>
          <Text className="text-gray-800 text-xl font-bold mb-4">
            🚨 Alert Thresholds
          </Text>

          <ThresholdInput
            label="Temperature"
            value={thresholds.temperature}
            unit="°C"
            onChangeText={(value) => setThresholds(prev => ({ 
              ...prev, 
              temperature: parseFloat(value) || 0 
            }))}
            delay={0}
          />

          <ThresholdInput
            label="Humidity"
            value={thresholds.humidity}
            unit="%"
            onChangeText={(value) => setThresholds(prev => ({ 
              ...prev, 
              humidity: parseFloat(value) || 0 
            }))}
            delay={100}
          />

          <ThresholdInput
            label="Ethylene"
            value={thresholds.ethylene}
            unit="ppm"
            onChangeText={(value) => setThresholds(prev => ({ 
              ...prev, 
              ethylene: parseFloat(value) || 0 
            }))}
            delay={200}
          />
        </Animated.View>

        {/* Notification Settings */}
        <Animated.View entering={FadeInUp.delay(400).duration(800)}>
          <Text className="text-gray-800 text-xl font-bold mb-4 mt-8">
            🔔 Notifications
          </Text>

          <SettingItem
            title="Push Notifications"
            description="Receive alerts when thresholds are exceeded"
            delay={300}
          >
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
              thumbColor={notificationsEnabled ? COLORS.white : COLORS.gray}
            />
          </SettingItem>

          <SettingItem
            title="Sound Alerts"
            description="Play sound when receiving critical alerts"
            delay={400}
          >
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
              thumbColor={soundEnabled ? COLORS.white : COLORS.gray}
            />
          </SettingItem>
        </Animated.View>

        {/* App Preferences */}
        <Animated.View entering={FadeInUp.delay(600).duration(800)}>
          <Text className="text-gray-800 text-xl font-bold mb-4 mt-8">
            ⚙️ App Preferences
          </Text>

          <SettingItem
            title="Dark Mode"
            description="Use dark theme for better visibility"
            delay={500}
          >
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
              thumbColor={darkModeEnabled ? COLORS.white : COLORS.gray}
            />
          </SettingItem>

          <SettingItem
            title="Language"
            description="Choose your preferred language"
            delay={600}
          >
            <View className="bg-gray-100 px-4 py-2 rounded-xl">
              <Text className="text-gray-700 font-medium">English</Text>
            </View>
          </SettingItem>
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View entering={FadeInUp.delay(800).duration(800)} className="mt-8">
          <TouchableOpacity
            onPress={handleSaveSettings}
            activeOpacity={0.8}
            className="mb-4"
          >
            <LinearGradient
              colors={[COLORS.primary, COLORS.secondary]}
              className="py-4 rounded-2xl"
            >
              <Text className="text-white text-lg font-bold text-center">
                Save Settings
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleResetDefaults}
            className="bg-gray-200 py-4 rounded-2xl"
            activeOpacity={0.8}
          >
            <Text className="text-gray-700 text-lg font-semibold text-center">
              Reset to Defaults
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Help Section */}
        <Animated.View entering={FadeInUp.delay(1000).duration(800)} className="mt-8 mb-6">
          <View className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
            <View className="flex-row items-center mb-3">
              <Ionicons name="information-circle-outline" size={24} color="#3B82F6" />
              <Text className="text-blue-800 text-lg font-bold ml-3">
                Need Help?
              </Text>
            </View>
            <Text className="text-blue-700 text-sm leading-6">
              • Temperature: Optimal range is 0-30°C for onion storage{'\n'}
              • Humidity: Keep below 70% to prevent mold growth{'\n'}
              • Ethylene: Levels above 10ppm accelerate ripening{'\n'}
              • Contact support: support@onionrotalert.com
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}