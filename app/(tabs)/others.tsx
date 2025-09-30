import { AnnounceBar } from '@/components/AnnounceBar';
import { EventDetailModal } from '@/components/map/EventDetailModal';
import { AppEvent } from '@/components/map/types';
import { Config } from '@/constants/Config';
import DiamondBackground from '@/constants/DiamondBackground';
import { useRemoteData } from '@/hooks/useRemoteData';
import { Image } from 'expo-image';
import { useMemo, useState } from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const API_BASE_URL = 'https://koudaisai.com/dataforapp/image';

export default function OthersScreen() {
  const insets = useSafeAreaInsets();
  const {
    data: eventData,
    isLoading,
    error,
  } = useRemoteData<AppEvent[]>(Config.OTHERS_URL);

  const [selectedEvent, setSelectedEvent] = useState<AppEvent | null>(null);
  const [eventModalVisible, setEventModalVisible] = useState(false);

  const eventList = useMemo(() => {
    if (!eventData) return [];
    return eventData.map((event, index) => ({
      ...event,
      id: `other-${index}`,
    }));
  }, [eventData]);

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
        <Image source={{ uri: imageUrl }} style={styles.eventImage} />
        <View style={styles.eventInfo}>
          <Text style={styles.eventName} numberOfLines={2}>{item.eventName}</Text>
          <Text style={styles.eventGroup} numberOfLines={1}>{item.groupName}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const ListHeader = (
    <>
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
        <Text style={styles.headerTitle}>その他</Text>
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