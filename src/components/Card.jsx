import React, { useState } from 'react';
import { Rect, Text, Group } from 'react-konva';

const Card = ({ card, onShowMore }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [cardSize, setCardSize] = useState({ width: card.width, height: card.height });

  const handleShowMore = () => {
    setIsExpanded(!isExpanded);
    onShowMore(card);
  };

  const handleResize = (action) => {
    const increment = 20;
    const maxSize = { width: 400, height: 300 };
    const minSize = { width: 100, height: 80 };

    let newWidth = cardSize.width;
    let newHeight = cardSize.height;

    if (action === 'increase') {
      if (newWidth < maxSize.width && newHeight < maxSize.height) {
        newWidth += increment;
        newHeight += increment;
      }
    } else if (action === 'decrease') {
      if (newWidth > minSize.width && newHeight > minSize.height) {
        newWidth -= increment;
        newHeight -= increment;
      }
    }

    setCardSize({ width: newWidth, height: newHeight });
  };

  return (
    <Group draggable>
      <Rect
        x={card.x}
        y={card.y}
        width={cardSize.width}
        height={cardSize.height}
        cornerRadius={10}
        fillLinearGradientStartPoint={{ x: 0, y: 0 }}
        fillLinearGradientEndPoint={{ x: cardSize.width, y: cardSize.height }}
        fillLinearGradientColorStops={[0, 'lightblue', 1, 'blue']}
        shadowBlur={10}
        shadowOpacity={0.6}
      />
      
      <Text
        x={card.x + 10}
        y={card.y + 50}
        text={isExpanded ? card.text : card.text.slice(0, 30) + '...'}
        width={cardSize.width - 20}
        height={cardSize.height - 60}
        fontSize={14}
        fill="black"
        align="justify"
        wrap="word"
      />

      <Text
        x={card.x + cardSize.width - 30}
        y={card.y + cardSize.height - 40}
        text="Show More"
        fill="blue"
        onClick={handleShowMore}
      />

      <Text
        x={card.x + cardSize.width - 30}
        y={card.y + cardSize.height - 80}
        text="+" 
        fill="green"
        fontSize={32}
        onClick={() => handleResize('increase')}
      />

      <Text
        x={card.x + cardSize.width - 70}
        y={card.y + cardSize.height - 80}
        text="-" 
        fill="red"
        fontSize={32}
        onClick={() => handleResize('decrease')}
      />
    </Group>
  );
};

export default Card;
