import React, { useMemo, useCallback } from 'react';
import { View, Text } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  useAnimatedProps,
  FadeInUp,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';
import { SensorStatus } from '../types';
import { getSensorStatus, getStatusColor, COLORS } from '../utils';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface SensorCardProps {
  title: string;
  value: number;
  unit: string;
  threshold: number;
  icon: keyof typeof Ionicons.glyphMap;
  gradientColors: string[];
  type: 'temperature' | 'humidity' | 'ethylene';
  delay?: number;
}

// Memoized header component
const CardHeader = React.memo(({ title, icon }: { title: string; icon: keyof typeof Ionicons.glyphMap }) => (
  <View className="flex-row items-center justify-between mb-4">
    <View className="flex-row items-center">
      <View className="bg-white/20 p-3 rounded-2xl">
        <Ionicons name={icon} size={24} color={COLORS.white} />
      </View>
      <Text className="text-white text-lg font-semibold ml-3">
        {title}
      </Text>
    </View>
    
    <View className="bg-white/20 px-3 py-1 rounded-full">
      <Text className="text-white text-xs font-medium">
        Live
      </Text>
    </View>
  </View>
));

// Memoized trend indicator component
const TrendIndicator = React.memo(({ value, threshold }: { value: number; threshold: number }) => (
  <View className="flex-row items-center mt-4 pt-4 border-t border-white/20">
    <Ionicons 
      name={value > threshold * 0.8 ? "trending-up" : "trending-down"} 
      size={16} 
      color={value > threshold * 0.8 ? COLORS.danger : COLORS.success} 
    />
    <Text className="text-white/70 text-sm ml-2">
      {value > threshold * 0.8 ? 'Increasing' : 'Normal range'}
    </Text>
  </View>
));

// Memoized circular progress component
const CircularProgress = React.memo(({ 
  progress, 
  statusColor, 
  percentage 
}: { 
  progress: Animated.SharedValue<number>; 
  statusColor: string; 
  percentage: number;
}) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  
  const animatedCircleProps = useAnimatedProps(() => ({
    strokeDasharray: `${circumference} ${circumference}`,
    strokeDashoffset: circumference * (1 - progress.value),
  }));

  return (
    <View className="items-center justify-center">
      <Svg width="100" height="100" className="transform -rotate-90">
        <Circle
          cx="50"
          cy="50"
          r={radius}
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="6"
          fill="none"
        />
        
        <AnimatedCircle
          cx="50"
          cy="50"
          r={radius}
          stroke={statusColor}
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          animatedProps={animatedCircleProps}
        />
      </Svg>
      
      <View className="absolute items-center justify-center">
        <Text className="text-white text-lg font-bold">
          {Math.round(percentage)}%
        </Text>
        <Text className="text-white/60 text-xs">
          of limit
        </Text>
      </View>
    </View>
  );
});

function SensorCard({
  title,
  value,
  unit,
  threshold,
  icon,
  gradientColors,
  type,
  delay = 0,
}: SensorCardProps) {
  // Memoize status calculations
  const { status, statusColor, percentage } = useMemo(() => ({
    status: getSensorStatus(value, threshold, type),
    statusColor: getStatusColor(getSensorStatus(value, threshold, type)),
    percentage: Math.min((value / threshold) * 100, 100)
  }), [value, threshold, type]);
  
  // Animation values
  const scale = useSharedValue(0);
  const progress = useSharedValue(0);
  
  React.useEffect(() => {
    scale.value = withSpring(1, { damping: 15, stiffness: 150 });
    progress.value = withTiming(percentage / 100, { duration: 1500 });
  }, [percentage]);

  // Memoize animated styles
  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // Memoize status text
  const statusInfo = useMemo(() => {
    switch (status) {
      case 'safe':
        return { text: 'Safe ✅', color: COLORS.success };
      case 'warning':
        return { text: 'Warning ⚠️', color: COLORS.warning };
      case 'danger':
        return { text: 'Danger ⚠️', color: COLORS.danger };
      default:
        return { text: 'Unknown', color: COLORS.gray };
    }
  }, [status]);

  return (
    <Animated.View 
      entering={FadeInUp.delay(delay).duration(800)}
      style={cardStyle}
      className="mb-6"
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-3xl p-6 shadow-lg"
      >
        <CardHeader title={title} icon={icon} />

        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-white text-4xl font-bold">
              {value.toFixed(1)}
              <Text className="text-2xl font-normal opacity-80">{unit}</Text>
            </Text>
            
            <Text className="text-white/70 text-sm mt-1">
              Threshold: {threshold}{unit}
            </Text>

            <View className="mt-3">
              <Text 
                className="text-sm font-bold"
                style={{ color: statusInfo.color }}
              >
                {statusInfo.text}
              </Text>
            </View>
          </View>

          <CircularProgress 
            progress={progress}
            statusColor={statusColor}
            percentage={percentage}
          />
        </View>

        <TrendIndicator value={value} threshold={threshold} />
      </LinearGradient>
    </Animated.View>
  );
}

export default React.memo(SensorCard);