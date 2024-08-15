// src/components/Card.js
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
    const increment = 20; // Increment or decrement value for resizing
    const maxSize = { width: 400, height: 300 }; // Maximum size for the card
    const minSize = { width: 100, height: 80 }; // Minimum size for the card

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
        fill="lightblue"
      />
      
      <Text
        x={card.x + 10}
        y={card.y + cardSize.height - 40}
        text="Show More"
        fill="blue"
        onClick={handleShowMore}
      />
      <Text
        x={card.x + 20}
        y={card.y + 3}
        text="+"
        fill="green"
        fontSize={32}
        onClick={() => handleResize('increase')}
      />
      <Text
        x={card.x}
        y={card.y}
        text="-"
        fill="red"
        fontSize={32}
        onClick={() => handleResize('decrease')}
      />
      <Text
        x={card.x + 10}
        y={card.y + 70}
        text={isExpanded ? card.text : card.text.slice(0, 10) + '...'}
      />
    </Group>
  );
};

export default Card;
