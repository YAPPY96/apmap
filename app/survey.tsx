import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import { Button, StyleSheet, Switch, Text, View } from 'react-native';

const SurveyScreen = () => {
  const [consent, setConsent] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (consent) {
      const uuid = Crypto.randomUUID();
      await SecureStore.setItemAsync('anonymous_id', uuid);
      await AsyncStorage.setItem('survey_completed', 'true');
      router.replace('/(tabs)');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>アンケート</Text>
      <Text>今後の観客動線などに役立てるため、位置情報の匿名IDをつけた情報を入手します。</Text>
      <View style={styles.switchContainer}>
        <Text>匿名での位置情報提供への同意</Text>
        <Switch value={consent} onValueChange={setConsent} />
      </View>
      <Button title="送信" onPress={handleSubmit} disabled={!consent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
});

export default SurveyScreen;
