import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';

import { Config } from '@/constants/Config';
import { useRemoteData } from '@/hooks/useRemoteData';

interface Announcement {
  id: number;
  message: string;
  enabled: boolean;
}

export const AnnounceBar = () => {
  const { data, loading, error } = useRemoteData<{ announcements: Announcement[] }>(
    Config.ANNOUNCEMENTS_URL
  );
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [currentAnnounceIndex, setCurrentAnnounceIndex] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const [containerWidth, setContainerWidth] = useState(0);
  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    if (data?.announcements) {
      const enabledAnnouncements = data.announcements.filter((a) => a.enabled);
      setAnnouncements(enabledAnnouncements);
    }
  }, [data]);

  useEffect(() => {
    if (announcements.length > 0 && containerWidth > 0 && textWidth > 0) {
      const duration = (textWidth + containerWidth) * 15;
      translateX.setValue(containerWidth);

      const animation = Animated.timing(translateX, {
        toValue: -textWidth,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: true,
      });

      animation.start(({ finished }) => {
        if (finished) {
          setCurrentAnnounceIndex((prevIndex) => (prevIndex + 1) % announcements.length);
        }
      });

      return () => {
        animation.stop();
      };
    }
  }, [currentAnnounceIndex, announcements, containerWidth, textWidth]);

  if (loading || error || announcements.length === 0) {
    return null;
  }

  const currentMessage = announcements[currentAnnounceIndex]?.message || '';

  return (
    <View style={styles.bar} onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}>
      <MaterialIcons name="campaign" size={20} color="#333" style={styles.icon} />
      <View style={styles.textWrapper}>
        <Animated.View style={[styles.animatedContainer, { transform: [{ translateX }] }]}>
          <Text
            onLayout={(e) => setTextWidth(e.nativeEvent.layout.width)}
            style={styles.text}
            numberOfLines={1}
          >
            {currentMessage}
          </Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    width: '100%',
    height: 35,
    backgroundColor: 'rgba(230, 230, 230, 0.9)',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  icon: {
    marginRight: 10,
  },
  textWrapper: {
    flex: 1,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  animatedContainer: {
    position: 'absolute',
  },
  text: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
});
