// components/map/MapWebView.tsx
import * as Location from 'expo-location';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import buildingsData from '../../buildings.json';

interface MapWebViewProps {
  userLocation: Location.LocationObject | null;
  onBuildingClick: (buildingData: any) => void;
}

const MyWebView = forwardRef<WebView, MapWebViewProps>(({ userLocation, onBuildingClick }, ref) => {
  const webViewRef = useRef<WebView>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  // WebViewからのメッセージを処理
  const handleMessage = (event: any) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);
      if (message.type === 'buildingClick') {
        onBuildingClick(message.data);
      } else if (message.type === 'mapReady') {
        setIsMapReady(true);
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

  useEffect(() => {
    if (isMapReady && webViewRef.current) {
      // 地図の準備ができたらGeoJSONを送信
      const message = {
        type: 'loadGeoJson',
        data: buildingsData,
      };
      webViewRef.current.postMessage(JSON.stringify(message));

      // ユーザーの初期位置も送信
      if (userLocation) {
        updateLocation(userLocation);
      }
    }
  }, [isMapReady]);

  useEffect(() => {
    // マップ準備後に位置情報が更新された場合
    if (isMapReady && userLocation) {
      updateLocation(userLocation);
    }
  }, [userLocation]);

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
      // OpenStreetMapのタイルURL
      const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

      const map = L.map('map'); // setViewを削除

      // 標準のタイルレイヤーを追加
      L.tileLayer(tileUrl, {
        minZoom: 17,
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      window.loadBuildingsGeoJSON = function(geojson) {
        if (window.buildingsLayer) {
          map.removeLayer(window.buildingsLayer);
        }
        window.buildingsLayer = L.geoJSON(geojson, {
          style: function(feature) {
            return { color: '#ff7800', weight: 1, opacity: 0.8, fillOpacity: 0.3 };
          },
          onEachFeature: function(feature, layer) {
            if (feature.properties && feature.properties.name) {
              layer.bindPopup(feature.properties.name);
              layer.on('click', function() {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  type: 'buildingClick',
                  data: feature
                }));
              });
            }
          },
          filter: function(feature) {
            // "name"と"building"プロパティが存在する地物のみ表示
            return feature.properties && feature.properties.name && feature.properties.building;
          }
        }).addTo(map);
        
        if (window.buildingsLayer.getLayers().length > 0) {
          const bounds = window.buildingsLayer.getBounds();
          const paddedBounds = bounds.pad(0.1); // 10%のパディングを追加

          map.fitBounds(paddedBounds);
          map.setMaxBounds(paddedBounds);
        }
      };

      var userMarker;
      document.addEventListener('message', function(event) {
        var message;
        try {
          message = JSON.parse(event.data);
        } catch (e) {
          // Not a JSON message
          return;
        }

        if (message.type === 'updateLocation') {
          var latLng = [message.latitude, message.longitude];
          if (userMarker) {
            userMarker.setLatLng(latLng);
          } else {
            userMarker = L.marker(latLng, {
              icon: L.divIcon({
                className: 'user-location-marker',
                html: '<div style="background-color: #4A90E2; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.5);"></div>',
                iconSize: [20, 20]
              })
            }).addTo(map);
          }
        } else if (message.type === 'loadGeoJson') {
          window.loadBuildingsGeoJSON(message.data);
        }
      });

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
      {!isMapReady && (
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
        onLoad={() => {}}
        onError={(e) => console.error('WebView Error: ', e.nativeEvent)}
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