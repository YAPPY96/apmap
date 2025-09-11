import React from 'react';
import { Defs, G, Path, Rect, Use } from 'react-native-svg';

interface Floor3Props {
  onRoomClick: (roomId: string) => void;
}

const rooms = {
  room5235: { rectId: 'rect6', transform: 'translate(0.25545977,-0.24633621) rotate(7.2102665)' },
  toiletM: { rectId: 'rect12', transform: 'translate(0.25545977,-0.24633621) rotate(4.4352277)' },
  toiletW: { rectId: 'rect11', transform: 'translate(0.25545977,-0.24633621) rotate(4.4352277)' },
  room5237: { rectId: 'rect9', transform: 'translate(0.25545977,-0.24633621) matrix(0.99381649,0.11103508,-0.10214486,0.99476954,0,0)' },
  room5238: { rectId: 'rect10', transform: 'translate(0.25545977,-0.24633621) matrix(0.99473062,0.1025231,-0.09362505,0.99560753,0,0)' },
  room5234: { rectId: 'rect7', transform: 'translate(0.25545977,-0.24633621) matrix(0.99022252,0.13949672,-0.14414243,0.98955696,0,0)' },
  room5236: { rectId: 'rect8', transform: 'translate(0.25545977,-0.24633621) matrix(0.99473062,0.1025231,-0.09362505,0.99560753,0,0)' },
  room5233: { rectId: 'rect13', transform: 'matrix(0.69978863,-0.08660498,-0.01254251,1.0015721,38.318488,11.940915)' },
  room5231: { rectId: 'rect13-6', transform: 'matrix(0.6468559,-0.04928736,0.00183406,1.0014473,81.211165,9.6169607)' },
  geographicalExperiment: { rectId: 'rect13-60', transform: 'translate(0.25545977,-0.24633621) rotate(6.6771334)' },
  temporaryRestroom: { rectId: 'rect14', transform: 'translate(0.25545977,-0.24633621)' },
  room5232: { rectId: 'rect13-6', transform: 'matrix(0.6468559,-0.04928736,0.00183406,1.0014473,47.01605,6.1956245)' },
};

const rects: { [id: string]: { x: number, y: number, width: number, height: number } } = {
  rect6: { x: 75.874702, y: 87.31913, width: 25.12409, height: 38.642792 },
  rect12: { x: 71.834183, y: 60.721615, width: 19.085226, height: 11.398121 },
  rect11: { x: 71.834183, y: 72.384811, width: 19.085226, height: 11.398121 },
  rect9: { x: 104.03499, y: 91.198982, width: 25.742666, height: 37.186043 },
  rect10: { x: 103.3269, y: 55.171337, width: 25.743, height: 37.186043 },
  rect7: { x: 69.423828, y: 124.9901, width: 34.247494, height: 56.43816 },
  rect8: { x: 102.62242, y: 129.79166, width: 25.742666, height: 37.186043 },
  rect13: { x: 130.27162, y: -12.427628, width: 46.010616, height: 29.032822 },
  'rect13-6': { x: 176.19325, y: -8.7486019, width: 53.637047, height: 29.068729 },
  'rect13-60': { x: 230.16882, y: -9.1982479, width: 53.289318, height: 29.0669 },
  rect14: { x: 44.565151, y: 40.63969, width: 25.596256, height: 23.486427 },
};

const Floor3: React.FC<Floor3Props> = ({ onRoomClick }) => (
  <G>
    <Defs>
      <Rect id="rect6" {...rects.rect6} style={{ display: 'inline', fill: 'none', stroke: '#000000', strokeWidth: 0.322803, strokeDasharray: 'none', strokeOpacity: 1 }} />
      <Rect id="rect12" {...rects.rect12} style={{ display: 'inline', fill: '#0000ff', stroke: '#000000', strokeWidth: 0.264999, strokeDasharray: 'none', strokeOpacity: 1 }} />
      <Rect id="rect11" {...rects.rect11} style={{ display: 'inline', fill: '#ff0000', stroke: '#000000', strokeWidth: 0.264999, strokeDasharray: 'none', strokeOpacity: 1 }} />
      <Path d="m 71.118616,84.145256 c 0.06615,-0.768334 -0.722443,-1.444274 -1.758941,-1.507673 -1.036495,-0.0634 -1.932604,0.509497 -1.998753,1.27783 -0.06615,0.768334 0.722443,1.444274 1.758939,1.507672 1.036498,0.0634 1.932606,-0.509495 1.998755,-1.277829 z m -3.131411,-0.191535 c 0.04407,-0.511836 0.642026,-0.89412 1.332501,-0.851886 0.690476,0.04223 1.216693,0.493278 1.172627,1.005113 -0.04407,0.511837 -0.642027,0.89412 -1.332503,0.851887 -0.690476,-0.04223 -1.216691,-0.493279 -1.172625,-1.005114 z m 9.598274,-1.795392 0.09483,-1.101434 -4.858232,1.053925 c -0.365674,0.07914 -0.684609,0.236975 -0.92086,0.458205 -0.236153,0.22007 -0.373931,0.485826 -0.398312,0.769019 l -0.142291,1.65273 c -0.02438,0.283193 0.06644,0.562931 0.262417,0.809433 0.195983,0.246501 0.484542,0.441495 0.83273,0.565465 l 4.626811,1.634084 0.09483,-1.101433 1.834381,0.631399 0.128601,-1.493725 3.757692,0.229841 0.239815,-2.7855 -3.757693,-0.229842 0.128601,-1.493725 z m 1.128461,1.51811 3.789007,0.231758 -0.05995,0.696375 -3.789007,-0.231757 -0.03997,0.46425 3.789007,0.231757 -0.05995,0.696374 -3.789007,-0.231756 -0.111215,1.291776 -5.200192,-1.756661 -0.03958,0.459608 3.393529,1.168959 -0.05286,0.61397 -3.826732,-1.365799 c -0.470445,-0.16645 -0.763002,-0.534366 -0.730127,-0.916212 l 0.142189,-1.651569 c 0.03288,-0.381846 0.387051,-0.71137 0.879416,-0.817764 l 4.020582,-0.885813 -0.05286,0.613971 -3.558201,0.743752 -0.03957,0.459607 5.446602,-1.105441 z" id="path13" style={{ display: 'inline', strokeWidth: 0.0135158 }} />
      <Path d="m 71.854361,72.524062 c 0.06924,-0.901449 -0.678934,-1.686651 -1.66879,-1.751377 -0.989856,-0.06473 -1.850572,0.61527 -1.919812,1.516719 -0.06924,0.90145 0.678934,1.686651 1.66879,1.751377 0.989856,0.06473 1.850572,-0.615269 1.919812,-1.516719 z M 68.86386,72.328514 c 0.04613,-0.600512 0.620468,-1.054264 1.279874,-1.011146 0.659405,0.04312 1.158651,0.567072 1.112526,1.167585 -0.04613,0.600513 -0.620469,1.054264 -1.279874,1.011146 -0.659406,-0.04312 -1.158652,-0.567072 -1.112526,-1.167585 z m 3.394144,-1.146603 -0.209185,2.723413 c -0.06924,0.901449 0.678935,1.68665 1.668791,1.751377 l 4.784803,0.312877 0.08367,-1.089365 4.485753,0.293323 0.29286,-3.812779 -4.485754,-0.293323 0.08367,-1.089364 -4.784803,-0.312878 c -0.989856,-0.06473 -1.850572,0.615269 -1.919813,1.516719 z m 6.094585,-0.696314 -0.04184,0.544683 -3.917559,-0.256168 -0.04184,0.544682 8.403312,0.549492 -0.08367,1.089364 -4.515659,-0.295277 -0.04183,0.544682 4.515658,0.295278 -0.08367,1.089365 -8.403312,-0.54949 -0.04184,0.544683 3.917559,0.256167 -0.04184,0.544683 -4.216609,-0.275723 c -0.659405,-0.04312 -1.158651,-0.567072 -1.112526,-1.167584 l 0.209185,-2.723414 c 0.04613,-0.600511 0.620469,-1.054265 1.279875,-1.011146 z" id="path12" style={{ display: 'inline', strokeWidth: 0.0143049 }} />
      <Rect id="rect9" {...rects.rect9} style={{ display: 'inline', fill: 'none', stroke: '#000000', strokeWidth: 0.256059, strokeDasharray: 'none', strokeOpacity: 1 }} />
      <Rect id="rect10" {...rects.rect10} style={{ display: 'inline', fill: 'none', stroke: '#000000', strokeWidth: 0.256059, strokeDasharray: 'none', strokeOpacity: 1 }} />
      <Rect id="rect7" {...rects.rect7} style={{ display: 'inline', fill: 'none', stroke: '#000000', strokeWidth: 0.269559, strokeDasharray: 'none', strokeOpacity: 1 }} />
      <Rect id="rect8" {...rects.rect8} style={{ display: 'inline', fill: 'none', stroke: '#000000', strokeWidth: 0.256059, strokeDasharray: 'none', strokeOpacity: 1 }} />
      <Rect id="rect13" {...rects.rect13} style={{ fill: 'none', stroke: '#000000', strokeWidth: 0.237736, strokeDasharray: 'none', strokeOpacity: 1 }} />
      <Rect id="rect13-6" {...rects['rect13-6']} style={{ display: 'inline', fill: 'none', stroke: '#000000', strokeWidth: 0.256842, strokeDasharray: 'none', strokeOpacity: 1 }} />
      <Rect id="rect13-60" {...rects['rect13-60']} style={{ display: 'inline', fill: 'none', stroke: '#000000', strokeWidth: 0.256, strokeDasharray: 'none', strokeOpacity: 1 }} />
      <Rect id="rect14" {...rects.rect14} style={{ fill: '#e6e6e6', stroke: '#000000', strokeWidth: 0.246687, strokeDasharray: 'none', strokeOpacity: 1 }} ry="0" />
    </Defs>
    <G transform="translate(-42.696099,-5.7252132)">
      {Object.entries(rooms).map(([roomId, room]) => {
        return (
          <G key={roomId} transform={room.transform} onPress={() => onRoomClick(roomId)}>
            <Use href={`#${room.rectId}`} />
          </G>
        );
      })}
      <Use href="#path13" transform="translate(0.25545977,-0.24633621)" onPress={() => onRoomClick('toiletW')} />
      <Use href="#path12" transform="translate(0.25545977,-0.24633621)" onPress={() => onRoomClick('toiletM')} />
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
    </G>
  </G>
);

export default Floor3;
