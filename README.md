# 🧅 Onion Rot Alert - Smart Storage Monitoring App

<div align="center">
  <h3>A React Native application for intelligent onion storage monitoring and crop waste prevention</h3>
  
  [![React Native](https://img.shields.io/badge/React%20Native-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactnative.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
  
  <br/>
  
  **Version:** 1.0.0 | **License:** MIT | **Status:** Active Development
</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Development](#development)
- [Key Features Breakdown](#key-features-breakdown)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**Onion Rot Alert** is a revolutionary mobile application designed to help farmers and agricultural storage managers monitor onion storage conditions in **real-time**. The app combines sensor data analysis, intelligent alerting, and market insights to reduce food waste and optimize crop storage efficiency.

### Problem Statement
- 🔴 30-40% of stored onions rot due to poor condition monitoring
- 📉 Farmers lack real-time visibility into storage environments
- 💰 Significant economic losses from preventable spoilage
- ❌ Manual monitoring is time-consuming and ineffective

### Our Solution
A comprehensive mobile platform that provides:
- ✅ Real-time environmental monitoring (temperature, humidity, ethylene gas)
- ✅ Intelligent alert system with actionable guidance
- ✅ Historical data analysis and trend tracking
- ✅ Market price insights for better sales decisions
- ✅ Secure user authentication and data management

---

## 🚀 Features

### 🔐 **Authentication & User Management**
- **Email & Password Authentication** with comprehensive validation
- **Google Sign-In Integration** ready for future implementation
- **Secure Session Management** with Firebase Auth
- **Beautiful Animated** Login & Registration screens
- **Password recovery** functionality
- **User profile management** with display customization

### 📊 **Real-time Monitoring Dashboard**

#### Live Sensor Data Display
- 🌡️ **Temperature Monitoring**
  - Real-time temperature readings (°C)
  - Historical temperature trends
  - Visual status indicators
  
- 💧 **Humidity Tracking**
  - Precise humidity percentage (%)
  - Optimal range visualization
  - Humidity trend analysis
  
- 🍃 **Ethylene Gas Detection**
  - Gas level monitoring (ppm)
  - Early warning indicators
  - Safe zone visualization

#### Visual Features
- **Gradient card UI** with smooth animations
- **Circular progress indicators** for each sensor
- **Status indicators** with intuitive icons
  - ✅ Safe (Green)
  - ⚠️ Warning (Yellow)
  - 🚨 Danger (Red)
- **Auto-refresh mechanism** (10-second intervals)
- **Offline support** with cached mock data

### 🚨 **Emergency Alert System**

#### Intelligent Thresholds
```
Temperature > 30°C  →  ALERT
Humidity > 70%      →  ALERT
Ethylene > 10 ppm   →  ALERT
```

#### Alert Features
- Real-time push notifications
- Critical alert modal dialogs
- Immediate action guidance
- Persistent alerts until resolution
- Emergency instructions with remediation steps
- Historical alert tracking

### 📈 **Data Analysis & History**
- **Time Range Filters**: 24h, 7 days, 30 days
- **Statistical Summaries**: Averages, min/max values
- **Trend Indicators**: Visual trend arrows
- **Historical Charts**: Easy-to-read data visualizations
- **Export Capabilities**: Download data for analysis

### 💰 **Market Price Tracking**
- **Real-time price data** with automatic updates
- **Trend indicators** showing price movements
- **Percentage change tracking** with visual indicators
- **Market comparison** across regions
- **Price history charts** for informed selling decisions

### ⚙️ **Smart Insights Engine**
- **AI-powered recommendations** for optimal storage
- **Predictive alerts** based on trend analysis
- **Seasonal guidance** for different storage phases
- **Best practices** suggestions based on data patterns

### 👤 **User Profile & Settings**
- **Profile customization** with profile picture
- **Storage facility management** (add multiple storage locations)
- **Alert preferences** customization
- **Temperature unit preferences** (Celsius/Fahrenheit)
- **Data backup & sync** options

---

## 🛠 **Tech Stack**

### Frontend Framework
- **React Native 0.81.4** - Cross-platform mobile development
- **Expo 54.0.8** - Development platform and managed build service
- **Expo Router 6.0.7** - File-based routing for React Native

### Language & Type Safety
- **TypeScript 5.9.2** - Static type checking and enhanced IDE support
- **JavaScript ES2020+** - Modern JavaScript features

### Styling & UI
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **NativeWind 4.2.1** - Tailwind CSS for React Native
- **Expo Linear Gradient** - Beautiful gradient backgrounds
- **React Native Reanimated 4.1.0** - Advanced animations
- **React Native Gesture Handler 2.28.0** - Gesture recognition

### Backend & Database
- **Firebase 12.3.0** - Complete backend solution
  - Firebase Auth - User authentication
  - Firestore - Real-time database
  - Firebase Cloud Messaging - Push notifications

### UI Components & Icons
- **Expo Vector Icons** - Icon library
- **Lucide React Native** - Beautiful icons
- **React Native Circular Progress** - Progress indicators
- **React Native SVG** - SVG support

### Navigation
- **React Navigation 7.1.8** - Navigation framework
- **Bottom Tab Navigator** - Tab-based navigation
- **Stack Navigator** - Screen stack management
- **Drawer Navigator** - Side menu navigation

### State Management & Async
- **React Hooks** - State management
- **AsyncStorage** - Local data persistence
- **Firebase Realtime Updates** - Real-time data sync

### Development Tools
- **ESLint 9.25.0** - Code linting and style checking
- **Babel** - JavaScript transpiler
- **Expo CLI** - Command-line interface

---

## 📁 **Project Structure**

```
BhandaranMitra-SIH/
├── app/
│   ├── _layout.tsx                 # Root navigation layout
│   ├── index.tsx                   # Home/Entry screen
│   ├── login.tsx                   # Login page
│   ├── register.tsx                # Registration page
│   ├── dashboard.tsx               # Dashboard page
│   ├── history.tsx                 # Historical data page
│   ├── market.tsx                  # Market prices page
│   ├── profile.tsx                 # User profile page
│   ├── settings.tsx                # Settings page
│   ├── globals.css                 # Global styles
│   │
│   ├── screens/                    # Screen components
│   │   ├── DashboardScreen.tsx     # Main dashboard display
│   │   ├── HistoryScreen.tsx       # History data view
│   │   ├── LoginScreen.tsx         # Login UI
│   │   ├── RegisterScreen.tsx      # Registration UI
│   │   ├── MarketScreen.tsx        # Market data view
│   │   ├── ProfileScreen.tsx       # Profile management
│   │   ├── SettingsScreen.tsx      # App settings
│   │   └── LoadingScreen.tsx       # Loading state UI
│   │
│   ├── components/                 # Reusable components
│   │   ├── AlertModal.tsx          # Alert dialog component
│   │   ├── MarketPriceCard.tsx     # Price display card
│   │   ├── SensorCard.tsx          # Sensor data card
│   │   └── StorageForm.tsx         # Storage form component
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── useAuth.ts              # Authentication logic
│   │   ├── useSensorData.ts        # Sensor data management
│   │   ├── useMarketPrice.ts       # Market price data
│   │   ├── useSmartInsights.ts     # AI insights engine
│   │   ├── useAlerts.ts            # Alert management
│   │   └── useStorage.ts           # Storage management
│   │
│   ├── config/                     # Configuration files
│   │   └── firebase.ts             # Firebase initialization
│   │
│   ├── types/                      # TypeScript type definitions
│   │   └── index.ts                # Custom types
│   │
│   └── utils/                      # Utility functions
│       └── index.ts                # Helper functions
│
├── assets/
│   └── images/                     # App images and icons
│
├── Configuration Files
│   ├── app.json                    # Expo app configuration
│   ├── package.json                # Dependencies & scripts
│   ├── tsconfig.json               # TypeScript configuration
│   ├── tailwind.config.js          # Tailwind CSS config
│   ├── babel.config.js             # Babel configuration
│   ├── metro.config.js             # Metro bundler config
│   └── eslint.config.js            # ESLint rules
│
├── Environment Files
│   ├── .env                        # Environment variables
│   ├── .gitignore                  # Git ignore rules
│   └── FirebaseConfig.ts           # Firebase credentials
│
└── Documentation
    └── README.md                   # This file
```

---

## 💻 **Installation & Setup**

### Prerequisites
```bash
✓ Node.js >= 16.0.0
✓ npm >= 8.0.0 or yarn >= 1.22.0
✓ Expo CLI (npm install -g expo-cli)
✓ Git for version control
```

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/BhandaranMitra-SIH.git
cd BhandaranMitra-SIH
```

### 2️⃣ Install Dependencies
```bash
npm install
# or
yarn install
```

### 3️⃣ Configure Firebase
Create a `FirebaseConfig.ts` file in the root directory with your Firebase credentials:

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

### 4️⃣ Configure Environment Variables
Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 5️⃣ Start the Development Server
```bash
npm start
# or
yarn start
```

---

## 🚀 **Development**

### Available Commands

#### Start Development Server
```bash
npm start              # Start Expo dev server
```

#### Platform-Specific Development
```bash
npm run android        # Run on Android emulator
npm run ios           # Run on iOS simulator
npm run web           # Run on web browser
```

#### Code Quality
```bash
npm run lint          # Run ESLint to check code quality
```

#### Build for Production
```bash
expo build:android    # Build Android APK
expo build:ios        # Build iOS app
expo build:web        # Build web version
```

### Development Workflow

1. **Start the dev server**: `npm start`
2. **Choose platform**: Select iOS, Android, or Web
3. **Make changes**: Edit files and save
4. **Hot reload**: Changes appear automatically
5. **Test**: Use emulator or physical device
6. **Commit**: Push changes to Git

---

## 🎨 **Key Features Breakdown**

### Authentication Flow
```
User Opens App
    ↓
Check Firebase Auth State
    ├─→ Authenticated → Dashboard
    └─→ Not Authenticated → Login Screen
         ├─→ Login with Email
         ├─→ Register New Account
         └─→ Google Sign-In (Coming Soon)
```

### Data Flow Architecture
```
Sensor Data (Firebase)
    ↓
useHook (useSensorData)
    ↓
Component (SensorCard)
    ├─→ Display Values
    ├─→ Show Status
    └─→ Trigger Alerts

Alert Conditions Met
    ↓
Check Thresholds
    ├─→ Temperature > 30°C
    ├─→ Humidity > 70%
    └─→ Ethylene > 10 ppm
    ↓
Trigger Notification
    ├─→ Push Notification
    ├─→ Alert Modal
    └─→ Sound/Haptics
```

### Real-time Updates
- **Auto-refresh interval**: 10 seconds
- **Push notifications**: Immediate alerts
- **Offline support**: Local cached data
- **Background sync**: Updates when app resumes

---

## 🔗 **API Integration**

### Firebase Services Used
1. **Authentication**
   - Email/Password sign-in
   - User session management
   - Password reset

2. **Firestore Database**
   - User data storage
   - Sensor data collection
   - Alert history
   - Market price data

3. **Cloud Messaging**
   - Push notifications
   - Alert delivery
   - Real-time updates

### Data Models
```typescript
User {
  uid: string
  email: string
  displayName?: string
  photoURL?: string
  createdAt: timestamp
}

SensorReading {
  temperature: number
  humidity: number
  ethylene: number
  timestamp: timestamp
  storageId: string
}

Alert {
  type: 'temperature' | 'humidity' | 'ethylene'
  severity: 'warning' | 'critical'
  message: string
  timestamp: timestamp
  resolved: boolean
}

MarketPrice {
  region: string
  price: number
  trend: 'up' | 'down' | 'stable'
  lastUpdated: timestamp
}
```

---

## 🤝 **Contributing**

We welcome contributions! Please follow these guidelines:

### 1. Fork the Repository
```bash
git fork https://github.com/your-username/BhandaranMitra-SIH.git
```

### 2. Create a Feature Branch
```bash
git checkout -b feature/amazing-feature
```

### 3. Make Your Changes
- Write clean, readable code
- Follow TypeScript best practices
- Use meaningful commit messages

### 4. Commit Your Changes
```bash
git commit -m 'Add amazing feature'
```

### 5. Push to Branch
```bash
git push origin feature/amazing-feature
```

### 6. Open a Pull Request
Describe your changes and why they improve the project

### Code Style Guidelines
- Use TypeScript for type safety
- Follow React hooks best practices
- Use meaningful variable names
- Add comments for complex logic
- Keep components small and focused
- Use utility classes (Tailwind CSS)

---

## 📝 **License**

This project is licensed under the **MIT License** - see the LICENSE file for details.

---

## 📞 **Support & Contact**

- **Report Issues**: Create an issue on GitHub
- **Feature Requests**: Open a GitHub discussion
- **Questions**: Contact us via email or GitHub discussions

---

## 🎉 **Acknowledgments**

- Built for **Smart India Hackathon (SIH)** 2024
- Powered by **Expo** and **Firebase**
- UI inspired by modern agricultural technology
- Special thanks to our team and mentors

---

## 🗺️ **Roadmap**

- [ ] Google Sign-In integration
- [ ] Advanced AI predictions for crop health
- [ ] Multi-language support
- [ ] Offline-first data synchronization
- [ ] Weather API integration
- [ ] SMS alerts for areas with poor internet
- [ ] Web dashboard for farmers
- [ ] Integration with IoT sensors

---

<div align="center">

**Made with ❤️ for farmers and sustainable agriculture**

[⬆ Back to Top](#-onion-rot-alert---smart-storage-monitoring-app)

</div>
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
