import React from 'react';
import { Defs, G, Path, Rect, Text, Use } from 'react-native-svg';

interface Floor1Props {
  onRoomClick: (roomId: string) => void;
}

const rooms = {
  room5215: { rectId: 'rect40', transform: 'rotate(7.2102665)', name: '5215' },
  room5214: { rectId: 'rect41', transform: 'matrix(0.99022253,0.13949672,-0.14414243,0.98955695,0,0)', name: '5214' },
  room5216: { rectId: 'rect42', transform: 'matrix(0.99473062,0.1025231,-0.09362505,0.99560753,0,0)', name: '5216' },
  room5217: { rectId: 'rect43', transform: 'matrix(0.99381649,0.11103508,-0.10214486,0.99476953,0,0)', name: '5217' },
  room5218: { rectId: 'room5218', transform: 'matrix(0.99473062,0.1025231,-0.09362505,0.99560753,0,0)', name: '5218' },
  roomYUME: { rectId: 'rect44', transform: 'matrix(0.99141744,0.13073434,-0.16354992,0.98653506,0,0)', name: 'YUME' },
  toiletW: { rectId: 'rect45', transform: 'rotate(4.4352277)', name: 'W' },
  toiletM: { rectId: 'rect46', transform: 'rotate(4.4352277)', name: 'M' },
  scienceExperiment: { rectId: 'rect47', transform: 'matrix(0.99518102,0.09805476,-0.10148965,0.9948366,0,0)', name: 'Science\nExperiment' },
};

const rects: { [id: string]: { x: number, y: number, width: number, height: number } } = {
  rect40: { x: 75.874702, y: 87.31913, width: 25.12409, height: 38.642792 },
  rect41: { x: 69.423828, y: 124.9901, width: 34.247494, height: 56.43816 },
  rect42: { x: 102.62242, y: 129.79166, width: 25.742666, height: 37.186043 },
  rect43: { x: 104.03499, y: 91.198982, width: 25.742666, height: 37.186043 },
  room5218: { x: 103.3269, y: 55.171337, width: 25.743, height: 37.186043 },
  rect44: { x: 138.54341, y: -12.367796, width: 83.281769, height: 35.823227 },
  rect45: { x: 71.834183, y: 72.384811, width: 19.085226, height: 11.398121 },
  rect46: { x: 71.834183, y: 60.721615, width: 19.085226, height: 11.398121 },
  rect47: { x: 229.99072, y: 80.167877, width: 53.445843, height: 89.346237 },
};

const Floor1: React.FC<Floor1Props> = ({ onRoomClick }) => (
  <G>
    <Defs>
        <Rect id="rect40" {...rects.rect40} style={{ display: 'inline', fill: 'none', stroke: '#000000', strokeWidth: 0.322803, strokeDasharray: 'none', strokeOpacity: 1 }} />
        <Rect id="rect41" {...rects.rect41} style={{ fill: 'none', stroke: '#000000', strokeWidth: 0.269559, strokeDasharray: 'none', strokeOpacity: 1 }} />
        <Rect id="rect42" {...rects.rect42} style={{ fill: 'none', stroke: '#000000', strokeWidth: 0.256059, strokeDasharray: 'none', strokeOpacity: 1 }} />
        <Rect id="rect43" {...rects.rect43} style={{ fill: 'none', stroke: '#000000', strokeWidth: 0.256059, strokeDasharray: 'none', strokeOpacity: 1 }} />
        <Rect id="room5218" {...rects.room5218} style={{ fill: 'none', stroke: '#000000', strokeWidth: 0.256059, strokeDasharray: 'none', strokeOpacity: 1 }} />
        <Rect id="rect44" {...rects.rect44} style={{ fill: 'none', stroke: '#000000', strokeWidth: 0.307063, strokeDasharray: 'none', strokeOpacity: 1 }} />
        <Rect id="rect45" {...rects.rect45} style={{ fill: '#ff0000', stroke: '#000000', strokeWidth: 0.264999, strokeDasharray: 'none', strokeOpacity: 1 }} />
        <Rect id="rect46" {...rects.rect46} style={{ fill: '#0000ff', stroke: '#000000', strokeWidth: 0.264999, strokeDasharray: 'none', strokeOpacity: 1 }} />
        <Rect id="rect47" {...rects.rect47} style={{ fill: 'none', stroke: '#000000', strokeWidth: 0.423691, strokeDasharray: 'none', strokeOpacity: 1 }} />
    </Defs>
    <G transform="translate(0.25545977,-0.24633621)">
        {Object.entries(rooms).map(([roomId, room]) => {
            const rect = rects[room.rectId];
            if (!rect) return null;
            const centerX = rect.x + rect.width / 2;
            const centerY = rect.y + rect.height / 2;
            const lines = room.name.split('\n');

            return (
                <G key={roomId} transform={room.transform} onPress={() => onRoomClick(roomId)}>
                    <Use href={`#${room.rectId}`} />
                    {lines.map((line, index) => (
                        <Text
                            key={index}
                            x={centerX}
                            y={centerY + (index - (lines.length - 1) / 2) * 5}
                            fontSize="5"
                            textAnchor="middle"
                            dominantBaseline="middle"
                        >
                            {line}
                        </Text>
                    ))}
                </G>
            );
        })}
    </G>
  </G>
);

export default Floor1;
