// components/map/LocationContext.tsx
import * as Location from 'expo-location';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
interface LocationContextType {
  location: Location.LocationObject | null;
  errorMsg: string | null;
  hasPermission: boolean;
  requestLocation: () => Promise<void>;
  highlightedBuilding: string | null;
  setHighlightedBuilding: (building: string | null) => void;
  zoomToUserTrigger: number;
  triggerZoomToUser: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

interface LocationProviderProps {
  children: ReactNode;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [highlightedBuilding, setHighlightedBuilding] = useState<string | null>(null);
  const [zoomToUserTrigger, setZoomToUserTrigger] = useState<number>(0);

  const triggerZoomToUser = () => {
    setZoomToUserTrigger(prev => prev + 1);
  };

  const requestLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setHasPermission(false);
        return;
      }

      setHasPermission(true);
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } catch (error) {
      setErrorMsg('Error getting location');
      console.error('Location error:', error);
    }
  };

  useEffect(() => {
    requestLocation();
  }, []);

  const value: LocationContextType = {
    location,
    errorMsg,
    hasPermission,
    requestLocation,
    highlightedBuilding,
    setHighlightedBuilding,
    zoomToUserTrigger,
    triggerZoomToUser,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};