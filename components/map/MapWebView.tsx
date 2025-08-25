// components/map/MapWebView.tsx
import * as Location from 'expo-location';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
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

  const getHtmlContent = () => `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Leaflet Local Tiles</title>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
    <style>
      html, body, #map { height: 100%; margin: 0; padding: 0; }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script>
      // Expo Go では assets/tile/ への相対パスでアクセス
      const tileUrl = 'assets/tile/{z}/{x}/{y}.png';

      const map = L.map('map').setView([35.681236, 139.767125], 16);

      L.tileLayer(tileUrl, {
        minZoom: 15,
        maxZoom: 18,
        tileSize: 256,
        attribution: 'Local Tiles',
        tms: false,
        noWrap: true,
        bounds: [[35.68, 139.76], [35.69, 139.77]]
      }).addTo(map);

      window.loadBuildingsGeoJSON = function(geojson) {
        if (window.buildingsLayer) {
          map.removeLayer(window.buildingsLayer);
        }
        window.buildingsLayer = L.geoJSON(geojson).addTo(map);
      };

      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'mapReady' }));
      }
    </script>
  </body>
  </html>
  `;

  const getSource = () => {
    return { html: getHtmlContent() };
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