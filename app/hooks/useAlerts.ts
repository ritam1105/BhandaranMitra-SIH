import { useState, useEffect, useCallback, useRef } from 'react';
import { Alert, SensorData, AlertThresholds } from '../types';
import { generateAlertMessage, getSensorStatus } from '../utils';
import { Platform } from 'react-native';

// Conditionally import notifications (not available in Expo Go)
let Notifications: any = null;
try {
  if (Platform.OS !== 'web') {
    Notifications = require('expo-notifications');
    // Configure notifications only if available
    Notifications?.setNotificationHandler?.({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  }
} catch (error) {
  console.warn('Notifications not available in Expo Go');
}

export const useAlerts = (sensorData: SensorData | null, thresholds: AlertThresholds) => {
  const [activeAlerts, setActiveAlerts] = useState<Alert[]>([]);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [currentAlert, setCurrentAlert] = useState<Alert | null>(null);
  
  // Use ref to track the last update time to prevent too frequent updates
  const lastUpdateTime = useRef(Date.now());
  const UPDATE_INTERVAL = 5000; // 5 seconds minimum between updates

  // Request notification permissions
  useEffect(() => {
    const requestPermissions = async () => {
      if (Notifications?.requestPermissionsAsync) {
        try {
          const { status } = await Notifications.requestPermissionsAsync();
          if (status !== 'granted') {
            console.warn('Notification permissions not granted');
          }
        } catch (error) {
          console.warn('Could not request notification permissions:', error);
        }
      }
    };

    requestPermissions();
  }, []);

  const sendNotification = useCallback(async (alert: Alert) => {
    if (Notifications?.scheduleNotificationAsync) {
      try {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: '🚨 Onion Storage Alert!',
            body: alert.message,
            data: { alertId: alert.id, type: alert.type },
            sound: true,
            priority: 'high',
          },
          trigger: null, // Show immediately
        });
      } catch (error) {
        console.warn('Failed to send notification (this is normal in Expo Go):', error);
      }
    } else {
      console.log('Alert triggered:', alert.message); // Log instead of sending notification
    }
  }, []);

  const createAlert = useCallback((type: string, value: number, threshold: number, timestamp: Date): Alert => {
    return {
      id: `${type}-${timestamp.getTime()}`,
      type,
      message: generateAlertMessage(type, value, threshold),
      value,
      threshold,
      timestamp,
      acknowledged: false,
    };
  }, []);

  // Monitor sensor data for threshold violations
  useEffect(() => {
    if (!sensorData) return;

    const now = Date.now();
    // Only update if enough time has passed since the last update
    if (now - lastUpdateTime.current < UPDATE_INTERVAL) {
      return;
    }
    lastUpdateTime.current = now;

    const timestamp = new Date();
    const newAlerts: Alert[] = [];

    // Check thresholds and create alerts
    if (sensorData.temperature > thresholds.temperature) {
      newAlerts.push(createAlert('temperature', sensorData.temperature, thresholds.temperature, timestamp));
    }
    if (sensorData.humidity > thresholds.humidity) {
      newAlerts.push(createAlert('humidity', sensorData.humidity, thresholds.humidity, timestamp));
    }
    if (sensorData.ethylene > thresholds.ethylene) {
      newAlerts.push(createAlert('ethylene', sensorData.ethylene, thresholds.ethylene, timestamp));
    }

    // Update active alerts efficiently
    setActiveAlerts(prevAlerts => {
      // Remove alerts that are no longer relevant
      const existingAlerts = prevAlerts.filter(alert => {
        const currentValue = sensorData[alert.type as keyof typeof sensorData];
        const currentThreshold = thresholds[alert.type as keyof typeof thresholds];
        return currentValue > currentThreshold;
      });

      // Add new alerts that don't already exist
      const newUniqueAlerts = newAlerts.filter(newAlert => 
        !existingAlerts.some(existing => existing.type === newAlert.type)
      );

      // Show modal and send notification for new alerts
      if (newUniqueAlerts.length > 0) {
        const firstNewAlert = newUniqueAlerts[0];
        setCurrentAlert(firstNewAlert);
        setShowAlertModal(true);
        sendNotification(firstNewAlert);
      }

      return [...existingAlerts, ...newUniqueAlerts];
    });
  }, [sensorData, thresholds, createAlert, sendNotification]);

  const acknowledgeAlert = useCallback((alertId: string) => {
    setActiveAlerts(prevAlerts =>
      prevAlerts.map(alert =>
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      )
    );
  }, []);

  const dismissAlert = useCallback((alertId: string) => {
    setActiveAlerts(prevAlerts =>
      prevAlerts.filter(alert => alert.id !== alertId)
    );
  }, []);

  const closeAlertModal = useCallback(() => {
    setShowAlertModal(false);
    setCurrentAlert(null);
  }, []);

  const acknowledgeCurrentAlert = useCallback(() => {
    if (currentAlert) {
      acknowledgeAlert(currentAlert.id);
    }
    closeAlertModal();
  }, [currentAlert, acknowledgeAlert, closeAlertModal]);

  return {
    activeAlerts,
    showAlertModal,
    currentAlert,
    acknowledgeAlert,
    dismissAlert,
    closeAlertModal,
    acknowledgeCurrentAlert,
  };
};