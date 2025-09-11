import React from 'react';
import { G, Rect, Use } from 'react-native-svg';

interface Floor3Props {
  onRoomClick: (roomId: string) => void;
}

const Floor3: React.FC<Floor3Props> = ({ onRoomClick }) => (
  <G>
    <Rect
      style={{ display: 'inline', fill: 'none', stroke: '#000000', strokeWidth: 0.322803, strokeDasharray: 'none', strokeOpacity: 1 }}
      id="rect6"
      width="25.12409"
      height="38.642792"
      x="75.874702"
      y="87.31913"
      transform="rotate(7.2102665)"
      onPress={() => onRoomClick('room5235')}
    />
    <Rect
      style={{ display: 'inline', fill: '#0000ff', stroke: '#000000', strokeWidth: 0.264999, strokeDasharray: 'none', strokeOpacity: 1 }}
      id="rect12"
      width="19.085226"
      height="11.398121"
      x="71.834183"
      y="60.721615"
      transform="rotate(4.4352277)"
      onPress={() => onRoomClick('toiletM')}
    />
    <Rect
      style={{ display: 'inline', fill: '#ff0000', stroke: '#000000', strokeWidth: 0.264999, strokeDasharray: 'none', strokeOpacity: 1 }}
      id="rect11"
      width="19.085226"
      height="11.398121"
      x="71.834183"
      y="72.384811"
      transform="rotate(4.4352277)"
      onPress={() => onRoomClick('toiletW')}
    />
    <Rect
      style={{ display: 'inline', fill: 'none', stroke: '#000000', strokeWidth: 0.256059, strokeDasharray: 'none', strokeOpacity: 1 }}
      id="rect9"
      width="25.742666"
      height="37.186043"
      x="104.03499"
      y="91.198982"
      transform="matrix(0.99381649,0.11103508,-0.10214486,0.99476954,0,0)"
      onPress={() => onRoomClick('room5237')}
    />
    <Rect
      style={{ display: 'inline', fill: 'none', stroke: '#000000', strokeWidth: 0.256059, strokeDasharray: 'none', strokeOpacity: 1 }}
      id="rect10"
      width="25.743"
      height="37.186043"
      x="103.3269"
      y="55.171337"
      transform="matrix(0.99473062,0.1025231,-0.09362505,0.99560753,0,0)"
      onPress={() => onRoomClick('room5238')}
    />
    <Rect
      style={{ display: 'inline', fill: 'none', stroke: '#000000', strokeWidth: 0.269559, strokeDasharray: 'none', strokeOpacity: 1 }}
      id="rect7"
      width="34.247494"
      height="56.43816"
      x="69.423828"
      y="124.9901"
      transform="matrix(0.99022252,0.13949672,-0.14414243,0.98955696,0,0)"
      onPress={() => onRoomClick('room5234')}
    />
    <Rect
      style={{ display: 'inline', fill: 'none', stroke: '#000000', strokeWidth: 0.256059, strokeDasharray: 'none', strokeOpacity: 1 }}
      id="rect8"
      width="25.742666"
      height="37.186043"
      x="102.62242"
      y="129.79166"
      transform="matrix(0.99473062,0.1025231,-0.09362505,0.99560753,0,0)"
      onPress={() => onRoomClick('room5236')}
    />
    <Rect
      style={{ fill: 'none', stroke: '#000000', strokeWidth: 0.237736, strokeDasharray: 'none', strokeOpacity: 1 }}
      id="rect13"
      width="46.010616"
      height="29.032822"
      x="130.27162"
      y="-12.427628"
      transform="matrix(0.99088008,0.13474664,-0.10027397,0.99495986,0,0)"
      onPress={() => onRoomClick('room5233')}
    />
    <Rect
      style={{ display: 'inline', fill: 'none', stroke: '#000000', strokeWidth: 0.256842, strokeDasharray: 'none', strokeOpacity: 1 }}
      id="rect13-6"
      width="53.637047"
      height="29.068729"
      x="176.19325"
      y="-8.7486019"
      transform="matrix(0.99330546,0.11551741,-0.11703613,0.99312766,0,0)"
      onPress={() => onRoomClick('room5231')}
    />
    <Rect
      style={{ display: 'inline', fill: 'none', stroke: '#000000', strokeWidth: 0.256, strokeDasharray: 'none', strokeOpacity: 1 }}
      id="rect13-60"
      width="53.289318"
      height="29.0669"
      x="230.16882"
      y="-9.1982479"
      transform="rotate(6.6771334)"
      onPress={() => onRoomClick('geographicalExperiment')}
    />
    <Rect
      style={{ fill: '#e6e6e6', stroke: '#000000', strokeWidth: 0.246687, strokeDasharray: 'none', strokeOpacity: 1 }}
      id="rect14"
      width="25.596256"
      height="23.486427"
      x="44.565151"
      y="40.63969"
      onPress={() => onRoomClick('temporaryRestroom')}
    />
    <Rect
      style={{ fill: '#fefefe', fillOpacity: 1, stroke: '#000000', strokeWidth: 0.256, strokeDasharray: 'none', strokeOpacity: 1 }}
      id="rect27"
      width="72.075996"
      height="114.95689"
      x="216.98555"
      y="60.598282"
      transform="rotate(5.738345)"
      onPress={() => onRoomClick('blank')}
    />
    <Use
      xlinkHref="#rect13-6"
      transform="matrix(0.6468559,-0.04928736,0.00183406,1.0014473,47.01605,6.1956245)"
      onPress={() => onRoomClick('room5232')}
    />
  </G>
);

export default Floor3;
