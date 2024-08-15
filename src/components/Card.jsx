import React, { useState } from 'react';
import { Rect, Text, Group } from 'react-konva';

const Card = ({ card, onShowMore, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [cardSize, setCardSize] = useState({ width: card.width, height: card.height });

  const handleShowMore = () => {
    setIsExpanded(!isExpanded);
    onShowMore(card); // Maintain global modal logic
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
        y={card.y + 20}
        text={isExpanded ? card.text : `${card.text.slice(0, 30)}...`}
        width={cardSize.width - 20}
        height={cardSize.height - 60}
        fontSize={14}
        fill="black"
        align="justify"
        wrap="word"
      />

      <Text
        x={card.x + cardSize.width - 80}
        y={card.y + cardSize.height - 40}
        text="Show More"
        fill="blue"
        onClick={handleShowMore}
        fontStyle="italic"
        cursor="pointer"
      />

      <Text
        x={card.x + cardSize.width - 80}
        y={card.y + cardSize.height - 20}
        text="Delete"
        fill="lightcoral"
        onClick={() => onDelete(card.id)}
        fontStyle="italic"
        cursor="pointer"
      />

      <Text
        x={card.x + 30}
        y={card.y + 5}
        text="+"
        fill="green"
        fontSize={32}
        onClick={() => handleResize('increase')}
        cursor="pointer"
      />

      <Text
        x={card.x + 10}
        y={card.y + 3}
        text="-"
        fill="red"
        fontSize={32}
        onClick={() => handleResize('decrease')}
        cursor="pointer"
      />
    </Group>
  );
};

export default Card;
