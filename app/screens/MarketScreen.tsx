import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
  SlideInLeft,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMarketPrice } from '../hooks/useMarketPrice';
import { useStorage } from '../hooks/useStorage';
import StorageForm from '../components/StorageForm';
import { COLORS, formatTimestamp } from '../utils';

const { width } = Dimensions.get('window');

export default function MarketScreen() {
  const { marketData, loading, error, recommendation, refreshMarketData } = useMarketPrice();
  const { storageInfo, getStorageMetrics } = useStorage();
  const [refreshing, setRefreshing] = useState(false);
  const [showStorageForm, setShowStorageForm] = useState(false);

  // Animation values
  const priceAnimation = useSharedValue(1);
  const trendAnimation = useSharedValue(0);

  React.useEffect(() => {
    if (marketData?.trend === 'rising') {
      trendAnimation.value = withRepeat(
        withSequence(
          withSpring(-10, { damping: 10 }),
          withSpring(0, { damping: 10 })
        ),
        -1,
        false
      );
    } else if (marketData?.trend === 'falling') {
      trendAnimation.value = withRepeat(
        withSequence(
          withSpring(10, { damping: 10 }),
          withSpring(0, { damping: 10 })
        ),
        -1,
        false
      );
    }
  }, [marketData?.trend]);

  const animatedTrendStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: trendAnimation.value }],
  }));

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refreshMarketData().finally(() => setRefreshing(false));
  }, [refreshMarketData]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'rising':
        return 'trending-up';
      case 'falling':
        return 'trending-down';
      default:
        return 'trending-forward';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'rising':
        return COLORS.success;
      case 'falling':
        return COLORS.danger;
      default:
        return COLORS.warning;
    }
  };

  const getRecommendationIcon = (action: string) => {
    switch (action) {
      case 'hold':
        return 'hand-right-outline';
      case 'sell':
        return 'flash-outline';
      case 'wait':
        return 'time-outline';
      default:
        return 'eye-outline';
    }
  };

  const getRecommendationColor = (action: string) => {
    switch (action) {
      case 'hold':
        return COLORS.success;
      case 'sell':
        return COLORS.warning;
      case 'wait':
        return COLORS.secondary;
      default:
        return COLORS.primary;
    }
  };

  const storageMetrics = getStorageMetrics();

  if (showStorageForm) {
    return (
      <View className="flex-1 bg-gray-50">
        {/* Header */}
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          className="pt-12 pb-6"
        >
          <View className="flex-row items-center px-6">
            <TouchableOpacity
              onPress={() => setShowStorageForm(false)}
              className="bg-white/20 p-2 rounded-full mr-4"
            >
              <Ionicons name="arrow-back" size={24} color={COLORS.white} />
            </TouchableOpacity>
            <View className="flex-1">
              <Text className="text-white text-2xl font-bold">
                Storage Management
              </Text>
            </View>
          </View>
        </LinearGradient>

        <StorageForm 
          onSaveSuccess={() => setShowStorageForm(false)}
          onCancel={() => setShowStorageForm(false)}
        />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        className="pt-12 pb-6"
      >
        <Animated.View
          entering={SlideInLeft.duration(800)}
          className="flex-row items-center justify-between px-6"
        >
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-white/20 p-2 rounded-full"
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.white} />
          </TouchableOpacity>

          <View className="flex-1 mx-4">
            <Text className="text-white text-2xl font-bold text-center">
              Market & Storage
            </Text>
            <Text className="text-white/80 text-sm text-center">
              Track prices and manage inventory
            </Text>
          </View>

          <TouchableOpacity
            onPress={onRefresh}
            className="bg-white/20 p-2 rounded-full"
          >
            <Ionicons name="refresh" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
            colors={[COLORS.primary]}
          />
        }
      >
        <View className="p-6">
          {/* Market Price Card */}
          {marketData && (
            <Animated.View entering={FadeInDown.delay(200).duration(800)}>
              <LinearGradient
                colors={marketData.trend === 'rising' ? ['#10B981', '#059669'] : 
                       marketData.trend === 'falling' ? ['#EF4444', '#DC2626'] : 
                       ['#F59E0B', '#D97706']}
                className="rounded-3xl p-6 mb-6 shadow-lg"
              >
                <View className="flex-row items-center justify-between mb-4">
                  <View>
                    <Text className="text-white text-lg font-semibold">
                      Current Market Price
                    </Text>
                    <Text className="text-white/80 text-sm">
                      {marketData.location}
                    </Text>
                  </View>

                  <Animated.View style={animatedTrendStyle}>
                    <Ionicons 
                      name={getTrendIcon(marketData.trend) as any}
                      size={32} 
                      color={COLORS.white} 
                    />
                  </Animated.View>
                </View>

                <View className="flex-row items-baseline mb-4">
                  <Text className="text-white text-5xl font-bold">
                    {marketData.currency}{marketData.price}
                  </Text>
                  <Text className="text-white/80 text-xl ml-2">
                    /kg
                  </Text>
                </View>

                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <Ionicons 
                      name={marketData.changePercent >= 0 ? "arrow-up" : "arrow-down"}
                      size={16} 
                      color={COLORS.white} 
                    />
                    <Text className="text-white text-sm ml-1">
                      {Math.abs(marketData.changePercent).toFixed(1)}% from yesterday
                    </Text>
                  </View>

                  <Text className="text-white/80 text-xs">
                    Updated: {formatTimestamp(marketData.timestamp).split(',')[1]}
                  </Text>
                </View>
              </LinearGradient>
            </Animated.View>
          )}

          {/* Market Recommendation */}
          {recommendation && (
            <Animated.View entering={FadeInDown.delay(400).duration(800)} className="mb-6">
              <View className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <View className="flex-row items-center mb-4">
                  <View className="p-3 rounded-full mr-4" style={{ backgroundColor: `${getRecommendationColor(recommendation.action)}20` }}>
                    <Ionicons 
                      name={getRecommendationIcon(recommendation.action) as any}
                      size={24} 
                      color={getRecommendationColor(recommendation.action)} 
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-gray-800 text-xl font-bold capitalize">
                      {recommendation.action === 'hold' ? 'Hold Stock' :
                       recommendation.action === 'sell' ? 'Sell Now' :
                       recommendation.action === 'wait' ? 'Wait & Watch' : 'Monitor Market'}
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      {recommendation.confidence}% confidence
                    </Text>
                  </View>
                </View>

                <Text className="text-gray-700 text-base leading-6 mb-4">
                  {recommendation.reasoning}
                </Text>

                <View className="flex-row justify-between items-center">
                  <Text className="text-gray-600 text-sm">
                    Timeframe: {recommendation.timeframe}
                  </Text>
                  {recommendation.expectedReturn && (
                    <Text className="text-green-600 text-sm font-semibold">
                      Expected return: +{recommendation.expectedReturn}%
                    </Text>
                  )}
                </View>
              </View>
            </Animated.View>
          )}

          {/* Storage Overview */}
          <Animated.View entering={FadeInDown.delay(600).duration(800)} className="mb-6">
            <View className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <View className="flex-row items-center justify-between mb-6">
                <View className="flex-row items-center">
                  <View className="bg-purple-100 p-3 rounded-full mr-4">
                    <Ionicons name="home-outline" size={24} color={COLORS.secondary} />
                  </View>
                  <View>
                    <Text className="text-gray-800 text-xl font-bold">
                      Your Storage
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      Current inventory
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => setShowStorageForm(true)}
                  className="bg-purple-500 px-4 py-2 rounded-2xl"
                  activeOpacity={0.8}
                >
                  <Text className="text-white text-sm font-semibold">
                    Update
                  </Text>
                </TouchableOpacity>
              </View>

              {storageMetrics ? (
                <View className="space-y-4">
                  <View className="flex-row justify-between">
                    <View className="flex-1 items-center">
                      <Text className="text-gray-600 text-sm">Quantity</Text>
                      <Text className="text-gray-800 text-2xl font-bold">
                        {storageMetrics.units}
                      </Text>
                      <Text className="text-gray-500 text-xs">
                        units ({storageMetrics.totalWeight} kg)
                      </Text>
                    </View>

                    <View className="flex-1 items-center">
                      <Text className="text-gray-600 text-sm">Storage Area</Text>
                      <Text className="text-gray-800 text-2xl font-bold">
                        {storageMetrics.area}
                      </Text>
                      <Text className="text-gray-500 text-xs">
                        {storageMetrics.areaUnit}
                      </Text>
                    </View>

                    <View className="flex-1 items-center">
                      <Text className="text-gray-600 text-sm">Est. Value</Text>
                      <Text className="text-green-600 text-2xl font-bold">
                        ₹{(storageMetrics.estimatedValue / 1000).toFixed(0)}K
                      </Text>
                      <Text className="text-gray-500 text-xs">
                        @₹25/kg avg
                      </Text>
                    </View>
                  </View>

                  <View className="bg-gray-50 rounded-2xl p-4">
                    <View className="flex-row items-center justify-between">
                      <Text className="text-gray-700 text-sm">
                        Storage Utilization
                      </Text>
                      <Text className="text-gray-800 text-sm font-semibold">
                        {storageMetrics.capacityUtilization}%
                      </Text>
                    </View>
                    <View className="bg-gray-200 h-2 rounded-full mt-2">
                      <View 
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: `${Math.min(storageMetrics.capacityUtilization, 100)}%` }}
                      />
                    </View>
                  </View>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => setShowStorageForm(true)}
                  className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl p-8 items-center"
                  activeOpacity={0.8}
                >
                  <Ionicons name="add-circle-outline" size={48} color={COLORS.gray} />
                  <Text className="text-gray-600 text-lg font-semibold mt-4">
                    Add Storage Information
                  </Text>
                  <Text className="text-gray-500 text-sm text-center mt-2">
                    Track your onion inventory and get better insights
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </Animated.View>

          {/* Market Insights */}
          <Animated.View entering={FadeInUp.delay(800).duration(800)} className="mb-6">
            <View className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <View className="flex-row items-center mb-4">
                <View className="bg-blue-100 p-3 rounded-full mr-4">
                  <Ionicons name="analytics-outline" size={24} color="#3B82F6" />
                </View>
                <Text className="text-gray-800 text-xl font-bold">
                  Market Insights
                </Text>
              </View>

              <View className="space-y-3">
                <View className="flex-row items-center">
                  <Ionicons name="information-circle-outline" size={16} color={COLORS.primary} />
                  <Text className="text-gray-700 text-sm ml-2 flex-1">
                    Onion prices typically peak during monsoon season
                  </Text>
                </View>

                <View className="flex-row items-center">
                  <Ionicons name="trending-up-outline" size={16} color={COLORS.success} />
                  <Text className="text-gray-700 text-sm ml-2 flex-1">
                    Demand is expected to increase in the next 2 weeks
                  </Text>
                </View>

                <View className="flex-row items-center">
                  <Ionicons name="warning-outline" size={16} color={COLORS.warning} />
                  <Text className="text-gray-700 text-sm ml-2 flex-1">
                    Weather conditions may affect prices next month
                  </Text>
                </View>
              </View>
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}