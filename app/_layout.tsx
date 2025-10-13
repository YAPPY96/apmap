import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import 'react-native-reanimated';

import { LocationProvider } from '@/components/map/location_context';
import { Config } from '@/constants/Config';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import * as SecureStore from 'expo-secure-store';
import { startLocationTracking } from '../tasks/locationTask';
import SurveyScreen from './survey';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [isAnimationFinished, setAnimationFinished] = useState(false);
  const [isSurveyCompleted, setSurveyCompleted] = useState(false);
  const [checkingSurvey, setCheckingSurvey] = useState(true);

  useEffect(() => {
    const checkSurveyStatus = async () => {
      const surveyCompleted = await AsyncStorage.getItem('survey_completed');
      if (surveyCompleted === 'true') {
        setSurveyCompleted(true);
      }
      setCheckingSurvey(false);
    };

    checkSurveyStatus();
  }, []);

  useEffect(() => {
    const requestPermissionsAndStartTracking = async () => {
      const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
      if (foregroundStatus === 'granted') {
        const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
        if (backgroundStatus === 'granted') {
          await startLocationTracking();
        }
      }
    };

    if (isSurveyCompleted) {
      requestPermissionsAndStartTracking();
    }
  }, [isSurveyCompleted]);

  useEffect(() => {
    const sendDataInterval = setInterval(async () => {
      const storedLocations = await AsyncStorage.getItem('location_data');
      if (storedLocations) {
        const anonymousId = await SecureStore.getItemAsync('anonymous_id');
        const surveyDataSent = await AsyncStorage.getItem('survey_data_sent');
        const surveyAnswers = await AsyncStorage.getItem('survey_answers');

        const payload: {
          anonymousId: string | null;
          locations: any;
          surveyAnswers?: any;
        } = {
          anonymousId,
          locations: JSON.parse(storedLocations),
        };

        if (surveyAnswers && surveyDataSent !== 'true') {
          payload.surveyAnswers = JSON.parse(surveyAnswers);
        }

        try {
          const response = await fetch(Config.LOCATION_API_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });

          if (response.ok) {
            await AsyncStorage.removeItem('location_data');
            if (surveyAnswers && surveyDataSent !== 'true') {
              await AsyncStorage.setItem('survey_data_sent', 'true');
            }
          } else {
            console.error('Failed to send location data', response.status);
          }
        } catch (error) {
          console.error('Failed to send location data', error);
        }
      }
    }, 600000); // 10 minutes

    return () => clearInterval(sendDataInterval);
  }, [isSurveyCompleted]);

  useEffect(() => {
    if (loaded && isSurveyCompleted) {
      const timer = setTimeout(() => {
        setAnimationFinished(true);
      }, 10000); // 10秒後にアニメーションを終了

      return () => clearTimeout(timer);
    }
  }, [loaded, isSurveyCompleted]);

  if (!loaded || checkingSurvey) {
    return null;
  }

  if (!isSurveyCompleted) {
    return <SurveyScreen />;
  }

  if (!isAnimationFinished) {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/image/animation.gif')} style={styles.gif} />
      </View>
    );
  }

  return (
    <LocationProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="survey" options={{ headerShown: false }} />
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