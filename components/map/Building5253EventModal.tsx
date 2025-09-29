import { AppEvent } from '@/components/map/types';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import React from 'react';
import {
  Linking,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface Building5253EventModalProps {
  visible: boolean;
  event: AppEvent | null;
  onClose: () => void;
}

const API_BASE_URL = 'https://koudaisai.com/dataforapp/image';

export const Building5253EventModal: React.FC<Building5253EventModalProps> = ({
  visible,
  event,
  onClose,
}) => {
  if (!event) return null;

  const imageUrl = `${API_BASE_URL}/${event.image}`;

  const handleSnsLinkPress = () => {
    if (event.snsLink) {
      Linking.openURL(event.snsLink).catch((err) =>
        console.error('An error occurred', err)
      );
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
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
                <MaterialIcons name="business" size={20} color="#666" style={styles.icon} />
                <Text style={styles.detailText}>{event.groupName}</Text>
              </View>
              <View style={styles.detailRow}>
                <MaterialIcons name="schedule" size={20} color="#666" style={styles.icon} />
                <Text style={styles.detailText}>{event.time}</Text>
              </View>
              <View style={styles.detailRow}>
                <MaterialIcons name="link" size={20} color="#666" style={styles.icon} />
                <TouchableOpacity onPress={handleSnsLinkPress}>
                  <Text style={[styles.detailText, styles.linkText]}>{event.snsLink}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.detailRow}>
                <MaterialIcons name="info-outline" size={20} color="#666" style={styles.icon} />
                <Text style={styles.descriptionText}>{event.description}</Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
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
    resizeMode: 'contain',
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
});
