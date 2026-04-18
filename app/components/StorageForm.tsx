import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StorageInfo } from '../types';
import { useStorage } from '../hooks/useStorage';
import { COLORS } from '../utils';

interface StorageFormProps {
  onSaveSuccess?: () => void;
  onCancel?: () => void;
}

export default function StorageForm({ onSaveSuccess, onCancel }: StorageFormProps) {
  const { storageInfo, saving, saveStorageInfo } = useStorage();
  
  // Form state
  const [formData, setFormData] = useState({
    storageArea: '',
    areaUnit: 'sqft' as 'sqft' | 'sqm',
    quantity: '',
    location: '',
    storageType: 'warehouse' as 'warehouse' | 'cold_storage' | 'open_storage',
  });

  // Animation values
  const buttonScale = useSharedValue(1);

  // Initialize form with existing data
  useEffect(() => {
    if (storageInfo) {
      setFormData({
        storageArea: storageInfo.storageArea.toString(),
        areaUnit: storageInfo.areaUnit,
        quantity: storageInfo.quantity.toString(),
        location: storageInfo.location,
        storageType: storageInfo.storageType,
      });
    }
  }, [storageInfo]);

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const handleSave = async () => {
    // Validation
    if (!formData.storageArea || !formData.quantity || !formData.location) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const area = parseFloat(formData.storageArea);
    const quantity = parseInt(formData.quantity);

    if (isNaN(area) || area <= 0) {
      Alert.alert('Error', 'Please enter a valid storage area');
      return;
    }

    if (isNaN(quantity) || quantity <= 0) {
      Alert.alert('Error', 'Please enter a valid quantity');
      return;
    }

    buttonScale.value = withSpring(0.95);

    const result = await saveStorageInfo({
      storageArea: area,
      areaUnit: formData.areaUnit,
      quantity: quantity,
      location: formData.location,
      storageType: formData.storageType,
    });

    buttonScale.value = withSpring(1);

    if (result.success) {
      Alert.alert('Success', 'Storage information saved successfully!', [
        { text: 'OK', onPress: onSaveSuccess }
      ]);
    } else {
      Alert.alert('Error', result.error || 'Failed to save storage information');
    }
  };

  const StorageTypeButton = ({ 
    type, 
    label, 
    icon, 
    description 
  }: { 
    type: 'warehouse' | 'cold_storage' | 'open_storage'; 
    label: string; 
    icon: string; 
    description: string;
  }) => (
    <TouchableOpacity
      onPress={() => setFormData(prev => ({ ...prev, storageType: type }))}
      className={`flex-1 p-4 rounded-2xl border-2 mr-2 ${
        formData.storageType === type 
          ? 'border-green-500 bg-green-50' 
          : 'border-gray-200 bg-white'
      }`}
      activeOpacity={0.8}
    >
      <View className="items-center">
        <Ionicons 
          name={icon as any} 
          size={24} 
          color={formData.storageType === type ? COLORS.primary : COLORS.gray} 
        />
        <Text className={`text-sm font-semibold mt-2 text-center ${
          formData.storageType === type ? 'text-green-700' : 'text-gray-700'
        }`}>
          {label}
        </Text>
        <Text className={`text-xs mt-1 text-center ${
          formData.storageType === type ? 'text-green-600' : 'text-gray-500'
        }`}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView className="flex-1 bg-gray-50" showsVerticalScrollIndicator={false}>
      <View className="p-6">
        {/* Header */}
        <Animated.View entering={FadeInUp.delay(200).duration(800)}>
          <View className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
            <View className="flex-row items-center mb-4">
              <View className="bg-green-100 p-3 rounded-full mr-4">
                <Ionicons name="home-outline" size={24} color={COLORS.primary} />
              </View>
              <View className="flex-1">
                <Text className="text-gray-800 text-xl font-bold">
                  Storage Information
                </Text>
                <Text className="text-gray-600 text-sm">
                  Track your onion inventory
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Storage Area */}
        <Animated.View entering={FadeInDown.delay(400).duration(800)} className="mb-6">
          <Text className="text-gray-800 text-base font-semibold mb-3">
            📏 Storage Area *
          </Text>
          
          <View className="flex-row space-x-4">
            <View className="flex-1">
              <TextInput
                className="bg-white border border-gray-200 rounded-2xl px-4 py-4 text-gray-800 text-lg font-semibold"
                placeholder="200"
                value={formData.storageArea}
                onChangeText={(value) => setFormData(prev => ({ ...prev, storageArea: value }))}
                keyboardType="numeric"
              />
            </View>
            
            <View className="flex-row bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <TouchableOpacity
                onPress={() => setFormData(prev => ({ ...prev, areaUnit: 'sqft' }))}
                className={`px-4 py-4 ${formData.areaUnit === 'sqft' ? 'bg-green-500' : 'bg-white'}`}
              >
                <Text className={`text-sm font-semibold ${
                  formData.areaUnit === 'sqft' ? 'text-white' : 'text-gray-600'
                }`}>
                  sq ft
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => setFormData(prev => ({ ...prev, areaUnit: 'sqm' }))}
                className={`px-4 py-4 ${formData.areaUnit === 'sqm' ? 'bg-green-500' : 'bg-white'}`}
              >
                <Text className={`text-sm font-semibold ${
                  formData.areaUnit === 'sqm' ? 'text-white' : 'text-gray-600'
                }`}>
                  sq m
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {/* Quantity */}
        <Animated.View entering={FadeInDown.delay(600).duration(800)} className="mb-6">
          <Text className="text-gray-800 text-base font-semibold mb-3">
            🧺 Quantity Stored *
          </Text>
          
          <TextInput
            className="bg-white border border-gray-200 rounded-2xl px-4 py-4 text-gray-800 text-lg font-semibold"
            placeholder="5"
            value={formData.quantity}
            onChangeText={(value) => setFormData(prev => ({ ...prev, quantity: value }))}
            keyboardType="numeric"
          />
          
          <Text className="text-gray-500 text-sm mt-2 ml-2">
            1 unit = 100 kg • {formData.quantity ? `${parseInt(formData.quantity) * 100 || 0} kg total` : '0 kg total'}
          </Text>
        </Animated.View>

        {/* Location */}
        <Animated.View entering={FadeInDown.delay(800).duration(800)} className="mb-6">
          <Text className="text-gray-800 text-base font-semibold mb-3">
            📍 Storage Location *
          </Text>
          
          <TextInput
            className="bg-white border border-gray-200 rounded-2xl px-4 py-4 text-gray-800 text-lg"
            placeholder="Main Storage, Farm House A"
            value={formData.location}
            onChangeText={(value) => setFormData(prev => ({ ...prev, location: value }))}
            autoCapitalize="words"
          />
        </Animated.View>

        {/* Storage Type */}
        <Animated.View entering={FadeInDown.delay(1000).duration(800)} className="mb-8">
          <Text className="text-gray-800 text-base font-semibold mb-4">
            🏠 Storage Type
          </Text>
          
          <View className="flex-row">
            <StorageTypeButton
              type="warehouse"
              label="Warehouse"
              icon="business-outline"
              description="Covered storage"
            />
            <StorageTypeButton
              type="cold_storage"
              label="Cold Storage"
              icon="snow-outline"
              description="Temperature controlled"
            />
          </View>
          
          <View className="flex-row mt-4">
            <StorageTypeButton
              type="open_storage"
              label="Open Storage"
              icon="sunny-outline"
              description="Open air storage"
            />
            <View className="flex-1 mr-2" />
          </View>
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View entering={FadeInUp.delay(1200).duration(800)}>
          <Animated.View style={animatedButtonStyle}>
            <TouchableOpacity
              onPress={handleSave}
              disabled={saving}
              activeOpacity={0.8}
              className="mb-4"
            >
              <LinearGradient
                colors={[COLORS.primary, COLORS.secondary]}
                className="py-4 rounded-2xl"
              >
                <Text className="text-white text-lg font-bold text-center">
                  {saving ? 'Saving...' : 'Save Storage Info'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          {onCancel && (
            <TouchableOpacity
              onPress={onCancel}
              className="bg-gray-200 py-4 rounded-2xl"
              activeOpacity={0.8}
            >
              <Text className="text-gray-700 text-lg font-semibold text-center">
                Cancel
              </Text>
            </TouchableOpacity>
          )}
        </Animated.View>

        {/* Tips */}
        <Animated.View entering={FadeInUp.delay(1400).duration(800)} className="mt-8">
          <View className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
            <View className="flex-row items-center mb-3">
              <Ionicons name="bulb-outline" size={24} color="#3B82F6" />
              <Text className="text-blue-800 text-lg font-bold ml-3">
                Storage Tips
              </Text>
            </View>
            <Text className="text-blue-700 text-sm leading-6">
              • Maintain proper ventilation in storage areas{'\n'}
              • Keep storage density below 12 kg/sq ft{'\n'}
              • Regular inspection helps prevent spoilage{'\n'}
              • Cold storage extends shelf life significantly
            </Text>
          </View>
        </Animated.View>
      </View>
    </ScrollView>
  );
}