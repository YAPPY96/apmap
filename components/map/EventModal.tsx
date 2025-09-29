import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// イベントデータの型定義
interface Event {
  buildingName: string;
  eventName: string;
  time: string;
  description: string;
}

// コンポーネントのプロパティの型定義
interface EventDetailModalProps {
  visible: boolean;
  event: Event | null;
  onClose: () => void;
}

const { height: screenHeight } = Dimensions.get('window');

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
          {/* 閉じるボタン */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialIcons name="close" size={24} color="#333" />
          </TouchableOpacity>

          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* ヘッダー */}
            <View style={styles.header}>
              <Text style={styles.eventName}>{event.eventName}</Text>
            </View>

            {/* イベント詳細 */}
            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <MaterialIcons name="place" size={20} color="#666" style={styles.icon} />
                <Text style={styles.detailText}>{event.buildingName}</Text>
              </View>
              <View style={styles.detailRow}>
                <MaterialIcons name="schedule" size={20} color="#666" style={styles.icon} />
                <Text style={styles.detailText}>{event.time}</Text>
              </View>
              <View style={styles.detailRow}>
                <MaterialIcons name="info-outline" size={20} color="#666" style={styles.icon} />
                <Text style={styles.descriptionText}>{event.description}</Text>
              </View>
            </View>
          </ScrollView>
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
    height: screenHeight * 0.5, // 画面の半分
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
    paddingTop: 60, // 閉じるボタンのスペース
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
  descriptionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    flex: 1,
  },
});
