import * as Location from 'expo-location';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface LocationContextType {
  location: Location.LocationObject | null;
  errorMsg: string | null;
  hasPermission: boolean;
  requestLocation: () => Promise<void>;
  highlightedBuilding: string | null;
  setHighlightedBuilding: (buildingName: string | null) => void;
  zoomToUserTrigger: number;
  zoomToAllBuildingsTrigger: number;
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
  const [zoomToUserTrigger, setZoomToUserTrigger] = useState(0);
  const [zoomToAllBuildingsTrigger, setZoomToAllBuildingsTrigger] = useState(0);

  const requestLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setHasPermission(false);
        return;
      }
      setHasPermission(true);
      setErrorMsg(null); // エラーメッセージをクリア
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    } catch (error) {
      setErrorMsg('Failed to get location');
      setHasPermission(false);
      console.error('Location error:', error);
    }
  };

  const triggerZoomToUser = () => {
    if (hasPermission && location) {
      // 位置情報が利用可能な場合: ユーザーの現在地にズーム
      setZoomToUserTrigger(prev => prev + 1);
    } else {
      // 位置情報が利用できない場合: すべての建物が収まる範囲にズームアウト
      setZoomToAllBuildingsTrigger(prev => prev + 1);
      
      // 念のため位置情報の取得も試行
      if (!hasPermission) {
        requestLocation();
      }
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
    zoomToAllBuildingsTrigger,
    triggerZoomToUser,
  };

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
};

export const useLocation = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};