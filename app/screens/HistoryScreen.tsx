import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
  SlideInLeft,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SensorData } from '../types';
import { COLORS, formatTimestamp, getSensorStatus, getStatusColor } from '../utils';

const { width } = Dimensions.get('window');

// Mock historical data for demonstration
const generateMockHistory = (): SensorData[] => {
  const history: SensorData[] = [];
  const now = new Date();
  
  for (let i = 0; i < 20; i++) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000); // Every hour
    history.push({
      id: `history-${i}`,
      temperature: Math.random() * 15 + 20, // 20-35°C
      humidity: Math.random() * 30 + 50,    // 50-80%
      ethylene: Math.random() * 15 + 5,     // 5-20ppm
      timestamp,
      location: 'Storage Unit 1',
    });
  }
  
  return history;
};

export default function HistoryScreen() {
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');
  const [historyData] = useState(generateMockHistory());

  const filteredData = historyData.filter(item => {
    const now = new Date();
    const itemTime = item.timestamp;
    
    switch (timeRange) {
      case '24h':
        return now.getTime() - itemTime.getTime() <= 24 * 60 * 60 * 1000;
      case '7d':
        return now.getTime() - itemTime.getTime() <= 7 * 24 * 60 * 60 * 1000;
      case '30d':
        return now.getTime() - itemTime.getTime() <= 30 * 24 * 60 * 60 * 1000;
      default:
        return true;
    }
  });

  const HistoryItem = ({ item, index }: { item: SensorData; index: number }) => (
    <Animated.View
      entering={FadeInDown.delay(index * 100).duration(600)}
      className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100"
    >
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-gray-800 text-sm font-medium">
          {formatTimestamp(item.timestamp)}
        </Text>
        <View className="bg-blue-100 px-3 py-1 rounded-full">
          <Text className="text-blue-600 text-xs font-medium">
            {item.location}
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between">
        {/* Temperature */}
        <View className="flex-1 items-center">
          <View className="bg-red-50 p-3 rounded-full mb-2">
            <Ionicons name="thermometer-outline" size={20} color="#EF4444" />
          </View>
          <Text className="text-gray-600 text-xs">Temperature</Text>
          <Text className="text-gray-800 text-lg font-bold">
            {item.temperature.toFixed(1)}°C
          </Text>
          <View
            className="w-2 h-2 rounded-full mt-1"
            style={{ backgroundColor: getStatusColor(getSensorStatus(item.temperature, 30, 'temperature')) }}
          />
        </View>

        {/* Humidity */}
        <View className="flex-1 items-center">
          <View className="bg-blue-50 p-3 rounded-full mb-2">
            <Ionicons name="water-outline" size={20} color="#3B82F6" />
          </View>
          <Text className="text-gray-600 text-xs">Humidity</Text>
          <Text className="text-gray-800 text-lg font-bold">
            {item.humidity.toFixed(1)}%
          </Text>
          <View
            className="w-2 h-2 rounded-full mt-1"
            style={{ backgroundColor: getStatusColor(getSensorStatus(item.humidity, 70, 'humidity')) }}
          />
        </View>

        {/* Ethylene */}
        <View className="flex-1 items-center">
          <View className="bg-green-50 p-3 rounded-full mb-2">
            <Ionicons name="leaf-outline" size={20} color="#10B981" />
          </View>
          <Text className="text-gray-600 text-xs">Ethylene</Text>
          <Text className="text-gray-800 text-lg font-bold">
            {item.ethylene.toFixed(1)}ppm
          </Text>
          <View
            className="w-2 h-2 rounded-full mt-1"
            style={{ backgroundColor: getStatusColor(getSensorStatus(item.ethylene, 10, 'ethylene')) }}
          />
        </View>
      </View>
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
              History
            </Text>
            <Text className="text-white/80 text-sm">
              Sensor data logs and trends
            </Text>
          </View>
        </Animated.View>
      </LinearGradient>

      {/* Time Range Selector */}
      <Animated.View
        entering={FadeInUp.delay(200).duration(800)}
        className="px-6 py-4"
      >
        <View className="flex-row bg-white rounded-2xl p-2 shadow-sm">
          {(['24h', '7d', '30d'] as const).map((range) => (
            <TouchableOpacity
              key={range}
              onPress={() => setTimeRange(range)}
              className={`flex-1 py-3 rounded-xl ${
                timeRange === range ? 'bg-green-500' : 'bg-transparent'
              }`}
              activeOpacity={0.8}
            >
              <Text
                className={`text-center font-semibold ${
                  timeRange === range ? 'text-white' : 'text-gray-600'
                }`}
              >
                {range === '24h' ? 'Last 24 Hours' :
                 range === '7d' ? 'Last 7 Days' : 'Last 30 Days'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      {/* Summary Stats */}
      <Animated.View
        entering={FadeInUp.delay(400).duration(800)}
        className="px-6 mb-4"
      >
        <View className="bg-white rounded-2xl p-4 shadow-sm">
          <Text className="text-gray-800 text-lg font-bold mb-3">
            📊 Summary ({filteredData.length} readings)
          </Text>
          
          <View className="flex-row justify-between">
            <View className="flex-1 items-center">
              <Text className="text-gray-600 text-sm">Avg Temp</Text>
              <Text className="text-gray-800 text-xl font-bold">
                {filteredData.length > 0 
                  ? (filteredData.reduce((sum, item) => sum + item.temperature, 0) / filteredData.length).toFixed(1)
                  : '0.0'}°C
              </Text>
            </View>
            <View className="flex-1 items-center">
              <Text className="text-gray-600 text-sm">Avg Humidity</Text>
              <Text className="text-gray-800 text-xl font-bold">
                {filteredData.length > 0 
                  ? (filteredData.reduce((sum, item) => sum + item.humidity, 0) / filteredData.length).toFixed(1)
                  : '0.0'}%
              </Text>
            </View>
            <View className="flex-1 items-center">
              <Text className="text-gray-600 text-sm">Avg Ethylene</Text>
              <Text className="text-gray-800 text-xl font-bold">
                {filteredData.length > 0 
                  ? (filteredData.reduce((sum, item) => sum + item.ethylene, 0) / filteredData.length).toFixed(1)
                  : '0.0'}ppm
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>

      {/* History List */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <HistoryItem key={item.id} item={item} index={index} />
          ))
        ) : (
          <Animated.View
            entering={FadeInUp.delay(600).duration(800)}
            className="bg-white rounded-2xl p-8 items-center"
          >
            <Ionicons name="time-outline" size={48} color={COLORS.gray} />
            <Text className="text-gray-600 text-lg font-semibold mt-4 mb-2">
              No Data Available
            </Text>
            <Text className="text-gray-500 text-sm text-center">
              No sensor readings found for the selected time range.
            </Text>
          </Animated.View>
        )}
        
        <View className="h-6" />
      </ScrollView>
    </View>
  );
}