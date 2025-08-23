// components/map/EventDetailModal.tsx
import React from 'react';
import {
    Dimensions,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { EventData } from './types';

interface EventDetailModalProps {
  visible: boolean;
  event: EventData | null;
  onClose: () => void;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  visible,
  event,
  onClose,
}) => {
  if (!event) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
              {/* イベントカード */}
              <View style={styles.eventCard}>
                <Image source={{ uri: event.imageUri }} style={styles.eventImage} />
                <View style={styles.eventTextContainer}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventDescription}>
                    {event.description}
                  </Text>
                </View>
              </View>

              {/* 追加情報セクション */}
              <View style={styles.additionalInfo}>
                <Text style={styles.sectionTitle}>イベント詳細</Text>
                
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>位置情報:</Text>
                  <Text style={styles.infoValue}>
                    座標 ({event.position.topLeft.x.toFixed(1)}, {event.position.topLeft.y.toFixed(1)})
                  </Text>
                </View>
                
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>エリアサイズ:</Text>
                  <Text style={styles.infoValue}>
                    {(event.position.bottomRight.x - event.position.topLeft.x).toFixed(1)} × {(event.position.bottomRight.y - event.position.topLeft.y).toFixed(1)}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>イベントID:</Text>
                  <Text style={styles.infoValue}>{event.id}</Text>
                </View>
              </View>

              {/* アクションボタン */}
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.actionButton} onPress={() => {
                  console.log(`イベント「${event.title}」の詳細を表示`);
                  // ここに詳細表示のロジックを追加
                }}>
                  <Text style={styles.actionButtonText}>詳細を見る</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={[styles.actionButton, styles.favoriteButton]} onPress={() => {
                  console.log(`イベント「${event.title}」をお気に入りに追加`);
                  // ここにお気に入り追加のロジックを追加
                }}>
                  <Text style={styles.actionButtonText}>お気に入り</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
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
    maxHeight: screenHeight * 0.7,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContainer: {
    flex: 1,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60, // closeButtonのための余白
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  eventImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  eventTextContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  additionalInfo: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '400',
    textAlign: 'right',
    flex: 1,
    marginLeft: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteButton: {
    backgroundColor: '#FF6B35',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});