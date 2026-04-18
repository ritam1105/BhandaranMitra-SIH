import { SensorStatus, AlertThresholds } from '../types';

// Color constants
export const COLORS = {
  primary: '#6366F1', // Modern indigo
  primaryDark: '#4338CA',
  secondary: '#EC4899', // Pink accent
  tertiary: '#06B6D4', // Cyan
  success: '#10B981', // Emerald
  warning: '#F59E0B', // Amber
  danger: '#EF4444', // Red
  white: '#FFFFFF',
  black: '#000000',
  gray: '#6B7280',
  lightGray: '#F9FAFB',
  darkGray: '#374151',
  // Gradient colors
  gradientStart: '#667EEA',
  gradientEnd: '#764BA2',
  cardBg: '#FFFFFF',
  shadow: 'rgba(0,0,0,0.1)',
  // Status colors
  safeGreen: '#059669',
  warningAmber: '#D97706',
  dangerRed: '#DC2626',
};

// Default alert thresholds
export const DEFAULT_THRESHOLDS: AlertThresholds = {
  temperature: 30, // Celsius
  humidity: 70,    // Percentage
  ethylene: 10,    // ppm
};

// Determine sensor status based on value and threshold
export const getSensorStatus = (
  value: number, 
  threshold: number, 
  type: 'temperature' | 'humidity' | 'ethylene'
): SensorStatus => {
  const warningThreshold = threshold * 0.8; // 80% of danger threshold
  
  if (value >= threshold) {
    return 'danger';
  } else if (value >= warningThreshold) {
    return 'warning';
  }
  return 'safe';
};

// Get status color
export const getStatusColor = (status: SensorStatus): string => {
  switch (status) {
    case 'safe':
      return COLORS.success;
    case 'warning':
      return COLORS.warning;
    case 'danger':
      return COLORS.danger;
    default:
      return COLORS.gray;
  }
};

// Format timestamp
export const formatTimestamp = (timestamp: Date): string => {
  return timestamp.toLocaleString();
};

// Generate gradient colors
export const generateGradient = (color1: string, color2: string) => ({
  colors: [color1, color2],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
});

// Validate email format
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Generate alert message
export const generateAlertMessage = (
  type: 'temperature' | 'humidity' | 'ethylene',
  value: number,
  threshold: number
): string => {
  const messages = {
    temperature: `⚠️ High Temperature Detected! ${value}°C (Threshold: ${threshold}°C)`,
    humidity: `⚠️ High Humidity Detected! ${value}% (Threshold: ${threshold}%)`,
    ethylene: `⚠️ Excess Ethylene Gas Detected! ${value}ppm (Threshold: ${threshold}ppm)`,
  };
  
  return messages[type];
};

// Debounce function for performance optimization
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};