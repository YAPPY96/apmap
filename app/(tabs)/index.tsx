// app/(tabs)/index.tsx
import { BuildingModal } from '@/components/map/BuildingModal';
import { EventDetailModal } from '@/components/map/EventDetailModal';
import { useLocation } from '@/components/map/location_context';
import { MapWebView } from '@/components/map/MapWebView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from 'react';
import { Alert, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Config } from '@/constants/Config';
import { useRemoteData } from '@/hooks/useRemoteData';
import { Marquee } from '@/components/ui/Marquee';
import localAnnouncements from '../../assets/data/announcements.json';
import localEventData from '../../assets/data/events.json';

// 型定義
interface BuildingFeature {
  properties: {
    name: string;
    [key: string]: any;
  };
}

interface Event {
  buildingName: string;
  eventName: string;
  time: string;
  description: string;
}

export default function MapScreen() {
  const {
    location,
    errorMsg,
    hasPermission,
    requestLocation,
    highlightedBuilding,
    setHighlightedBuilding,
    zoomToUserTrigger,
    triggerZoomToUser,
  } = useLocation();

  const { data: eventData } = useRemoteData(Config.EVENTS_URL, localEventData);
  const { data: announcementData } = useRemoteData(
    Config.ANNOUNCEMENTS_URL,
    localAnnouncements
  );
  const [zoomToMinTrigger, setZoomToMinTrigger] = useState(0);

  const announcementMessage = announcementData?.announcements
    ?.filter(item => item.enabled)
    .map(item => item.message)
    .join('   ◆   ');

  const handleLocationButtonPress = () => {
    if (location) {
      triggerZoomToUser();
    } else {
      setZoomToMinTrigger(prev => prev + 1);
    }
  };
  
  // Building Modal State
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingFeature | null>(null);
  const [buildingModalVisible, setBuildingModalVisible] = useState(false);

  // Event Modal State
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [eventModalVisible, setEventModalVisible] = useState(false);

  const handleBuildingClick = (buildingData: BuildingFeature) => {
    if (!eventData) return;
    const buildingName = buildingData.properties.name;
    const eventForBuilding = eventData.find(event => event.buildingName === buildingName);

    if (eventForBuilding) {
      setSelectedEvent(eventForBuilding);
      setEventModalVisible(true);
    }
    // イベントがない場合は、地図上のポップアップのみ表示し、モーダルは開かない
  };

  const closeBuildingModal = () => {
    setBuildingModalVisible(false);
    setSelectedBuilding(null);
  };

  const closeEventModal = () => {
    setEventModalVisible(false);
    setSelectedEvent(null);
    setHighlightedBuilding(null); // Clear highlight when modal is closed
  };

  const handleLocationRequest = () => {
    Alert.alert(
      '位置情報の取得',
      '位置情報を取得してよろしいですか？',
      [
        { text: 'キャンセル', style: 'cancel' },
        { text: '許可', onPress: requestLocation },
      ]
    );
  };

  if (errorMsg) {
    return (
      <ThemedView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.errorContainer}>
          <MaterialIcons name="location-off" size={64} color="#ff6b6b" />
          <ThemedText style={styles.errorTitle}>位置情報が取得できません</ThemedText>
          <ThemedText style={styles.errorMessage}>{errorMsg}</ThemedText>
          <TouchableOpacity style={styles.retryButton} onPress={handleLocationRequest}>
            <MaterialIcons name="refresh" size={24} color="white" />
            <ThemedText style={styles.retryButtonText}>再試行</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    );
  }

  if (!hasPermission) {
    return (
      <ThemedView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.permissionContainer}>
          <MaterialIcons name="location-searching" size={64} color="#4A90E2" />
          <ThemedText style={styles.permissionTitle}>位置情報の許可が必要です</ThemedText>
          <ThemedText style={styles.permissionMessage}>
            地図上で現在地を表示するために、位置情報へのアクセスを許可してください。
          </ThemedText>
          <TouchableOpacity style={styles.permissionButton} onPress={handleLocationRequest}>
            <MaterialIcons name="location-on" size={24} color="white" />
            <ThemedText style={styles.permissionButtonText}>位置情報を許可</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <ThemedText style={styles.headerTitle}>キャンパスマップ</ThemedText>
          <TouchableOpacity style={styles.locationButton} onPress={handleLocationButtonPress}>
            <MaterialIcons 
              name={location ? "my-location" : "location-searching"} 
              size={24} 
              color="#4A90E2" 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Announcement Marquee */}
      {announcementMessage && <Marquee text={announcementMessage} />}

      {/* Map */}
      <View style={styles.mapContainer}>
        <MapWebView 
          userLocation={location} 
          onBuildingClick={handleBuildingClick}
          highlightedBuilding={highlightedBuilding}
          zoomToUserTrigger={zoomToUserTrigger}
          zoomToMinTrigger={zoomToMinTrigger}
        />
      </View>

      {/* Building Modal */}
      <BuildingModal
        visible={buildingModalVisible}
        building={selectedBuilding}
        onClose={closeBuildingModal}
      />

      {/* Event Modal */}
      <EventDetailModal
        visible={eventModalVisible}
        event={selectedEvent}
        onClose={closeEventModal}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  locationButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f0f8ff',
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace',
  },
  mapContainer: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff6b6b',
    marginTop: 16,
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff6b6b',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    gap: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginTop: 16,
    marginBottom: 8,
  },
  permissionMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  permissionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    gap: 8,
  },
  permissionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoPanel: {
    position: 'absolute',
    bottom: 80,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoPanelTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    color: '#666',
  },
});