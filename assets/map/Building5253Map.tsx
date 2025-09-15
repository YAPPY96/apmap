import React from 'react';
import { View } from 'react-native';
// G, Use, Rect, Text などのコンポーネントをreact-native-svgからインポートします
import Svg, { G, Rect, SvgXml, Text, Use } from 'react-native-svg';

interface Building5253InteractiveMapProps {
  width: number;
  height: number;
  floor: number;
  onRoomClick: (roomId: string) => void;
}

// 他のフロアやベースマップの文字列定数はそのまま（省略）
const BASE_MAP_LAYERS = `...`;
const FLOOR1_LAYERS = `...`;
const FLOOR2_LAYERS = `...`;


// --- 3階のレイヤーをJSXコンポーネントとして定義 ---
const Floor3LayersComponent = ({ onRoomClick }: { onRoomClick: (roomId: string) => void }) => {
  return (
    <>
      <G id="layer2" transform="translate(-30.734127,-32.670969)">
        <Rect
          id="rect8-11"
          style={{ display: 'inline', fill: 'none', stroke: '#000000', strokeWidth: 0.204121 }}
          width="37.322193"
          height="29.387085"
          x="79.948952"
          y="-121.81734"
          transform="matrix(-0.10388011,0.99458983,-0.99388592,-0.11041188,0,0)"
        />
        <Rect
          id="rect8-1-8"
          style={{ display: 'inline', fill: 'none', stroke: '#000000', strokeWidth: 0.204121 }}
          width="37.322193"
          height="29.387085"
          x="117.50832"
          y="-121.81734"
          transform="matrix(-0.10388011,0.99458983,-0.99388592,-0.11041188,0,0)"
        />
        <Rect
          id="rect12"
          style={{ fill: 'none', stroke: '#000000', strokeWidth: 0.450243 }}
          width="34.469261"
          height="54.078918"
          x="61.624931"
          y="159.04204"
          transform="matrix(0.9874081,0.15819367,-0.13736474,0.99052053,0,0)"
        />
      </G>
      <G id="layer4" style={{ display: 'inline' }} transform="translate(-31.358239,-37.391981)">
        <Use id="room5238" xlinkHref="#rect8-11" transform="translate(0.03779761,0.22678572)" onPress={() => onRoomClick('room5238')} />
        <Use id="room5234" xlinkHref="#rect12" transform="translate(0.03779761,0.22678572)" onPress={() => onRoomClick('room5234')} />
        
        {/* ▼▼▼ ここがターゲットの部屋です ▼▼▼ */}
        <Use
          id="room5232"
          xlinkHref="#use20-4" // このidはSVG内で定義されている必要があります
          transform="translate(38.285682,4.7163511)"
          onPress={() => onRoomClick('room5232')}
        />
        {/* ▲▲▲ onPressイベントを追加しました ▲▲▲ */}

        <Use id="room5231" xlinkHref="#use20-4" transform="translate(76.571361,9.4327016)" style={{ display: 'inline' }} onPress={() => onRoomClick('room5231')} />
        <Use id="roomGeographycal" xlinkHref="#use20-4" transform="translate(114.85704,14.149051)" style={{ display: 'inline' }} onPress={() => onRoomClick('roomGeographycal')} />
        
        {/* 他のテキストや図形要素も同様にJSX形式で記述... */}
        <Text x="158.98779" y="65.218056" fill="#000000" fontSize="10.5833" stroke="#000000" strokeWidth="0.262">5232</Text>
        <Text x="200.16234" y="68.524033" fill="#000000" fontSize="10.5833" stroke="#000000" strokeWidth="0.262">5231</Text>
        {/* ...以下、FLOOR3_LAYERSの他の要素を同様に変換 ... */}
      </G>
    </>
  );
};


const Building5253InteractiveMap: React.FC<Building5253InteractiveMapProps> = ({ 
  width, 
  height,
  floor,
  onRoomClick
}) => {
  const renderFloor = () => {
    switch (floor) {
      case 1:
        return <SvgXml xml={FLOOR1_LAYERS} width="100%" height="100%" />;
      case 2:
        return <SvgXml xml={FLOOR2_LAYERS} width="100%" height="100%" />;
      case 3:
        // 3階の場合は、新しく作成したJSXコンポーネントを返す
        return <Floor3LayersComponent onRoomClick={onRoomClick} />;
      default:
        return null;
    }
  };

  const handleContainerPress = (event: any) => {
    const targetId = (event.target as any)?.id;
    if (targetId && typeof targetId === 'string' && targetId.startsWith('room')) {
      console.log('Pressed room ID (from parent Svg):', targetId);
      // ここでのonRoomClickはJSXコンポーネント内で直接指定するため、通常は不要になる
      // onRoomClick(targetId);
    }
  };

  return (
    <View style={{ width, height, backgroundColor: '#f0f0f0' }}>
      <Svg 
        width={width} 
        height={height} 
        viewBox="0 0 256.27295 199.79301"
        // onPress={handleContainerPress} // 個別要素でイベントを拾うため、親での補足は任意
      >
        {/* ベースマップのレイヤーを常に表示 */}
        <SvgXml
          xml={BASE_MAP_LAYERS}
          width="100%"
          height="100%"
        />
        
        {/* 選択された階のレイヤーを重ねて表示 */}
        {renderFloor()}
      </Svg>
    </View>
  );
};

export default Building5253InteractiveMap;