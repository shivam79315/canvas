import React from 'react';
import { Line, Circle, Group } from 'react-konva';

const Arrow = ({ arrow, onDragStart, onDragMove, onDragEnd }) => {
  const { startX, startY, endX, endY } = arrow;

  // Calculate the position of the dot tip
  const arrowVectorX = endX - startX;
  const arrowVectorY = endY - startY;

  // Normalize the vector to ensure the dot is placed at the arrow tip
  const magnitude = Math.sqrt(arrowVectorX ** 2 + arrowVectorY ** 2);
  const unitVectorX = arrowVectorX / magnitude;
  const unitVectorY = arrowVectorY / magnitude;

  // Calculate the position for the dot
  const dotX = endX + unitVectorX * 5; // Offset by 5 units to stay attached at the tip
  const dotY = endY + unitVectorY * 5;

  return (
    <Group
      draggable
      onDragStart={onDragStart}
      onDragMove={onDragMove}
      onDragEnd={onDragEnd}
    >
      <Line
        points={[startX, startY, endX, endY]}
        stroke="black"
        strokeWidth={2}
        lineCap="round"
        lineJoin="round"
      />
      <Circle
        x={dotX}
        y={dotY}
        radius={5}
        fill="lightcoral"
        draggable={false}
      />
    </Group>
  );
};

export default Arrow;
