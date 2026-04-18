import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
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
import { useAuth } from '../hooks/useAuth';
import { COLORS } from '../utils';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            const result = await logout();
            if (result.success) {
              router.replace('/login');
            }
          },
        },
      ]
    );
  };

  const ProfileItem = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    delay = 0,
    showArrow = false 
  }: { 
    icon: string; 
    title: string; 
    subtitle?: string; 
    onPress?: () => void;
    delay?: number;
    showArrow?: boolean;
  }) => (
    <Animated.View
      entering={FadeInDown.delay(delay).duration(600)}
      className="mb-4"
    >
      <TouchableOpacity
        onPress={onPress}
        disabled={!onPress}
        className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
        activeOpacity={onPress ? 0.8 : 1}
      >
        <View className="flex-row items-center">
          <View className="bg-green-100 p-3 rounded-full mr-4">
            <Ionicons name={icon as any} size={24} color={COLORS.primary} />
          </View>
          
          <View className="flex-1">
            <Text className="text-gray-800 text-base font-semibold">
              {title}
            </Text>
            {subtitle && (
              <Text className="text-gray-600 text-sm mt-1">
                {subtitle}
              </Text>
            )}
          </View>

          {showArrow && (
            <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  const StatCard = ({ 
    title, 
    value, 
    icon, 
    color,
    delay = 0 
  }: { 
    title: string; 
    value: string; 
    icon: string; 
    color: string;
    delay?: number;
  }) => (
    <Animated.View
      entering={FadeInDown.delay(delay).duration(600)}
      className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
    >
      <View className="items-center">
        <View className="p-3 rounded-full mb-2" style={{ backgroundColor: `${color}20` }}>
          <Ionicons name={icon as any} size={24} color={color} />
        </View>
        <Text className="text-gray-600 text-sm text-center">
          {title}
        </Text>
        <Text className="text-gray-800 text-xl font-bold">
          {value}
        </Text>
      </View>
    </Animated.View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        className="pt-12 pb-8"
      >
        <Animated.View
          entering={SlideInLeft.duration(800)}
          className="flex-row items-center px-6 mb-6"
        >
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-white/20 p-2 rounded-full mr-4"
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.white} />
          </TouchableOpacity>

          <View className="flex-1">
            <Text className="text-white text-2xl font-bold">
              Profile
            </Text>
            <Text className="text-white/80 text-sm">
              Manage your account and preferences
            </Text>
          </View>
        </Animated.View>

        {/* User Info Card */}
        <Animated.View
          entering={FadeInUp.delay(200).duration(800)}
          className="mx-6 bg-white/10 rounded-2xl p-6"
        >
          <View className="flex-row items-center">
            <View className="bg-white p-4 rounded-full mr-4">
              <Ionicons name="person" size={32} color={COLORS.primary} />
            </View>
            
            <View className="flex-1">
              <Text className="text-white text-xl font-bold">
                {user?.displayName || 'Farmer'}
              </Text>
              <Text className="text-white/80 text-base">
                {user?.email}
              </Text>
              <View className="flex-row items-center mt-2">
                <View className="bg-green-400 w-3 h-3 rounded-full mr-2" />
                <Text className="text-white/80 text-sm">
                  Online
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </LinearGradient>

      <ScrollView className="flex-1 px-6 py-6" showsVerticalScrollIndicator={false}>
        {/* Usage Statistics */}
        <Animated.View entering={FadeInUp.delay(400).duration(800)}>
          <Text className="text-gray-800 text-xl font-bold mb-4">
            📊 Your Activity
          </Text>
          
          <View className="flex-row space-x-4 mb-8">
            <StatCard
              title="Days Active"
              value="7"
              icon="calendar-outline"
              color="#3B82F6"
              delay={500}
            />
            <StatCard
              title="Alerts Received"
              value="12"
              icon="notifications-outline"
              color="#F59E0B"
              delay={600}
            />
            <StatCard
              title="Storage Units"
              value="1"
              icon="home-outline"
              color="#10B981"
              delay={700}
            />
          </View>
        </Animated.View>

        {/* Account Settings */}
        <Animated.View entering={FadeInUp.delay(800).duration(800)}>
          <Text className="text-gray-800 text-xl font-bold mb-4">
            👤 Account
          </Text>

          <ProfileItem
            icon="person-outline"
            title="Edit Profile"
            subtitle="Update your personal information"
            onPress={() => Alert.alert('Coming Soon', 'Profile editing will be available in the next update!')}
            delay={900}
            showArrow
          />

          <ProfileItem
            icon="notifications-outline"
            title="Notification Preferences"
            subtitle="Manage your alert settings"
            onPress={() => router.push('/settings')}
            delay={1000}
            showArrow
          />

          <ProfileItem
            icon="shield-checkmark-outline"
            title="Privacy & Security"
            subtitle="Control your data and security settings"
            onPress={() => Alert.alert('Coming Soon', 'Privacy settings will be available in the next update!')}
            delay={1100}
            showArrow
          />
        </Animated.View>

        {/* App Info */}
        <Animated.View entering={FadeInUp.delay(1200).duration(800)}>
          <Text className="text-gray-800 text-xl font-bold mb-4 mt-8">
            ℹ️ App Info
          </Text>

          <ProfileItem
            icon="information-circle-outline"
            title="About Onion Rot Alert"
            subtitle="Version 1.0.0 - Smart Storage Monitoring"
            delay={1300}
          />

          <ProfileItem
            icon="help-circle-outline"
            title="Help & Support"
            subtitle="Get help and contact support"
            onPress={() => Alert.alert('Support', 'For support, email us at:\nsupport@onionrotalert.com')}
            delay={1400}
            showArrow
          />

          <ProfileItem
            icon="document-text-outline"
            title="Terms & Privacy"
            subtitle="Read our terms of service and privacy policy"
            onPress={() => Alert.alert('Legal', 'Terms of service and privacy policy will be available on our website.')}
            delay={1500}
            showArrow
          />
        </Animated.View>

        {/* Logout Button */}
        <Animated.View entering={FadeInUp.delay(1600).duration(800)} className="mt-8 mb-6">
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-500 py-4 rounded-2xl"
            activeOpacity={0.8}
          >
            <View className="flex-row items-center justify-center">
              <Ionicons name="log-out-outline" size={24} color={COLORS.white} />
              <Text className="text-white text-lg font-bold ml-3">
                Sign Out
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Footer */}
        <Animated.View entering={FadeInUp.delay(1800).duration(800)}>
          <View className="bg-green-50 rounded-2xl p-6 border border-green-200">
            <View className="items-center">
              <Ionicons name="leaf-outline" size={32} color={COLORS.primary} />
              <Text className="text-green-800 text-lg font-bold mt-3 mb-2">
                Thank you for choosing Onion Rot Alert!
              </Text>
              <Text className="text-green-700 text-sm text-center leading-6">
                Together, we're building smarter farming solutions to reduce food waste and improve crop storage.
              </Text>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}