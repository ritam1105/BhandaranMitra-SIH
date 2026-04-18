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
} from 'react-native';
import Animated, { 
  FadeInDown, 
  FadeInUp, 
  SlideInRight,
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

import { router } from 'expo-router';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { register } = useAuth();
  
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

  const handleRegister = async () => {
    // Input validation
    if (!email || !password || !confirmPassword) {
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

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);
    buttonScale.value = withSpring(0.95);

    const result = await register(email, password);

    if (result.success) {
      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => router.replace('/dashboard') }
      ]);
    } else {
      Alert.alert('Registration Failed', result.error || 'An error occurred');
    }

    setLoading(false);
    buttonScale.value = withSpring(1);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <LinearGradient
        colors={[COLORS.secondary, COLORS.primary]}
        className="flex-1"
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <Animated.View 
            entering={FadeInUp.delay(200).duration(1000)}
            className="items-center mt-16 mb-8"
          >
            <TouchableOpacity 
              onPress={() => router.back()}
              className="absolute left-6 top-4 bg-white/20 p-2 rounded-full"
            >
              <Ionicons name="arrow-back" size={24} color={COLORS.white} />
            </TouchableOpacity>

            <View className="bg-white/20 p-6 rounded-full mb-6">
              <Ionicons name="person-add-outline" size={50} color={COLORS.white} />
            </View>
            
            <Text className="text-white text-3xl font-bold text-center mb-2">
              Create Account
            </Text>
            <Text className="text-white/80 text-base text-center">
              Join the smart farming revolution
            </Text>
          </Animated.View>

          {/* Registration Form */}
          <Animated.View 
            entering={FadeInDown.delay(400).duration(1000)}
            className="bg-white/95 mx-6 rounded-3xl p-8 shadow-2xl"
          >
            {/* Email Input */}
            <Animated.View 
              entering={SlideInRight.delay(600).duration(800)}
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
              entering={SlideInRight.delay(800).duration(800)}
              className="mb-6"
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
                  autoComplete="password-new"
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

            {/* Confirm Password Input */}
            <Animated.View 
              entering={SlideInRight.delay(1000).duration(800)}
              className="mb-8"
            >
              <Text className="text-gray-700 text-base font-medium mb-2">
                Confirm Password
              </Text>
              <View className="flex-row items-center bg-gray-50 rounded-2xl px-4 py-4 border border-gray-200">
                <Ionicons name="shield-checkmark-outline" size={20} color={COLORS.gray} />
                <TextInput
                  className="flex-1 ml-3 text-gray-800 text-base"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  autoComplete="password-new"
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Ionicons 
                    name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} 
                    size={20} 
                    color={COLORS.gray} 
                  />
                </TouchableOpacity>
              </View>
            </Animated.View>

            {/* Register Button */}
            <Animated.View 
              entering={FadeInUp.delay(1200).duration(800)}
              style={animatedButtonStyle}
            >
              <TouchableOpacity
                onPress={handleRegister}
                disabled={loading}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={[COLORS.secondary, COLORS.primary]}
                  className="py-4 rounded-2xl"
                >
                  <Text className="text-white text-lg font-bold text-center">
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>

            {/* Terms and Conditions */}
            <Animated.View 
              entering={FadeInUp.delay(1400).duration(800)}
              className="mt-6"
            >
              <Text className="text-gray-500 text-sm text-center">
                By creating an account, you agree to our{' '}
                <Text className="text-purple-600 font-medium">Terms of Service</Text>
                {' '}and{' '}
                <Text className="text-purple-600 font-medium">Privacy Policy</Text>
              </Text>
            </Animated.View>

            {/* Login Link */}
            <Animated.View 
              entering={FadeInUp.delay(1600).duration(800)}
              className="flex-row justify-center mt-6"
            >
              <Text className="text-gray-600 text-base">
                Already have an account? 
              </Text>
              <TouchableOpacity onPress={() => router.push('/login')}>
                <Text className="text-purple-600 text-base font-bold ml-1">
                  Sign In
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}