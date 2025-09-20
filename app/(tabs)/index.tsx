// app/(tabs)/index.tsx
import { AnnounceBar } from '@/components/AnnounceBar';
import { BuildingModal } from '@/components/map/BuildingModal';
import { EventDetailModal } from '@/components/map/EventDetailModal';
import { useLocation } from '@/components/map/location_context';
import { MapWebView } from '@/components/map/MapWebView';
import { AppEvent } from '@/components/map/types';
import { Config } from '@/constants/Config';
import DiamondBackground from '@/constants/DiamondBackground';
import { useRemoteData } from '@/hooks/useRemoteData';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// 型定義
interface BuildingFeature {
  properties: {
    name: string;
    [key: string]: any;
  };
}

export default function MapScreen() {
  const insets = useSafeAreaInsets();
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

  const { data: eventData } = useRemoteData<AppEvent[]>(Config.EVENTS_URL);
  const { data: stageData } = useRemoteData<AppEvent[]>(Config.STAGE_URL);
  const router = useRouter();

  // Building Modal State
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingFeature | null>(null);
  const [buildingModalVisible, setBuildingModalVisible] = useState(false);

  // Event Modal State
  const [selectedEvent, setSelectedEvent] = useState<AppEvent | null>(null);
  const [eventModalVisible, setEventModalVisible] = useState(false);
  const [mapKey, setMapKey] = useState(0);

  const handleMapReset = () => {
    setMapKey(prevKey => prevKey + 1);
    triggerZoomToUser();
  };

  const handleBuildingClick = (buildingData: BuildingFeature) => {
    const buildingName = buildingData.properties.name;

    if (buildingName === '52・53号館') {
      router.push('/building5253');
      return;
    }

    if (buildingName === 'Stage') {
      router.push('/stage');
      return;
    }

    if (eventData) {
      const eventForBuilding = eventData.find((event) => event.buildingName === buildingName);

      if (eventForBuilding) {
        setSelectedEvent(eventForBuilding);
        setEventModalVisible(true);
      }
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
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.errorContainer}>
          <MaterialIcons name="location-off" size={64} color="#ff6b6b" />
          <Text style={styles.errorTitle}>位置情報が取得できません</Text>
          <Text style={styles.errorMessage}>{errorMsg}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleLocationRequest}>
            <MaterialIcons name="refresh" size={24} color="white" />
            <Text style={styles.retryButtonText}>再試行</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.permissionContainer}>
          <MaterialIcons name="location-searching" size={64} color="#4A90E2" />
          <Text style={styles.permissionTitle}>位置情報の許可が必要です</Text>
          <Text style={styles.permissionMessage}>
            地図上で現在地を表示するために、位置情報へのアクセスを許可してください。
          </Text>
          <TouchableOpacity style={styles.permissionButton} onPress={handleLocationRequest}>
            <MaterialIcons name="location-on" size={24} color="white" />
            <Text style={styles.permissionButtonText}>位置情報を許可</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" />
      <View style={StyleSheet.absoluteFill}>
              <DiamondBackground />
            </View>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>キャンパスマップ</Text>
        <TouchableOpacity style={styles.locationButton} onPress={handleMapReset}>
          <MaterialIcons 
            name={location ? "my-location" : "location-searching"} 
            size={24} 
            color="#4A90E2" 
          />
        </TouchableOpacity>
      </View>

      <AnnounceBar />

      {/* Map */}
      <View style={styles.mapContainer}>
        <MapWebView 
          key={mapKey}
          userLocation={location} 
          onBuildingClick={handleBuildingClick}
          highlightedBuilding={highlightedBuilding}
          zoomToUserTrigger={zoomToUserTrigger}
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
        isFullScreen={false}
        showViewLocationButton={false}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    minHeight: 60,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
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