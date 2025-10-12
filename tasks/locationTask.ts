import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

const LOCATION_TASK_NAME = 'background-location-task';

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error(error);
    return;
  }
  if (data) {
    const { locations } = data as { locations: Location.LocationObject[] };
    const now = new Date();
    
    // Use UTC for date and time comparisons
    const nowUTC = now.getTime();

    const startTime1UTC = Date.UTC(2025, 10, 15, 9, 0, 0); // Nov 15th 9:00 UTC
    const endTime1UTC = Date.UTC(2025, 10, 15, 19, 0, 0);   // Nov 15th 19:00 UTC
    const startTime2UTC = Date.UTC(2025, 10, 16, 9, 0, 0); // Nov 16th 9:00 UTC
    const endTime2UTC = Date.UTC(2025, 10, 16, 19, 0, 0);   // Nov 16th 19:00 UTC

    const isWithinDay1 = nowUTC >= startTime1UTC && nowUTC <= endTime1UTC;
    const isWithinDay2 = nowUTC >= startTime2UTC && nowUTC <= endTime2UTC;

    if (!isWithinDay1 && !isWithinDay2) {
      return;
    }

    const north = 35.15991;
    const south = 35.15498;
    const east = 136.92860;
    const west = 136.92291;

    const validLocations = locations.filter(location => {
      const { latitude, longitude } = location.coords;
      return latitude < north && latitude > south && longitude < east && longitude > west;
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
