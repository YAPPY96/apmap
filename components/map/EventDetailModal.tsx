import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Image } from 'expo-image';
import { useLocation } from './location_context';
import { AppEvent } from './types';

interface EventDetailModalProps {
  visible: boolean;
  event: AppEvent | null;
  onClose: () => void;
  isFullScreen: boolean;
}

const API_BASE_URL = 'https://koudaisai.com/dataforapp/image';

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  visible,
  event,
  onClose,
  isFullScreen,
}) => {
  const router = useRouter();
  const { setHighlightedBuilding } = useLocation();

  if (!event) return null;

  const handleViewLocation = () => {
    if (event) {
      setHighlightedBuilding(event.buildingName);
      router.push('/(tabs)/'); // Navigate to Map tab
      onClose(); // Close the modal
    }
  };

  const imageUrl = `${API_BASE_URL}/${event.image}`;

  const modalContent = (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <MaterialIcons name="close" size={24} color="#333" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={{ uri: imageUrl }} style={styles.eventImage} />
        <View style={styles.header}>
          <Text style={styles.eventName}>{event.eventName}</Text>
        </View>
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

        <TouchableOpacity style={styles.viewLocationButton} onPress={handleViewLocation}>
          <MaterialIcons name="map" size={20} color="white" />
          <Text style={styles.viewLocationButtonText}>場所を見る</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
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
    height: '100%',
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
    backgroundColor: '#f0f0f0',
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
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
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
  descriptionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    flex: 1,
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
});
