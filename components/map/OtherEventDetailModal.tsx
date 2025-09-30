import MaterialIcons from '@expo/vector-icons/MaterialIcons';
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

  const handleSnsLinkPress = () => {
    if (event.snsLink) {
      Linking.openURL(event.snsLink).catch((err) =>
        console.error('An error occurred', err)
      );
    }
  };

  const handleXLinkPress = () => {
    if (event.X) {
      Linking.openURL(`https://x.com/${event.X}`).catch((err) =>
        console.error('An error occurred', err)
      );
    }
  };

  const handleInstagramLinkPress = () => {
    if (event.instagram) {
      Linking.openURL(`https://www.instagram.com/${event.instagram}`).catch(
        (err) => console.error('An error occurred', err)
      );
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
              <View style={styles.detailRow}>
                <MaterialIcons name="link" size={20} color="#666" style={styles.icon} />
                <TouchableOpacity onPress={handleSnsLinkPress}>
                  <Text style={[styles.detailText, styles.linkText]}>{event.snsLink}</Text>
                </TouchableOpacity>
              </View>
            )}
            {event.X && (
              <View style={styles.detailRow}>
                <MaterialIcons name="link" size={20} color="#666" style={styles.icon} />
                <TouchableOpacity onPress={handleXLinkPress}>
                  <Text style={[styles.detailText, styles.linkText]}>X: @{event.X}</Text>
                </TouchableOpacity>
              </View>
            )}
            {event.instagram && (
              <View style={styles.detailRow}>
                <MaterialIcons name="link" size={20} color="#666" style={styles.icon} />
                <TouchableOpacity onPress={handleInstagramLinkPress}>
                  <Text style={[styles.detailText, styles.linkText]}>
                    Instagram: @{event.instagram}
                  </Text>
                </TouchableOpacity>
              </View>
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
  descriptionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    flex: 1,
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
});