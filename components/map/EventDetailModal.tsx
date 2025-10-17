import { Config } from '@/constants/Config';
import { FontAwesome6 } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageViewing from 'react-native-image-viewing';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Image } from 'expo-image';
import { useLocation } from './location_context';
import { AppEvent } from './types';

interface EventDetailModalProps {
  visible: boolean;
  event: AppEvent | null;
  onClose: () => void;
  isFullScreen: boolean;
  showViewLocationButton?: boolean;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  visible,
  event,
  onClose,
  isFullScreen,
  showViewLocationButton,
}) => {
  const router = useRouter();
  const { setHighlightedBuilding } = useLocation();
  const [isImageViewVisible, setImageViewVisible] = useState(false);

  if (!event) return null;

  const handleViewLocation = () => {
    if (event) {
      setHighlightedBuilding(event.buildingName);
      router.push('/(tabs)'); // Navigate to Map tab
      onClose(); // Close the modal
    }
  };

  const handleSnsLinkPress = () => {
    if (event.snsLink) {
      Linking.openURL(event.snsLink).catch((err) =>
        console.error('An error occurred', err)
      );
    }
  };

  const imageUrl = `${Config.IMAGE_BASE_URL}/${event.image}`;
  const images = [{ uri: imageUrl }];

  const modalContent = (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <MaterialIcons name="close" size={24} color="#333" />
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TouchableOpacity onPress={() => setImageViewVisible(true)}>
            <Image
              source={{ uri: imageUrl }}
              style={styles.eventImage}
              contentFit="contain"
              cachePolicy="memory-disk"
              transition={300}
              priority="high"
            />
          </TouchableOpacity>
          <View style={styles.header}>
            <Text style={styles.eventName}>{event.eventName}</Text>
          </View>
          <View style={styles.detailsContainer}>
            {event.groupName && (
              <View style={styles.detailRow}>
                <MaterialIcons name="groups" size={20} color="#666" style={styles.icon} />
                <Text style={styles.detailText}>{event.groupName}</Text>
              </View>
            )}
            <View style={styles.detailRow}>
              <MaterialIcons name="place" size={20} color="#666" style={styles.icon} />
              <Text style={styles.detailText}>{event.buildingName}</Text>
            </View>
            {event.date && (
              <View style={styles.detailRow}>
                <MaterialIcons name="calendar-today" size={20} color="#666" style={styles.icon} />
                <Text style={styles.detailText}>
                  {event.date.includes(',')
                    ? '両日'
                    : new Date(event.date).toLocaleDateString('ja-JP', {
                        month: 'long',
                        day: 'numeric',
                      })}
                </Text>
              </View>
            )}
            <View style={styles.detailRow}>
              <MaterialIcons name="schedule" size={20} color="#666" style={styles.icon} />
              <Text style={styles.detailText}>{event.time}</Text>
            </View>
            <View style={styles.detailRow}>
              <MaterialIcons name="info" size={20} color="#007AFF" style={styles.icon} />
              <Text style={styles.descriptionText}>{event.description}</Text>
            </View>
            {event.snsLink && (
              <View style={styles.detailRow}>
                <MaterialIcons name="web" size={20} color="#666" style={styles.icon} />
                <TouchableOpacity onPress={handleSnsLinkPress}>
                  <Text style={[styles.detailText, styles.linkText]}>{event.snsLink}</Text>
                </TouchableOpacity>
              </View>
            )}
            {event.X && (
              <View style={styles.detailRow}>
                <FontAwesome6 name="square-x-twitter" size={20} color="#666" style={styles.icon} />
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(event.X).catch((err) =>
                      console.error('URL open error:', err)
                    )
                  }
                >
                  <Text style={[styles.detailText, styles.linkText]}>公式X</Text>
                </TouchableOpacity>
              </View>
            )}
            {event.instagram && (
              <View style={styles.detailRow}>
                <Entypo name="instagram" size={20} color="#e12596ff" style={styles.icon} />
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(event.instagram).catch((err) =>
                      console.error('URL open error:', err)
                    )
                  }
                >
                  <Text style={[styles.detailText, styles.linkText]}>公式Instagram</Text>
                </TouchableOpacity>
              </View>
            )}
            {event.caution && (
              <View style={styles.detailRow}>
                <MaterialIcons name="warning" size={20} color="#FF9500" style={styles.icon} />
                <Text style={styles.descriptionText}>
                  <Text style={styles.labelText}>注意事項: </Text>
                  {event.caution}
                </Text>
              </View>
            )}
            {event.others && (
              <View style={styles.detailRow}>
                <MaterialIcons name="announcement" size={20} color="#007AFF" style={styles.icon} />
                <Text style={styles.descriptionText}>
                  <Text style={styles.labelText}>その他: </Text>
                  {event.others}
                </Text>
              </View>
            )}
            {event.reservation && event.reservationSlots && (
              <>
                <View style={styles.separator} />
                <View style={styles.reservationHeader}>
                  <MaterialIcons name="event-available" size={20} color="#666" style={styles.icon} />
                  <Text style={styles.reservationTitle}>予約状況</Text>
                  {/* 右上に表示する赤いラベル（予約が必要な場合） */}

                </View>
                <View style={styles.reservationContainer}>
                  {event.reservationSlots.map((slot, index) => {
                    const statusStyles = {
                      available: styles.statusAvailable,
                      few_left: styles.statusFew_left,
                      closed: styles.statusClosed,
                      full: styles.statusFull,
                    };

                    const statusLabels = {
                      available: '空きあり',
                      few_left: '残りわずか',
                      closed: '受付終了',
                      full: '満席',
                    };

                    return (
                      <View key={index} style={styles.slotRow}>
                        <Text style={styles.slotTime}>{slot.time}</Text>
                        <View style={[styles.statusBadge, statusStyles[slot.status]]}>
                          <Text style={styles.statusText}>
                            {statusLabels[slot.status] ?? '不明'}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </>
            )}
          </View>

          {showViewLocationButton && (
            <TouchableOpacity style={styles.viewLocationButton} onPress={handleViewLocation}>
              <MaterialIcons name="map" size={20} color="white" />
              <Text style={styles.viewLocationButtonText}>場所を見る</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
      <ImageViewing
        images={images}
        imageIndex={0}
        visible={isImageViewVisible}
        onRequestClose={() => setImageViewVisible(false)}
      />
    </>
  );

  if (isFullScreen) {
    return (
      <Modal
        visible={visible}
        animationType="slide"
        transparent={false}
        onRequestClose={onClose}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>{modalContent}</SafeAreaView>
      </Modal>
    );
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>{modalContent}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    height: '90%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  eventImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 15,
  },
  eventName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  detailsContainer: {
    gap: 15,
    marginBottom: 30,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  icon: {
    marginRight: 10,
    marginTop: 2,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  linkText: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  descriptionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    flex: 1,
  },
  labelText: {
    fontWeight: 'bold',
  },
  viewLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 10,
  },
  viewLocationButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  reservationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  reservationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  reservationRequired: {
    marginLeft: 'auto',        // 右端に移動
    color: '#ff3b30',         // 赤（iOS風のアクセント赤）
    fontWeight: '700',
    fontSize: 14,
    paddingLeft: 10,          // アイコンやタイトルと適度に間隔を取る
    alignSelf: 'center',
  },
  reservationContainer: {
    // offset the ScrollView padding (20) so this box reaches edges
    marginHorizontal: 5,
    width: '100%', // occupy full available width after negative margin
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff', // keep same background as modal
  },
  reservationInner: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  slotRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  slotTime: {
    fontSize: 16,
    color: '#333',
    // ensure time doesn't push badge out
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusAvailable: {
    backgroundColor: '#d4edda', // Green
  },
  statusFew_left: {
    backgroundColor: '#fff3cd', // Yellow
  },
  statusFull: {
    backgroundColor: '#f8d7da', // Red
  },
  statusClosed: {
    backgroundColor: '#929292ff', // Red
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});