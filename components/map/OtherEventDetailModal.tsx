import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react';
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
import ImageViewing from 'react-native-image-viewing';

import { Image } from 'expo-image';
import { AppEvent } from './types';

interface OtherEventDetailModalProps {
  visible: boolean;
  event: AppEvent | null;
  onClose: () => void;
}

const API_BASE_URL = 'https://koudaisai.com/dataforapp/image';

export const OtherEventDetailModal: React.FC<OtherEventDetailModalProps> = ({
  visible,
  event,
  onClose,
}) => {
  const [isImageViewVisible, setImageViewVisible] = useState(false);

  if (!event) return null;

  const handleLinkPress = () => {
    if (event.snsLink) {
      Linking.openURL(event.snsLink);
    }
  };

  const imageUrl = `${API_BASE_URL}/${event.image}`;
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
            />
          </TouchableOpacity>
          <View style={styles.header}>
            <Text style={styles.eventName}>{event.eventName}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <MaterialIcons name="info-outline" size={20} color="#666" style={styles.icon} />
              <Text style={styles.descriptionText}>{event.description}</Text>
            </View>
            {event.snsLink && (
              <TouchableOpacity style={styles.detailRow} onPress={handleLinkPress}>
                <MaterialIcons name="link" size={20} color="#007AFF" style={styles.icon} />
                <Text style={styles.linkText}>{event.snsLink}</Text>
              </TouchableOpacity>
            )}
          </View>
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

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>{modalContent}</SafeAreaView>
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
  descriptionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    flex: 1,
  },
  linkText: {
    fontSize: 16,
    color: '#007AFF',
    textDecorationLine: 'underline',
    flex: 1,
  },
});