import Building5253Map from '@/assets/map/Building5253Map';
import React from 'react';
import { Dimensions, View } from 'react-native';
import SvgPanZoom from 'react-native-svg-pan-zoom';

interface SvgWebViewProps {
  onRoomClick: (roomId: string) => void;
}

const SvgWebView: React.FC<SvgWebViewProps> = ({ onRoomClick }) => {
  const { width, height } = Dimensions.get('window');

  return (
    <View style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
      <SvgPanZoom
        canvasWidth={width}
        canvasHeight={height}
        minScale={0.5}
        maxScale={5}
        initialZoom={1}
        canvasStyle={{ backgroundColor: '#f0f0f0' }}
        viewStyle={{ backgroundColor: '#f0f0f0' }}
      >
        <Building5253Map 
          width={width} 
          height={height} 
          onRoomClick={onRoomClick}
        />
      </SvgPanZoom>
    </View>
  );
};

export default SvgWebView;
