// components/map/MapWebView.tsx
import * as Location from 'expo-location';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

interface MapWebViewProps {
  userLocation: Location.LocationObject | null;
  onBuildingClick: (buildingData: any) => void;
}

const MyWebView = forwardRef<WebView, MapWebViewProps>(({ userLocation, onBuildingClick }, ref) => {
  const webViewRef = useRef<WebView>(null);
  const [isLoading, setIsLoading] = useState(true);

  // WebViewからのメッセージを処理
  const handleMessage = (event: any) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);
      if (message.type === 'buildingClick') {
        onBuildingClick(message.data);
      } else if (message.type === 'mapReady') {
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error parsing WebView message:', error);
    }
  };

  // 位置情報を更新
  const updateLocation = (location: Location.LocationObject) => {
    if (webViewRef.current) {
      const message = JSON.stringify({
        type: 'updateLocation',
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
      webViewRef.current.postMessage(message);
    }
  };

  React.useEffect(() => {
    if (userLocation && !isLoading) {
      updateLocation(userLocation);
    }
  }, [userLocation, isLoading]);

  // ローカルHTMLファイルのパスを指定
  const getSource = () => {
    if (Platform.OS === 'android') {
      return { uri: 'http://localhost:8081/public/tile/Map.html' }; //'file:///android_asset/tile/Map.html'
    } else if (Platform.OS === 'ios') {
      return { uri: 'assets/tile/Map.html' }; // iOSはバンドルに含める必要あり
    } else {
      return { uri: '/assets/tile/Map.html' }; // Web
    }
  };

  useImperativeHandle(ref, () => ({
    reload: () => {
      if (webViewRef.current) {
        webViewRef.current.reload();
      }
    },
    stopLoading: () => {
      if (webViewRef.current) {
        webViewRef.current.stopLoading();
      }
    },
    // 他のWebViewメソッドをここに追加
  }));

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
        </View>
      )}
      <WebView
        ref={webViewRef}
        source={getSource()}
        onMessage={handleMessage}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        mixedContentMode="compatibility"
      />
    </View>
  );
});

export const MapWebView = React.memo(MyWebView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 1000,
  },
});