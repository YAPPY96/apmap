import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Map',
          tabBarIcon: ({ color }) => <Entypo name="map" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="building5253"
        options={{
          title: '52,53号館',
          tabBarIcon: ({ color }) => <MaterialIcons name="business" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="event"
        options={{
          title: 'event',
          tabBarIcon: ({ color }) => <MaterialIcons name="event-note" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}