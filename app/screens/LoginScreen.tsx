import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import Animated, { 
  FadeInDown, 
  FadeInUp, 
  SlideInLeft,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../hooks/useAuth';
import { isValidEmail, COLORS } from '../utils';

const { width, height } = Dimensions.get('window');

import { router } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { login } = useAuth();
  
  const buttonScale = useSharedValue(1);
  const shakeAnimation = useSharedValue(0);

  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: buttonScale.value },
        { translateX: shakeAnimation.value },
      ],
    };
  });

  const handleLogin = async () => {
    // Input validation
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      shakeAnimation.value = withSequence(
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 50 }),
        withTiming(-10, { duration: 50 }),
        withTiming(0, { duration: 50 })
      );
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setLoading(true);
    buttonScale.value = withSpring(0.95);

    const result = await login(email, password);

    if (result.success) {
      router.replace('/dashboard');
    } else {
      Alert.alert('Login Failed', result.error || 'An error occurred');
    }

    setLoading(false);
    buttonScale.value = withSpring(1);
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google Sign-In
    Alert.alert('Google Sign-In', 'Coming soon!');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        className="flex-1"
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <Animated.View 
            entering={FadeInUp.delay(200).duration(1000)}
            className="items-center mt-20 mb-10"
          >
            <View className="bg-white/20 p-6 rounded-full mb-6">
              <Ionicons name="leaf-outline" size={60} color={COLORS.white} />
            </View>
            
            <Text className="text-white text-4xl font-bold text-center mb-2">
              Onion Rot Alert
            </Text>
            <Text className="text-white/80 text-lg text-center">
              Smart Storage Monitoring
            </Text>
          </Animated.View>

          {/* Login Form */}
          <Animated.View 
            entering={FadeInDown.delay(400).duration(1000)}
            className="bg-white/95 mx-6 rounded-3xl p-8 shadow-2xl"
          >
            <Text className="text-gray-800 text-2xl font-bold text-center mb-8">
              Welcome Back!
            </Text>

            {/* Email Input */}
            <Animated.View 
              entering={SlideInLeft.delay(600).duration(800)}
              className="mb-6"
            >
              <Text className="text-gray-700 text-base font-medium mb-2">
                Email Address
              </Text>
              <View className="flex-row items-center bg-gray-50 rounded-2xl px-4 py-4 border border-gray-200">
                <Ionicons name="mail-outline" size={20} color={COLORS.gray} />
                <TextInput
                  className="flex-1 ml-3 text-gray-800 text-base"
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
              </View>
            </Animated.View>

            {/* Password Input */}
            <Animated.View 
              entering={SlideInLeft.delay(800).duration(800)}
              className="mb-8"
            >
              <Text className="text-gray-700 text-base font-medium mb-2">
                Password
              </Text>
              <View className="flex-row items-center bg-gray-50 rounded-2xl px-4 py-4 border border-gray-200">
                <Ionicons name="lock-closed-outline" size={20} color={COLORS.gray} />
                <TextInput
                  className="flex-1 ml-3 text-gray-800 text-base"
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoComplete="password"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons 
                    name={showPassword ? "eye-outline" : "eye-off-outline"} 
                    size={20} 
                    color={COLORS.gray} 
                  />
                </TouchableOpacity>
              </View>
            </Animated.View>

            {/* Login Button */}
            <Animated.View 
              entering={FadeInUp.delay(1000).duration(800)}
              style={animatedButtonStyle}
            >
              <TouchableOpacity
                onPress={handleLogin}
                disabled={loading}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={[COLORS.primary, COLORS.secondary]}
                  className="py-4 rounded-2xl"
                >
                  <Text className="text-white text-lg font-bold text-center">
                    {loading ? 'Signing In...' : 'Sign In'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>

            {/* Divider */}
            <Animated.View 
              entering={FadeInUp.delay(1200).duration(800)}
              className="flex-row items-center my-8"
            >
              <View className="flex-1 h-px bg-gray-300" />
              <Text className="mx-4 text-gray-500 text-sm">OR</Text>
              <View className="flex-1 h-px bg-gray-300" />
            </Animated.View>

            {/* Google Sign In Button */}
            <Animated.View entering={FadeInUp.delay(1400).duration(800)}>
              <TouchableOpacity
                onPress={handleGoogleSignIn}
                className="flex-row items-center justify-center bg-white border-2 border-gray-200 py-4 rounded-2xl mb-6"
                activeOpacity={0.8}
              >
                <Ionicons name="logo-google" size={20} color={COLORS.danger} />
                <Text className="ml-3 text-gray-800 text-lg font-medium">
                  Continue with Google
                </Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Register Link */}
            <Animated.View 
              entering={FadeInUp.delay(1600).duration(800)}
              className="flex-row justify-center"
            >
              <Text className="text-gray-600 text-base">
                Don't have an account? 
              </Text>
              <TouchableOpacity onPress={() => router.push('/register')}>
                <Text className="text-purple-600 text-base font-bold ml-1">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}