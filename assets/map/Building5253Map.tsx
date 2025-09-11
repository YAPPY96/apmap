import React from 'react';
import { Svg, Text } from 'react-native-svg';
import BaseMap from './map_components/BaseMap';
import Floor1 from './map_components/Floor1';
import Floor2 from './map_components/Floor2';
import Floor3 from './map_components/Floor3';

interface Building5253InteractiveMapProps {
  onRoomClick: (roomId: string) => void;
  width: number;
  height: number;
  floor: number;
}

const Building5253InteractiveMap: React.FC<Building5253InteractiveMapProps> = ({ 
  onRoomClick, 
  width, 
  height,
  floor
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
      
      {/* Room Labels - These can also be moved to floor components if they differ by floor */}
      {floor === 1 && (
        <>
          <Text x="88" y="108" fontSize="8" textAnchor="middle" fill="black">5215</Text>
          <Text x="87" y="155" fontSize="8" textAnchor="middle" fill="black">5214</Text>
          <Text x="115" y="150" fontSize="8" textAnchor="middle" fill="black">5216</Text>
          <Text x="117" y="110" fontSize="8" textAnchor="middle" fill="black">5217</Text>
          <Text x="116" y="75" fontSize="8" textAnchor="middle" fill="black">5218</Text>
          <Text x="180" y="40" fontSize="10" textAnchor="middle" fill="black">YUME</Text>
          <Text x="255" y="125" fontSize="8" textAnchor="middle" fill="black">Science</Text>
          <Text x="255" y="135" fontSize="8" textAnchor="middle" fill="black">Experiment</Text>
        </>
      )}
      {floor === 2 && (
        <>
          <Text x="88" y="108" fontSize="8" textAnchor="middle" fill="black">5225</Text>
          <Text x="87" y="155" fontSize="8" textAnchor="middle" fill="black">5224</Text>
          <Text x="115" y="150" fontSize="8" textAnchor="middle" fill="black">5226</Text>
          <Text x="117" y="110" fontSize="8" textAnchor="middle" fill="black">5227</Text>
          <Text x="116" y="75" fontSize="8" textAnchor="middle" fill="black">5228</Text>
          <Text x="150" y="40" fontSize="8" textAnchor="middle" fill="black">5223</Text>
          <Text x="195" y="40" fontSize="8" textAnchor="middle" fill="black">5222</Text>
          <Text x="250" y="40" fontSize="8" textAnchor="middle" fill="black">5221</Text>
          <Text x="255" y="125" fontSize="8" textAnchor="middle" fill="black">Physical</Text>
          <Text x="255" y="135" fontSize="8" textAnchor="middle" fill="black">Experiment</Text>
        </>
      )}
      {floor === 3 && (
          <>
            <Text x="88" y="108" fontSize="8" textAnchor="middle" fill="black">5235</Text>
            <Text x="87" y="155" fontSize="8" textAnchor="middle" fill="black">5234</Text>
            <Text x="115" y="150" fontSize="8" textAnchor="middle" fill="black">5236</Text>
            <Text x="117" y="110" fontSize="8" textAnchor="middle" fill="black">5237</Text>
            <Text x="116" y="75" fontSize="8" textAnchor="middle" fill="black">5238</Text>
            <Text x="150" y="40" fontSize="8" textAnchor="middle" fill="black">5233</Text>
            <Text x="180" y="40" fontSize="8" textAnchor="middle" fill="black">5232</Text>
            <Text x="210" y="40" fontSize="8" textAnchor="middle" fill="black">5231</Text>
            <Text x="255" y="125" fontSize="8" textAnchor="middle" fill="black">Geographical</Text>
            <Text x="255" y="135" fontSize="8" textAnchor="middle" fill="black">Experiment</Text>
          </>
      )}
    </Svg>
  );
};

export default Building5253InteractiveMap;