import React from 'react';
import { Stage, Text, Layer } from 'react-konva';
import '../componentStyles/practice.css'

const Practice = () => {
  return (
    <>
    <Stage className='stageContainer' width={window.innerWidth} height={window.innerHeight}>
        <Layer>
            <Text className='text' fontSize={20} text='Hello' x={50} y={50} />
        </Layer>
    </Stage>
    </>
  )
}

export default Practice;