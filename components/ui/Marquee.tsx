import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View, findNodeHandle } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface MarqueeProps {
  text: string;
  style?: object;
  separator?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({ text, style, separator = '   ◆   ' }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [textWidth, setTextWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const animation = useRef<Animated.CompositeAnimation | null>(null);

  const shouldAnimate = textWidth > containerWidth;

  useEffect(() => {
    if (shouldAnimate) {
      animation.current = Animated.loop(
        Animated.timing(animatedValue, {
          toValue: -textWidth,
          duration: textWidth * 25, // Adjust speed
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      animation.current.start();
    } else {
      animation.current?.reset();
    }

    return () => {
      animation.current?.stop();
    };
  }, [shouldAnimate, textWidth]);

  return (
    <View 
      style={[styles.container, style]} 
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      <MaterialIcons name="campaign" size={20} color="#333" style={styles.icon} />
      <View style={styles.textWrapper}>
        <Animated.View style={[styles.animatedContainer, { transform: [{ translateX: animatedValue }] }]}>
          <Text 
            numberOfLines={1}
            onLayout={(e) => setTextWidth(e.nativeEvent.layout.width)} 
            style={styles.text}
          >
            {text}
          </Text>
          {shouldAnimate && (
            <Text style={styles.text}>{separator}{text}</Text>
          )}
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(230, 230, 230, 0.9)',
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
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
    flexDirection: 'row',
  },
  text: {
    fontSize: 14,
    color: '#333',
    paddingRight: 5, // Add some padding to not be flush against the edge
  },
});
