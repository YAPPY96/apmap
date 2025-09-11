// app/(tabs)/building5253.tsx
import Building5253InteractiveMap from '@/assets/map/Building5253Map';
import { AnnounceBar } from '@/components/AnnounceBar';
import { Building5253EventModal } from '@/components/map/Building5253EventModal';
import { AppEvent } from '@/components/map/types';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Config } from '@/constants/Config';
import { useRemoteData } from '@/hooks/useRemoteData';
import { useState } from 'react';
import { Dimensions, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Building5253Screen() {
  const insets = useSafeAreaInsets();
  const { data: eventData, isLoading, error } = useRemoteData<Record<string, AppEvent>>(Config.BUILDING_5253_URL);

  const [selectedEvent, setSelectedEvent] = useState<AppEvent | null>(null);
  const [eventModalVisible, setEventModalVisible] = useState(false);
  const [currentFloor, setCurrentFloor] = useState(1);

  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  
  // マップのサイズを画面に合わせて調整
  const mapWidth = screenWidth - 20; // 左右のマージン分を引く
  const mapHeight = Math.min(screenHeight * 0.6, 400); // 画面高さの60%または400pxの小さい方

  const handleRoomClick = (roomId: string) => {
    console.log('Room clicked:', roomId);
    if (eventData && eventData[roomId]) {
      setSelectedEvent(eventData[roomId]);
      setEventModalVisible(true);
    } else {
      // イベントデータがない場合でも部屋の情報を表示
      console.log(`Clicked room ${roomId} - no event data available`);
    }
  };

  const closeEventModal = () => {
    setEventModalVisible(false);
    setSelectedEvent(null);
  };

  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.loadingContainer}>
          <ThemedText style={styles.loadingText}>Loading...</ThemedText>
        </View>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.errorContainer}>
          <ThemedText style={styles.errorText}>データの読み込みに失敗しました。</ThemedText>
          <ThemedText style={styles.errorSubText}>
            インターネット接続を確認してください。
          </ThemedText>
        </View>
      </ThemedView>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>52, 53号館</ThemedText>
      </View>

      <AnnounceBar />

      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
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
                <ThemedText style={[styles.floorButtonText, currentFloor === floor && styles.floorButtonTextActive]}>
                  {floor}F
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.mapWrapper}>
            <Building5253InteractiveMap
              onRoomClick={handleRoomClick}
              width={mapWidth}
              height={mapHeight}
              floor={currentFloor}
            />
          </View>
          
          {/* 凡例 */}
          <View style={styles.legend}>
            <ThemedText style={styles.legendTitle}>凡例</ThemedText>
            <View style={styles.legendItems}>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#ff0000' }]} />
                <ThemedText style={styles.legendText}>女性用トイレ</ThemedText>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#0000ff' }]} />
                <ThemedText style={styles.legendText}>男性用トイレ</ThemedText>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: 'gold' }]} />
                <ThemedText style={styles.legendText}>エレベーター</ThemedText>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: 'gray' }]} />
                <ThemedText style={styles.legendText}>階段</ThemedText>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

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
  floorSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
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
    color: '#333',
  },
  floorButtonTextActive: {
    color: 'white',
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
    color: '#333',
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  mapContainer: {
    flex: 1,
    padding: 10,
  },
  mapWrapper: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legend: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  legendItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    minWidth: '45%',
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 3,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  legendText: {
    fontSize: 12,
    color: '#666',
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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