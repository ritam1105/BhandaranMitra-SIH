// User types
export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

// Sensor data types
export interface SensorData {
  id: string;
  temperature: number;
  humidity: number;
  ethylene: number;
  timestamp: Date;
  location?: string;
}

// Alert types
export interface AlertThresholds {
  temperature: number;
  humidity: number;
  ethylene: number;
}

export interface Alert {
  id: string;
  type: 'temperature' | 'humidity' | 'ethylene';
  message: string;
  value: number;
  threshold: number;
  timestamp: Date;
  acknowledged: boolean;
}

// Navigation types
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Dashboard: undefined;
  History: undefined;
  Settings: undefined;
  Profile: undefined;
};

// Sensor status types
export type SensorStatus = 'safe' | 'warning' | 'danger';

// Language types
export type Language = 'en' | 'hi';

// Settings types
export interface AppSettings {
  thresholds: AlertThresholds;
  language: Language;
  notifications: boolean;
  darkMode: boolean;
}

// Market data types
export interface MarketPrice {
  id: string;
  price: number; // Price in ₹/kg
  currency: string;
  timestamp: Date;
  location: string;
  trend: 'rising' | 'falling' | 'stable';
  changePercent: number; // Percentage change from previous day
  previousPrice: number;
}

// Storage management types
export interface StorageInfo {
  id: string;
  userId: string;
  storageArea: number; // in sq. ft
  areaUnit: 'sqft' | 'sqm';
  quantity: number; // in units (1 unit = 100kg)
  totalWeight: number; // calculated field in kg
  location: string;
  storageType: 'warehouse' | 'cold_storage' | 'open_storage';
  lastUpdated: Date;
}

// Smart insights types
export interface SmartInsight {
  id: string;
  type: 'market' | 'storage' | 'iot' | 'combined';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  action?: string;
  timestamp: Date;
  factors: {
    marketPrice?: number;
    priceDirection?: 'up' | 'down' | 'stable';
    storageQuantity?: number;
    storageRisk?: boolean;
    iotAlerts?: string[];
  };
}

// Market recommendation types
export interface MarketRecommendation {
  action: 'hold' | 'sell' | 'wait' | 'monitor';
  confidence: number; // 0-100
  reasoning: string;
  timeframe: string;
  expectedReturn?: number;
}
