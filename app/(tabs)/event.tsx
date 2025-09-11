import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnnounceBar } from '@/components/AnnounceBar';
import { EventDetailModal } from '@/components/map/EventDetailModal';
import { AppEvent } from '@/components/map/types';
import { Config } from '@/constants/Config';
import { useRemoteData } from '@/hooks/useRemoteData';

const API_BASE_URL = 'https://koudaisai.com/dataforapp/image';

export default function EventScreen() {
  const insets = useSafeAreaInsets(); // セーフエリアの値を取得
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [filteredEvents, setFilteredEvents] = useState<AppEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<AppEvent | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const { data: allEvents } = useRemoteData<AppEvent[]>(Config.EVENTS_URL);

  // 初期日付を設定
  useEffect(() => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    if (month === 11 && day === 16) {
      setSelectedDate('2025-11-16');
    } else {
      setSelectedDate('2025-11-15'); // デフォルトは15日
    }
  }, []);

  // 選択された日付に基づいてイベントをフィルタリング
  useEffect(() => {
    if (selectedDate && allEvents) {
      const events = allEvents.filter((event) => event.date === selectedDate);
      setFilteredEvents(events);
    }
  }, [selectedDate, allEvents]);

  const handleEventPress = (event: AppEvent) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedEvent(null);
  };

  const renderEventItem = ({ item }: { item: AppEvent }) => {
    const imageUrl = `${API_BASE_URL}/${item.image}`;
    return (
      <TouchableOpacity style={styles.eventItem} onPress={() => handleEventPress(item)}>
        <Image source={{ uri: imageUrl }} style={styles.eventImage} />
        <View style={styles.eventDetails}>
          <Text style={styles.eventName}>{item.eventName}</Text>
          <Text style={styles.eventTime}>{item.time}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Events</Text>
        <View style={styles.dateSelector}>
          <TouchableOpacity
            style={[
              styles.dateButton,
              selectedDate === '2025-11-15' && styles.selectedDateButton,
            ]}
            onPress={() => setSelectedDate('2025-11-15')}
          >
            <Text
              style={[
                styles.dateButtonText,
                selectedDate === '2025-11-15' && styles.selectedDateButtonText,
              ]}
            >
              11/15
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.dateButton,
              selectedDate === '2025-11-16' && styles.selectedDateButton,
            ]}
            onPress={() => setSelectedDate('2025-11-16')}
          >
            <Text
              style={[
                styles.dateButtonText,
                selectedDate === '2025-11-16' && styles.selectedDateButtonText,
              ]}
            >
              11/16
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <AnnounceBar />

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
        isFullScreen={true}
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
    paddingVertical: 16,        // パディングを増やしてボタンに余裕を持たせる
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    minHeight: 60,              // 最小高さを設定してボタンが圧縮されないようにする
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,                    // タイトルに余裕を持たせる
  },
  dateSelector: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    marginLeft: 16,             // タイトルとの間に余裕を持たせる
  },
  dateButton: {
    paddingVertical: 10,        // 縦パディングを増やす
    paddingHorizontal: 16,
    minWidth: 60,               // 最小幅を設定
    alignItems: 'center',       // 中央揃え
  },
  selectedDateButton: {
    backgroundColor: '#007AFF',
  },
  dateButtonText: {
    color: '#007AFF',
    fontWeight: '600',
    fontSize: 14,               // フォントサイズを明示的に設定
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