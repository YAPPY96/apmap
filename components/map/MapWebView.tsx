// components/map/MapWebView.tsx
import * as Location from 'expo-location';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

interface MapWebViewProps {
  userLocation: Location.LocationObject | null;
  onBuildingClick: (buildingData: any) => void;
}

export const MapWebView: React.FC<MapWebViewProps> = ({ userLocation, onBuildingClick }) => {
  const webViewRef = useRef<WebView>(null);
  const [isLoading, setIsLoading] = useState(true);

  // HTMLコンテンツを生成
  const getHtmlContent = () => {
    const userLat = userLocation?.coords.latitude || 35.1572;
    const userLng = userLocation?.coords.longitude || 136.925;

    return `
<!DOCTYPE html>
<html>
<head>
    <title>University Map</title>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha384-sHL9NAb7lN7rfvG5lfHpm643Xkcjzp4jFvuavGOndn6pjVqS6ny56CAt3nsEVT4H"
          crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
            integrity="sha384-cxOPjt7s7Iz04uaHJceBmS+qpjv2JkIHNVcuOrM+YHwZOmJGBXI00mdUXEq65HTH"
            crossorigin=""></script>
    <style type="text/css">
        body {margin: 0; padding: 0; font-family: Arial, sans-serif;}
        html, body, #map {width: 100%; height: 100%;}
        .building-popup {
            font-size: 14px;
            max-width: 200px;
        }
        .building-name {
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
        }
        .building-type {
            color: #666;
            font-size: 12px;
        }
        .user-location-popup {
            text-align: center;
            color: #2196F3;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div id="map"></div>
    <script>
        // 地図の初期化
        var map = L.map('map', {
            attributionControl: false,
            zoomControl: true
        }).setView([${userLat}, ${userLng}], 18);

        // アトリビューション設定
        L.control.attribution({prefix: false}).addTo(map);

        // タイルレイヤーの設定（実際のタイルパスに合わせて調整してください）
        var tilesource_layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            minZoom: 15,
            maxZoom: 22,
            attribution: 'Map data © OpenStreetMap contributors'
        }).addTo(map);

        // ユーザー位置マーカー
        var userIcon = L.divIcon({
            className: 'user-marker',
            html: '<div style="background-color: #2196F3; border: 3px solid white; border-radius: 50%; width: 20px; height: 20px; box-shadow: 0 0 10px rgba(33, 150, 243, 0.5);"></div>',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });

        var userMarker = L.marker([${userLat}, ${userLng}], {icon: userIcon})
            .addTo(map)
            .bindPopup('<div class="user-location-popup">現在地</div>');

        // 建物GeoJSONデータ
        var buildingsData = {
            "type": "FeatureCollection",
            "name": "buildings",
            "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
            "features": [
                {
                    "type": "Feature",
                    "properties": {
                        "full_id": "w144867622",
                        "osm_id": "144867622",
                        "osm_type": "way",
                        "building": "university",
                        "historic": null,
                        "source_ref": null,
                        "shop": null,
                        "building:height": null,
                        "leisure": null,
                        "addr:postcode": null,
                        "addr:housenumber": null,
                        "addr:city": null,
                        "operator": null,
                        "name:en": null,
                        "ele": null,
                        "height": null,
                        "building:levels": null,
                        "wikimedia_commons": null,
                        "roof:colour": null,
                        "amenity": null,
                        "building:colour": "white",
                        "wikidata": null,
                        "type": null,
                        "name": "52・53号館",
                        "building_id": null
                    },
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [[[
                            [136.9250886, 35.1586105], [136.9250002, 35.1586196], [136.9250122, 35.1586971],
                            [136.925489199999987, 35.1586476], [136.9255109, 35.1587875], [136.9249759, 35.158843],
                            [136.9249661, 35.1587799], [136.924738499999989, 35.1588035], [136.924741399999988, 35.158822],
                            [136.9245575, 35.158841], [136.9245276, 35.1586482], [136.924954, 35.158604],
                            [136.9249177, 35.1583684], [136.924793099999988, 35.1583816], [136.9247961, 35.1584001],
                            [136.9246751, 35.1584129], [136.9246719, 35.158393], [136.924511200000012, 35.15841],
                            [136.9244878, 35.1582623], [136.924894099999989, 35.1582193], [136.924961599999989, 35.1582125],
                            [136.925027, 35.1582064], [136.9250271, 35.1582111], [136.9250776, 35.1582057],
                            [136.9251376, 35.1580845], [136.925148799999988, 35.158088], [136.9251727, 35.1580971],
                            [136.925182299999989, 35.1581016], [136.9251956, 35.1581079], [136.9252062, 35.158114],
                            [136.925217800000013, 35.1581016], [136.925283400000012, 35.1581565], [136.9252736, 35.158166],
                            [136.92528870000001, 35.1581838], [136.9253019, 35.1582025], [136.9253132, 35.1582221],
                            [136.9251559, 35.1582651], [136.9251559, 35.1582696], [136.9253148, 35.1582762],
                            [136.925314, 35.1582961], [136.925311, 35.1583142], [136.925306400000011, 35.158332],
                            [136.925299700000011, 35.1583495], [136.9253205, 35.1583566], [136.9252802, 35.1584207],
                            [136.9252572, 35.1584109], [136.925255600000014, 35.1584126], [136.9252405, 35.1584261],
                            [136.925224, 35.1584385], [136.9252065, 35.1584496], [136.9251878, 35.1584594],
                            [136.9250846, 35.1583431], [136.9250477, 35.1583466], [136.9250886, 35.1586105]
                        ]]]
                    }
                }
            ]
        };

        // 建物レイヤーのスタイル
        function buildingStyle(feature) {
            return {
                fillColor: feature.properties.name ? '#ff7800' : '#3388ff',
                weight: 2,
                opacity: 1,
                color: feature.properties.name ? '#ff5500' : '#0066cc',
                dashArray: '',
                fillOpacity: 0.7
            };
        }

        // 建物レイヤーのイベントハンドラ
        function onEachBuilding(feature, layer) {
            if (feature.properties.name) {
                var popupContent = '<div class="building-popup">' +
                    '<div class="building-name">' + feature.properties.name + '</div>';
                
                if (feature.properties.building) {
                    popupContent += '<div class="building-type">' + 
                        (feature.properties.building === 'university' ? '大学建物' : feature.properties.building) + 
                        '</div>';
                }
                
                popupContent += '</div>';
                
                layer.bindPopup(popupContent);
                
                // クリックイベント
                layer.on('click', function(e) {
                    // React Nativeに建物データを送信
                    if (window.ReactNativeWebView) {
                        window.ReactNativeWebView.postMessage(JSON.stringify({
                            type: 'buildingClick',
                            data: feature
                        }));
                    }
                });
                
                // ホバーエフェクト
                layer.on('mouseover', function(e) {
                    layer.setStyle({
                        weight: 3,
                        fillOpacity: 0.9
                    });
                });
                
                layer.on('mouseout', function(e) {
                    layer.setStyle(buildingStyle(feature));
                });
            }
        }

        // 建物レイヤーを地図に追加
        var buildingsLayer = L.geoJSON(buildingsData, {
            style: buildingStyle,
            onEachFeature: onEachBuilding
        }).addTo(map);

        // 位置更新関数
        function updateUserLocation(lat, lng) {
            userMarker.setLatLng([lat, lng]);
            map.setView([lat, lng], map.getZoom());
        }

        // WebViewからのメッセージを処理
        window.addEventListener('message', function(event) {
            try {
                var data = JSON.parse(event.data);
                if (data.type === 'updateLocation') {
                    updateUserLocation(data.latitude, data.longitude);
                }
            } catch (e) {
                console.error('Error parsing message:', e);
            }
        });

        // 地図の読み込み完了を通知
        map.whenReady(function() {
            if (window.ReactNativeWebView) {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                    type: 'mapReady'
                }));
            }
        });

    </script>
</body>
</html>
    `;
  };

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

  // 位置情報が変更されたら地図を更新
  React.useEffect(() => {
    if (userLocation && !isLoading) {
      updateLocation(userLocation);
    }
  }, [userLocation, isLoading]);

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
        </View>
      )}
      
      <WebView
        ref={webViewRef}
        source={{ html: getHtmlContent() }}
        onMessage={handleMessage}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />
    </View>
  );
};

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