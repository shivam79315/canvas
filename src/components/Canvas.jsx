import React, { useState } from "react";
import { Stage, Layer, Arrow } from "react-konva";
import Card from "./Card";
import "../componentStyles/canvas.css";

const Canvas = () => {
  const [cards, setCards] = useState([]);
  const [arrows, setArrows] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const addCard = () => {
    const newCard = {
      id: cards.length + 1,
      x: 50,
      y: 50,
      width: 150,
      height: 100,
      text: "This is a card with some dummy text. Click show more to view the full text.",
    };
    setCards([...cards, newCard]);
  };

  const handleShowMore = (card) => {
    setSelectedCard(card);
  };

  const closePopup = () => {
    setSelectedCard(null);
  };

  return (
    <div>
      <button onClick={addCard}>
      <i class="fa-solid fa-plus"></i>
      </button>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {cards.map((card) => (
            <Card key={card.id} card={card} onShowMore={handleShowMore} />
          ))}
          {arrows.map((arrow, index) => (
            <Arrow
              key={index}
              points={[arrow.startX, arrow.startY, arrow.endX, arrow.endY]}
              stroke="black"
            />
          ))}
        </Layer>
      </Stage>

      {selectedCard && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Card Details</h2>
            <p>{selectedCard.text}</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Canvas;
