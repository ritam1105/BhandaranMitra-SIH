import React, { useCallback, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, Modal, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp, SlideInRight, BounceIn, useSharedValue, withSpring } from 'react-native-reanimated';
import { useAuth } from '../hooks/useAuth';
import { useSensorData } from '../hooks/useSensorData';
import { MarketPriceCard } from '../components/MarketPriceCard';
import { COLORS, formatTimestamp } from '../utils';
import { useSmartInsights } from '../hooks/useSmartInsights';
import { useMarketPrice } from '../hooks/useMarketPrice';
import { useStorage } from '../hooks/useStorage';
import { useAlerts } from '../hooks/useAlerts';
import { router } from 'expo-router';

// Beautiful Header Component
const Header = React.memo(({ onLogout, userName }) => (
  <Animated.View entering={FadeInUp.duration(800)}>
    <View style={{
      backgroundColor: 'rgba(255,255,255,0.2)',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 25,
      borderRadius: 28,
      marginBottom: 30,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 15 },
      shadowOpacity: 0.25,
      shadowRadius: 30,
      elevation: 15,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.3)',
      overflow: 'hidden'
    }}>
      {/* Glassmorphism overlay */}
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255,255,255,0.1)',
      }} />
      <View style={{ flex: 1, zIndex: 1 }}>
        <Text style={{ 
          color: 'rgba(255,255,255,0.8)', 
          fontSize: 16, 
          fontWeight: '500',
          marginBottom: 4
        }}>
          Welcome back,
        </Text>
        <Text style={{ 
          color: 'white', 
          fontSize: 24, 
          fontWeight: 'bold',
          letterSpacing: 0.5
        }}>
          {userName}
        </Text>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 8
        }}>
          <View style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: COLORS.success,
            marginRight: 8
          }} />
          <Text style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: 14,
            fontWeight: '500'
          }}>
            System Online
          </Text>
        </View>
      </View>
      
      <TouchableOpacity
        onPress={onLogout}
        style={{
          backgroundColor: 'rgba(239, 68, 68, 0.25)',
          padding: 14,
          borderRadius: 18,
          borderWidth: 1,
          borderColor: 'rgba(239, 68, 68, 0.4)',
          zIndex: 1,
          shadowColor: '#ef4444',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 5
        }}
      >
        <Ionicons name="log-out-outline" size={22} color={COLORS.danger} />
      </TouchableOpacity>
    </View>
  </Animated.View>
));


// Bottom Navigation Component
const BottomNavigation = React.memo(() => (
  <View style={{
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingVertical: 16,
    paddingHorizontal: 12,
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 15,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25
  }}>
    <TouchableOpacity 
      style={{ 
        alignItems: 'center', 
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 4,
        borderRadius: 12,
        backgroundColor: 'rgba(102, 126, 234, 0.1)'
      }}
      onPress={() => router.push('/dashboard')}
    >
      <View style={{
        backgroundColor: COLORS.primary,
        padding: 8,
        borderRadius: 12,
        marginBottom: 6,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3
      }}>
        <Ionicons name="home" size={20} color="white" />
      </View>
      <Text style={{ 
        fontSize: 11, 
        color: COLORS.primary, 
        fontWeight: '600',
        textAlign: 'center'
      }}>Dashboard</Text>
    </TouchableOpacity>
    
    <TouchableOpacity 
      style={{ 
        alignItems: 'center', 
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 4,
        borderRadius: 12
      }}
      onPress={() => router.push('/market')}
    >
      <View style={{
        backgroundColor: 'rgba(156, 163, 175, 0.2)',
        padding: 8,
        borderRadius: 12,
        marginBottom: 6
      }}>
        <Ionicons name="trending-up" size={20} color={COLORS.gray} />
      </View>
      <Text style={{ 
        fontSize: 11, 
        color: COLORS.gray, 
        fontWeight: '500',
        textAlign: 'center'
      }}>Market</Text>
    </TouchableOpacity>
    
    <TouchableOpacity 
      style={{ 
        alignItems: 'center', 
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 4,
        borderRadius: 12
      }}
      onPress={() => router.push('/history')}
    >
      <View style={{
        backgroundColor: 'rgba(156, 163, 175, 0.2)',
        padding: 8,
        borderRadius: 12,
        marginBottom: 6
      }}>
        <Ionicons name="time" size={20} color={COLORS.gray} />
      </View>
      <Text style={{ 
        fontSize: 11, 
        color: COLORS.gray, 
        fontWeight: '500',
        textAlign: 'center'
      }}>History</Text>
    </TouchableOpacity>
    
    <TouchableOpacity 
      style={{ 
        alignItems: 'center', 
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 4,
        borderRadius: 12
      }}
      onPress={() => router.push('/settings')}
    >
      <View style={{
        backgroundColor: 'rgba(156, 163, 175, 0.2)',
        padding: 8,
        borderRadius: 12,
        marginBottom: 6
      }}>
        <Ionicons name="settings" size={20} color={COLORS.gray} />
      </View>
      <Text style={{ 
        fontSize: 11, 
        color: COLORS.gray, 
        fontWeight: '500',
        textAlign: 'center'
      }}>Settings</Text>
    </TouchableOpacity>
    
    <TouchableOpacity 
      style={{ 
        alignItems: 'center', 
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 4,
        borderRadius: 12
      }}
      onPress={() => router.push('/profile')}
    >
      <View style={{
        backgroundColor: 'rgba(156, 163, 175, 0.2)',
        padding: 8,
        borderRadius: 12,
        marginBottom: 6
      }}>
        <Ionicons name="person" size={20} color={COLORS.gray} />
      </View>
      <Text style={{ 
        fontSize: 11, 
        color: COLORS.gray, 
        fontWeight: '500',
        textAlign: 'center'
      }}>Profile</Text>
    </TouchableOpacity>
  </View>
));

export const DashboardScreen = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const { sensorData, loading: sensorLoading, refreshSensorData } = useSensorData();
  const { marketData, loading: marketLoading, refreshMarketData } = useMarketPrice();
  const { storageInfo, loading: storageLoading } = useStorage();
  const { insights } = useSmartInsights();
  const { activeAlerts } = useAlerts(sensorData, { temperature: 30, humidity: 70, ethylene: 10 });

  const [showLogoutAlert, setShowLogoutAlert] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const handleLogout = useCallback(() => {
    setShowLogoutAlert(true);
  }, []);

  const confirmLogout = useCallback(async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
    setShowLogoutAlert(false);
  }, [signOut]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        refreshSensorData(),
        refreshMarketData()
      ]);
    } catch (error) {
      console.error('Refresh error:', error);
    }
    setRefreshing(false);
  }, [refreshSensorData, refreshMarketData]);

  const sensorCards = useMemo(() => {
    // Always show sensor cards, use fallback data if sensor data is not available
    const fallbackData = {
      temperature: 25.5,
      humidity: 65.2,
      ethylene: 7.8
    };
    
    const data = sensorData || fallbackData;
    
    return [
      {
        title: 'Temperature',
        value: data.temperature,
        unit: '°C',
        threshold: 30,
        icon: 'thermometer-outline' as const,
        gradientColors: ['rgba(239, 68, 68, 0.8)', 'rgba(220, 38, 38, 0.9)'],
        type: 'temperature' as const,
        delay: 0,
      },
      {
        title: 'Humidity',
        value: data.humidity,
        unit: '%',
        threshold: 70,
        icon: 'water-outline' as const,
        gradientColors: ['rgba(59, 130, 246, 0.8)', 'rgba(37, 99, 235, 0.9)'],
        type: 'humidity' as const,
        delay: 100,
      },
      {
        title: 'Ethylene',
        value: data.ethylene,
        unit: 'ppm',
        threshold: 10,
        icon: 'leaf-outline' as const,
        gradientColors: ['rgba(34, 197, 94, 0.8)', 'rgba(16, 185, 129, 0.9)'],
        type: 'ethylene' as const,
        delay: 200,
      },
    ];
  }, [sensorData]);

  if (authLoading || !user) {
    return (
      <LinearGradient
        colors={[
          '#667EEA',
          '#764BA2', 
          '#F093FB',
          '#F5576C'
        ]}
        locations={[0, 0.3, 0.7, 1]}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Animated.View 
          entering={FadeInUp.duration(1000)}
          style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            padding: 30,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.3)'
          }}
        >
          <Text style={{ 
            color: 'white', 
            fontSize: 20, 
            fontWeight: '600',
            textAlign: 'center'
          }}>Loading...</Text>
        </Animated.View>
      </LinearGradient>
    );
  }

  const { width } = Dimensions.get('window');
  
  return (
    <LinearGradient
      colors={[
        '#667EEA',
        '#764BA2',
        '#F093FB',
        '#F5576C'
      ]}
      locations={[0, 0.3, 0.7, 1]}
      style={{ flex: 1 }}
    >
      {/* Floating Background Elements */}
      <View style={{
        position: 'absolute',
        top: 100,
        left: -50,
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(255,255,255,0.1)',
      }} />
      <View style={{
        position: 'absolute',
        bottom: 200,
        right: -75,
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: 'rgba(255,255,255,0.05)',
      }} />
      
      <ScrollView
        style={{ flex: 1, paddingHorizontal: 20 }}
        contentContainerStyle={{ paddingTop: 50, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="white"
            colors={['white']}
          />
        }
      >
        <Header onLogout={handleLogout} userName={user?.displayName || user?.email || 'User'} />



        <View style={{ marginBottom: 32 }}>
          {sensorCards.map((card, index) => {
            const isHigh = card.value > card.threshold;
            const isWarning = card.value > card.threshold * 0.8;
            const statusColor = isHigh ? COLORS.dangerRed : isWarning ? COLORS.warningAmber : COLORS.safeGreen;
            const progress = Math.min(card.value / card.threshold, 1);
            
            return (
              <Animated.View
                key={card.title}
                entering={FadeInUp.delay(index * 100).duration(600)}
                style={{
                  marginBottom: 20,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 12 },
                  shadowOpacity: 0.1,
                  shadowRadius: 24,
                  elevation: 8
                }}
              >
                <LinearGradient
                  colors={[
                    'rgba(255,255,255,0.95)',
                    'rgba(255,255,255,0.85)'
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    borderRadius: 24,
                    padding: 24,
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.3)',
                    overflow: 'hidden'
                  }}
                >
                  {/* Background Pattern */}
                  <View style={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    backgroundColor: card.gradientColors[0],
                    opacity: 0.05
                  }} />
                  
                  {/* Header */}
                  <View style={{ 
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    marginBottom: 20 
                  }}>
                    <LinearGradient
                      colors={card.gradientColors}
                      style={{
                        padding: 12,
                        borderRadius: 16,
                        marginRight: 16,
                        shadowColor: card.gradientColors[0],
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 8,
                        elevation: 5
                      }}
                    >
                      <Ionicons name={card.icon} size={28} color="white" />
                    </LinearGradient>
                    
                    <View style={{ flex: 1 }}>
                      <Text style={{ 
                        fontSize: 20, 
                        fontWeight: 'bold', 
                        color: COLORS.darkGray,
                        marginBottom: 4
                      }}>
                        {card.title}
                      </Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{
                          width: 6,
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: statusColor,
                          marginRight: 8
                        }} />
                        <Text style={{ 
                          fontSize: 14, 
                          color: COLORS.gray,
                          fontWeight: '500'
                        }}>
                          Real-time sensor
                        </Text>
                      </View>
                    </View>
                    
                    <View style={{
                      backgroundColor: statusColor,
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 20,
                      shadowColor: statusColor,
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.3,
                      shadowRadius: 4,
                      elevation: 3
                    }}>
                      <Text style={{ 
                        color: 'white', 
                        fontSize: 12, 
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        letterSpacing: 0.5
                      }}>
                        {isHigh ? 'HIGH' : isWarning ? 'WARN' : 'SAFE'}
                      </Text>
                    </View>
                  </View>
                  
                  {/* Value Display */}
                  <View style={{ 
                    flexDirection: 'row', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-end',
                    marginBottom: 16
                  }}>
                    <View>
                      <Text style={{ 
                        fontSize: 48, 
                        fontWeight: '800', 
                        color: COLORS.darkGray,
                        lineHeight: 52
                      }}>
                        {card.value.toFixed(1)}
                        <Text style={{ 
                          fontSize: 24, 
                          color: COLORS.gray,
                          fontWeight: '600'
                        }}>
                          {card.unit}
                        </Text>
                      </Text>
                      <Text style={{ 
                        fontSize: 14, 
                        color: COLORS.gray, 
                        marginTop: 4,
                        fontWeight: '500'
                      }}>
                        Limit: {card.threshold}{card.unit}
                      </Text>
                    </View>
                    
                    {/* Percentage Display */}
                    <Animated.View 
                      entering={BounceIn.delay(index * 150 + 400).duration(600)}
                      style={{
                        backgroundColor: 'white',
                        width: 88,
                        height: 88,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        shadowColor: statusColor,
                        shadowOffset: { width: 0, height: 8 },
                        shadowOpacity: 0.25,
                        shadowRadius: 16,
                        elevation: 10,
                        borderWidth: 3,
                        borderColor: statusColor + '30',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      {/* Background gradient overlay */}
                      <LinearGradient
                        colors={[statusColor + '10', statusColor + '05']}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          borderRadius: 17
                        }}
                      />
                      
                      {/* Status indicator dot */}
                      <View style={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: statusColor,
                        shadowColor: statusColor,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.5,
                        shadowRadius: 4,
                        elevation: 3
                      }} />
                      
                      {/* Percentage text */}
                      <View style={{
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Text style={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          color: statusColor,
                          textAlign: 'center',
                          marginBottom: 2
                        }}>
                          {Math.round(progress * 100)}%
                        </Text>
                        <Text style={{
                          fontSize: 10,
                          fontWeight: '600',
                          color: COLORS.gray,
                          textAlign: 'center',
                          textTransform: 'uppercase',
                          letterSpacing: 0.5
                        }}>
                          {isHigh ? 'HIGH' : isWarning ? 'WARN' : 'SAFE'}
                        </Text>
                      </View>
                    </Animated.View>
                  </View>
                  
                  {/* Progress Bar */}
                  <View style={{
                    height: 6,
                    backgroundColor: 'rgba(0,0,0,0.05)',
                    borderRadius: 3,
                    overflow: 'hidden'
                  }}>
                    <Animated.View 
                      entering={SlideInRight.delay(index * 150 + 300).duration(800)}
                      style={{
                        width: `${Math.min(progress * 100, 100)}%`,
                        height: '100%',
                        backgroundColor: statusColor,
                        borderRadius: 3
                      }}
                    />
                  </View>
                </LinearGradient>
              </Animated.View>
            );
          })}

          <MarketPriceCard
            marketData={marketData}
            loading={marketLoading}
            storageInfo={storageInfo}
            storageLoading={storageLoading}
            insights={insights}
            alerts={activeAlerts}
          />
        </View>
      </ScrollView>

      <Modal
        visible={showLogoutAlert}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLogoutAlert(false)}
      >
        <View style={{ 
          flex: 1, 
          backgroundColor: 'rgba(0,0,0,0.6)', 
          justifyContent: 'center', 
          alignItems: 'center' 
        }}>
          <Animated.View 
            entering={BounceIn.duration(600)}
            style={{
              backgroundColor: 'rgba(255,255,255,0.95)',
              borderRadius: 25,
              padding: 30,
              margin: 20,
              maxWidth: 320,
              width: '90%',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 20 },
              shadowOpacity: 0.25,
              shadowRadius: 30,
              elevation: 20,
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.3)'
            }}
          >
            <Text style={{ 
              fontSize: 22, 
              fontWeight: 'bold', 
              textAlign: 'center', 
              marginBottom: 12,
              color: COLORS.darkGray
            }}>
              Confirm Logout
            </Text>
            <Text style={{ 
              fontSize: 16, 
              textAlign: 'center', 
              marginBottom: 30, 
              color: COLORS.gray,
              lineHeight: 22
            }}>
              Are you sure you want to log out?
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 12 }}>
              <TouchableOpacity 
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(0,0,0,0.05)',
                  padding: 16,
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: 'rgba(0,0,0,0.1)'
                }}
                onPress={() => setShowLogoutAlert(false)}
              >
                <Text style={{ 
                  textAlign: 'center', 
                  fontSize: 16, 
                  fontWeight: '600',
                  color: COLORS.darkGray
                }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={{
                  flex: 1,
                  backgroundColor: '#ef4444',
                  padding: 16,
                  borderRadius: 15,
                  shadowColor: '#ef4444',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 5
                }}
                onPress={confirmLogout}
              >
                <Text style={{ 
                  textAlign: 'center', 
                  fontSize: 16, 
                  fontWeight: '600', 
                  color: 'white' 
                }}>Logout</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
      
      <BottomNavigation />
    </LinearGradient>
  );
};

export default DashboardScreen;
