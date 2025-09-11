import React from 'react';
import { View } from 'react-native';
import Svg from 'react-native-svg';
import Floor1 from './map_components/Floor1';
import Floor2 from './map_components/Floor2';
import Floor3 from './map_components/Floor3';
import BaseMap from './map_components/BaseMap';

interface Building5253InteractiveMapProps {
  width: number;
  height: number;
  floor: number;
  onRoomClick: (roomId: string) => void;
}

const Building5253InteractiveMap: React.FC<Building5253InteractiveMapProps> = ({ 
  width, 
  height,
  floor,
  onRoomClick
}) => {
  const renderFloor = () => {
    switch (floor) {
      case 1:
        return <Floor1 onRoomClick={onRoomClick} />;
      case 2:
        return <Floor2 onRoomClick={onRoomClick} />;
      case 3:
        return <Floor3 onRoomClick={onRoomClick} />;
      default:
        return null;
    }
  };

  return (
    <Svg width={width} height={height} viewBox="0 0 297 210">
      <BaseMap />
      {renderFloor()}
    </Svg>
  );
};

export default Building5253InteractiveMap;