import { AppEvent } from '@/components/map/types';
import { Config } from '@/constants/Config';
import { FontAwesome6 } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import React from 'react';
import {
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Building5253EventModalProps {
  visible: boolean;
  event: AppEvent | null;
  onClose: () => void;
}


export const Building5253EventModal: React.FC<Building5253EventModalProps> = ({
  visible,
  event,
  onClose,
}) => {
  if (!event) return null;

  const imageUrl = `${Config.IMAGE_BASE_URL}/${event.image}`;

  const handleSnsLinkPress = () => {
    if (event.snsLink) {
      Linking.openURL(event.snsLink).catch((err) =>
        console.error('An error occurred', err)
      );
    }
  };

  const handleXLinkPress = () => {
    if (event.X) {
      Linking.openURL(`${event.X}`).catch((err) =>
        console.error('An error occurred', err)
      );
    }
  };

  const handleInstagramLinkPress = () => {
    if (event.instagram) {
      Linking.openURL(`${event.instagram}`).catch(
        (err) => console.error('An error occurred', err)
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
            <Image
              source={{ uri: imageUrl }}
              style={styles.eventImage}
              contentFit="contain"
              cachePolicy="memory-disk"
              transition={300}
              priority="high"
            />
            <View style={styles.header}>
              <Text style={styles.eventName}>{event.eventName}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <MaterialIcons name="groups" size={20} color="#666" style={styles.icon} />
                <Text style={styles.detailText}>{event.groupName}</Text>
              </View>
              {event.id && (
                <View style={styles.detailRow}>
                <MaterialIcons name="meeting-room" size={20} color="#666" style={styles.icon} />
                <Text style={styles.detailText}> {event.id.replace('room', '')}</Text>
              </View>

              )}
              <View style={styles.detailRow}>
                <MaterialIcons name="schedule" size={20} color="#666" style={styles.icon} />
                <Text style={styles.detailText}>{event.time}</Text>
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
    <FontAwesome6 name="square-x-twitter" size={20} color="#000" style={styles.icon} />
    <TouchableOpacity
      onPress={() => {
        if (event.X) {
          Linking.openURL(event.X).catch(err =>
            console.error("URL open error:", err)
          );
        }
      }}
    >
      <Text style={[styles.detailText, styles.linkText]}>公式X</Text>
    </TouchableOpacity>
  </View>
)}
{event.instagram && (
  <View style={styles.detailRow}>
    <Entypo name="instagram" size={20} color="#e12596ff" style={styles.icon} />
    <TouchableOpacity
      onPress={() => {
        if (event.instagram) {
          Linking.openURL(event.instagram).catch(err =>
            console.error("URL open error:", err)
          );
        }
      }}
    >
      <Text style={[styles.detailText, styles.linkText]}>公式Instagram</Text>
    </TouchableOpacity>
  </View>
)}
              <View style={styles.detailRow}>
                <MaterialIcons name="info" size={20} color="#007AFF" style={styles.icon} />
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
