import { useState, useEffect, useRef } from 'react';
// Import Firestore functions with error handling
let collection: any;
let query: any;
let orderBy: any;
let limit: any;
let onSnapshot: any;
let DocumentData: any;

try {
  const firestore = require('firebase/firestore');
  collection = firestore.collection;
  query = firestore.query;
  orderBy = firestore.orderBy;
  limit = firestore.limit;
  onSnapshot = firestore.onSnapshot;
  DocumentData = firestore.DocumentData;
} catch (error) {
  console.warn('Firestore not available, using mock data only');
}
import { db } from '../config/firebase';
import { SensorData, AlertThresholds } from '../types';
import { DEFAULT_THRESHOLDS } from '../utils';

export const useSensorData = () => {
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [thresholds] = useState<AlertThresholds>(DEFAULT_THRESHOLDS);
  
  // Use refs to store mutable values that shouldn't trigger re-renders
  const lastUpdateTime = useRef(Date.now());
  const mockDataInterval = useRef<NodeJS.Timeout>();

  const generateMockData = (forceUpdate = false) => {
    const now = Date.now();
    // Only update if at least 5 seconds have passed since the last update, unless forced
    if (forceUpdate || now - lastUpdateTime.current >= 5000) {
      lastUpdateTime.current = now;
      setSensorData(prev => ({
        id: `demo-${now}`,
        temperature: prev ? Math.max(15, Math.min(40, prev.temperature + (Math.random() - 0.5) * 2)) : Math.random() * 15 + 20,
        humidity: prev ? Math.max(30, Math.min(90, prev.humidity + (Math.random() - 0.5) * 3)) : Math.random() * 30 + 50,
        ethylene: prev ? Math.max(0, Math.min(25, prev.ethylene + (Math.random() - 0.5) * 1)) : Math.random() * 15 + 5,
        timestamp: new Date(),
        location: 'Storage Unit 1',
      }));
      setLoading(false);
    }
  };

  useEffect(() => {
    // Immediately generate initial mock data
    generateMockData(true);
    setLoading(false);
    setError(null); // Remove the demo message
    
    // Set up interval for periodic updates
    mockDataInterval.current = setInterval(() => generateMockData(), 10000);

    // Cleanup function
    return () => {
      if (mockDataInterval.current) {
        clearInterval(mockDataInterval.current);
      }
    };
  }, []); // Empty dependency array since we only want to run this once

  const refreshSensorData = async () => {
    setLoading(true);
    generateMockData(true); // Force refresh
  };

  return {
    sensorData,
    loading,
    error,
    thresholds,
    refreshSensorData,
  };
};