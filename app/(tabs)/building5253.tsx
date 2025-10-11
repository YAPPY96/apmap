import Building5253Map from '@/assets/map/Building5253Map';
import { AnnounceBar } from '@/components/AnnounceBar';
import { Building5253EventModal } from '@/components/map/Building5253EventModal';
import { AppEvent } from '@/components/map/types';
import { Config } from '@/constants/Config';
import DiamondBackground from '@/constants/DiamondBackground';
import { useRemoteData } from '@/hooks/useRemoteData';
import { Image } from 'expo-image';
import { useMemo, useState } from 'react';
import {
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const API_BASE_URL = 'https://koudaisai.com/dataforapp/image';

export default function Building5253Screen() {
  const insets = useSafeAreaInsets();
  const {
    data: eventData,
    isLoading,
    error,
  } = useRemoteData<Record<string, AppEvent>>(Config.BUILDING_5253_URL);

  const [selectedEvent, setSelectedEvent] = useState<AppEvent | null>(null);
  const [eventModalVisible, setEventModalVisible] = useState(false);
  const [currentFloor, setCurrentFloor] = useState(1);
  const [highlightedRoom, setHighlightedRoom] = useState<string | null>(null);

  const { width: screenWidth } = Dimensions.get('window');

  // マップのサイズを画面に合わせて調整
  const mapWidth = screenWidth;
  const mapHeight = screenWidth * 0.8; // Adjust aspect ratio as needed

  const eventList = useMemo(() => {
    if (!eventData) return [];
    return Object.entries(eventData).map(([id, event]) => ({
      ...event,
      id,
    }));
  }, [eventData]);

  const handleRoomClick = (roomId: string) => {
    if (eventData && eventData[roomId]) {
      setSelectedEvent(eventData[roomId]);
      setEventModalVisible(true);
    } else {
      console.log(`Clicked room ${roomId} - no event data available`);
    }
  };

  const handleViewLocation = (event: AppEvent) => {
    setCurrentFloor(event.floor);
    setHighlightedRoom(event.id);
    // Optional: scroll to top to see the map
  };

  const handleEventPress = (event: AppEvent) => {
    setSelectedEvent(event);
    setEventModalVisible(true);
  };

  const closeEventModal = () => {
    setEventModalVisible(false);
    setSelectedEvent(null);
  };

  const renderEventItem = ({ item }: { item: AppEvent }) => {
    const imageUrl = `${API_BASE_URL}/${item.image}`;
    return (
      <TouchableOpacity style={styles.eventItem} onPress={() => handleEventPress(item)}>
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.eventImage} 
          contentFit="cover"
          cachePolicy="memory-disk"
          transition={200}
        />
        <View style={styles.eventInfo}>
          <Text style={styles.eventName} numberOfLines={2}>{item.eventName}</Text>
          <Text style={styles.eventGroup} numberOfLines={1}>{item.groupName}</Text>
          
        </View>
      </TouchableOpacity>
    );
  };

  const ListHeader = (
    <>
      <View style={styles.mapContainer}>
        <View style={styles.floorSelector}>
          {[1, 2, 3].map((floor) => (
            <TouchableOpacity
              key={floor}
              style={[
                styles.floorButton,
                currentFloor === floor && styles.floorButtonActive,
              ]}
              onPress={() => setCurrentFloor(floor)}
            >
              <Text
                style={[
                  styles.floorButtonText,
                  currentFloor === floor && styles.floorButtonTextActive,
                ]}
              >
                {floor}F
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.mapWrapper}>
          <Building5253Map
            onRoomClick={handleRoomClick}
            width={mapWidth}
            height={mapHeight}
            floor={currentFloor}
            highlightedRoom={highlightedRoom}
          />
        </View>
      </View>
      <Text style={styles.listTitle}>イベント一覧</Text>
    </>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={StyleSheet.absoluteFill}>
          <DiamondBackground />
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>データの読み込みに失敗しました。</Text>
          <Text style={styles.errorSubText}>インターネット接続を確認してください。</Text>
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

      <View style={styles.header}>
        <Text style={styles.headerTitle}>52, 53号館</Text>
      </View>
      <AnnounceBar />
      <FlatList
        data={eventList}
        renderItem={renderEventItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
      />

      <Building5253EventModal
        visible={eventModalVisible}
        event={selectedEvent}
        onClose={closeEventModal}
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
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  mapContainer: {
    padding: 10,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  floorSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    backgroundColor: '000',
    borderRadius: 10,
    padding: 5,
  },
  floorButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  floorButtonActive: {
    backgroundColor: '#3498db',
  },
  floorButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  floorButtonTextActive: {
    color: '#F3F3F3',
  },
  mapWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 8,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 10,
  },
  listContent: {
    paddingHorizontal: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  eventItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '48%',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: 100,
  },
  eventInfo: {
    padding: 10,
  },
  eventName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    minHeight: 34, // for 2 lines
  },
  eventGroup: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498db',
    paddingVertical: 8,
    borderRadius: 5,
  },
  locationButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5,
    fontSize: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#ff6b6b',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  errorSubText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
