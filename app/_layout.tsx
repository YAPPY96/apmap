import AsyncStorage from '@react-native-async-storage/async-storage'; // 👈 追加
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import 'react-native-reanimated';

import { LocationProvider } from '@/components/map/location_context';
import { useColorScheme } from '@/hooks/useColorScheme';

// 起動状態を保存するためのキー
const HAS_LAUNCHED_KEY = '@has_launched';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // isFirstLaunch: 初回起動かどうか
  // isReady: データのロードが完了したか
  const [isFirstLaunch, setIsFirstLaunch] = useState(false); 
  const [isReady, setIsReady] = useState(false); // 👈 追加: AsyncStorageの読み込み完了状態
  const [isAnimationFinished, setAnimationFinished] = useState(false);

  useEffect(() => {
    async function checkFirstLaunch() {
      // 1. AsyncStorageから起動履歴をチェック
      const hasLaunched = await AsyncStorage.getItem(HAS_LAUNCHED_KEY);
      
      if (hasLaunched === null) {
        // 初回起動の場合
        setIsFirstLaunch(true);
        // 2. 起動したことを記録
        await AsyncStorage.setItem(HAS_LAUNCHED_KEY, 'true');
      } else {
        // 2回目以降の起動の場合
        setIsFirstLaunch(false);
        // アニメーションをスキップするため、すぐに終了フラグを立てる
        setAnimationFinished(true); 
      }
      setIsReady(true); // 👈 AsyncStorageのチェックが完了
    }

    checkFirstLaunch();
  }, []);

  useEffect(() => {
    // フォントとデータロードが完了し、かつ初回起動の場合のみアニメーションを実行
    if (loaded && isFirstLaunch) {
      const timer = setTimeout(() => {
        setAnimationFinished(true);
      }, 10000); // 10秒後にアニメーションを終了

      return () => clearTimeout(timer);
    }
    // isFirstLaunch が false の場合は、useEffectの最初に setAnimationFinished(true) が呼ばれているため、
    // ここではタイマーは設定されない
  }, [loaded, isFirstLaunch]);


  // データのロードまたはフォントのロードが完了していない場合はnullを返す
  if (!loaded || !isReady) {
    return null;
  }
  
  // 初回起動時でアニメーションが終了していない場合のみGIFを表示
  if (isFirstLaunch && !isAnimationFinished) {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/image/animation.gif')} style={styles.gif} />
      </View>
    );
  }

  // 初回ではない場合、またはアニメーションが終了した場合はメインコンテンツを表示
  return (
    <LocationProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </LocationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
  },
  gif: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});