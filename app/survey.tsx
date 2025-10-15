import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

// アンケート質問の定義
const SURVEY_QUESTIONS = [
  {
    id: 1,
    question: 'あなたの立場を教えてください',
    options: ['本学の在学生', ' 本学の卒業生', '地域住民・本学在学生のご家族', 'その他一般の来場者']
  },
  {
    id: 2,
    question: '何人で来ましたか？',
    options: ['1人', '2人', '3人', '4人以上']
  },
  {
    id: 3,
    question: '来場の目的は何ですか？',
    options: ['特定のイベント(声優企画、抽選会、芸人等)','模擬店','友人、知人に誘われた','何となく、暇つぶし']
  },
  {
    id: 4,
    question: '大学祭の情報をどこで知りましたか？',
    options: ['SNS', '家族、知り合い', '折込チラシ']
  }
];

const SurveyScreen = () => {
  const [consent, setConsent] = useState(false);
  const [showConsentScreen, setShowConsentScreen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const router = useRouter();
  
  // アニメーション用
  const slideAnim = useRef(new Animated.Value(100)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const totalQuestions = SURVEY_QUESTIONS.length;
  const currentQuestionData = SURVEY_QUESTIONS[currentQuestion];

  // 質問または同意画面が変わるたびにアニメーションを実行
  useEffect(() => {
    // リセット
    slideAnim.setValue(100);
    fadeAnim.setValue(0);
    
    // アニメーション開始
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentQuestion, showConsentScreen]);

  const handleSelectOption = (option: string) => {
    setAnswers({
      ...answers,
      [currentQuestionData.id]: option
    });
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentQuestion === totalQuestions - 1 && allQuestionsAnswered) {
      // 最後の質問で全て回答済みの場合、同意画面を表示
      setShowConsentScreen(true);
    }
  };

  const handlePrevious = () => {
    if (showConsentScreen) {
      // 同意画面から最後の質問に戻る
      setShowConsentScreen(false);
      return;
    }

    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    if (consent) {
      const uuid = Crypto.randomUUID();
      await SecureStore.setItemAsync('anonymous_id', uuid);
      await AsyncStorage.setItem('survey_completed', 'true');
      await AsyncStorage.setItem('survey_answers', JSON.stringify(answers));
      router.replace('/(tabs)');
    }
  };

  const isCurrentQuestionAnswered = answers[currentQuestionData.id] !== undefined;
  const allQuestionsAnswered = SURVEY_QUESTIONS.every(q => answers[q.id] !== undefined);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>アンケート</Text>
      
      {showConsentScreen ? (
        // 同意画面の表示
        <Animated.View 
          style={[
            styles.questionCard, // アンケートカードのスタイルを再利用
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={styles.consentTitle}>ご協力のお願い</Text>
          <Text style={styles.consentDescription}>
            今後の観客動線などに役立てるため、位置情報の匿名IDをつけた情報を入手します。
          </Text>
          <Text style={styles.consentDescription}>
            送られる情報はアンケートの結果と大学校内(※1)での移動経路です。
          </Text>
          <Text style={styles.consentDescription}>
            また位置情報は2025年11月15,16日の9:30~19:00のみ取得され、この期間外は収集されません。
          </Text>
          <Text style={styles.consentDescription}>
            ※1：大学構内とは、以下の地図中の赤色の線で囲まれた範囲を指します。
            ただし、GPS信号の特性上、実際の位置情報がこの範囲から外れる場合がありますが、ご了承ください。
          </Text>
<Image
  source={require('@/assets/image/asklocation.webp')}
  style={styles.locationImage}
  resizeMode="contain"
/>


          <View style={styles.switchContainer}>
            <Text style={styles.consentText}>匿名での位置情報提供への同意</Text>
            <Switch value={consent} onValueChange={setConsent} />
          </View>
          
          <View style={styles.navigationContainer}>
            <TouchableOpacity
              style={styles.navButton}
              onPress={handlePrevious}
            >
              <Text style={styles.navButtonText}>← 戻る</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.submitButton, !consent && styles.submitButtonDisabled, { flex: 1 }]}
              onPress={handleSubmit}
              disabled={!consent}
            >
              <Text style={styles.submitButtonText}>送信</Text>
            </TouchableOpacity>
          </View>
         </Animated.View> 
      ) : (
        // アンケート質問の表示
        <>
          <Text style={styles.progressText}>
            質問 {currentQuestion + 1} / {totalQuestions}
          </Text>
          <Animated.View 
            style={[
              styles.questionCard,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <Text style={styles.questionText}>{currentQuestionData.question}</Text>
            
            <View style={styles.optionsContainer}>
              {currentQuestionData.options.map((option, index) => {
                const isSelected = answers[currentQuestionData.id] === option;
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.optionButton,
                      isSelected && styles.optionButtonSelected
                    ]}
                    onPress={() => handleSelectOption(option)}
                  >
                    <Text style={[
                      styles.optionText,
                      isSelected && styles.optionTextSelected
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Animated.View>

          <View style={styles.navigationContainer}>
            <TouchableOpacity
              style={[styles.navButton, currentQuestion === 0 && styles.navButtonDisabled]}
              onPress={handlePrevious}
              disabled={currentQuestion === 0}
            >
              <Text style={[styles.navButtonText, currentQuestion === 0 && styles.navButtonTextDisabled]}>
                ← 戻る
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.navButton,
                !isCurrentQuestionAnswered && styles.navButtonDisabled
              ]}
              onPress={handleNext}
              disabled={!isCurrentQuestionAnswered}
            >
              <Text style={[
                styles.navButtonText,
                !isCurrentQuestionAnswered && styles.navButtonTextDisabled
              ]}>
                {currentQuestion === totalQuestions - 1 ? '同意画面へ →' : '次へ →'}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 40,
    textAlign: 'center',
    color: '#333',
  },
  progressText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
  },
  questionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  optionButtonSelected: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196f3',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  optionTextSelected: {
    color: '#2196f3',
    fontWeight: '600',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 10,
  },
  navButton: {
    flex: 1,
    backgroundColor: '#2196f3',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  navButtonDisabled: {
    backgroundColor: '#ccc',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  navButtonTextDisabled: {
    color: '#999',
  },
  // --- 同意画面用のスタイル ---
  consentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  consentDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    lineHeight: 20,
  },
// styles の locationImage を少し調整
locationImage: {
  width: '100%', // コンテナ幅に合わせる
  height: 500, // 高さはそのまま
  marginVertical: 15,
  borderRadius: 8,
  backgroundColor: '#f0f0f0', // 読み込み中の背景色（オプション）
  alignSelf: 'center', // 中央に配置
},
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingVertical: 10,
  },
  consentText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SurveyScreen;