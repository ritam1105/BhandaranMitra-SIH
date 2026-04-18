import { useState, useEffect, useCallback, useRef } from 'react';
import { MarketPrice, MarketRecommendation } from '../types';
import { db } from '../config/firebase';

// Mock market price data for demo (in a real app, this would come from an API)
const generateMockMarketData = (): MarketPrice => {
  const basePrice = 25; // Base price ₹25/kg
  const variation = (Math.random() - 0.5) * 10; // ±5 variation
  const currentPrice = Math.max(15, Math.min(40, basePrice + variation));
  
  const previousPrice = Math.max(15, Math.min(40, basePrice + (Math.random() - 0.5) * 8));
  const changePercent = ((currentPrice - previousPrice) / previousPrice) * 100;
  
  let trend: 'rising' | 'falling' | 'stable' = 'stable';
  if (Math.abs(changePercent) > 0.5) {
    trend = changePercent > 0 ? 'rising' : 'falling';
  }

  return {
    id: `market-${Date.now()}`,
    price: parseFloat(currentPrice.toFixed(2)),
    currency: '₹',
    timestamp: new Date(),
    location: 'Local Market',
    trend,
    changePercent: parseFloat(changePercent.toFixed(2)),
    previousPrice: parseFloat(previousPrice.toFixed(2)),
  };
};

export const useMarketPrice = () => {
  const [marketData, setMarketData] = useState<MarketPrice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState<MarketRecommendation | null>(null);
  
  // Use ref to track the update interval
  const intervalRef = useRef<NodeJS.Timeout>();
  // Use ref to track the last update time
  const lastUpdateTime = useRef(Date.now());
  const UPDATE_INTERVAL = 30000; // 30 seconds between updates

  // Generate market recommendation based on price data
  const generateRecommendation = useCallback((priceData: MarketPrice): MarketRecommendation => {
    const { trend, changePercent, price } = priceData;
    
    if (trend === 'rising' && changePercent > 2) {
      return {
        action: 'hold',
        confidence: 85,
        reasoning: 'Prices are rising steadily. Hold your stock for better returns.',
        timeframe: '1-2 weeks',
        expectedReturn: Math.round(changePercent * 2),
      };
    } else if (trend === 'falling' && changePercent < -2) {
      return {
        action: 'sell',
        confidence: 75,
        reasoning: 'Prices are dropping. Consider selling soon to avoid losses.',
        timeframe: 'within 3 days',
      };
    } else if (price > 30) {
      return {
        action: 'sell',
        confidence: 80,
        reasoning: 'Current price is above average. Good time to sell.',
        timeframe: 'this week',
      };
    } else if (price < 20) {
      return {
        action: 'wait',
        confidence: 70,
        reasoning: 'Price is below average. Wait for better market conditions.',
        timeframe: '1-2 weeks',
      };
    } else {
      return {
        action: 'monitor',
        confidence: 60,
        reasoning: 'Market is stable. Keep monitoring for changes.',
        timeframe: 'daily',
      };
    }
  }, []);

  // Fetch market data with rate limiting
  const fetchMarketData = useCallback(() => {
    const now = Date.now();
    if (now - lastUpdateTime.current < UPDATE_INTERVAL) {
      return;
    }
    lastUpdateTime.current = now;

    try {
      // In a real app, you would fetch from an API or Firestore
      // For demo purposes, we'll use mock data
      const mockData = generateMockMarketData();
      setMarketData(mockData);
      setRecommendation(generateRecommendation(mockData));
      setLoading(false);
      setError(null);
    } catch (err) {
      console.error('Error fetching market data:', err);
      setError('Failed to fetch market data');
      setLoading(false);
      
      // Fallback to mock data
      const mockData = generateMockMarketData();
      setMarketData(mockData);
      setRecommendation(generateRecommendation(mockData));
    }
  }, [generateRecommendation]);

  // Initialize and cleanup market data updates
  useEffect(() => {
    // Initial fetch
    fetchMarketData();

    // Update market data periodically
    intervalRef.current = setInterval(fetchMarketData, UPDATE_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchMarketData]);

  // Refresh market data manually with debouncing
  const refreshMarketData = useCallback(async () => {
    const now = Date.now();
    if (now - lastUpdateTime.current < 1000) { // Prevent rapid refreshes
      return;
    }
    
    setLoading(true);
    lastUpdateTime.current = now;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    fetchMarketData();
  }, [fetchMarketData]);

  return {
    marketData,
    loading,
    error,
    recommendation,
    refreshMarketData,
  };
};