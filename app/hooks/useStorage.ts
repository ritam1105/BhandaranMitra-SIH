import { useState, useEffect, useCallback, useRef } from 'react';
import { StorageInfo } from '../types';
import { useAuth } from './useAuth';

export const useStorage = () => {
  const { user } = useAuth();
  const [storageInfo, setStorageInfo] = useState<StorageInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Use ref to track the last update time
  const lastUpdateTime = useRef(Date.now());
  const UPDATE_INTERVAL = 5000; // 5 seconds minimum between updates

  // Load storage info from localStorage (in a real app, this would be Firestore)
  const loadStorageInfo = useCallback(async () => {
    if (!user) {
      setStorageInfo(null);
      setLoading(false);
      return;
    }

    const now = Date.now();
    if (now - lastUpdateTime.current < UPDATE_INTERVAL) {
      return;
    }
    lastUpdateTime.current = now;

    try {
      // In a real app, fetch from Firestore based on user ID
      // For demo purposes, use localStorage
      const storageKey = `storage_${user.uid}`;
      const savedStorage = localStorage?.getItem?.(storageKey);
      
      if (savedStorage) {
        const parsed = JSON.parse(savedStorage);
        setStorageInfo({
          ...parsed,
          lastUpdated: new Date(parsed.lastUpdated)
        });
      } else {
        // Default storage info for demo
        const defaultStorage: StorageInfo = {
          id: `storage_${user.uid}`,
          userId: user.uid,
          storageArea: 200,
          areaUnit: 'sqft',
          quantity: 5, // 5 units = 500kg
          totalWeight: 500,
          location: 'Main Storage',
          storageType: 'warehouse',
          lastUpdated: new Date(),
        };
        setStorageInfo(defaultStorage);
      }
      
      setLoading(false);
      setError(null);
    } catch (err) {
      console.error('Error loading storage info:', err);
      setError('Failed to load storage information');
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadStorageInfo();
  }, [loadStorageInfo]);

  // Save storage info with debouncing
  const saveStorageInfo = useCallback(async (newStorageInfo: Partial<StorageInfo>) => {
    if (!user) {
      setError('User not authenticated');
      return { success: false, error: 'User not authenticated' };
    }

    const now = Date.now();
    if (now - lastUpdateTime.current < UPDATE_INTERVAL) {
      return { success: false, error: 'Please wait before updating again' };
    }
    lastUpdateTime.current = now;

    setSaving(true);
    setError(null);

    try {
      const updatedStorage: StorageInfo = {
        id: storageInfo?.id || `storage_${user.uid}`,
        userId: user.uid,
        storageArea: newStorageInfo.storageArea || storageInfo?.storageArea || 0,
        areaUnit: newStorageInfo.areaUnit || storageInfo?.areaUnit || 'sqft',
        quantity: newStorageInfo.quantity || storageInfo?.quantity || 0,
        totalWeight: (newStorageInfo.quantity || storageInfo?.quantity || 0) * 100, // 1 unit = 100kg
        location: newStorageInfo.location || storageInfo?.location || '',
        storageType: newStorageInfo.storageType || storageInfo?.storageType || 'warehouse',
        lastUpdated: new Date(),
      };

      // In a real app, save to Firestore
      // For demo purposes, use localStorage
      const storageKey = `storage_${user.uid}`;
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(storageKey, JSON.stringify(updatedStorage));
      }

      setStorageInfo(updatedStorage);
      setSaving(false);

      return { success: true };
    } catch (err) {
      console.error('Error saving storage info:', err);
      const errorMessage = 'Failed to save storage information';
      setError(errorMessage);
      setSaving(false);
      return { success: false, error: errorMessage };
    }
  }, [user, storageInfo]);

  // Update specific storage fields with debouncing
  const updateStorage = useCallback(async (updates: Partial<StorageInfo>) => {
    return await saveStorageInfo(updates);
  }, [saveStorageInfo]);

  // Calculate storage metrics (memoized)
  const getStorageMetrics = useCallback(() => {
    if (!storageInfo) return null;

    const densityPerSqFt = storageInfo.areaUnit === 'sqft' 
      ? storageInfo.totalWeight / storageInfo.storageArea 
      : storageInfo.totalWeight / (storageInfo.storageArea * 10.764); // Convert sqm to sqft

    const capacityUtilization = Math.min((densityPerSqFt / 10) * 100, 100); // Assume 10kg/sqft is max capacity

    return {
      totalWeight: storageInfo.totalWeight,
      units: storageInfo.quantity,
      area: storageInfo.storageArea,
      areaUnit: storageInfo.areaUnit,
      density: Math.round(densityPerSqFt * 10) / 10,
      capacityUtilization: Math.round(capacityUtilization),
      estimatedValue: storageInfo.totalWeight * 25, // Assuming ₹25/kg average price
    };
  }, [storageInfo]);

  // Get storage recommendations (memoized)
  const getStorageRecommendations = useCallback(() => {
    const metrics = getStorageMetrics();
    if (!metrics) return [];

    const recommendations = [];

    if (metrics.capacityUtilization > 80) {
      recommendations.push({
        type: 'warning',
        message: 'Storage capacity is high. Consider expanding or selling some stock.',
        priority: 'medium'
      });
    }

    if (metrics.density > 12) {
      recommendations.push({
        type: 'danger',
        message: 'Storage density is too high. Risk of spoilage increases.',
        priority: 'high'
      });
    }

    if (metrics.totalWeight > 1000) {
      recommendations.push({
        type: 'info',
        message: 'Large inventory detected. Monitor market prices for selling opportunities.',
        priority: 'low'
      });
    }

    return recommendations;
  }, [getStorageMetrics]);

  return {
    storageInfo,
    loading,
    error,
    saving,
    saveStorageInfo,
    updateStorage,
    getStorageMetrics,
    getStorageRecommendations,
  };
};