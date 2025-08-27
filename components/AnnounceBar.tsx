import React, { useEffect, useState } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

export const AnnounceBar = () => {
  const [announce, setAnnounce] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [translateX] = useState(new Animated.Value(0));

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
    if (announce) {
      Animated.loop(
        Animated.timing(translateX, {
          toValue: -400, // adjust based on text length
          duration: 12000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [announce]);

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
        {announce}
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
