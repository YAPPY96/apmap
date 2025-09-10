import { Config } from '@/constants/Config';
import { useRemoteData } from '@/hooks/useRemoteData';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';

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
  
  const animatedValue = useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get('window').width;
  const textWidthRef = useRef(0);
  const isAnimatingRef = useRef(false);

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
      }, 100); // レイアウト安定のため少し待つ
    }
  };

  // アニメーション実行関数
  const startAnimation = () => {
    if (isAnimatingRef.current || textWidthRef.current === 0 || announcements.length === 0) {
      return;
    }

    isAnimatingRef.current = true;

    // 右端から左端まで流す
    animatedValue.setValue(screenWidth); // スタート位置：画面右外

    const animationDuration = Math.max(8000, (textWidthRef.current + screenWidth) * 15); // 速度調整

    Animated.timing(animatedValue, {
      toValue: -textWidthRef.current, // 終了位置：テキストが完全に左外
      duration: animationDuration,
      useNativeDriver: true,
    }).start(() => {
      isAnimatingRef.current = false;
      // アニメーション終了後、次のメッセージへ
      setCurrentIndex((prev) =>
        prev === announcements.length - 1 ? 0 : prev + 1
      );
    });
  };

  // currentIndex が変わったら即アニメーション開始（ただし幅が取れてる場合のみ）
  useEffect(() => {
    if (announcements.length > 0 && textWidthRef.current > 0) {
      startAnimation();
    }
  }, [currentIndex, announcements.length]);

  if (loading || error || announcements.length === 0) {
    return null;
  }

  const currentMessage = announcements[currentIndex]?.message || '';

  return (
    <View style={styles.bar}>
      <MaterialIcons name="campaign" size={20} color="#333" style={styles.icon} />
      <View style={styles.textWrapper}>
        <View style={styles.textInnerWrapper}>
          <Animated.Text 
            style={[
              styles.text,
              {
                transform: [{ translateX: animatedValue }],
                width: textWidthRef.current > 0 ? textWidthRef.current : screenWidth * 2,
                flexShrink: 0, // 👈 これだけで改行も省略も防げる！
              }
            ]}
            // numberOfLines={1} ← 削除！これが「...」の原因！
            onLayout={onTextLayout}
          >
            {currentMessage}
          </Animated.Text>
        </View>
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
  textInnerWrapper: {
    overflow: 'visible', // 👈 子が親の境界を超えて描画可能
  },
  text: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
});