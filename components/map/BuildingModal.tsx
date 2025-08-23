// components/map/BuildingModal.tsx
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

interface BuildingFeature {
  properties: {
    name: string;
    building?: string;
    building_id?: string;
    historic?: string;
    amenity?: string;
    [key: string]: any;
  };
}

interface BuildingModalProps {
  visible: boolean;
  building: BuildingFeature | null;
  onClose: () => void;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const BuildingModal: React.FC<BuildingModalProps> = ({
  visible,
  building,
  onClose,
}) => {
  if (!building) return null;

  const getDisplayName = () => {
    return building.properties.name || building.properties.building_id || '建物';
  };

  const getBuildingType = () => {
    if (building.properties.building) {
      switch (building.properties.building) {
        case 'university':
          return '大学建物';
        case 'school':
          return '学校建物';
        default:
          return building.properties.building;
      }
    }
    return '建物';
  };

  const getAdditionalInfo = () => {
    const info: Array<{ label: string; value: string }> = [];
    
    if (building.properties.historic) {
      info.push({ label: '歴史的建造物', value: building.properties.historic });
    }
    
    if (building.properties.amenity) {
      info.push({ label: '施設タイプ', value: building.properties.amenity });
    }
    
    if (building.properties.building_id) {
      info.push({ label: '建物ID', value: building.properties.building_id });
    }
    
    if (building.properties.osm_id) {
      info.push({ label: 'OSM ID', value: building.properties.osm_id });
    }

    return info;
  };

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
              {/* 建物カード */}
              <View style={styles.buildingCard}>
                <View style={styles.buildingIcon}>
                  <Text style={styles.iconText}>🏢</Text>
                </View>
                <View style={styles.buildingTextContainer}>
                  <Text style={styles.buildingTitle}>{getDisplayName()}</Text>
                  <Text style={styles.buildingType}>{getBuildingType()}</Text>
                </View>
              </View>

              {/* 詳細情報セクション */}
              <View style={styles.additionalInfo}>
                <Text style={styles.sectionTitle}>建物詳細</Text>
                
                {getAdditionalInfo().map((item, index) => (
                  <View key={index} style={styles.infoRow}>
                    <Text style={styles.infoLabel}>{item.label}:</Text>
                    <Text style={styles.infoValue}>{item.value}</Text>
                  </View>
                ))}
              </View>

              {/* アクションボタン */}
              <View style={styles.actionButtons}>
                <TouchableOpacity 
                  style={styles.actionButton} 
                  onPress={() => {
                    console.log(`建物「${getDisplayName()}」の詳細を表示`);
                    // ここに詳細表示のロジックを追加
                  }}
                >
                  <Text style={styles.actionButtonText}>詳細を見る</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.actionButton, styles.favoriteButton]} 
                  onPress={() => {
                    console.log(`建物「${getDisplayName()}」をお気に入りに追加`);
                    // ここにお気に入り追加のロジックを追加
                  }}
                >
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
  buildingCard: {
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
  buildingIcon: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#e8f4fd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 40,
  },
  buildingTextContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  buildingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  buildingType: {
    fontSize: 16,
    color: '#666',
    backgroundColor: '#e8f4fd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
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
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '400',
    textAlign: 'right',
    flex: 2,
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