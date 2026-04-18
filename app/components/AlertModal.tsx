import React, { useMemo, useCallback } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
  FadeIn,
  SlideInDown,
  BounceIn,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Alert } from '../types';
import { COLORS } from '../utils';

const { width, height } = Dimensions.get('window');

interface AlertModalProps {
  visible: boolean;
  alert: Alert | null;
  onAcknowledge: () => void;
  onClose: () => void;
}

// Memoized alert header component
const AlertHeader = React.memo(({ 
  alert, 
  alertColors, 
  pulseStyle, 
  getAlertIcon 
}: { 
  alert: Alert; 
  alertColors: string[]; 
  pulseStyle: any; 
  getAlertIcon: (type: string) => string;
}) => (
  <LinearGradient
    colors={alertColors}
    className="px-6 py-8 items-center"
  >
    <Animated.View
      entering={BounceIn.delay(300).duration(800)}
      style={pulseStyle}
      className="bg-white/20 p-4 rounded-full mb-4"
    >
      <Ionicons 
        name={getAlertIcon(alert.type) as any} 
        size={40} 
        color={COLORS.white} 
      />
    </Animated.View>

    <Text className="text-white text-2xl font-bold text-center mb-2">
      🚨 CRITICAL ALERT!
    </Text>
    
    <Text className="text-white/90 text-lg font-semibold text-center">
      {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)} Threshold Exceeded
    </Text>
  </LinearGradient>
));

// Memoized alert details component
const AlertDetails = React.memo(({ alert }: { alert: Alert }) => (
  <View className="bg-gray-50 rounded-2xl p-4 mb-6">
    <View className="flex-row justify-between items-center mb-2">
      <Text className="text-gray-600 text-sm">Current Value:</Text>
      <Text className="text-red-600 text-lg font-bold">
        {alert.value.toFixed(1)}
        {alert.type === 'temperature' ? '°C' : 
         alert.type === 'humidity' ? '%' : ' ppm'}
      </Text>
    </View>
    
    <View className="flex-row justify-between items-center">
      <Text className="text-gray-600 text-sm">Safe Limit:</Text>
      <Text className="text-green-600 text-lg font-bold">
        {alert.threshold}
        {alert.type === 'temperature' ? '°C' : 
         alert.type === 'humidity' ? '%' : ' ppm'}
      </Text>
    </View>
  </View>
));

// Memoized action buttons component
const ActionButtons = React.memo(({ 
  onAcknowledge, 
  onClose 
}: { 
  onAcknowledge: () => void; 
  onClose: () => void;
}) => (
  <View className="space-y-3">
    <TouchableOpacity
      onPress={onAcknowledge}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={[COLORS.danger, COLORS.warning]}
        className="py-4 rounded-2xl"
      >
        <Text className="text-white text-lg font-bold text-center">
          Acknowledge Alert
        </Text>
      </LinearGradient>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={onClose}
      className="bg-gray-100 py-4 rounded-2xl"
      activeOpacity={0.8}
    >
      <Text className="text-gray-700 text-lg font-semibold text-center">
        Close
      </Text>
    </TouchableOpacity>
  </View>
));

// Memoized emergency instructions component
const EmergencyInstructions = React.memo(({ type }: { type: string }) => (
  <Animated.View
    entering={FadeIn.delay(800).duration(600)}
    className="bg-white/90 rounded-2xl p-4 mt-6 max-w-sm w-full"
  >
    <Text className="text-gray-800 text-sm font-semibold mb-2">
      ⚡ Immediate Actions:
    </Text>
    <Text className="text-gray-700 text-xs leading-5">
      {type === 'temperature' && '• Check ventilation systems\n• Verify cooling equipment\n• Monitor storage area'}
      {type === 'humidity' && '• Increase ventilation\n• Check dehumidification systems\n• Inspect for water leaks'}
      {type === 'ethylene' && '• Remove overripe produce\n• Improve air circulation\n• Check ethylene scrubbers'}
    </Text>
  </Animated.View>
));

function AlertModal({
  visible,
  alert,
  onAcknowledge,
  onClose,
}: AlertModalProps) {
  const pulseScale = useSharedValue(1);
  const shakeX = useSharedValue(0);

  React.useEffect(() => {
    if (visible) {
      // Pulse animation for the alert icon
      pulseScale.value = withRepeat(
        withSequence(
          withTiming(1.2, { duration: 500 }),
          withTiming(1, { duration: 500 })
        ),
        -1,
        false
      );

      // Shake animation for urgency
      shakeX.value = withRepeat(
        withSequence(
          withTiming(-5, { duration: 100 }),
          withTiming(5, { duration: 100 }),
          withTiming(-5, { duration: 100 }),
          withTiming(0, { duration: 100 })
        ),
        3,
        false
      );
    }
  }, [visible]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeX.value }],
  }));

  const getAlertIcon = useCallback((type: string) => {
    switch (type) {
      case 'temperature':
        return 'thermometer';
      case 'humidity':
        return 'water';
      case 'ethylene':
        return 'leaf';
      default:
        return 'warning';
    }
  }, []);

  const getAlertColor = useCallback((type: string) => {
    switch (type) {
      case 'temperature':
        return ['#FF6B6B', '#FF8E53'];
      case 'humidity':
        return ['#4ECDC4', '#44A08D'];
      case 'ethylene':
        return ['#A8EDEA', '#FED6E3'];
      default:
        return [COLORS.danger, COLORS.warning];
    }
  }, []);

  if (!alert) return null;

  const alertColors = getAlertColor(alert.type);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
    >
      <StatusBar backgroundColor="rgba(0,0,0,0.8)" barStyle="light-content" />
      
      <Animated.View 
        entering={FadeIn.duration(300)}
        className="flex-1"
      >
        <View className="flex-1 bg-black/50">
          <View className="flex-1 items-center justify-center p-6">
            
            <Animated.View
              entering={SlideInDown.delay(100).duration(600)}
              style={shakeStyle}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-sm w-full"
            >
              <AlertHeader 
                alert={alert} 
                alertColors={alertColors} 
                pulseStyle={pulseStyle} 
                getAlertIcon={getAlertIcon} 
              />

              <View className="px-6 py-6">
                <Text className="text-gray-800 text-base leading-6 text-center mb-6">
                  {alert.message}
                </Text>

                <AlertDetails alert={alert} />
                <ActionButtons onAcknowledge={onAcknowledge} onClose={onClose} />

                <Text className="text-gray-400 text-xs text-center mt-4">
                  Alert triggered: {alert.timestamp.toLocaleTimeString()}
                </Text>
              </View>
            </Animated.View>

            <EmergencyInstructions type={alert.type} />
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
}

export default React.memo(AlertModal);