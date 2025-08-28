import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { EventDetailModal } from '@/components/map/EventDetailModal';
import { AppEvent } from '@/components/map/types';
import allEvents from '@/events.json'; // events.jsonをインポート

// 画像のマッピング
const imageSources: { [key: string]: any } = {
  'event_soudankai.jpg': require('../../assets/eventimage/event_soudankai.jpg'),
  'event_kouenkai.jpg': require('../../assets/eventimage/event_kouenkai.jpg'),
  'event_live.jpg': require('../../assets/eventimage/event_live.jpg'),
};

export default function EventScreen() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [filteredEvents, setFilteredEvents] = useState<AppEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<AppEvent | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  // 初期日付を設定
  useEffect(() => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    if (month === 11 && day === 16) {
      setSelectedDate('2023-11-16');
    } else {
      setSelectedDate('2023-11-15'); // デフォルトは15日
    }
  }, []);

  // 選択された日付に基づいてイベントをフィルタリング
  useEffect(() => {
    if (selectedDate) {
      const events = (allEvents as AppEvent[]).filter((event) => event.date === selectedDate);
      setFilteredEvents(events);
    }
  }, [selectedDate]);

  const handleEventPress = (event: AppEvent) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedEvent(null);
  };

  const renderEventItem = ({ item }: { item: AppEvent }) => (
    <TouchableOpacity style={styles.eventItem} onPress={() => handleEventPress(item)}>
      <Image source={imageSources[item.image]} style={styles.eventImage} />
      <View style={styles.eventDetails}>
        <Text style={styles.eventName}>{item.eventName}</Text>
        <Text style={styles.eventTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Events</Text>
        <View style={styles.dateSelector}>
          <TouchableOpacity
            style={[
              styles.dateButton,
              selectedDate === '2023-11-15' && styles.selectedDateButton,
            ]}
            onPress={() => setSelectedDate('2023-11-15')}
          >
            <Text
              style={[
                styles.dateButtonText,
                selectedDate === '2023-11-15' && styles.selectedDateButtonText,
              ]}
            >
              11/15
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.dateButton,
              selectedDate === '2023-11-16' && styles.selectedDateButton,
            ]}
            onPress={() => setSelectedDate('2023-11-16')}
          >
            <Text
              style={[
                styles.dateButtonText,
                selectedDate === '2023-11-16' && styles.selectedDateButtonText,
              ]}
            >
              11/16
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredEvents}
        renderItem={renderEventItem}
        keyExtractor={(item) => item.eventName + item.time}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>この日のイベントはありません。</Text>}
      />

      <EventDetailModal
        visible={isModalVisible}
        event={selectedEvent}
        onClose={handleCloseModal}
        isFullScreen={true} // 全画面で表示
      />
    </SafeAreaView>
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
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  dateSelector: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
  },
  dateButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  selectedDateButton: {
    backgroundColor: '#007AFF',
  },
  dateButtonText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  selectedDateButtonText: {
    color: 'white',
  },
  listContent: {
    padding: 16,
  },
  eventItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  eventDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  eventTime: {
    fontSize: 14,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#999',
  },
});
