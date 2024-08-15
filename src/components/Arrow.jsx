import React from 'react';
import { Arrow as KonvaArrow, Circle } from 'react-konva';

const Arrow = ({ arrow, onDragStart, onDragMove, onDragEnd, zIndex }) => {
  return (
    <>
      <KonvaArrow
        points={[arrow.startX, arrow.startY, arrow.endX, arrow.endY]}
        stroke="black"
        strokeWidth={2}
        onDragStart={onDragStart}
        onDragMove={onDragMove}
        onDragEnd={onDragEnd}
        hitStrokeWidth={20} // Makes the dragging area larger
        draggable
        zIndex={zIndex}
      />
      <Circle
        Y={arrow.endY}
        X={arrow.endX}
        radius={5}
        fill="lightcoral"
        draggable
        onDragMove={onDragMove}
        zIndex={zIndex}
      />
    </>
  );
};

export default Arrow;
