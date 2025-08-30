import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';

export const AnnounceBar = () => {
  const [announce, setAnnounce] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [textWidth, setTextWidth] = useState(0);

  const translateX = useRef(new Animated.Value(0)).current;
  const animation = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    fetch('https://example/announce/api')
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.text();
      })
      .then(text => {
        setAnnounce(text || '');
        setError(false);
      })
      .catch(() => {
        setAnnounce('お知らせはありません');
        setError(true);
      });
  }, []);

  useEffect(() => {
    if (textWidth > 0) {
      translateX.setValue(0);
      animation.current = Animated.loop(
        Animated.timing(translateX, {
          toValue: -textWidth,
          duration: textWidth * 25, // Adjust duration to control speed
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      animation.current.start();
    }
    return () => {
      animation.current?.stop();
    };
  }, [textWidth]);

  const announcementText = announce ? `${announce}      ` : 'お知らせはありません';

  return (
    <View style={[styles.bar, error && styles.errorBar]}>
      <Animated.View style={[styles.animatedContainer, { transform: [{ translateX }] }]}>
        <Text
          style={[styles.text, error && styles.errorText]}
          onLayout={e => !textWidth && setTextWidth(e.nativeEvent.layout.width)}
          numberOfLines={1}
        >
          {announcementText}
        </Text>
        <Text style={[styles.text, error && styles.errorText]} numberOfLines={1}>
          {announcementText}
        </Text>
      </Animated.View>
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
  },
  errorBar: {
    backgroundColor: '#ffeaea',
  },
  animatedContainer: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    // Let the text define its own width for accurate measurement
  },
  errorText: {
    color: '#d00',
  },
});
