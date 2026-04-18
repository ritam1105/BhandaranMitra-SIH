# Welcome to your Expo app 👋

# 🧅 Onion Rot Alert - Smart Storage Monitoring App

<div align="center">
  <img src="https://img.shields.io/badge/React%20Native-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Native" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
</div>

A **complete React Native mobile app** for farmers to monitor onion storage conditions in real-time and receive alerts when rotting risk is high. Built with modern technologies and beautiful animations, this hackathon-ready app helps reduce food waste and improve crop storage efficiency.

## 🚀 Features

### 🔐 Authentication
- **Email & Password Login** with validation
- **Google Sign-In** integration (placeholder for future implementation)
- **Secure user session** management with Firebase Auth
- **Beautiful animated** login/register screens

### 📊 Real-time Monitoring Dashboard
- **Live sensor data** display for:
  - 🌡️ **Temperature** monitoring (°C)
  - 💧 **Humidity** tracking (%)
  - 🍃 **Ethylene gas** detection (ppm)
- **Beautiful gradient cards** with progress indicators
- **Status indicators** (Safe ✅ / Warning ⚠️ / Danger 🚨)
- **Auto-refreshing** data every 10 seconds
- **Offline fallback** with mock data

### 🚨 Emergency Alert System
- **Configurable thresholds**:
  - Temperature > 30°C
  - Humidity > 70%
  - Ethylene > 10 ppm
- **Real-time push notifications** when thresholds exceeded
- **Critical alert modals** with immediate action guidance
- **Persistent alerts** until conditions normalize
- **Emergency instructions** for each alert type

### 📈 Data Analysis
- **Historical data** viewing with time range filters (24h, 7d, 30d)
- **Statistical summaries** with averages
- **Trend indicators** showing data patterns

### 📈 Market Price Tracking
- **Real-time price data** with trend indicators
- **Price change tracking** with percentage changes
- **Market recommendations**:
  - "✅ Hold your stock, price rising!"
  - "⚠️ Sell soon, price dropping!"
- **Green/Red theme** for rising/falling prices
- **Smart timing suggestions** based on market conditions

### 🧺 Storage Quantity Management
- **Farmer-friendly input form** for:
  - Storage area (sq ft / sq m)
  - Quantity stored (units: 1 unit = 100 kg)
  - Storage type (warehouse/cold storage/open)
  - Location tracking
- **Real-time storage metrics**:
  - Capacity utilization percentage
  - Storage density calculations
  - Estimated inventory value
- **Storage recommendations** for optimal capacity

### 🧠 Smart Insights (AI-Powered)
- **Combined analysis** of IoT + Storage + Market data:
  - High storage + rising prices → "Hold for better profits"
  - High ethylene + good prices → "Sell urgently to avoid losses"
  - Low storage + falling prices → "Good time to buy more"
- **Priority-based insights** (High/Medium/Low)
- **Actionable recommendations** with confidence scores

### ⚙️ Customizable Settings
- **Alert threshold** configuration for each sensor
- **Notification preferences** (push, sound)
- **App preferences** (dark mode, language)
- **Reset to defaults** option
- **Help documentation** built-in

### 👤 User Profile Management
- **User account** information display
- **Activity statistics** tracking
- **App preferences** management
- **Support contact** information

## 🛠 Tech Stack

### Frontend
- **React Native** with Expo
- **TypeScript** for type safety
- **NativeWind** (Tailwind CSS for React Native)
- **React Native Reanimated** for smooth animations
- **React Navigation** for screen navigation
- **Expo Vector Icons** for consistent iconography

### Backend & Services
- **Firebase Authentication** for user management
- **Firestore Database** for real-time data storage
- **Expo Notifications** for push alerts
- **AsyncStorage** for local data persistence

### UI/UX
- **Green (#4CAF50) & Purple (#6A1B9A)** theme colors
- **Gradient backgrounds** and shadow effects
- **Smooth animations** and page transitions
- **Responsive design** for all screen sizes
- **Farmer-friendly** interface design

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v20.19.0 or higher)
- npm or yarn
- Expo CLI
- Firebase project setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Firebase Configuration
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password)
3. Create Firestore database
4. Update `app/config/firebase.ts` with your Firebase config

### 3. Run the App
```bash
# Start the development server
npx expo start

# Run on Android
npx expo start --android

# Run on iOS
npx expo start --ios
```

## 📱 App Features

### 🔐 Authentication Flow
- **Login Screen**: Email/password with animated UI
- **Register Screen**: Account creation with validation
- **Loading Screen**: Beautiful animated splash screen

### 📊 Main Dashboard
- **Real-time sensor cards** with gradient backgrounds
- **Circular progress indicators** showing threshold percentages
- **Live status badges** (Safe/Warning/Danger)
- **Quick action buttons** to access other screens
- **Storage tips** for optimal onion preservation

### 🚨 Alert System
- **Push notifications** for threshold violations
- **Modal alerts** with emergency instructions
- **Configurable thresholds** in settings
- **Alert history** tracking

## 🎨 Design Philosophy

### Color Scheme
- **Primary Green** (#4CAF50): Growth, freshness, safety
- **Secondary Purple** (#6A1B9A): Technology, innovation
- **Status Colors**: Green (safe), Yellow (warning), Red (danger)

### Animation Principles
- **Smooth transitions** between screens
- **Staggered animations** for list items
- **Physics-based** spring animations
- **Contextual feedback** for user interactions

## 🧪 Development Features

### Mock Data System
- **Automatic data generation** when Firebase is unavailable
- **Realistic sensor readings** with variation over time
- **Fallback mechanisms** for offline usage

### TypeScript Integration
- **Full type safety** throughout the app
- **Interface definitions** for all data structures
- **Type-safe navigation** with React Navigation

## 🏆 Hackathon Ready

This app is designed to be **hackathon-winning quality** with:
- ✅ **Complete functionality** from authentication to alerts
- ✅ **Beautiful, modern UI** with smooth animations
- ✅ **Real-world applicability** for farming communities
- ✅ **Technical excellence** with TypeScript and best practices
- ✅ **Scalable architecture** for future enhancements
- ✅ **Demo-ready** with mock data fallbacks

## 📧 Support & Contact

- **Email**: support@onionrotalert.com
- **Documentation**: Built-in help system
- **Issue Reporting**: Contact through app profile section

---

<div align="center">
  <strong>Built with ❤️ for farmers and fresh food everywhere</strong>
  <br>
  <em>Keeping harvests fresh, reducing waste, building sustainable futures</em>
</div>
