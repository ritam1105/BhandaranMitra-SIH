import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Animated, { FadeInUp, FadeInRight } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { MarketPrice, StorageInfo, SmartInsight, Alert } from '../types';
import { COLORS } from '../utils';

interface MarketPriceCardProps {
  marketData: MarketPrice | null;
  loading: boolean;
  storageInfo: StorageInfo | null;
  storageLoading: boolean;
  insights: SmartInsight[];
  alerts: Alert[];
}

// Memoized header component
const CardHeader = React.memo(() => (
  <View style={styles.header}>
    <View style={styles.headerLeft}>
      <LinearGradient
        colors={['rgba(255,255,255,0.25)', 'rgba(255,255,255,0.15)']}
        style={styles.iconContainer}
      >
        <Ionicons name="trending-up" size={24} color="white" />
      </LinearGradient>
      <Text style={styles.headerTitle}>
        Market Price
      </Text>
    </View>
    
    <View style={styles.liveBadge}>
      <View style={styles.liveIndicator} />
      <Text style={styles.liveText}>
        Live
      </Text>
    </View>
  </View>
));

// Memoized price display component
const PriceDisplay = React.memo(({ marketData }: { marketData: MarketPrice }) => {
  const trendIcon = useMemo(() => {
    switch (marketData.trend) {
      case 'rising':
        return 'trending-up';
      case 'falling':
        return 'trending-down';
      default:
        return 'remove';
    }
  }, [marketData.trend]);

  const trendColor = useMemo(() => {
    switch (marketData.trend) {
      case 'rising':
        return '#10B981'; // green-500
      case 'falling':
        return '#EF4444'; // red-500
      default:
        return '#F59E0B'; // amber-500
    }
  }, [marketData.trend]);

  return (
    <Animated.View 
      entering={FadeInRight.delay(200).duration(600)}
      style={styles.priceContainer}
    >
      <View style={styles.priceRow}>
        <Text style={styles.price}>
          {marketData.currency}{marketData.price}
        </Text>
        <Text style={styles.priceUnit}>/kg</Text>
      </View>
      
      <Text style={styles.location}>
        {marketData.location}
      </Text>

      <View style={styles.trendContainer}>
        <View style={[styles.trendBadge, { backgroundColor: trendColor + '20' }]}>
          <Ionicons 
            name={trendIcon} 
            size={16} 
            color={trendColor} 
          />
          <Text style={[styles.trendText, { color: trendColor }]}>
            {marketData.changePercent > 0 ? '+' : ''}{marketData.changePercent.toFixed(2)}%
          </Text>
        </View>
        <Text style={styles.trendSubtext}>
          from yesterday
        </Text>
      </View>
    </Animated.View>
  );
});


// Loading state component
const LoadingState = React.memo(() => (
  <View style={styles.loadingContainer}>
    <View style={styles.loadingIconContainer}>
      <ActivityIndicator size="large" color="white" />
    </View>
    <Text style={styles.loadingText}>Loading market data...</Text>
  </View>
));

export const MarketPriceCard: React.FC<MarketPriceCardProps> = React.memo(({
  marketData,
  loading,
  storageInfo,
  storageLoading,
  insights,
  alerts,
}) => {
  const gradientColors = useMemo(() => [
    'rgba(99, 102, 241, 0.9)', // indigo-500
    'rgba(139, 92, 246, 0.9)', // violet-500
  ], []);

  return (
    <Animated.View 
      entering={FadeInUp.delay(300).duration(800)}
      style={styles.cardWrapper}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <CardHeader />

        {loading ? (
          <LoadingState />
        ) : marketData ? (
          <>
            <PriceDisplay marketData={marketData} />
            
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Last updated: {marketData.timestamp.toLocaleTimeString()}
              </Text>
            </View>
          </>
        ) : (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle" size={32} color="rgba(255,255,255,0.6)" />
            <Text style={styles.errorText}>
              Unable to load market data
            </Text>
            <TouchableOpacity style={styles.retryButton}>
              <Text style={styles.retryButtonText}>Tap to retry</Text>
            </TouchableOpacity>
          </View>
        )}
      </LinearGradient>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
  },
  card: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    padding: 12,
    borderRadius: 16,
    marginRight: 12,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  liveIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  liveText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  priceContainer: {
    marginBottom: 20,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  price: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
  priceUnit: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 4,
  },
  location: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    marginBottom: 12,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 12,
  },
  trendText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  trendSubtext: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  loadingIconContainer: {
    marginBottom: 16,
  },
  loadingText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16,
    fontWeight: '500',
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  errorText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16,
    marginTop: 12,
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  retryButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  footerText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    textAlign: 'center',
  },
});
