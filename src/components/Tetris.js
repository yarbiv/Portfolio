import React, { useState, useRef } from 'react';
import './TetrisGrid.css';

const CELL_SIZE = 40;
const GRID_WIDTH = 10;
const GRID_HEIGHT = 20;

// Define Tetris block shapes
const TETROMINOES = {
  I: [[1, 1, 1, 1]],
  O: [
    [1, 1],
    [1, 1],
  ],
  L: [
    [1, 0],
    [1, 0],
    [1, 1],
  ],
};

// Generate initial blocks with position
const initialBlocks = Object.entries(TETROMINOES).map(([name, shape], idx) => ({
  id: name,
  shape,
  x: 0,
  y: idx * 100, // offset so they don't overlap
}));

function TetrisGrid() {
  const [blocks, setBlocks] = useState(initialBlocks);
  const dragBlock = useRef(null);
  const offset = useRef({ x: 0, y: 0 });

  const getOccupiedCells = (blocks) => {
    const cells = new Set();

    blocks.forEach((block) => {
      const { x, y, shape } = block;
      const gridX = x / CELL_SIZE;
      const gridY = y / CELL_SIZE;

      shape.forEach((row, dy) => {
        row.forEach((cell, dx) => {
          if (cell) {
            const cx = gridX + dx;
            const cy = gridY + dy;
            cells.add(`${cx},${cy}`);
          }
        });
      });
    });

    return cells;
  };

  const isPositionValid = (block, x, y, occupied) => {
    const gridX = x / CELL_SIZE;
    const gridY = y / CELL_SIZE;

    for (let dy = 0; dy < block.shape.length; dy++) {
      for (let dx = 0; dx < block.shape[0].length; dx++) {
        if (block.shape[dy][dx]) {
          const cx = gridX + dx;
          const cy = gridY + dy;

          const isOutOfBounds = cx < 0 || cx >= GRID_WIDTH
          || cy < 0 || cy >= GRID_HEIGHT;

          if (isOutOfBounds || occupied.has(`${cx},${cy}`)) {
            return false;
          }
        }
      }
    }

    return true;
  };

  const findNearestValidPosition = (block, startX, startY, occupied) => {
    const maxRange = 10; // cells to search outward

    for (let radius = 0; radius < maxRange; radius++) {
      for (let dx = -radius; dx <= radius; dx++) {
        for (let dy = -radius; dy <= radius; dy++) {
          const testX = startX + dx * CELL_SIZE;
          const testY = startY + dy * CELL_SIZE;

          const snappedX = Math.round(testX / CELL_SIZE) * CELL_SIZE;
          const snappedY = Math.round(testY / CELL_SIZE) * CELL_SIZE;

          if (isPositionValid(block, snappedX, snappedY, occupied)) {
            return { x: snappedX, y: snappedY };
          }
        }
      }
    }

    return null;
  };

  const startDrag = (clientX, clientY, id) => {
    const block = blocks.find((b) => b.id === id);
    if (!block) return;

    dragBlock.current = block;
    offset.current = {
      x: clientX - block.x,
      y: clientY - block.y,
    };
  };

  const handleMove = (clientX, clientY) => {
    const { current } = dragBlock;
    if (!current) return;

    const newX = clientX - offset.current.x;
    const newY = clientY - offset.current.y;
    console.log(newX, newY);

    setBlocks((prev) => prev.map((block) => (block.id === current.id
      ? { ...block, x: newX, y: newY }
      : block)));
  };

  const handleMouseUp = () => {
    const oldPos = dragBlock.current;

    if (!oldPos) return;

    const filtered = blocks.filter((block) => block.id === oldPos.id);
    console.log(filtered);
    if (filtered.length !== 1) return;

    const current = filtered[0];

    // Calculate snapped position first
    const initialX = Math.round(current.x / CELL_SIZE) * CELL_SIZE;
    const initialY = Math.round(current.y / CELL_SIZE) * CELL_SIZE;

    const occupied = getOccupiedCells(blocks.filter((b) => b.id !== current.id));
    const valid = isPositionValid(current, initialX, initialY, occupied);
    let finalX = initialX;
    let finalY = initialY;

    if (!valid) {
      const nearest = findNearestValidPosition(current, initialX, initialY, occupied);
      if (nearest) {
        finalX = nearest.x;
        finalY = nearest.y;
      } else {
      // No valid position found — keep original or reject drop
        dragBlock.current = null;
        return;
      }
    }

    // Update blocks safely
    setBlocks((prev) => prev.map((block) => (block.id === current.id
      ? { ...block, x: finalX, y: finalY }
      : block)));

    // Null the drag reference after
    dragBlock.current = null;
  };

  return (
    <div
      className="tetris-container"
      onMouseUp={handleMouseUp}
      onMouseMove={(e) => {
        e.preventDefault();
        handleMove(e.clientX, e.clientY);
      }}

      onTouchMove={(e) => {
        e.preventDefault();
        const touch = e.touches[0];
        handleMove(touch.clientX, touch.clientY);
      }}
      onTouchEnd={handleMouseUp}
    >
      <div
        className="tetris-grid"
        style={{
          width: GRID_WIDTH * CELL_SIZE,
          height: GRID_HEIGHT * CELL_SIZE,
        }}
      >
        {/* Grid lines (optional) */}
        {[...Array(GRID_HEIGHT)].map((_, y) => [...Array(GRID_WIDTH)].map((_, x) => (
          <div
            key={`${x}-${y}`}
            className="grid-cell"
            style={{
              left: x * CELL_SIZE,
              top: y * CELL_SIZE,
            }}
          />
        )))}

        {/* Render draggable blocks */}
        {blocks.map((block) => (
          <div
            key={block.id}
            className="tetris-block"
            style={{
              transform: `translate(${block.x}px, ${block.y}px)`,
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              startDrag(e.clientX, e.clientY, block.id);
            }}
            onTouchStart={(e) => {
              e.preventDefault();
              const touch = e.touches[0];
              startDrag(touch.clientX, touch.clientY, block.id);
            }}
          >
            {block.shape.map((row, y) => row.map((cell, x) => (cell ? (
              <div
                key={`${x}-${y}`}
                className="block-cell"
                style={{
                  left: x * CELL_SIZE,
                  top: y * CELL_SIZE,
                }}
              />
            ) : null)))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TetrisGrid;
