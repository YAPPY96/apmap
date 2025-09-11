import React from 'react';
import { G, Path, Rect, Text, Use } from 'react-native-svg';

interface Floor1Props {
  onRoomClick: (roomId: string) => void;
}

const Floor1: React.FC<Floor1Props> = ({ onRoomClick }) => (
  <G transform="translate(-42.44064,-5.7395811)">
    <G onPress={() => onRoomClick('room5215')}>
      <Rect
        style={{ display: 'inline', fill: 'none', stroke: '#000000', strokeWidth: 0.322803, strokeDasharray: 'none', strokeOpacity: 1 }}
        width="25.12409"
        height="38.642792"
        x="75.874702"
        y="87.31913"
        transform="rotate(7.2102665)"
      />
      <Text x="88.436747" y="106.640526" fontSize="8" textAnchor="middle" dominantBaseline="middle" fill="black" transform="rotate(7.2102665, 88.436747, 106.640526)">5215</Text>
    </G>
    <G onPress={() => onRoomClick('room5214')}>
        <Rect
            style={{ fill: 'none', stroke: '#000000', strokeWidth: 0.269559, strokeDasharray: 'none', strokeOpacity: 1 }}
            width="34.247494"
            height="56.43816"
            x="69.423828"
            y="124.9901"
            transform="matrix(0.99022253,0.13949672,-0.14414243,0.98955695,0,0)"
        />
        <Text x="86.547575" y="153.20918" fontSize="8" textAnchor="middle" dominantBaseline="middle" fill="black" transform="matrix(0.99022253,0.13949672,-0.14414243,0.98955695,0,0)">5214</Text>
    </G>
    <G onPress={() => onRoomClick('room5216')}>
        <Rect
            style={{ fill: 'none', stroke: '#000000', strokeWidth: 0.256059, strokeDasharray: 'none', strokeOpacity: 1 }}
            width="25.742666"
            height="37.186043"
            x="102.62242"
            y="129.79166"
            transform="matrix(0.99473062,0.1025231,-0.09362505,0.99560753,0,0)"
        />
        <Text x="115.493753" y="148.3846815" fontSize="8" textAnchor="middle" dominantBaseline="middle" fill="black" transform="matrix(0.99473062,0.1025231,-0.09362505,0.99560753,0,0)">5216</Text>
    </G>
    <G onPress={() => onRoomClick('room5217')}>
        <Rect
            style={{ fill: 'none', stroke: '#000000', strokeWidth: 0.256059, strokeDasharray: 'none', strokeOpacity: 1 }}
            width="25.742666"
            height="37.186043"
            x="104.03499"
            y="91.198982"
            transform="matrix(0.99381649,0.11103508,-0.10214486,0.99476953,0,0)"
        />
        <Text x="116.906323" y="109.7920035" fontSize="8" textAnchor="middle" dominantBaseline="middle" fill="black" transform="matrix(0.99381649,0.11103508,-0.10214486,0.99476953,0,0)">5217</Text>
    </G>
    <G onPress={() => onRoomClick('room5218')}>
        <Rect
            style={{ fill: 'none', stroke: '#000000', strokeWidth: 0.256059, strokeDasharray: 'none', strokeOpacity: 1 }}
            width="25.743"
            height="37.186043"
            x="103.3269"
            y="55.171337"
            transform="matrix(0.99473062,0.1025231,-0.09362505,0.99560753,0,0)"
        />
        <Text x="116.1984" y="73.7643585" fontSize="8" textAnchor="middle" dominantBaseline="middle" fill="black" transform="matrix(0.99473062,0.1025231,-0.09362505,0.99560753,0,0)">5218</Text>
    </G>
    <G onPress={() => onRoomClick('roomYUME')}>
        <Rect
            style={{ fill: 'none', stroke: '#000000', strokeWidth: 0.307063, strokeDasharray: 'none', strokeOpacity: 1 }}
            width="83.281769"
            height="35.823227"
            x="138.54341"
            y="-12.367796"
            transform="matrix(0.99141744,0.13073434,-0.16354992,0.98653506,0,0)"
        />
        <Text x="180.1842945" y="5.5438175" fontSize="10" textAnchor="middle" dominantBaseline="middle" fill="black" transform="matrix(0.99141744,0.13073434,-0.16354992,0.98653506,0,0)">YUME</Text>
    </G>
    <G onPress={() => onRoomClick('toiletW')}>
        <Rect
            style={{ fill: '#ff0000', stroke: '#000000', strokeWidth: 0.264999, strokeDasharray: 'none', strokeOpacity: 1 }}
            width="19.085226"
            height="11.398121"
            x="71.834183"
            y="72.384811"
            transform="rotate(4.4352277)"
        />
    </G>
    <G onPress={() => onRoomClick('toiletM')}>
        <Rect
            style={{ fill: '#0000ff', stroke: '#000000', strokeWidth: 0.264999, strokeDasharray: 'none', strokeOpacity: 1 }}
            width="19.085226"
            height="11.398121"
            x="71.834183"
            y="60.721615"
            transform="rotate(4.4352277)"
        />
    </G>
    <G onPress={() => onRoomClick('scienceExperiment')}>
        <Rect
            style={{ fill: 'none', stroke: '#000000', strokeWidth: 0.423691, strokeDasharray: 'none', strokeOpacity: 1 }}
            width="53.445843"
            height="89.346237"
            x="229.99072"
            y="80.167877"
            transform="matrix(0.99518102,0.09805476,-0.10148965,0.9948366,0,0)"
        />
        <Text x="256.7136415" y="124.8409955" fontSize="8" textAnchor="middle" dominantBaseline="middle" fill="black" transform="matrix(0.99518102,0.09805476,-0.10148965,0.9948366,0,0)">Science</Text>
        <Text x="256.7136415" y="134.8409955" fontSize="8" textAnchor="middle" dominantBaseline="middle" fill="black" transform="matrix(0.99518102,0.09805476,-0.10148965,0.9948366,0,0)">Experiment</Text>
    </G>
    <G onPress={() => onRoomClick('toiletW2')}>
        <Rect
            style={{ fill: '#ff0000', stroke: '#000000', strokeWidth: 0.264999, strokeDasharray: 'none', strokeOpacity: 1 }}
            width="19.085226"
            height="11.398121"
            x="264.03445"
            y="-67.913925"
            transform="matrix(0.99519789,0.09788342,0.09788342,-0.99519789,0,0)"
        />
    </G>
    <G onPress={() => onRoomClick('toiletM2')}>
        <Rect
            style={{ display: 'inline', fill: '#0000ff', stroke: '#000000', strokeWidth: 0.264999, strokeDasharray: 'none', strokeOpacity: 1 }}
            width="19.085226"
            height="11.398121"
            x="264.03445"
            y="-79.577126"
            transform="matrix(0.9951979,0.09788342,0.09788342,-0.9951979,0,0)"
        />
    </G>
    <Path d="m 261.24131,99.44723 c 0.0692,-0.901449 -0.67893,-1.686651 -1.66879,-1.751377 -0.98985,-0.06473 -1.85057,0.61527 -1.91981,1.516719 -0.0692,0.901448 0.67894,1.686648 1.66879,1.751378 0.98986,0.0647 1.85057,-0.61527 1.91981,-1.51672 z m -2.9905,-0.195548 c 0.0461,-0.600512 0.62047,-1.054264 1.27988,-1.011146 0.6594,0.04312 1.15865,0.567072 1.11252,1.167585 -0.0461,0.600509 -0.62047,1.054259 -1.27987,1.011139 -0.65941,-0.0431 -1.15865,-0.567065 -1.11253,-1.167578 z m 3.39415,-1.146603 -0.20919,2.723411 c -0.0692,0.90145 0.67894,1.68665 1.66879,1.75138 l 4.78481,0.31287 0.0837,-1.08936 4.48575,0.29332 0.29286,-3.812775 -4.48576,-0.293323 0.0837,-1.089364 -4.7848,-0.312878 c -0.98985,-0.06473 -1.85057,0.615269 -1.91981,1.516719 z m 6.09458,-0.696314 -0.0418,0.544683 -3.91756,-0.256168 -0.0418,0.544682 8.40331,0.549492 -0.0837,1.089364 -4.51566,-0.295277 -0.0418,0.544679 4.51565,0.29528 -0.0837,1.08936 -8.40331,-0.54949 -0.0418,0.54469 3.91756,0.25616 -0.0418,0.54469 -4.21661,-0.27573 c -0.6594,-0.0431 -1.15865,-0.56707 -1.11252,-1.16758 l 0.20918,-2.723412 c 0.0461,-0.600511 0.62047,-1.054265 1.27988,-1.011146 z" style={{ strokeWidth:0.0143049 }} onPress={() => onRoomClick('toiletM')} />
    <Path d="m 71.854361,72.524062 c 0.06924,-0.901449 -0.678934,-1.686651 -1.66879,-1.751377 -0.989856,-0.06473 -1.850572,0.61527 -1.919812,1.516719 -0.06924,0.90145 0.678934,1.686651 1.66879,1.751377 0.989856,0.06473 1.850572,-0.615269 1.919812,-1.516719 z M 68.86386,72.328514 c 0.04613,-0.600512 0.620468,-1.054264 1.279874,-1.011146 0.659405,0.04312 1.158651,0.567072 1.112526,1.167585 -0.04613,0.600513 -0.620469,1.054264 -1.279874,1.011146 -0.659406,-0.04312 -1.158652,-0.567072 -1.112526,-1.167585 z m 3.394144,-1.146603 -0.209185,2.723413 c -0.06924,0.901449 0.678935,1.68665 1.668791,1.751377 l 4.784803,0.312877 0.08367,-1.089365 4.485753,0.293323 0.29286,-3.812779 -4.485754,-0.293323 0.08367,-1.089364 -4.784803,-0.312878 c -0.989856,-0.06473 -1.850572,0.615269 -1.919813,1.516719 z m 6.094585,-0.696314 -0.04184,0.544683 -3.917559,-0.256168 -0.04184,0.544682 8.403312,0.549492 -0.08367,1.089364 -4.515659,-0.295277 -0.04183,0.544682 4.515658,0.295278 -0.08367,1.089365 -8.403312,-0.54949 -0.04184,0.544683 3.917559,0.256167 -0.04184,0.544683 -4.216609,-0.275723 c -0.659405,-0.04312 -1.158651,-0.567072 -1.112526,-1.167584 l 0.209185,-2.723414 c 0.04613,-0.600511 0.620469,-1.054265 1.279875,-1.011146 z" style={{ strokeWidth:0.0143049 }} onPress={() => onRoomClick('toiletM')} />
    <Use transform="translate(191.17077,4.0991784)" href="#path1-8" onPress={() => onRoomClick('toiletW2')} />
  </G>
);

export default Floor1;
