import React from 'react';
import { G, Rect, Text, Use } from 'react-native-svg';

interface Props {
  onRoomClick: (roomId: string) => void;
}

export const Floor3 = ({ onRoomClick }: Props) => (
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
        style={{ fill: '#f0f0f0', stroke: '#000000', strokeWidth: 0.450243 }}
        width="34.469261"
        height="54.078918"
        x="61.624931"
        y="159.04204"
        transform="matrix(0.9874081,0.15819367,-0.13736474,0.99052053,0,0)"
      />
    </G>
    <G id="layer4" style={{ display: 'inline' }} transform="translate(-30.734127, -32.670969)">
      <Use id="room5238" href="#rect8-11" transform="translate(0.03779761,0.22678572)" onPress={() => onRoomClick('room5238')} />
      <Use id="use14-0" href="#rect8-7-3" transform="translate(0.03779761,0.22678572)" />
      <Use id="use15-2" href="#rect8-1-8" transform="translate(0.03779761,0.22678572)" />
      <Use id="room5234" href="#rect12" transform="translate(0.03779761,0.22678572)" onPress={() => onRoomClick('room5234')} />
      <Use id="use17-6" href="#rect13" transform="translate(0.03779761,0.22678572)" />
      <Use
        id="use20-4"
        href="#use15-2"
        transform="matrix(-0.01136759,-0.99556715,1.0231724,0.03090695,-14.130773,141.89223)"
      />
      <Use id="room5232" href="#use20-4" transform="translate(38.285682,4.7163511)" onPress={() => onRoomClick('room5232')} />
      <Use id="room5231" href="#use20-4" transform="translate(76.571361,9.4327016)" onPress={() => onRoomClick('room5231')} />
      <Use id="roomGeographycal" href="#use20-4" transform="translate(114.85704,14.149051)" onPress={() => onRoomClick('roomGeographycal')} />
      <Rect
        id="rect21"
        style={{ fill: 'none', fillOpacity: 1, stroke: 'none', strokeWidth: 0.0 }}
        width="67.034912"
        height="123.94749"
        x="208.83447"
        y="98.623817"
        transform="matrix(0.99287917,0.11912581,-0.07334671,0.9973065,0,0)"
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
          fill: '#000000',
          fillOpacity: 0.942675,
          stroke: '#000000',
          strokeWidth: 0.262,
          strokeOpacity: 1,
        }}
        x="200.16234"
        y="68.524033"
        id="text29"
      >
        <Text id="tspan29" style={{ strokeWidth: 0.262 }} x="200.16234" y="68.524033">
          5231
        </Text>
        <Text style={{ strokeWidth: 0.262 }} x="200.16234" y="68.524033" id="tspan30" />
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
          fillOpacity: 0.942675,
          stroke: '#000000',
          strokeWidth: 0.262,
          strokeOpacity: 1,
        }}
        x="158.98779"
        y="65.218056"
        id="text31"
      >
        <Text id="tspan31" style={{ strokeWidth: 0.262 }} x="158.98779" y="65.218056">
          5232
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
          fill: '#000000',
          fillOpacity: 0.942675,
          stroke: '#000000',
          strokeWidth: 0.262,
          strokeOpacity: 1,
        }}
        x="122.62196"
        y="61.310978"
        id="text32"
      >
        <Text id="tspan32" style={{ strokeWidth: 0.262 }} x="122.62196" y="61.310978">
          5233
        </Text>
      </Text>
      <Text
        xmlSpace="preserve"
        style={{
          fontSize: '15.246px',
          lineHeight: 0,
          textAlign: 'start',
          writingMode: 'lr-tb',
          direction: 'ltr',
          textAnchor: 'start',
          fill: '#000000',
          fillOpacity: 0.942675,
          stroke: '#000000',
          strokeWidth: 0.377427,
          strokeOpacity: 1,
        }}
        x="46.072609"
        y="160.85521"
        id="text36"
        transform="scale(0.77762834,1.2859614)"
      >
        <Text id="tspan36" style={{ strokeWidth: 0.377427 }} x="46.072609" y="160.85521">
          5234
        </Text>
      </Text>
      <Text
        xmlSpace="preserve"
        style={{
          fontSize: '11.4668px',
          lineHeight: 0,
          textAlign: 'start',
          writingMode: 'lr-tb',
          direction: 'ltr',
          textAnchor: 'start',
          fill: '#000000',
          fillOpacity: 0.942675,
          stroke: '#000000',
          strokeWidth: 0.283871,
          strokeOpacity: 1,
        }}
        x="76.01535"
        y="107.46097"
        id="text37"
        transform="scale(0.67645493,1.4782951)"
      >
        <Text id="tspan37" style={{ strokeWidth: 0.283871 }} x="76.01535" y="107.46097">
          5235
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
          fill: '#000000',
          fillOpacity: 0.942675,
          stroke: '#000000',
          strokeWidth: 0.262,
          strokeOpacity: 1,
        }}
        x="75.136017"
        y="189.94383"
        id="text38"
      >
        <Text id="tspan38" style={{ strokeWidth: 0.262 }} x="75.136017" y="189.94383">
          5236
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
          fill: '#000000',
          fillOpacity: 0.942675,
          stroke: '#000000',
          strokeWidth: 0.262,
          strokeOpacity: 1,
        }}
        x="79.343636"
        y="150.87311"
        id="text39"
      >
        <Text id="tspan39" style={{ strokeWidth: 0.262 }} x="79.343636" y="150.87311">
          5237
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
          fill: '#000000',
          fillOpacity: 0.942675,
          stroke: '#000000',
          strokeWidth: 0.262,
          strokeOpacity: 1,
        }}
        x="83.250694"
        y="114.20673"
        id="text40"
      >
        <Text id="tspan40" style={{ strokeWidth: 0.262 }} x="83.250694" y="114.20673">
          5238
        </Text>
      </Text>
      <Text
        xmlSpace="preserve"
        style={{
          fontSize: '9.93855px',
          lineHeight: 0,
          textAlign: 'start',
          writingMode: 'lr-tb',
          direction: 'ltr',
          textAnchor: 'start',
          fill: '#000000',
          fillOpacity: 0.942675,
          stroke: '#000000',
          strokeWidth: 0.246039,
          strokeOpacity: 1,
        }}
        x="309.2374"
        y="55.708508"
        id="text41"
        transform="scale(0.7498534,1.333594)"
      >
        <Text id="tspan41" style={{ strokeWidth: 0.246039 }} x="309.2374" y="55.708508">
          地学実験室
        </Text>
      </Text>
      <Use id="room5236" href="#rect8-1-8" transform="translate(-3.8692749,37.494247)" onPress={() => onRoomClick('room5236')} />
      <Use
        id="room5235"
        href="#rect8-1-8"
        transform="matrix(0.81490416,0,0,0.9683104,-13.115931,8.5662419)"
        onPress={() => onRoomClick('room5235')}
      />
    </G>
  </>
);
