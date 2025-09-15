import Building5253Map from '@/assets/map/Building5253Map';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

interface SvgWebViewProps {
  onRoomClick: (roomId: string) => void;
  width?: number;
  height?: number;
  floor?: number;
}

const SvgWebView: React.FC<SvgWebViewProps> = ({ 
  onRoomClick, 
  width: propWidth, 
  height: propHeight,
  floor = 1 
}) => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  
  // プロパティで指定された幅・高さを優先し、なければ画面サイズを使用
  const svgWidth = propWidth || screenWidth - 40; // 左右マージン考慮
  const svgHeight = propHeight || screenHeight * 0.6; // 画面高さの60%

  return (
    <View style={styles.container}>
      <View style={styles.svgContainer}>
        <Building5253Map 
          width={svgWidth} 
          height={svgHeight} 
          floor={floor}
          onRoomClick={onRoomClick}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default SvgWebView;