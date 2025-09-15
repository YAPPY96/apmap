import React from 'react';
import { View } from 'react-native';
import Svg, { SvgXml } from 'react-native-svg';

interface Building5253InteractiveMapProps {
  width: number;
  height: number;
  floor: number;
  onRoomClick: (roomId: string) => void;
}

// SVGファイルの内容から、外側の<svg>タグと<defs>タグを取り除き、
// <g>タグ以下の描画要素のみを抽出します。
// これにより、単一のSVGキャンバス上でレイヤーとして扱えるようになります。

const BASE_MAP_LAYERS = `
<g
   id="layer1"
   style="display:inline"
   transform="translate(-30.734127,-32.670969)"><path
     style="fill:#e6e6e6;stroke-width:0.264583"
     d="m 287.00708,36.897359 -17.28978,6.915912 -0.76843,12.679172 1.53686,0.384217 0.76843,0.384217 -18.82664,175.203113 -53.79043,-8.06857 14.98448,-127.944375 -99.51229,-12.294955 -16.137129,147.53946 -67.238024,-8.837 7.684346,-57.6326 9.605434,1.92109 9.605433,-90.675296 -24.974126,-3.073738 4.994826,-39.958602 50.332471,0.384217 -3.073739,17.673997 31.121598,4.610608 2.3053,-18.826649 99.12807,12.679171 3.07374,-11.526519 -4.61061,-5.76326 70.69599,0.768435 z"
     id="path34" /><path
     d="M 56.223456,94.111199 75.011179,95.56383 76.647128,74.405155 57.859404,72.952524 Z m 2.567476,-19.993423 16.756619,1.29559 -1.467901,18.985211 -16.756618,-1.29559 z m 4.14679,5.958949 c 1.084101,0.08382 2.040733,-0.793323 2.130428,-1.953409 0.0897,-1.160087 -0.720734,-2.173857 -1.804834,-2.257678 -1.084104,-0.08382 -2.040737,0.793324 -2.130432,1.95341 -0.0897,1.160087 0.718196,2.17366 1.804838,2.257677 z m 0.252073,-3.260196 c 0.594097,0.04594 1.038903,0.602343 0.989749,1.238081 -0.04916,0.635738 -0.574203,1.117159 -1.168301,1.071225 -0.594098,-0.04594 -1.038904,-0.602344 -0.98975,-1.238081 0.04915,-0.635739 0.571663,-1.117356 1.168302,-1.071225 z m 1.254284,4.059933 -3.092357,-0.239095 c -0.804825,-0.06223 -1.514052,0.588068 -1.580641,1.449304 l -0.456881,5.909106 1.025707,0.0793 -0.336097,4.346929 3.963195,0.306427 0.336096,-4.346929 1.025709,0.07931 0.45688,-5.909106 c 0.0641,-0.861428 -0.536785,-1.61302 -1.341611,-1.675246 z m 0.0629,6.618897 -1.025707,-0.07931 -0.331896,4.292592 -2.185976,-0.169015 0.331895,-4.292593 -1.025709,-0.07931 0.387561,-5.012551 c 0.02605,-0.336888 0.303692,-0.59146 0.618514,-0.567119 l 3.092355,0.239095 c 0.314824,0.02434 0.550034,0.318567 0.523987,0.655455 l -0.387561,5.012551 z m 6.001685,-6.833263 c 1.084102,0.08382 2.040734,-0.793323 2.130429,-1.953409 0.0897,-1.160087 -0.720734,-2.173857 -1.804836,-2.257678 -1.084102,-0.08382 -2.040734,0.793324 -2.13043,1.95341 -0.08969,1.160087 0.720735,2.173856 1.804837,2.257677 z M 70.760738,77.4019 c 0.594098,0.04594 1.038903,0.602343 0.989749,1.238081 -0.04915,0.635738 -0.574202,1.117159 -1.1683,1.071225 -0.594099,-0.04594 -1.038904,-0.602344 -0.98975,-1.238081 0.04915,-0.635739 0.574202,-1.117159 1.168301,-1.071225 z m 1.254286,4.059933 -3.092358,-0.239095 c -0.804825,-0.06223 -1.514052,0.588068 -1.580642,1.449304 l -0.45688,5.909105 1.025708,0.07931 -0.336096,4.34693 3.963195,0.306426 0.336096,-4.346929 1.025707,0.07931 0.45688,-5.909106 c 0.0641,-0.861428 -0.536786,-1.61302 -1.34161,-1.675247 z m 0.0629,6.618897 -1.025709,-0.07931 -0.331895,4.292592 -2.185976,-0.169015 0.331895,-4.292593 -1.025708,-0.07931 0.387561,-5.012552 c 0.02605,-0.336887 0.30369,-0.59146 0.61851,-0.567119 l 3.094897,0.239292 c 0.314823,0.02434 0.550034,0.318567 0.523986,0.655454 z m 8.259395,-8.549986 -0.889395,11.503059 1.649364,-1.512317 -0.118894,1.537725 -2.199153,2.016423 -1.863056,-2.330506 0.118894,-1.537724 1.397292,1.747878 0.889395,-11.503059 -1.649364,1.512317 0.118894,-1.537725 2.199152,-2.016423 1.863057,2.330505 -0.118894,1.537726 z"
     id="path1"
     style="stroke-width:0.026342" /><g
     id="g1"
     transform="matrix(-0.01952375,0,0,0.02196272,232.55202,101.38336)"><polygon
       points="480,742 240,742 240,902 40,902 40,960 300,960 300,800 540,800 540,640 780,640 780,460 960,460 960,402 720,402 720,582 480,582 "
       id="polygon1" /><path
       d="M 165,230 A 105,105 0 1 0 60,125 105.12,105.12 0 0 0 165,230 Z m 0,-162 a 57,57 0 1 1 -57,57 57.06,57.06 0 0 1 57,-57 z"
       id="path1-4" /><path
       d="m 220.33,595.86 39.21,3.65 L 279,720 H 400 V 522.79 A 65.19,65.19 0 0 0 347.75,459.05 L 285,448.76 V 380 A 125.14,125.14 0 0 0 160,255 H 60 V 880 H 181.74 Z M 141.26,836 H 110 V 301 h 50 a 75.09,75.09 0 0 1 75,75 v 111.24 l 103.27,16.91 A 15,15 0 0 1 350,518.79 V 676 H 319 L 299.46,559.49 178.67,544.14 Z"
       id="path2" /></g><g
     id="g1-5"
     transform="matrix(0.01952375,0,0,0.02196272,79.115371,206.96387)"
     style="display:inline"><polygon
       points="780,640 780,460 960,460 960,402 720,402 720,582 480,582 480,742 240,742 240,902 40,902 40,960 300,960 300,800 540,800 540,640 "
       id="polygon1-5" /><path
       d="M 165,230 A 105,105 0 1 0 60,125 105.12,105.12 0 0 0 165,230 Z m 0,-162 a 57,57 0 1 1 -57,57 57.06,57.06 0 0 1 57,-57 z"
       id="path1-4-1" /><path
       d="m 220.33,595.86 39.21,3.65 L 279,720 H 400 V 522.79 A 65.19,65.19 0 0 0 347.75,459.05 L 285,448.76 V 380 A 125.14,125.14 0 0 0 160,255 H 60 V 880 H 181.74 Z M 141.26,836 H 110 V 301 h 50 a 75.09,75.09 0 0 1 75,75 v 111.24 l 103.27,16.91 A 15,15 0 0 1 350,518.79 V 676 H 319 L 299.46,559.49 178.67,544.14 Z"
       id="path2-7" /></g><ellipse
     style="display:inline;fill:none;stroke:#ed5a5a;stroke-width:1.67032;stroke-dasharray:none;stroke-opacity:1"
     id="path3"
     cx="58.369164"
     cy="45.213539"
     rx="7.6046557"
     ry="7.0461068" /><path
     style="fill:none;stroke:#ed5a5a;stroke-width:1.67033;stroke-dasharray:none;stroke-opacity:1"
     d="M 65.035161,41.633503 52.642036,50.054459"
     id="path4" /><path
     style="fill:none;stroke:#ed5a5a;stroke-width:1.67033;stroke-dasharray:none;stroke-opacity:1"
     d="M 63.935927,49.853662 51.918351,41.432706"
     id="path5" /><g
     id="g1-7"
     transform="matrix(-0.01952375,0,0,0.02196272,60.582659,32.519708)"
     style="display:inline"><polygon
       points="780,640 780,460 960,460 960,402 720,402 720,582 480,582 480,742 240,742 240,902 40,902 40,960 300,960 300,800 540,800 540,640 "
       id="polygon1-6" /><path
       d="M 165,230 A 105,105 0 1 0 60,125 105.12,105.12 0 0 0 165,230 Z m 0,-162 a 57,57 0 1 1 -57,57 57.06,57.06 0 0 1 57,-57 z"
       id="path1-4-14" /><path
       d="m 220.33,595.86 39.21,3.65 L 279,720 H 400 V 522.79 A 65.19,65.19 0 0 0 347.75,459.05 L 285,448.76 V 380 A 125.14,125.14 0 0 0 160,255 H 60 V 880 H 181.74 Z M 141.26,836 H 110 V 301 h 50 a 75.09,75.09 0 0 1 75,75 v 111.24 l 103.27,16.91 A 15,15 0 0 1 350,518.79 V 676 H 319 L 299.46,559.49 178.67,544.14 Z"
       id="path2-2" /></g><rect
     style="display:inline;fill:#ff0000;stroke:#000000;stroke-width:0.264999;stroke-dasharray:none;stroke-opacity:1"
     id="rect45"
     width="19.085226"
     height="11.398121"
     x="66.702759"
     y="109.80083"
     transform="rotate(6.420943)" /><rect
     style="display:inline;fill:#0000ff;stroke:#000000;stroke-width:0.264999;stroke-dasharray:none;stroke-opacity:1"
     id="rect46"
     width="19.085226"
     height="11.398121"
     x="66.702759"
     y="98.137634"
     transform="rotate(6.420943)" /><path
     d="m 60.014664,111.57775 c 0.100394,-0.89851 -0.620079,-1.70916 -1.607102,-1.80814 -0.987014,-0.099 -1.870778,0.55078 -1.971211,1.44927 -0.100394,0.89852 0.620088,1.70918 1.607101,1.80816 0.987024,0.099 1.870779,-0.55078 1.971212,-1.44929 z m -2.981928,-0.29905 c 0.06688,-0.59856 0.656628,-1.03213 1.314148,-0.96619 0.657511,0.0659 1.138305,0.60688 1.071395,1.20543 -0.06688,0.59856 -0.656628,1.03214 -1.314138,0.96619 -0.657521,-0.0659 -1.138305,-0.60687 -1.071405,-1.20543 z m 3.431842,-1.02831 -0.303431,2.71453 c -0.100394,0.89851 0.620089,1.70916 1.607102,1.80815 l 4.771095,0.47849 0.121397,-1.08582 4.472892,0.44859 0.424798,-3.80034 -4.472892,-0.44859 0.121396,-1.08581 -4.771085,-0.47848 c -0.987014,-0.099 -1.870778,0.55078 -1.971212,1.44928 z m 6.115048,-0.48471 -0.06065,0.5429 -3.906331,-0.39176 -0.06065,0.54291 8.379233,0.84035 -0.121396,1.0858 -4.502717,-0.45157 -0.06065,0.54291 4.502707,0.45157 -0.121397,1.08581 -8.379224,-0.84034 -0.06065,0.54291 3.906331,0.39176 -0.06065,0.5429 -4.204524,-0.42166 c -0.657511,-0.0659 -1.138305,-0.60687 -1.071395,-1.20544 l 0.303422,-2.71452 c 0.06688,-0.59855 0.656627,-1.03213 1.314148,-0.9662 z"
     id="path1-1"
     style="display:inline;stroke-width:0.0143049" /><path
     d="m 58.876688,123.16648 c 0.09278,-0.76559 -0.671962,-1.46845 -1.705642,-1.56772 -1.033681,-0.0993 -1.949104,0.44222 -2.041837,1.2078 -0.09268,0.76559 0.671971,1.46845 1.705642,1.56772 1.033681,0.0993 1.949104,-0.44223 2.041837,-1.2078 z m -3.122893,-0.29993 c 0.06181,-0.51 0.672616,-0.87134 1.361218,-0.8052 0.688593,0.0661 1.198867,0.53513 1.137098,1.04514 -0.06181,0.51 -0.672626,0.87134 -1.361228,0.80521 -0.688593,-0.0661 -1.198867,-0.53515 -1.137088,-1.04515 z m 9.654717,-1.46173 0.132908,-1.09748 -4.891831,0.88494 c -0.368191,0.0664 -0.69241,0.21312 -0.936184,0.42603 -0.243634,0.21176 -0.390539,0.47257 -0.424717,0.75475 l -0.199473,1.6468 c -0.0342,0.28219 0.04685,0.56491 0.234205,0.81805 0.187331,0.25314 0.468962,0.45802 0.812637,0.59398 l 4.56741,1.79342 0.132908,-1.09749 1.81141,0.69458 0.180281,-1.48836 3.747469,0.3599 0.336185,-2.77551 -3.747469,-0.35991 0.180281,-1.48838 z m 1.07518,1.5563 3.778704,0.36291 -0.08399,0.69388 -3.778704,-0.3629 -0.05606,0.46258 3.778705,0.3629 -0.08399,0.69389 -3.778704,-0.36291 -0.155904,1.28715 -5.136198,-1.9358 -0.0555,0.45796 3.350987,1.28584 -0.07414,0.61177 -3.777107,-1.49758 c -0.46439,-0.18265 -0.744026,-0.56047 -0.697934,-0.94096 l 0.199322,-1.64565 c 0.04611,-0.38047 0.411477,-0.69753 0.907227,-0.78679 l 4.04886,-0.74597 -0.07414,0.61177 -3.581834,0.62001 -0.0555,0.45796 5.481633,-0.91606 z"
     id="path1-8"
     style="display:inline;stroke-width:0.0135158" /><rect
     style="display:inline;fill:#ff0000;stroke:#000000;stroke-width:0.264999;stroke-dasharray:none;stroke-opacity:1"
     id="rect45-8"
     width="19.085226"
     height="11.398121"
     x="257.84036"
     y="-100.27203"
     transform="matrix(0.99365363,0.11248318,0.11248318,-0.99365363,0,0)" /><rect
     style="display:inline;fill:#0000ff;stroke:#000000;stroke-width:0.264999;stroke-dasharray:none;stroke-opacity:1"
     id="rect46-5"
     width="19.085226"
     height="11.398121"
     x="257.84036"
     y="-111.93523"
     transform="matrix(0.99365363,0.11248318,0.11248318,-0.99365363,0,0)" /><path
     d="m 249.67035,134.8461 c -0.10241,0.89828 -0.98545,1.52794 -1.96971,1.40442 -0.98424,-0.12349 -1.70093,-0.95392 -1.59857,-1.85219 0.10241,-0.89829 0.98546,-1.52796 1.9697,-1.40445 0.98427,0.1235 1.70095,0.95392 1.59858,1.85222 z m -2.97356,-0.37315 c -0.0682,0.59841 0.41005,1.15253 1.06572,1.23481 0.65566,0.0823 1.24494,-0.33789 1.31313,-0.93629 0.0682,-0.59842 -0.41005,-1.15254 -1.06572,-1.23481 -0.65566,-0.0823 -1.24493,0.33788 -1.31313,0.93629 z m 3.11629,1.7674 0.30927,-2.71387 c 0.1024,-0.89829 0.98546,-1.52795 1.9697,-1.40444 l 4.75772,0.59703 -0.12369,1.08556 4.46035,0.5597 -0.43298,3.79941 -4.46035,-0.5597 -0.12368,1.08555 -4.75771,-0.59703 c -0.98425,-0.1235 -1.70095,-0.95392 -1.59857,-1.8522 z m 5.85316,1.83556 0.0619,-0.54275 -3.89538,-0.48882 0.0618,-0.54278 8.35574,1.04852 0.12367,-1.08554 -4.49008,-0.56345 0.0618,-0.54278 4.49008,0.56345 0.12369,-1.08556 -8.35573,-1.04853 0.0618,-0.54278 3.89537,0.48882 0.0619,-0.54275 -4.19273,-0.52614 c -0.65565,-0.0823 -1.24494,0.33788 -1.31313,0.9363 l -0.30928,2.71386 c -0.0682,0.59841 0.41004,1.15253 1.06572,1.23482 z"
     id="path1-1-7"
     style="display:inline;stroke-width:0.0143049" /><path
     d="m 251.14413,123.29527 c -0.0802,0.76701 -0.98237,1.28172 -2.01217,1.14809 -1.02981,-0.13361 -1.8015,-0.86555 -1.72125,-1.63254 0.0803,-0.76699 0.98238,-1.28172 2.01217,-1.14809 1.02981,0.1336 1.8015,0.86556 1.72125,1.63254 z m -3.11117,-0.40371 c -0.0534,0.51094 0.46146,0.99934 1.14748,1.08835 0.68601,0.0891 1.28799,-0.25443 1.34145,-0.76538 0.0534,-0.51095 -0.46147,-0.99935 -1.1475,-1.08837 -0.686,-0.0891 -1.28798,0.25446 -1.34143,0.7654 z m 9.08599,3.57699 -0.11507,1.09949 -4.5715,-1.95306 c -0.34413,-0.1468 -0.62749,-0.3621 -0.81766,-0.62399 -0.19031,-0.26074 -0.27538,-0.54773 -0.24581,-0.83043 l 0.17262,-1.64983 c 0.0296,-0.28271 0.17164,-0.54024 0.41066,-0.74527 0.23904,-0.20501 0.55925,-0.34196 0.92459,-0.39789 l 4.85225,-0.73023 -0.11506,1.09951 1.92066,-0.27335 -0.15601,1.4911 3.73341,0.48447 -0.29094,2.78062 -3.73342,-0.48446 -0.15601,1.49112 z m 1.39503,-1.27749 3.76453,0.4885 0.0728,-0.69515 -3.76453,-0.48851 0.0484,-0.46344 3.76453,0.4885 0.0728,-0.69515 -3.76453,-0.4885 0.13493,-1.28952 -5.43847,0.74224 0.048,-0.45881 3.5533,-0.50655 0.0641,-0.6129 -4.0159,0.61799 c -0.49342,0.0745 -0.85023,0.38053 -0.89011,0.76172 l -0.17251,1.64867 c -0.0399,0.38118 0.24565,0.7717 0.70903,0.96922 l 3.78072,1.62969 0.0641,-0.61289 -3.35353,-1.40281 0.048,-0.4588 5.13954,2.11487 z"
     id="path1-8-6"
     style="display:inline;stroke-width:0.0135158" /></g>
`;

const FLOOR1_LAYERS = `
<g
   id="layer2"
   style="display:inline"
   transform="translate(-30.734127,-32.670969)"><rect
     style="fill:none;stroke:#000000;stroke-width:0.307063;stroke-dasharray:none;stroke-opacity:1"
     id="rect44"
     width="83.281769"
     height="35.823227"
     x="132.9021"
     y="21.551216"
     transform="matrix(0.99141744,0.13073434,-0.16354992,0.98653506,0,0)" /><rect
     style="display:inline;fill:none;stroke:#000000;stroke-width:0.423761;stroke-dasharray:none;stroke-opacity:1"
     id="rect47"
     width="53.658237"
     height="89.021782"
     x="224.72281"
     y="103.418"
     transform="matrix(0.98915098,0.14690247,-0.12129198,0.99261687,0,0)" /><text
     xml:space="preserve"
     transform="scale(0.26458333)"
     id="text1"
     style="text-align:start;writing-mode:lr-tb;direction:ltr;white-space:pre;shape-inside:url(#rect1);display:inline;fill:#fefefe;stroke:#000000;stroke-width:0.967559"><tspan
       x="398"
       y="337.94796"
       id="tspan10"><tspan
         dx="0 7.6289062 7.6289062 7.6289062"
         id="tspan1">5214</tspan></tspan></text><text
     xml:space="preserve"
     style="font-size:11.0198px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke:#000000;stroke-width:0.88853"
     x="114.4364"
     y="88.110054"
     id="text2"
     transform="scale(0.74219948,1.3473467)"><tspan
       id="tspan2"
       style="fill:#000000;fill-opacity:1;stroke-width:0.88853"
       x="114.4364"
       y="88.110054">5218</tspan><tspan
       style="fill:#000000;fill-opacity:1;stroke-width:0.88853"
       x="114.4364"
       y="101.8848"
       id="tspan3" /></text><text
     xml:space="preserve"
     style="font-size:9.67606px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke:#000000;stroke-width:0.78018"
     x="120.07993"
     y="106.4594"
     id="text4"
     transform="scale(0.69302715,1.4429449)"><tspan
       id="tspan4"
       style="fill:#000000;fill-opacity:1;stroke-width:0.78018"
       x="120.07993"
       y="106.4594">5217</tspan></text><text
     xml:space="preserve"
     style="font-size:9.97924px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke:#000000;stroke-width:0.804625"
     x="103.67106"
     y="144.22676"
     id="text5"
     transform="scale(0.76286425,1.3108492)"><tspan
       id="tspan5"
       style="fill:#000000;fill-opacity:1;stroke-width:0.804625"
       x="103.67106"
       y="144.22676">5216</tspan><tspan
       style="fill:#000000;fill-opacity:1;stroke-width:0.804625"
       x="103.67106"
       y="156.70081"
       id="tspan6" /></text><text
     xml:space="preserve"
     style="font-size:15.7399px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke:#000000;stroke-width:1.2691"
     x="46.893963"
     y="160.50835"
     id="text7"
     transform="scale(0.76870985,1.3008809)"><tspan
       id="tspan7"
       style="fill:#000000;fill-opacity:1;stroke-width:1.2691"
       x="46.893963"
       y="160.50835">5214</tspan></text><text
     xml:space="preserve"
     style="font-size:9.92294px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke:#000000;stroke-width:0.800086"
     x="70.022652"
     y="118.57941"
     id="text8"
     transform="scale(0.75142676,1.3308017)"><tspan
       id="tspan8"
       style="fill:#000000;fill-opacity:1;stroke-width:0.800086"
       x="70.022652"
       y="118.57941">5215</tspan><tspan
       style="fill:#000000;fill-opacity:1;stroke-width:0.800086"
       x="70.022652"
       y="130.98308"
       id="tspan9" /></text><text
     xml:space="preserve"
     style="font-size:3.175px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;white-space:pre;inline-size:16.9127;display:inline;fill:#000000;fill-opacity:1;stroke:#000000;stroke-width:0.256"
     x="158.22083"
     y="24.870832"
     id="text10"
     transform="matrix(2.1281683,0,0,3.1214196,-186.90413,-11.504389)"><tspan
       x="158.22083"
       y="24.870832"
       id="tspan12">ゆめルーム</tspan></text><text
     xml:space="preserve"
     style="font-size:10.5833px;line-height:0;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke:#000000;stroke-width:0.262;stroke-dasharray:none"
     x="283.38306"
     y="138.58243"
     id="text11"
     transform="scale(0.7460386,1.3404132)"><tspan
       id="tspan11"
       style="font-size:10.5833px;line-height:0;fill:#000000;fill-opacity:1;stroke-width:0.262;stroke-dasharray:none"
       x="283.38306"
       y="138.58243">科学実験室</tspan><tspan
       style="font-size:10.5833px;line-height:0;fill:#000000;fill-opacity:1;stroke-width:0.262;stroke-dasharray:none"
       x="283.38306"
       y="138.58243"
       id="tspan23" /></text><ellipse
     style="display:inline;fill:none;stroke:#ed5a5a;stroke-width:1.67032;stroke-dasharray:none;stroke-opacity:1"
     id="path3-1"
     cx="222.72446"
     cy="133.73938"
     rx="7.6046557"
     ry="7.0461068" /><path
     style="display:inline;fill:none;stroke:#ed5a5a;stroke-width:1.67033;stroke-dasharray:none;stroke-opacity:1"
     d="m 229.49273,129.65329 -12.39313,8.42097"
     id="path4-6" /><path
     style="display:inline;fill:none;stroke:#ed5a5a;stroke-width:1.67033;stroke-dasharray:none;stroke-opacity:1"
     d="M 229.48694,137.87346 217.46937,129.4525"
     id="path5-8" /><rect
     style="display:inline;fill:none;stroke:#000000;stroke-width:0.204121"
     id="rect8-11"
     width="37.322193"
     height="29.387085"
     x="79.948952"
     y="-121.81734"
     transform="matrix(-0.10388011,0.99458983,-0.99388592,-0.11041188,0,0)" /><rect
     style="display:inline;fill:none;stroke:#000000;stroke-width:0.204121"
     id="room5216"
     width="37.322193"
     height="29.387085"
     x="155.06766"
     y="-121.81734"
     transform="matrix(-0.10388011,0.99458983,-0.99388592,-0.11041188,0,0)" /><rect
     style="display:inline;fill:none;stroke:#000000;stroke-width:0.204121"
     id="rect8-1-8"
     width="37.322193"
     height="29.387085"
     x="117.50832"
     y="-121.81734"
     transform="matrix(-0.10388011,0.99458983,-0.99388592,-0.11041188,0,0)" /><rect
     style="fill:none;stroke:#000000;stroke-width:0.450243"
     id="rect12"
     width="34.469261"
     height="54.078918"
     x="61.624931"
     y="159.04204"
     transform="matrix(0.9874081,0.15819367,-0.13736474,0.99052053,0,0)" /><rect
     style="fill:none;stroke:#000000;stroke-width:0.301791"
     id="room5215"
     width="24.329729"
     height="34.422363"
     x="65.024124"
     y="126.9831"
     transform="rotate(5.7475754)" /></g>
`;

const FLOOR2_LAYERS = `
<g
   id="layer2"
   style="display:inline"
   transform="translate(-30.734127,-32.670969)"><rect
     style="display:inline;fill:none;stroke:#000000;stroke-width:0.423761;stroke-dasharray:none;stroke-opacity:1"
     id="rect47"
     width="53.658237"
     height="89.021782"
     x="224.72281"
     y="103.418"
     transform="matrix(0.98915098,0.14690247,-0.12129198,0.99261687,0,0)" /><ellipse
     style="display:inline;fill:none;stroke:#ed5a5a;stroke-width:1.67032;stroke-dasharray:none;stroke-opacity:1"
     id="path3-1"
     cx="222.72446"
     cy="133.73938"
     rx="7.6046557"
     ry="7.0461068" /><path
     style="display:inline;fill:none;stroke:#ed5a5a;stroke-width:1.67033;stroke-dasharray:none;stroke-opacity:1"
     d="m 229.49273,129.65329 -12.39313,8.42097"
     id="path4-6" /><path
     style="display:inline;fill:none;stroke:#ed5a5a;stroke-width:1.67033;stroke-dasharray:none;stroke-opacity:1"
     d="M 229.48694,137.87346 217.46937,129.4525"
     id="path5-8" /><rect
     style="display:inline;fill:none;stroke:#000000;stroke-width:0.204121"
     id="rect8-11"
     width="37.322193"
     height="29.387085"
     x="79.948952"
     y="-121.81734"
     transform="matrix(-0.10388011,0.99458983,-0.99388592,-0.11041188,0,0)" /><rect
     style="display:inline;fill:none;stroke:#000000;stroke-width:0.204121"
     id="rect8-1-8"
     width="37.322193"
     height="29.387085"
     x="117.50832"
     y="-121.81734"
     transform="matrix(-0.10388011,0.99458983,-0.99388592,-0.11041188,0,0)" /><rect
     style="fill:none;stroke:#000000;stroke-width:0.450243"
     id="rect12"
     width="34.469261"
     height="54.078918"
     x="61.624931"
     y="159.04204"
     transform="matrix(0.9874081,0.15819367,-0.13736474,0.99052053,0,0)" /></g><g
   id="layer3"
   style="display:inline"
   transform="translate(-30.734127,-32.670969)"><use
     x="0"
     y="0"
     xlink:href="#rect8-11"
     id="room5228"
     style="display:inline" /><use
     x="0"
     y="0"
     xlink:href="#rect8-7-3"
     id="use14"
     style="display:inline" /><use
     x="0"
     y="0"
     xlink:href="#rect47"
     id="use22"
     style="display:inline" /><use
     x="0"
     y="0"
     xlink:href="#path3-1"
     id="use24"
     style="display:inline" /><use
     x="0"
     y="0"
     xlink:href="#path4-6"
     id="use25"
     style="display:inline" /><use
     x="0"
     y="0"
     xlink:href="#path5-8"
     id="use26"
     style="display:inline" /><use
     x="0"
     y="0"
     xlink:href="#rect8-1-8"
     id="room5227"
     style="display:inline" /><use
     x="0"
     y="0"
     xlink:href="#rect12"
     id="room5224"
     style="display:inline" /><use
     x="0"
     y="0"
     xlink:href="#rect13"
     id="use17"
     style="display:inline" /><use
     x="0"
     y="0"
     xlink:href="#use14"
     id="use19"
     transform="matrix(-0.0401572,-0.99776981,1.3650484,0.05976607,-4.293777,145.00308)"
     style="display:inline" /><text
     xml:space="preserve"
     style="font-size:10.5833px;line-height:0;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#ffffff;fill-opacity:1;stroke:#000000;stroke-width:0.262;stroke-opacity:1"
     x="152.73608"
     y="136.24191"
     id="text26"><tspan
       id="tspan26"
       style="stroke:#000000;stroke-width:0.262;stroke-opacity:1"
       x="152.73608"
       y="136.24191" /></text><text
     xml:space="preserve"
     style="font-size:10.5833px;line-height:0;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:0;stroke:#000000;stroke-width:0.262;stroke-opacity:1"
     x="154.3855"
     y="127.99483"
     id="text27"><tspan
       id="tspan27"
       style="fill:#000000;fill-opacity:0;stroke-width:0.262"
       x="154.3855"
       y="127.99483" /></text><text
     xml:space="preserve"
     style="font-size:10.5833px;line-height:0;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;white-space:pre;inline-size:33.8364;fill:#000000;fill-opacity:0.991507;stroke:#000000;stroke-width:0.262;stroke-opacity:1"
     x="141.81667"
     y="143.40416"
     id="text28"
     transform="translate(89.562126,-71.529483)"><tspan
       x="141.81667"
       y="143.40416"
       id="tspan2">5221</tspan></text><text
     xml:space="preserve"
     style="font-size:10.5833px;line-height:0;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;white-space:pre;inline-size:33.8364;display:inline;fill:#000000;fill-opacity:0.991507;stroke:#000000;stroke-width:0.262;stroke-opacity:1"
     x="141.81667"
     y="143.40416"
     id="text28-8"
     transform="translate(36.345193,-77.669894)"><tspan
       x="141.81667"
       y="143.40416"
       id="tspan3">5222</tspan></text><text
     xml:space="preserve"
     style="font-size:10.5833px;line-height:0;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;white-space:pre;inline-size:33.8364;display:inline;fill:#000000;fill-opacity:0.991507;stroke:#000000;stroke-width:0.262;stroke-opacity:1"
     x="141.81667"
     y="143.40416"
     id="text28-3"
     transform="translate(-12.622785,-83.172096)"><tspan
       x="141.81667"
       y="143.40416"
       id="tspan4">5223</tspan></text><text
     xml:space="preserve"
     style="font-size:10.5833px;line-height:0;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;white-space:pre;inline-size:33.8364;display:inline;fill:#000000;fill-opacity:0.942675;stroke:#000000;stroke-width:0.262;stroke-opacity:1"
     x="141.81667"
     y="143.40416"
     id="text28-0"
     transform="translate(-59.056276,-28.249259)"><tspan
       x="141.81667"
       y="143.40416"
       id="tspan5">5228</tspan></text><text
     xml:space="preserve"
     style="font-size:10.5833px;line-height:0;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;white-space:pre;inline-size:33.8364;display:inline;fill:#000000;fill-opacity:0.942675;stroke:#000000;stroke-width:0.262;stroke-opacity:1"
     x="141.81667"
     y="143.40416"
     id="text28-6"
     transform="translate(-62.493245,10.11271)"><tspan
       x="141.81667"
       y="143.40416"
       id="tspan6">5227</tspan></text><text
     xml:space="preserve"
     style="font-size:10.5833px;line-height:0;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;white-space:pre;inline-size:33.8364;display:inline;fill:#000000;fill-opacity:0.942675;stroke:#000000;stroke-width:0.262;stroke-opacity:1"
     x="141.81667"
     y="143.40416"
     id="text28-5"
     transform="translate(-67.052842,46.697126)"><tspan
       x="141.81667"
       y="143.40416"
       id="tspan7">5226</tspan></text><text
     xml:space="preserve"
     style="font-size:10.5833px;line-height:0;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;white-space:pre;inline-size:33.8364;display:inline;fill:#000000;fill-opacity:0.942675;stroke:#000000;stroke-width:0.262;stroke-opacity:1"
     x="141.81667"
     y="143.40416"
     id="text28-1"
     transform="translate(-104.30264,57.342143)"><tspan
       x="141.81667"
       y="143.40416"
       id="tspan8">5224</tspan></text><text
     xml:space="preserve"
     style="font-size:10.5833px;line-height:0;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;white-space:pre;inline-size:33.8364;display:inline;fill:#000000;fill-opacity:0.942675;stroke:#000000;stroke-width:0.262;stroke-opacity:1"
     x="141.81667"
     y="143.40416"
     id="text28-7"
     transform="matrix(0.90489734,0,0,1.0384981,-78.528471,8.3684706)"><tspan
       x="141.81667"
       y="143.40416"
       id="tspan9">5225</tspan></text><use
     x="0"
     y="0"
     xlink:href="#rect8-1-8"
     id="use42"
     style="display:inline"
     transform="translate(-3.8208249,37.285982)" /><use
     x="0"
     y="0"
     xlink:href="#rect8-1-8"
     id="room5226"
     style="display:inline"
     transform="translate(-3.8208249,37.285982)" /><use
     x="0"
     y="0"
     xlink:href="#rect8-1-8"
     id="room5225"
     style="display:inline"
     transform="matrix(0.84169439,0,0,0.86698882,-15.53869,25.139296)" /><rect
     style="fill:none;fill-opacity:0.96603;stroke:#000000;stroke-width:0.336078;stroke-opacity:1"
     id="room5223"
     width="51.002026"
     height="29.376703"
     x="122.88304"
     y="22.366896"
     transform="matrix(0.99194019,0.12670701,-0.13254675,0.99117675,0,0)" /><rect
     style="fill:none;fill-opacity:0.96603;stroke:#000000;stroke-width:0.336078;stroke-opacity:1"
     id="room5222"
     width="51.002026"
     height="29.376703"
     x="174.31709"
     y="22.366896"
     transform="matrix(0.99194019,0.12670701,-0.13254675,0.99117675,0,0)" /><rect
     style="fill:none;fill-opacity:0.96603;stroke:#000000;stroke-width:0.336078;stroke-opacity:1"
     id="room5221"
     width="51.002026"
     height="29.376703"
     x="225.75113"
     y="22.366896"
     transform="matrix(0.99194019,0.12670701,-0.13254675,0.99117675,0,0)" /></g>
`;

const FLOOR3_LAYERS = `
<g
   id="layer2"
   style="display:inline"
   transform="translate(-30.734127,-32.670969)a"><rect
     style="display:inline;fill:none;stroke:#000000;stroke-width:0.204121"
     id="rect8-11"
     width="37.322193"
     height="29.387085"
     x="79.948952"
     y="-121.81734"
     transform="matrix(-0.10388011,0.99458983,-0.99388592,-0.11041188,0,0)" /><rect
     style="display:inline;fill:none;stroke:#000000;stroke-width:0.204121"
     id="rect8-1-8"
     width="37.322193"
     height="29.387085"
     x="117.50832"
     y="-121.81734"
     transform="matrix(-0.10388011,0.99458983,-0.99388592,-0.11041188,0,0)" /><rect
     style="fill:none;stroke:#000000;stroke-width:0.450243"
     id="rect12"
     width="34.469261"
     height="54.078918"
     x="61.624931"
     y="159.04204"
     transform="matrix(0.9874081,0.15819367,-0.13736474,0.99052053,0,0)" /></g><g
   id="layer4"
   style="display:inline"
   transform="translate(-31.358239,-37.391981)"><use
     x="0"
     y="0"
     xlink:href="#rect8-11"
     id="room5238"
     style="display:inline"
     transform="translate(0.03779761,0.22678572)" /><use
     x="0"
     y="0"
     xlink:href="#rect8-7-3"
     id="use14-0"
     style="display:inline"
     transform="translate(0.03779761,0.22678572)" /><use
     x="0"
     y="0"
     xlink:href="#rect8-1-8"
     id="use15-2"
     style="display:inline"
     transform="translate(0.03779761,0.22678572)" /><use
     x="0"
     y="0"
     xlink:href="#rect12"
     id="room5234"
     style="display:inline"
     transform="translate(0.03779761,0.22678572)" /><use
     x="0"
     y="0"
     xlink:href="#rect13"
     id="use17-6"
     style="display:inline"
     transform="translate(0.03779761,0.22678572)" /><use
     x="0"
     y="0"
     xlink:href="#use15-2"
     id="use20-4"
     transform="matrix(-0.01136759,-0.99556715,1.0231724,0.03090695,-14.130773,141.89223)"
     style="display:inline" /><use
     x="0"
     y="0"
     xlink:href="#use20-4"
     id="room5232"
     transform="translate(38.285682,4.7163511)" /><use
     x="0"
     y="0"
     xlink:href="#use20-4"
     id="room5231"
     transform="translate(76.571361,9.4327016)"
     style="display:inline" /><use
     x="0"
     y="0"
     xlink:href="#use20-4"
     id="roomGeographycal"
     transform="translate(114.85704,14.149051)"
     style="display:inline" /><rect
     style="fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0.291137"
     id="rect21"
     width="67.034912"
     height="123.94749"
     x="208.83447"
     y="98.623817"
     transform="matrix(0.99287917,0.11912581,-0.07334671,0.9973065,0,0)" /><text
     xml:space="preserve"
     style="font-size:10.5833px;line-height:0;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:0.942675;stroke:#000000;stroke-width:0.262;stroke-opacity:1"
     x="200.16234"
     y="68.524033"
     id="text29"><tspan
       id="tspan29"
       style="stroke-width:0.262"
       x="200.16234"
       y="68.524033">5231</tspan><tspan
       style="stroke-width:0.262"
       x="200.16234"
       y="68.524033"
       id="tspan30" /></text><text
     xml:space="preserve"
     style="font-size:10.5833px;line-height:0;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:0.942675;stroke:#000000;stroke-width:0.262;stroke-opacity:1"
     x="158.98779"
     y="65.218056"
     id="text31"><tspan
       id="tspan31"
       style="stroke-width:0.262"
       x="158.98779"
       y="65.218056">5232</tspan></text><text
     xml:space="preserve"
     style="font-size:10.5833px;line-height:0;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:0.942675;stroke:#000000;stroke-width:0.262;stroke-opacity:1"
     x="122.62196"
     y="61.310978"
     id="text32"><tspan
       id="tspan32"
       style="stroke-width:0.262"
       x="122.62196"
       y="61.310978">5233</tspan></text><text
     xml:space="preserve"
     style="font-size:15.246px;line-height:0;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:0.942675;stroke:#000000;stroke-width:0.377427;stroke-opacity:1"
     x="46.072609"
     y="160.85521"
     id="text36"
     transform="scale(0.77762834,1.2859614)"><tspan
       id="tspan36"
       style="stroke-width:0.377427"
       x="46.072609"
       y="160.85521">5234</tspan></text><text
     xml:space="preserve"
     style="font-size:11.4668px;line-height:0;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:0.942675;stroke:#000000;stroke-width:0.283871;stroke-opacity:1"
     x="76.01535"
     y="107.46097"
     id="text37"
     transform="scale(0.67645493,1.4782951)"><tspan
       id="tspan37"
       style="stroke-width:0.283871"
       x="76.01535"
       y="107.46097">5235</tspan></text><text
     xml:space="preserve"
     style="font-size:10.5833px;line-height:0;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:0.942675;stroke:#000000;stroke-width:0.262;stroke-opacity:1"
     x="75.136017"
     y="189.94383"
     id="text38"><tspan
       id="tspan38"
       style="stroke-width:0.262"
       x="75.136017"
       y="189.94383">5236</tspan></text><text
     xml:space="preserve"
     style="font-size:10.5833px;line-height:0;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:0.942675;stroke:#000000;stroke-width:0.262;stroke-opacity:1"
     x="79.343636"
     y="150.87311"
     id="text39"><tspan
       id="tspan39"
       style="stroke-width:0.262"
       x="79.343636"
       y="150.87311">5237</tspan></text><text
     xml:space="preserve"
     style="font-size:10.5833px;line-height:0;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:0.942675;stroke:#000000;stroke-width:0.262;stroke-opacity:1"
     x="83.250694"
     y="114.20673"
     id="text40"><tspan
       id="tspan40"
       style="stroke-width:0.262"
       x="83.250694"
       y="114.20673">5238</tspan></text><text
     xml:space="preserve"
     style="font-size:9.93855px;line-height:0;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:0.942675;stroke:#000000;stroke-width:0.246039;stroke-opacity:1"
     x="309.2374"
     y="55.708508"
     id="text41"
     transform="scale(0.7498534,1.333594)"><tspan
       id="tspan41"
       style="stroke-width:0.246039"
       x="309.2374"
       y="55.708508">地学実験室</tspan></text><use
     x="0"
     y="0"
     xlink:href="#rect8-1-8"
     id="room5236"
     style="display:inline"
     transform="translate(-3.8692749,37.494247)" /><use
     x="0"
     y="0"
     xlink:href="#rect8-1-8"
     id="room5235"
     style="display:inline"
     transform="matrix(0.81490416,0,0,0.9683104,-13.115931,8.5662419)" /></g>
`;

const Building5253InteractiveMap: React.FC<Building5253InteractiveMapProps> = ({ 
  width, 
  height,
  floor,
  onRoomClick
}) => {
  const getFloorLayers = () => {
    switch (floor) {
      case 1:
        return FLOOR1_LAYERS;
      case 2:
        return FLOOR2_LAYERS;
      case 3:
        return FLOOR3_LAYERS;
      default:
        return null; // 何も表示しない場合はnullを返す
    }
  };

  const floorLayers = getFloorLayers();

  // 注意: SvgXml自体にonPressを付けても、個々の図形（部屋）を特定することはできません。
  // 本来は、SVG文字列内の各部屋の<rect>や<path>タグに直接onPress属性を追加する必要があります。
  // このサンプルでは、コンポーネントのルート`View`にonPressを付けてデバッグログを出力します。
  const handleContainerPress = (event: any) => {
    // ネイティブイベントからターゲットのIDを試みとして取得
    const targetId = (event.target as any)?.id;
    console.log('Pressed element ID:', targetId);
    if (targetId && typeof targetId === 'string' && targetId.startsWith('room')) {
      onRoomClick(targetId);
    } else {
      console.log('No valid room ID found on the pressed element.');
    }
  };

  return (
    <View style={{ width, height, backgroundColor: '#f0f0f0' }}>
      <Svg 
        width={width} 
        height={height} 
        viewBox="0 0 256.27295 199.79301"
        onPress={handleContainerPress} // イベントハンドラを親のSvgに移動
      >
        {/* ベースマップのレイヤーを常に表示 */}
        <SvgXml
          xml={BASE_MAP_LAYERS}
          width="100%"
          height="100%"
        />
        
        {/* 選択された階のレイヤーを重ねて表示 */}
        {floorLayers && (
          <SvgXml
            xml={floorLayers}
            width="100%"
            height="100%"
          />
        )}
      </Svg>
    </View>
  );
};

export default Building5253InteractiveMap;