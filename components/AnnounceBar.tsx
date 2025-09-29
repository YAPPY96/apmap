import { Config } from '@/constants/Config';
import { useRemoteData } from '@/hooks/useRemoteData';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const animatedValue = useRef(new Animated.Value(0)).current;
  const animation = useRef<Animated.CompositeAnimation | null>(null);
  const screenWidth = Dimensions.get('window').width;
  const textWidthRef = useRef(0);

  // お知らせデータの設定
  useEffect(() => {
    if (data?.announcements) {
      const enabledAnnouncements = data.announcements.filter((a) => a.enabled);
      setAnnouncements(enabledAnnouncements);
      setCurrentIndex(0);
    }
  }, [data]);

  // テキスト幅取得 → 少し遅延させてアニメ再開
  const onTextLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    if (width > 0 && width !== textWidthRef.current) {
      textWidthRef.current = width;
      setTimeout(() => {
        startAnimation();
      }, 100);
    }
  };

  // アニメーション実行関数
  const startAnimation = () => {
    if (textWidthRef.current === 0 || announcements.length === 0 || isDropdownOpen) {
      return;
    }

    animatedValue.setValue(screenWidth);
    const animationDuration = Math.max(8000, (textWidthRef.current + screenWidth) * 15);

    animation.current = Animated.timing(animatedValue, {
      toValue: -textWidthRef.current,
      duration: animationDuration,
      useNativeDriver: true,
    });
    
    animation.current.start(({ finished }) => {
      if (finished) {
        setCurrentIndex((prev) => (prev === announcements.length - 1 ? 0 : prev + 1));
      }
    });
  };

  const stopAnimation = () => {
    if (animation.current) {
      animation.current.stop();
      animation.current = null;
    }
  };

  // currentIndex が変わったらアニメーション開始
  useEffect(() => {
    startAnimation();
  }, [currentIndex, announcements.length]);

  // isDropdownOpen の状態によってアニメーションを制御
  useEffect(() => {
    if (isDropdownOpen) {
      stopAnimation();
    } else {
      startAnimation();
    }
  }, [isDropdownOpen]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  if (loading || error || announcements.length === 0) {
    return null;
  }

  const currentMessage = announcements[currentIndex]?.message || '';

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDropdown} activeOpacity={0.8}>
        <View style={styles.bar}>
          <MaterialIcons name="campaign" size={20} color="#333" style={styles.icon} />
          <View style={styles.textWrapper}>
            {!isDropdownOpen && (
              <View style={styles.textInnerWrapper}>
                <Animated.Text
                  style={[
                    styles.text,
                    {
                      transform: [{ translateX: animatedValue }],
                      width: textWidthRef.current > 0 ? textWidthRef.current : screenWidth * 2,
                      flexShrink: 0,
                    },
                  ]}
                  onLayout={onTextLayout}
                >
                  {currentMessage}
                </Animated.Text>
              </View>
            )}
            {isDropdownOpen && (
              <Text style={styles.text} numberOfLines={1}>
                {currentMessage}
              </Text>
            )}
          </View>
          <MaterialIcons
            name={isDropdownOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
            size={24}
            color="#333"
          />
        </View>
      </TouchableOpacity>
      {isDropdownOpen && (
        <View style={styles.dropdown}>
          {announcements.map((item) => (
            <Text key={item.id} style={styles.dropdownText}>
              ・{item.message}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'rgba(230, 230, 230, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  bar: {
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  icon: {
    marginRight: 10,
  },
  textWrapper: {
    flex: 1,
    overflow: 'hidden',
    justifyContent: 'center',
    height: '100%',
  },
  textInnerWrapper: {
    overflow: 'visible',
  },
  text: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  dropdown: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  dropdownText: {
    fontSize: 14,
    color: '#333',
    paddingVertical: 5,
  },
});