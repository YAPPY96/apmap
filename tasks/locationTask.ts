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
    // JST is UTC+9
    const nowUTC = now.getTime();

    // Active Time Windows
    // 2025-10-17 from 9:00 to 16:00 JST
    const startTime1UTC = Date.UTC(2025, 9, 17, 0, 0, 0); // 2025-10-17 00:00 UTC
    const endTime1UTC = Date.UTC(2025, 9, 17, 7, 0, 0);   // 2025-10-17 07:00 UTC

    // 2025-10-20 from 10:00 to 20:00 JST
    const startTime2UTC = Date.UTC(2025, 9, 20, 1, 0, 0); // 2025-10-20 01:00 UTC
    const endTime2UTC = Date.UTC(2025, 9, 20, 11, 0, 0);  // 2025-10-20 11:00 UTC

    // Future/Inactive Time Windows (Commented Out)
    // 2025-11-15 from 9:30 to 19:00 JST
    // const startTime3UTC = Date.UTC(2025, 10, 15, 0, 30, 0); // 2025-11-15 00:30 UTC
    // const endTime3UTC = Date.UTC(2025, 10, 15, 10, 0, 0);   // 2025-11-15 10:00 UTC

    // 2025-11-16 from 9:30 to 19:00 JST
    // const startTime4UTC = Date.UTC(2025, 10, 16, 0, 30, 0); // 2025-11-16 00:30 UTC
    // const endTime4UTC = Date.UTC(2025, 10, 16, 10, 0, 0);   // 2025-11-16 10:00 UTC

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

      const locationsWithTimestamp = validLocations.map(location => ({
        ...location,
        timestamp: new Date().toISOString(),
      }));

      newLocations.push(...locationsWithTimestamp);
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
