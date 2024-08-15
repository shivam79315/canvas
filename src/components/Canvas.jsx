import React, { useState } from 'react';
import { Stage, Layer } from 'react-konva';
import Card from './Card';
import Arrow from './Arrow';
import '../componentStyles/canvas.css';

const Canvas = () => {
  const [cards, setCards] = useState([]);
  const [arrows, setArrows] = useState([]);
  const [draggingItem, setDraggingItem] = useState(null);
  const [deleteBoxHovered, setDeleteBoxHovered] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const addCard = () => {
    const newCard = {
      id: cards.length + 1,
      x: 50,
      y: 50,
      width: 150,
      height: 100,
      text: "This is a card with some dummy text. Lorem Ipsum...",
    };
    setCards([...cards, newCard]);
  };

  const addArrow = () => {
    const newArrow = {
      id: arrows.length + 1,
      startX: 200,
      startY: 200,
      endX: 300,
      endY: 300,
    };
    setArrows([...arrows, newArrow]);
  };

  const handleDragStart = (item) => {
    setDraggingItem(item);
    setDeleteBoxHovered(false);
  };

  const handleDragEnd = (e) => {
    if (deleteBoxHovered && draggingItem) {
      if (draggingItem.type === "card") {
        setCards(cards.filter((card) => card.id !== draggingItem.id));
      } else if (draggingItem.type === "arrow") {
        setArrows(arrows.filter((arrow) => arrow.id !== draggingItem.id));
      }
    }
    setDraggingItem(null);
    setDeleteBoxHovered(false);
  };

  const handleDragMove = (e) => {
    const { clientX, clientY } = e.evt;
    checkDeleteBoxHover(clientX, clientY);
  };

  const checkDeleteBoxHover = (x, y) => {
    const deleteBox = document.getElementById("delete-box");
    if (!deleteBox) return;

    const rect = deleteBox.getBoundingClientRect();
    const isHovered = (
      x > rect.left &&
      x < rect.right &&
      y > rect.top &&
      y < rect.bottom
    );
    setDeleteBoxHovered(isHovered);
  };

  const renderCards = () => {
    return cards.map((card) => (
      <Card
        key={card.id}
        card={card}
        onDragStart={() => handleDragStart({ type: "card", id: card.id })}
        onDragEnd={handleDragEnd}
        onDragMove={handleDragMove}
        onShowMore={(card) => setSelectedCard(card)}
        zIndex={10}
      />
    ));
  };

  const renderArrows = () => {
    return arrows.map((arrow) => (
      <Arrow
        key={arrow.id}
        arrow={arrow}
        onDragStart={() => handleDragStart({ type: "arrow", id: arrow.id })}
        onDragMove={(e) => {
          const newArrows = [...arrows];
          const index = arrows.findIndex((a) => a.id === arrow.id);
          newArrows[index].endX = e.target.x();
          newArrows[index].endY = e.target.y();
          setArrows(newArrows);
          handleDragMove(e);
        }}
        onDragEnd={handleDragEnd}
        zIndex={10}
      />
    ));
  };

  return (
    <div>
      <button onClick={addCard}>
        <i className="fa-solid fa-plus"> Add Card</i>
      </button>
      <button onClick={addArrow}>
        <i className="fa-solid fa-arrow-right"> Add Arrow</i>
      </button>

      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ zIndex: 10, position: "relative" }}
      >
        <Layer>{renderCards()}</Layer>
        <Layer>{renderArrows()}</Layer>
      </Stage>

      {/* Delete Box */}
      <div
        id="delete-box"
        style={{
          position: "fixed",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "150px",
          height: "100px",
          backgroundColor: deleteBoxHovered ? "red" : "gray",
          textAlign: "center",
          lineHeight: "100px",
          color: "white",
          fontWeight: "bold",
          zIndex: 5, // Lower zIndex to ensure it's behind cards and arrows
        }}
      >
        Drag Here to Delete
      </div>

      {selectedCard && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Card Details</h2>
            <p>{selectedCard.text}</p>
            <button onClick={() => setSelectedCard(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Canvas;
