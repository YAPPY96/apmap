// components/map/MapWebView.tsx
import { Config } from '@/constants/Config';
import { useRemoteData } from '@/hooks/useRemoteData';
import * as Location from 'expo-location';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

interface MapWebViewProps {
  userLocation: Location.LocationObject | null;
  onBuildingClick: (buildingData: any) => void;
  highlightedBuilding: string | null;
  zoomToUserTrigger: number;
}

const MyWebView = forwardRef<WebView, MapWebViewProps>(
  ({ userLocation, onBuildingClick, highlightedBuilding, zoomToUserTrigger }, ref) => {
    const webViewRef = useRef<WebView>(null);
    const [isMapReady, setIsMapReady] = useState(false);
    const { data: buildingsData } = useRemoteData(Config.BUILDINGS_URL);

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

    useEffect(() => {
      if (isMapReady && webViewRef.current && buildingsData) {
        const message = { type: 'loadGeoJson', data: buildingsData };
        webViewRef.current.postMessage(JSON.stringify(message));
        if (userLocation) {
          webViewRef.current.postMessage(
            JSON.stringify({ type: 'updateLocation', ...userLocation.coords })
          );
        }
      }
    }, [isMapReady, buildingsData]);

    useEffect(() => {
      if (isMapReady && userLocation && webViewRef.current) {
        webViewRef.current.postMessage(
          JSON.stringify({ type: 'updateLocation', ...userLocation.coords })
        );
      }
    }, [userLocation]);

    useEffect(() => {
      if (highlightedBuilding && isMapReady && webViewRef.current) {
        webViewRef.current.postMessage(
          JSON.stringify({ type: 'highlightBuilding', buildingName: highlightedBuilding })
        );
      }
    }, [highlightedBuilding]);

    useEffect(() => {
      if (zoomToUserTrigger > 0 && isMapReady && webViewRef.current) {
        webViewRef.current.postMessage(JSON.stringify({ type: 'zoomToUser' }));
      }
    }, [zoomToUserTrigger]);

    useImperativeHandle(ref, () => webViewRef.current as WebView);

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Campus Map</title>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
      <style>
        html, body, #map { height: 100%; margin: 0; padding: 0; background-color: #F0F0F0; }
        body { -webkit-touch-callout: none; -webkit-user-select: none; }
        .building-label {
          background-color: transparent;
          border: none;
          box-shadow: none;
          font-weight: bold;
          font-size: 12px;
          color: black;
          text-shadow: 0 0 3px white, 0 0 3px white, 0 0 3px white, 0 0 3px white;
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <script>
        const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        const map = L.map('map', { zoomControl: false });
        let userMarker, buildingsLayer, highlightedLayer;

        const originalStyle = { color: '#ff7800', weight: 1, opacity: 0.8, fillOpacity: 0.3 };
        const highlightStyle = { color: '#007AFF', weight: 3, opacity: 1, fillOpacity: 0.6 };

        L.tileLayer(tileUrl, {
          minZoom: 17,
          maxZoom: 19,
          attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);

        function postMessage(type, data) {
          if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(JSON.stringify({ type, data }));
          }
        }

        function resetHighlight() {
          if (highlightedLayer) {
            highlightedLayer.setStyle(originalStyle);
            highlightedLayer = null;
          }
        }

        window.highlightBuilding = function(buildingName) {
          resetHighlight();
          if (!buildingsLayer) return;

          buildingsLayer.eachLayer(layer => {
            if (layer.feature.properties.name === buildingName) {
              highlightedLayer = layer;
              layer.setStyle(highlightStyle);
              map.flyToBounds(layer.getBounds().pad(0.2));
            }
          });
        };

        window.zoomToUser = function() {
          if (!userMarker) return;

          const userLatLng = userMarker.getLatLng();
          const maxBounds = map.options.maxBounds;

          if (maxBounds && maxBounds.contains(userLatLng)) {
            map.flyTo(userLatLng, 18);
          } else {
            map.fitBounds(maxBounds);
          }
        };

        window.loadBuildingsGeoJSON = function(geojson) {
          if (buildingsLayer) map.removeLayer(buildingsLayer);
          
          buildingsLayer = L.geoJSON(geojson, {
            style: originalStyle,
            onEachFeature: (feature, layer) => {
              if (feature.properties && feature.properties.name) {
                layer.on('click', () => postMessage('buildingClick', feature));
                layer.bindTooltip(feature.properties.name, {
                  permanent: true,
                  direction: 'center',
                  className: 'building-label'
                }).openTooltip();
              }
            },
            filter: feature => feature.properties && feature.properties.name
          }).addTo(map);
          
          if (buildingsLayer.getLayers().length > 0) {
            const bounds = buildingsLayer.getBounds().pad(0.1);
            map.fitBounds(bounds);
            map.setMaxBounds(bounds);
          }
        };

        // iOS対応: windowとdocumentの両方でイベントリスナーを設定
        function handleMessageEvent(event) {
          let message;
          try { 
            message = JSON.parse(event.data); 
          } catch (e) { 
            return; 
          }

          switch (message.type) {
            case 'updateLocation':
              const latLng = [message.latitude, message.longitude];
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
              break;
            case 'loadGeoJson':
              window.loadBuildingsGeoJSON(message.data);
              break;
            case 'highlightBuilding':
              window.highlightBuilding(message.buildingName);
              break;
            case 'zoomToUser':
              window.zoomToUser();
              break;
          }
        }

        document.addEventListener('message', handleMessageEvent);
        window.addEventListener('message', handleMessageEvent);

        // マップが準備完了したことを通知
        setTimeout(() => {
          postMessage('mapReady');
        }, 100);
      </script>
    </body>
    </html>
    `;

    return (
      <View style={styles.container}>
        {!isMapReady && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4A90E2" />
          </View>
        )}
        <WebView
          ref={webViewRef}
          source={{ html: htmlContent }}
          onMessage={handleMessage}
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          // iOS特有の設定
          originWhitelist={['*']}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          // iOS WebKitの設定
          {...(Platform.OS === 'ios' && {
            allowsBackForwardNavigationGestures: false,
            bounces: false,
            scrollEnabled: false,
          })}
          onError={(e) => console.error('WebView Error: ', e.nativeEvent)}
          onHttpError={(e) => console.error('HTTP Error: ', e.nativeEvent)}
          onLoadStart={() => console.log('WebView loading started')}
          onLoadEnd={() => console.log('WebView loading completed')}
        />
      </View>
    );
  }
);

export const MapWebView = React.memo(MyWebView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
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