import React from 'react';
import { G, Path, Rect, Ellipse, Use, Text } from 'react-native-svg';

interface Props {
  onRoomClick: (roomId: string) => void;
}

export const Floor2 = ({ onRoomClick }: Props) => (
  <>
    <G id="layer2" transform="translate(-30.734127,-32.670969)">
      <Rect
        fill="none"
        stroke="#000000"
        strokeWidth="0.423761"
        strokeDasharray="none"
        strokeOpacity="1"
        id="rect47"
        width="53.658237"
        height="89.021782"
        x="224.72281"
        y="103.418"
        transform="matrix(0.98915098,0.14690247,-0.12129198,0.99261687,0,0)"
      />
      <Ellipse
        fill="none"
        stroke="#ed5a5a"
        strokeWidth="1.67032"
        strokeDasharray="none"
        strokeOpacity="1"
        id="path3-1"
        cx="222.72446"
        cy="133.73938"
        rx="7.6046557"
        ry="7.0461068"
      />
      <Path
        fill="none"
        stroke="#ed5a5a"
        strokeWidth="1.67033"
        strokeDasharray="none"
        strokeOpacity="1"
        d="m 229.49273,129.65329 -12.39313,8.42097"
        id="path4-6"
      />
      <Path
        fill="none"
        stroke="#ed5a5a"
        strokeWidth="1.67033"
        strokeDasharray="none"
        strokeOpacity="1"
        d="M 229.48694,137.87346 217.46937,129.4525"
        id="path5-8"
      />
      <Rect
        fill="none"
        stroke="#000000"
        strokeWidth="0.204121"
        id="rect8-11"
        width="37.322193"
        height="29.387085"
        x="79.948952"
        y="-121.81734"
        transform="matrix(-0.10388011,0.99458983,-0.99388592,-0.11041188,0,0)"
      />
      <Rect
        fill="none"
        stroke="#000000"
        strokeWidth="0.204121"
        id="rect8-1-8"
        width="37.322193"
        height="29.387085"
        x="117.50832"
        y="-121.81734"
        transform="matrix(-0.10388011,0.99458983,-0.99388592,-0.11041188,0,0)"
      />
      <Rect
        fill="none"
        stroke="#000000"
        strokeWidth="0.450243"
        id="rect12"
        width="34.469261"
        height="54.078918"
        x="61.624931"
        y="159.04204"
        transform="matrix(0.9874081,0.15819367,-0.13736474,0.99052053,0,0)"
      />
    </G>
    <G id="layer3" transform="translate(-30.734127,-32.670969)">
      <Use href="#rect8-11" id="room5228" onPress={() => onRoomClick('room5228')} />
      <Use href="#rect8-7-3" id="use14" />
      <Use href="#rect47" id="use22" />
      <Use href="#path3-1" id="use24" />
      <Use href="#path4-6" id="use25" />
      <Use href="#path5-8" id="use26" />
      <Use href="#rect8-1-8" id="room5227" onPress={() => onRoomClick('room5227')} />
      <Use href="#rect12" id="room5224" onPress={() => onRoomClick('room5224')} />
      <Use href="#rect13" id="use17" />
      <Use
        href="#use14"
        id="use19"
        transform="matrix(-0.0401572,-0.99776981,1.3650484,0.05976607,-4.293777,145.00308)"
      />
      <Text
        xmlSpace="preserve"
        style={{
          fontSize: '10.5833px',
          lineHeight: 0,
          textAlign: 'start',
          writingMode: 'lr-tb',
          direction: 'ltr',
          textAnchor: 'start',
          fill: '#ffffff',
          fillOpacity: 1,
          stroke: '#000000',
          strokeWidth: 0.262,
          strokeOpacity: 1,
        }}
        x="152.73608"
        y="136.24191"
        id="text26"
      >
        <Text id="tspan26" stroke="#000000" strokeWidth="0.262" strokeOpacity={1} x="152.73608" y="136.24191" />
      </Text>
      <Text
        xmlSpace="preserve"
        style={{
          fontSize: '10.5833px',
          lineHeight: 0,
          textAlign: 'start',
          writingMode: 'lr-tb',
          direction: 'ltr',
          textAnchor: 'start',
          fill: '#000000',
          fillOpacity: 0,
          stroke: '#000000',
          strokeWidth: 0.262,
          strokeOpacity: 1,
        }}
        x="154.3855"
        y="127.99483"
        id="text27"
      >
        <Text id="tspan27" fill="#000000" fillOpacity={0} strokeWidth="0.262" x="154.3855" y="127.99483" />
      </Text>
      <Text
        xmlSpace="preserve"
        style={{
          fontSize: '10.5833px',
          lineHeight: 0,
          textAlign: 'start',
          writingMode: 'lr-tb',
          direction: 'ltr',
          textAnchor: 'start',
          whiteSpace: 'pre',
          fill: '#000000',
          fillOpacity: 0.991507,
          stroke: '#000000',
          strokeWidth: 0.262,
          strokeOpacity: 1,
        }}
        x="141.81667"
        y="143.40416"
        id="text28"
        transform="translate(89.562126,-71.529483)"
      >
        <Text x="141.81667" y="143.40416" id="tspan2-1">
          5221
        </Text>
      </Text>
      <Text
        xmlSpace="preserve"
        style={{
          fontSize: '10.5833px',
          lineHeight: 0,
          textAlign: 'start',
          writingMode: 'lr-tb',
          direction: 'ltr',
          textAnchor: 'start',
          whiteSpace: 'pre',
          fill: '#000000',
          fillOpacity: 0.991507,
          stroke: '#000000',
          strokeWidth: 0.262,
          strokeOpacity: 1,
        }}
        x="141.81667"
        y="143.40416"
        id="text28-8"
        transform="translate(36.345193,-77.669894)"
      >
        <Text x="141.81667" y="143.40416" id="tspan3-1">
          5222
        </Text>
      </Text>
      <Text
        xmlSpace="preserve"
        style={{
          fontSize: '10.5833px',
          lineHeight: 0,
          textAlign: 'start',
          writingMode: 'lr-tb',
          direction: 'ltr',
          textAnchor: 'start',
          whiteSpace: 'pre',
          fill: '#000000',
          fillOpacity: 0.991507,
          stroke: '#000000',
          strokeWidth: 0.262,
          strokeOpacity: 1,
        }}
        x="141.81667"
        y="143.40416"
        id="text28-3"
        transform="translate(-12.622785,-83.172096)"
      >
        <Text x="141.81667" y="143.40416" id="tspan4-1">
          5223
        </Text>
      </Text>
      <Text
        xmlSpace="preserve"
        style={{
          fontSize: '10.5833px',
          lineHeight: 0,
          textAlign: 'start',
          writingMode: 'lr-tb',
          direction: 'ltr',
          textAnchor: 'start',
          whiteSpace: 'pre',
          fill: '#000000',
          fillOpacity: 0.942675,
          stroke: '#000000',
          strokeWidth: 0.262,
          strokeOpacity: 1,
        }}
        x="141.81667"
        y="143.40416"
        id="text28-0"
        transform="translate(-59.056276,-28.249259)"
      >
        <Text x="141.81667" y="143.40416" id="tspan5-1">
          5228
        </Text>
      </Text>
      <Text
        xmlSpace="preserve"
        style={{
          fontSize: '10.5833px',
          lineHeight: 0,
          textAlign: 'start',
          writingMode: 'lr-tb',
          direction: 'ltr',
          textAnchor: 'start',
          whiteSpace: 'pre',
          fill: '#000000',
          fillOpacity: 0.942675,
          stroke: '#000000',
          strokeWidth: 0.262,
          strokeOpacity: 1,
        }}
        x="141.81667"
        y="143.40416"
        id="text28-6"
        transform="translate(-62.493245,10.11271)"
      >
        <Text x="141.81667" y="143.40416" id="tspan6-1">
          5227
        </Text>
      </Text>
      <Text
        xmlSpace="preserve"
        style={{
          fontSize: '10.5833px',
          lineHeight: 0,
          textAlign: 'start',
          writingMode: 'lr-tb',
          direction: 'ltr',
          textAnchor: 'start',
          whiteSpace: 'pre',
          fill: '#000000',
          fillOpacity: 0.942675,
          stroke: '#000000',
          strokeWidth: 0.262,
          strokeOpacity: 1,
        }}
        x="141.81667"
        y="143.40416"
        id="text28-5"
        transform="translate(-67.052842,46.697126)"
      >
        <Text x="141.81667" y="143.40416" id="tspan7-1">
          5226
        </Text>
      </Text>
      <Text
        xmlSpace="preserve"
        style={{
          fontSize: '10.5833px',
          lineHeight: 0,
          textAlign: 'start',
          writingMode: 'lr-tb',
          direction: 'ltr',
          textAnchor: 'start',
          whiteSpace: 'pre',
          fill: '#000000',
          fillOpacity: 0.942675,
          stroke: '#000000',
          strokeWidth: 0.262,
          strokeOpacity: 1,
        }}
        x="141.81667"
        y="143.40416"
        id="text28-1"
        transform="translate(-104.30264,57.342143)"
      >
        <Text x="141.81667" y="143.40416" id="tspan8-1">
          5224
        </Text>
      </Text>
      <Text
        xmlSpace="preserve"
        style={{
          fontSize: '10.5833px',
          lineHeight: 0,
          textAlign: 'start',
          writingMode: 'lr-tb',
          direction: 'ltr',
          textAnchor: 'start',
          whiteSpace: 'pre',
          fill: '#000000',
          fillOpacity: 0.942675,
          stroke: '#000000',
          strokeWidth: 0.262,
          strokeOpacity: 1,
        }}
        x="141.81667"
        y="143.40416"
        id="text28-7"
        transform="matrix(0.90489734,0,0,1.0384981,-78.528471,8.3684706)"
      >
        <Text x="141.81667" y="143.40416" id="tspan9-1">
          5225
        </Text>
      </Text>
      <Use href="#rect8-1-8" id="use42" transform="translate(-3.8208249,37.285982)" />
      <Use href="#rect8-1-8" id="room5226" transform="translate(-3.8208249,37.285982)" onPress={() => onRoomClick('room5226')} />
      <Use
        href="#rect8-1-8"
        id="room5225"
        transform="matrix(0.84169439,0,0,0.86698882,-15.53869,25.139296)"
        onPress={() => onRoomClick('room5225')}
      />
      <Rect
        fill="none"
        fillOpacity="0.96603"
        stroke="#000000"
        strokeWidth="0.336078"
        strokeOpacity="1"
        id="room5223"
        width="51.002026"
        height="29.376703"
        x="122.88304"
        y="22.366896"
        transform="matrix(0.99194019,0.12670701,-0.13254675,0.99117675,0,0)"
        onPress={() => onRoomClick('room5223')}
      />
      <Rect
        fill="none"
        fillOpacity="0.96603"
        stroke="#000000"
        strokeWidth="0.336078"
        strokeOpacity="1"
        id="room5222"
        width="51.002026"
        height="29.376703"
        x="174.31709"
        y="22.366896"
        transform="matrix(0.99194019,0.12670701,-0.13254675,0.99117675,0,0)"
        onPress={() => onRoomClick('room5222')}
      />
      <Rect
        fill="none"
        fillOpacity="0.96603"
        stroke="#000000"
        strokeWidth="0.336078"
        strokeOpacity="1"
        id="room5221"
        width="51.002026"
        height="29.376703"
        x="225.75113"
        y="22.366896"
        transform="matrix(0.99194019,0.12670701,-0.13254675,0.99117675,0,0)"
        onPress={() => onRoomClick('room5221')}
      />
    </G>
  </>
);
