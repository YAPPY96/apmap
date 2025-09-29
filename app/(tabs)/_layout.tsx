import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import { Platform, View } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <View style={{ flex: 1 }}>

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
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
          name="stage"
          options={{
            title: 'Stage',
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="spotlight-beam" size={24} color={color} />,
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
    </View>
  );
}