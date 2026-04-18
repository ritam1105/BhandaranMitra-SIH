import { useState, useEffect, useCallback, useRef } from 'react';
import { SmartInsight } from '../types';
import { useSensorData } from './useSensorData';
import { useMarketPrice } from './useMarketPrice';
import { useStorage } from './useStorage';
import { useAlerts } from './useAlerts';

const UPDATE_INTERVAL = 60000; // 1 minute minimum between updates

export const useSmartInsights = () => {
  const { sensorData } = useSensorData();
  const { marketData, recommendation } = useMarketPrice();
  const { storageInfo, getStorageMetrics } = useStorage();
  const { activeAlerts } = useAlerts(sensorData, { temperature: 30, humidity: 70, ethylene: 10 });
  
  const [insights, setInsights] = useState<SmartInsight[]>([]);
  const lastUpdateRef = useRef<number>(0);

  const generateInsights = useCallback(() => {
    const now = Date.now();
    if (now - lastUpdateRef.current < UPDATE_INTERVAL) {
      return;
    }
    lastUpdateRef.current = now;

    const newInsights: SmartInsight[] = [];
    const storageMetrics = getStorageMetrics();

    try {
      // IoT + Storage + Market Combined Insights
      if (sensorData && marketData && storageMetrics) {
        
        // High storage + rising prices = hold recommendation
        if (storageMetrics.totalWeight > 300 && marketData.trend === 'rising') {
          newInsights.push({
            id: `combined-hold-${now}`,
            type: 'combined',
            title: 'Perfect Time to Hold',
            message: `You have ${storageMetrics.totalWeight}kg stored and prices are rising ${marketData.changePercent.toFixed(1)}%. Consider holding for better profits.`,
            priority: 'medium',
            action: 'Monitor market trends and sell when prices peak',
            timestamp: new Date(),
            factors: {
              marketPrice: marketData.price,
              priceDirection: 'up',
              storageQuantity: storageMetrics.totalWeight,
              storageRisk: false,
            }
          });
        }

        // High ethylene risk + stable/good prices = sell urgently
        if (sensorData.ethylene > 8 && marketData.price > 22) {
          newInsights.push({
            id: `combined-sell-${now}`,
            type: 'combined',
            title: 'Urgent: Sell to Prevent Loss',
            message: `Ethylene levels are high (${sensorData.ethylene.toFixed(1)}ppm) but market price is good (₹${marketData.price}/kg). Sell immediately to avoid spoilage losses.`,
            priority: 'high',
            action: 'Contact buyers immediately and arrange quick sale',
            timestamp: new Date(),
            factors: {
              marketPrice: marketData.price,
              priceDirection: marketData.trend === 'rising' ? 'up' : marketData.trend === 'falling' ? 'down' : 'stable',
              storageQuantity: storageMetrics.totalWeight,
              storageRisk: true,
              iotAlerts: [`High ethylene: ${sensorData.ethylene.toFixed(1)}ppm`],
            }
          });
        }

        // Low storage + falling prices = wait to buy more
        if (storageMetrics.totalWeight < 200 && marketData.trend === 'falling') {
          newInsights.push({
            id: `combined-buy-${now}`,
            type: 'combined',
            title: 'Opportunity to Expand Inventory',
            message: `Your storage is only ${storageMetrics.capacityUtilization}% full and prices are dropping. Good time to buy more onions at lower prices.`,
            priority: 'low',
            action: 'Consider purchasing more inventory while prices are low',
            timestamp: new Date(),
            factors: {
              marketPrice: marketData.price,
              priceDirection: 'down',
              storageQuantity: storageMetrics.totalWeight,
              storageRisk: false,
            }
          });
        }

        // Storage utilization warning
        if (storageMetrics.capacityUtilization > 85) {
          newInsights.push({
            id: `storage-capacity-${now}`,
            type: 'storage',
            title: 'Storage Nearly Full',
            message: `Your storage is ${storageMetrics.capacityUtilization}% full. Consider selling some inventory or expanding storage capacity.`,
            priority: 'medium',
            action: 'Plan for additional storage or partial sales',
            timestamp: new Date(),
            factors: {
              storageQuantity: storageMetrics.totalWeight,
              storageRisk: storageMetrics.capacityUtilization > 90,
            }
          });
        }

        // Market timing insights
        if (marketData.changePercent > 5) {
          newInsights.push({
            id: `market-timing-${now}`,
            type: 'market',
            title: 'Significant Price Movement',
            message: `Prices have ${marketData.trend === 'rising' ? 'increased' : 'decreased'} by ${Math.abs(marketData.changePercent).toFixed(1)}% today. ${marketData.trend === 'rising' ? 'Great time to sell!' : 'Prices may recover soon.'}`,
            priority: marketData.changePercent > 10 ? 'high' : 'medium',
            action: marketData.trend === 'rising' ? 'Consider selling while prices are high' : 'Hold and wait for price recovery',
            timestamp: new Date(),
            factors: {
              marketPrice: marketData.price,
              priceDirection: marketData.trend === 'rising' ? 'up' : 'down',
            }
          });
        }

        // IoT-based storage condition insights
        const hasIoTAlerts = activeAlerts.length > 0;
        if (hasIoTAlerts) {
          const alertTypes = activeAlerts.map(alert => alert.type);
          newInsights.push({
            id: `iot-alert-${now}`,
            type: 'iot',
            title: 'Storage Condition Alert',
            message: `Your storage conditions need attention: ${alertTypes.join(', ')} levels are high. Take immediate action to prevent spoilage.`,
            priority: 'high',
            action: 'Check ventilation, temperature control, and consider immediate sales',
            timestamp: new Date(),
            factors: {
              storageQuantity: storageMetrics.totalWeight,
              storageRisk: true,
              iotAlerts: activeAlerts.map(alert => alert.message),
            }
          });
        }
      }

      // Market-only insights when no storage data
      if (marketData && !storageMetrics) {
        newInsights.push({
          id: `market-only-${now}`,
          type: 'market',
          title: 'Market Update',
          message: `Current price is ₹${marketData.price}/kg and ${marketData.trend}. Add your storage information to get personalized insights.`,
          priority: 'low',
          action: 'Set up storage tracking for better recommendations',
          timestamp: new Date(),
          factors: {
            marketPrice: marketData.price,
            priceDirection: marketData.trend === 'rising' ? 'up' : marketData.trend === 'falling' ? 'down' : 'stable',
          }
        });
      }

      // Sort insights by priority
      newInsights.sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });

      setInsights(prevInsights => {
        // Only update if insights have actually changed
        const hasChanged = JSON.stringify(newInsights.slice(0, 5)) !== JSON.stringify(prevInsights);
        return hasChanged ? newInsights.slice(0, 5) : prevInsights;
      });
    } catch (error) {
      console.error('Error generating insights:', error);
    }
  }, [sensorData, marketData, storageInfo, activeAlerts, getStorageMetrics]);

  useEffect(() => {
    generateInsights();
  }, [generateInsights]);

  return {
    insights,
  };
};