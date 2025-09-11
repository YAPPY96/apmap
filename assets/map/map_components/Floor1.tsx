import React from 'react';
import { G, Rect } from 'react-native-svg';

interface Floor1Props {
  onRoomClick: (roomId: string) => void;
}

const Floor1: React.FC<Floor1Props> = ({ onRoomClick }) => (
  <G>
    <Rect
      style={{ display: 'inline', fill: 'none', stroke: '#000000', strokeWidth: 0.322803, strokeDasharray: 'none', strokeOpacity: 1 }}
      id="rect40"
      width="25.12409"
      height="38.642792"
      x="75.874702"
      y="87.31913"
      transform="rotate(7.2102665)"
      onPress={() => onRoomClick('room5215')}
    />
    <Rect
      style={{ fill: 'none', stroke: '#000000', strokeWidth: 0.269559, strokeDasharray: 'none', strokeOpacity: 1 }}
      id="rect41"
      width="34.247494"
      height="56.43816"
      x="69.423828"
      y="124.9901"
      transform="matrix(0.99022253,0.13949672,-0.14414243,0.98955695,0,0)"
      onPress={() => onRoomClick('room5214')}
    />
    <Rect
      style={{ fill: 'none', stroke: '#000000', strokeWidth: 0.256059, strokeDasharray: 'none', strokeOpacity: 1 }}
      id="rect42"
      width="25.742666"
      height="37.186043"
      x="102.62242"
      y="129.79166"
      transform="matrix(0.99473062,0.1025231,-0.09362505,0.99560753,0,0)"
      onPress={() => onRoomClick('room5216')}
    />
    <Rect
      style={{ fill: 'none', stroke: '#000000', strokeWidth: 0.256059, strokeDasharray: 'none', strokeOpacity: 1 }}
      id="rect43"
      width="25.742666"
      height="37.186043"
      x="104.03499"
      y="91.198982"
      transform="matrix(0.99381649,0.11103508,-0.10214486,0.99476953,0,0)"
      onPress={() => onRoomClick('room5217')}
    />
    <Rect
      style={{ fill: 'none', stroke: '#000000', strokeWidth: 0.256059, strokeDasharray: 'none', strokeOpacity: 1 }}
      id="room5218"
      width="25.743"
      height="37.186043"
      x="103.3269"
      y="55.171337"
      transform="matrix(0.99473062,0.1025231,-0.09362505,0.99560753,0,0)"
      onPress={() => onRoomClick('room5218')}
    />
    <Rect
      style={{ fill: 'none', stroke: '#000000', strokeWidth: 0.307063, strokeDasharray: 'none', strokeOpacity: 1 }}
      id="rect44"
      width="83.281769"
      height="35.823227"
      x="138.54341"
      y="-12.367796"
      transform="matrix(0.99141744,0.13073434,-0.16354992,0.98653506,0,0)"
      onPress={() => onRoomClick('roomYUME')}
    />
    <Rect
      style={{ fill: '#ff0000', stroke: '#000000', strokeWidth: 0.264999, strokeDasharray: 'none', strokeOpacity: 1 }}
      id="rect45"
      width="19.085226"
      height="11.398121"
      x="71.834183"
      y="72.384811"
      transform="rotate(4.4352277)"
      onPress={() => onRoomClick('toiletW')}
    />
    <Rect
      style={{ fill: '#0000ff', stroke: '#000000', strokeWidth: 0.264999, strokeDasharray: 'none', strokeOpacity: 1 }}
      id="rect46"
      width="19.085226"
      height="11.398121"
      x="71.834183"
      y="60.721615"
      transform="rotate(4.4352277)"
      onPress={() => onRoomClick('toiletM')}
    />
    <Rect
      style={{ fill: 'none', stroke: '#000000', strokeWidth: 0.423691, strokeDasharray: 'none', strokeOpacity: 1 }}
      id="rect47"
      width="53.445843"
      height="89.346237"
      x="229.99072"
      y="80.167877"
      transform="matrix(0.99518102,0.09805476,-0.10148965,0.9948366,0,0)"
      onPress={() => onRoomClick('scienceExperiment')}
    />
    <Rect
      style={{ fill: '#ff0000', stroke: '#000000', strokeWidth: 0.264999, strokeDasharray: 'none', strokeOpacity: 1 }}
      id="rect48"
      width="19.085226"
      height="11.398121"
      x="264.03445"
      y="-67.913925"
      transform="matrix(0.99519789,0.09788342,0.09788342,-0.99519789,0,0)"
      onPress={() => onRoomClick('toiletW2')}
    />
    <Rect
      style={{ display: 'inline', fill: '#0000ff', stroke: '#000000', strokeWidth: 0.264999, strokeDasharray: 'none', strokeOpacity: 1 }}
      id="rect49"
      width="19.085226"
      height="11.398121"
      x="264.03445"
      y="-79.577126"
      transform="matrix(0.9951979,0.09788342,0.09788342,-0.9951979,0,0)"
      onPress={() => onRoomClick('toiletM2')}
    />
  </G>
);

export default Floor1;
