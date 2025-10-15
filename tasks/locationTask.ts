import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

const LOCATION_TASK_NAME = 'background-location-task';

// 許可された位置情報の取得範囲（ポリゴンの頂点）
const ALLOWED_AREA_POLYGON = [
  { latitude: 35.159556, longitude: 136.923489 },
  { latitude: 35.156263, longitude: 136.923070 },
  { latitude: 35.155213, longitude: 136.923322 },
  { latitude: 35.156273, longitude: 136.927191 },
  { latitude: 35.158643, longitude: 136.926901 },
  { latitude: 35.158852, longitude: 136.925710 },
  { latitude: 35.159309, longitude: 136.925721 },
];

/**
 * Point in Polygon アルゴリズム
 * 与えられた座標がポリゴン内にあるかを判定する
 */
const isPointInPolygon = (latitude: number, longitude: number, polygon: Array<{ latitude: number; longitude: number }>): boolean => {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].latitude;
    const yi = polygon[i].longitude;
    const xj = polygon[j].latitude;
    const yj = polygon[j].longitude;

    const intersect = ((yi > longitude) !== (yj > longitude))
      && (latitude < (xj - xi) * (longitude - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
};

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error(error);
    return;
  }
  if (data) {
    const { locations } = data as { locations: Location.LocationObject[] };
    const now = new Date();
    
    // Use UTC for date and time comparisons
    // 日本時間 (JST = UTC+9) で 9:00-19:00 は UTC で 0:00-10:00
    const nowUTC = now.getTime();

    const startTime1UTC = Date.UTC(2025, 9, 17, 0, 0, 0); // Oct 14th 9:00 UTC (JST 9:00)
    const endTime1UTC = Date.UTC(2025, 9, 17, 7, 0, 0);   //Oct 14th 16:00
    const startTime2UTC = Date.UTC(2025, 9, 19, 23, 30, 0); // Nov 20th 0:00 UTC (JST 9:00)
    const endTime2UTC = Date.UTC(2025, 9, 20, 8, 0, 0);   // Nov 20th 10:00 UTC (JST 19:00)

    const isWithinDay1 = nowUTC >= startTime1UTC && nowUTC <= endTime1UTC;
    const isWithinDay2 = nowUTC >= startTime2UTC && nowUTC <= endTime2UTC;

    if (!isWithinDay1 && !isWithinDay2) {
      return;
    }

    // ポリゴン内にある位置情報のみをフィルタリング
    const validLocations = locations.filter(location => {
      const { latitude, longitude } = location.coords;
      return isPointInPolygon(latitude, longitude, ALLOWED_AREA_POLYGON);
    });

    if (validLocations.length > 0) {
      const storedLocations = await AsyncStorage.getItem('location_data');
      const newLocations = storedLocations ? JSON.parse(storedLocations) : [];
      newLocations.push(...validLocations);
      await AsyncStorage.setItem('location_data', JSON.stringify(newLocations));
    }
  }
});

export const startLocationTracking = async () => {
  await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
    accuracy: Location.Accuracy.Balanced,
    timeInterval: 10000, // 10 seconds
    distanceInterval: 0,
    showsBackgroundLocationIndicator: true,
    foregroundService: {
      notificationTitle: 'Location Tracking',
      notificationBody: 'Location tracking is active.',
    },
  });
};

export const stopLocationTracking = async () => {
  await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
};
