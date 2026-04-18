import React from 'react';
import { View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withSpring,
  FadeInUp,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils';

export default function LoadingScreen() {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.7);

  React.useEffect(() => {
    // Rotation animation
    rotation.value = withRepeat(
      withTiming(360, { duration: 2000 }),
      -1,
      false
    );

    // Scale animation
    scale.value = withRepeat(
      withSequence(
        withSpring(1.2, { damping: 4 }),
        withSpring(1, { damping: 4 })
      ),
      -1,
      false
    );

    // Opacity pulse
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000 }),
        withTiming(0.7, { duration: 1000 })
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotation.value}deg` },
      { scale: scale.value }
    ],
    opacity: opacity.value,
  }));

  return (
    <LinearGradient
      colors={[COLORS.primary, COLORS.secondary]}
      className="flex-1 items-center justify-center"
    >
      {/* App Logo/Icon */}
      <Animated.View 
        entering={FadeInUp.delay(200).duration(1000)}
        style={animatedStyle}
        className="bg-white/20 p-8 rounded-full mb-8"
      >
        <Ionicons name="leaf-outline" size={80} color={COLORS.white} />
      </Animated.View>

      {/* App Name */}
      <Animated.View 
        entering={FadeInUp.delay(400).duration(1000)}
        className="items-center mb-8"
      >
        <Text className="text-white text-4xl font-bold mb-2">
          Onion Rot Alert
        </Text>
        <Text className="text-white/80 text-lg">
          Smart Storage Monitoring
        </Text>
      </Animated.View>

      {/* Loading Indicator */}
      <Animated.View 
        entering={FadeInUp.delay(600).duration(1000)}
        className="items-center"
      >
        <View className="bg-white/20 rounded-full p-4 mb-4">
          <View className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        </View>
        <Text className="text-white/80 text-base">
          Initializing sensors...
        </Text>
      </Animated.View>

      {/* Version Info */}
      <Animated.View 
        entering={FadeInUp.delay(800).duration(1000)}
        className="absolute bottom-12 items-center"
      >
        <Text className="text-white/60 text-sm">
          Version 1.0.0
        </Text>
        <Text className="text-white/60 text-xs mt-1">
          Keeping your harvest fresh
        </Text>
      </Animated.View>
    </LinearGradient>
  );
}