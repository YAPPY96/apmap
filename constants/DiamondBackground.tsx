// DiamondBackground.tsx
import React from 'react';
import { Dimensions } from 'react-native';
import Svg, { Defs, Pattern, Polygon, Rect } from 'react-native-svg';
import { Colors } from './Colors';

const { width, height } = Dimensions.get('window');

export default function DiamondBackground() {
  return (
    <Svg width={width} height={height}>
      <Defs>
        <Pattern
          id="diamondPattern"
          patternUnits="userSpaceOnUse"
          width="80"
          height="80"
        >
          <Rect width="80" height="80" fill={Colors.light.background} />
          <Polygon
            points="20,0 40,20 20,40 0,20"
            fill="#F0990A"
          />
          <Polygon
            points="60,0 80,20 60,40 40,20"
            fill="#00A3AF"
          />
           <Polygon
            points="20,40 40,60 20,80 0,60"
            fill="#00A3AF"
          />
          <Polygon
            points="60,40 80,60 60,80 40,60"
            fill="#F0990A"
          />
        </Pattern>
      </Defs>
      <Rect width={width} height={height} fill="url(#diamondPattern)" />
    </Svg>
  );
}
