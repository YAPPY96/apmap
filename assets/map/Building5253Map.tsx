import React from 'react';
import { View } from 'react-native';
import Svg from 'react-native-svg';
import { BaseMap } from './floors/BaseMap';
import { Floor1 } from './floors/Floor1';
import { Floor2 } from './floors/Floor2';
import { Floor3 } from './floors/Floor3';

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
  onRoomClick,
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
    <View style={{ width, height, backgroundColor: '#f0f0f0' }}>
      <Svg width={width} height={height} viewBox="0 0 256.27295 199.79301">
        {/* ベースマップのレイヤーを常に表示 */}
        <BaseMap />

        {/* 選択された階のレイヤーを重ねて表示 */}
        {renderFloor()}
      </Svg>
    </View>
  );
};

export default Building5253InteractiveMap;