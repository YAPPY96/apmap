import React, { useEffect, useState } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

interface Announcement {
  message: string;
}

export const AnnounceBar = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [currentAnnounceIndex, setCurrentAnnounceIndex] = useState(0);
  const [error, setError] = useState(false);
  const translateX = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('https://koudaisai.com/dataforapp/announcement.json');
        if (!response.ok) throw new Error('Network error');
        const data = await response.json();
        if (data && data.length > 0) {
          setAnnouncements(data);
          setError(false);
        } else {
          setAnnouncements([{ message: 'お知らせはありません' }]);
          setError(true);
        }
      } catch (e) {
        setAnnouncements([{ message: 'お知らせはありません' }]);
        setError(true);
      }
    };
    fetchAnnouncements();
  }, []);

  useEffect(() => {
    if (announcements.length > 0) {
      const currentAnnouncement = announcements[currentAnnounceIndex];
      const textWidth = currentAnnouncement.message.length * 14; // Approximate width
      const screenWidth = 400; // Approximate screen width
      const duration = (textWidth + screenWidth) * 20;

      translateX.setValue(screenWidth); // Start from the right

      const animation = Animated.timing(translateX, {
        toValue: -textWidth, // Scroll to the left end
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: true,
      });

      animation.start(({ finished }) => {
        if (finished) {
          setCurrentAnnounceIndex((prevIndex) => (prevIndex + 1) % announcements.length);
        }
      });
    }
  }, [currentAnnounceIndex, announcements]);

  const currentMessage = announcements[currentAnnounceIndex]?.message || '';

  return (
    <View style={[styles.bar, error && styles.errorBar]}>
      <Animated.Text
        style={[
          styles.text,
          error && styles.errorText,
          { transform: [{ translateX }] },
        ]}
        numberOfLines={1}
      >
        {currentMessage}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    width: '100%',
    height: 28,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    overflow: 'hidden',
    paddingHorizontal: 10,
  },
  errorBar: {
    backgroundColor: '#ffeaea',
  },
  text: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    width: 800, // for scrolling
  },
  errorText: {
    color: '#d00',
  },
});
