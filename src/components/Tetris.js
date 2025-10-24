import React, { useEffect, useState, useRef } from 'react';
import './TetrisGrid.css';
import './LinkWrapper'
import LinkWrapper from './LinkWrapper';

const CELL_SIZE = 25;
const GRID_WIDTH = 15;
const GRID_HEIGHT = 20;

// Define Tetris block shapes
const TETROMINOES = {
  I: [[1, 1, 1, 1]],
  O: [
    [1, 1],
    [1, 1]
  ],
  L: [
    [1, 0],
    [1, 0],
    [1, 1]
  ],
  J: [
    [0, 1],
    [0, 1],
    [1, 1]
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0]
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1]
  ],
  T: [
    [1, 1, 1],
    [0, 1, 0]
  ]
};

const PUZZLE_HINTS = [
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, "L" , "L" , "T" , null, null, null, "T" , "T" , "T" , null, null, null],
  [null, null, "O" , "O" , "L" , "T" , "T" , null, "L" , "J" , "T" , "Z" , "Z" , null, null],
  [null, "T" , "O" , "O" , "L" , "T" , "L" , "L" , "L" , "J" , "J" , "J" , "Z" , "Z" , null],
  [null, "T" , "T" , "J" , "J" , "Z" , "J" , "I" , "I" , "I" , "I" , "L" , "L" , "L" , null],
  [null, "T" , "L" , "J" , "Z" , "Z" , "J" , "J" , "J" , "Z" , "Z" , "L" , "J" , "J" , null],
  [null, null, "L" , "J" , "Z" , "O" , "O" , "L" , "L" , "L" , "Z" , "Z" , "J" , null, null],
  [null, null, "L" , "L" , "T" , "O" , "O" , "L" , "I" , "I" , "I" , "I" , "J" , null, null],
  [null, null, null, "T" , "T" , "T" , "S" , "S" , "J" , "J" , "S" , "S" , null, null, null],
  [null, null, null, null, null, "S" , "S" , "T" , "J" , "S" , "S" , null, null, null, null],
  [null, null, null, null, null, null, "T" , "T" , "J" , null, null, null, null, null, null],
  [null, null, null, null, null, null, null, "T" , null, null, null, null, null, null, null],        
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
];


const blockColor = {
  I: 'cyan',
  O: 'yellow',
  T: 'purple',
  L: 'orange',
  J: 'blue',
  S: 'green',
  Z: 'red'
};


const blockCountsByType = {
  I: 2,
  O: 2,
  T: 5,
  L: 5,
  J: 5,
  S: 2,
  Z: 3
}

const startingXPosByType = {
  I: 0,
  O: 1,
  T: 5,
  L: 4,
  J: 9,
  S: 12,
  Z: 12
}

const startingYPosByType = {
  I: 0,
  O: 2,
  T: 1,
  L: 3,
  J: 1,
  S: 4,
  Z: 1
}

const initialBlocks = []

for (const [block, count] of Object.entries(blockCountsByType)) {
  for (let i = 0; i < count; i += 1) {
    initialBlocks.push({
      id: `${block}${i}`,
      shape: TETROMINOES[block],
      x: startingXPosByType[block]*CELL_SIZE,
      y: startingYPosByType[block]*CELL_SIZE
    })
  }
}

function TetrisGrid() {
  const [useColorHints, setUseColorHints] = useState(false);

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
    console.log(current)

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

  const rotateMatrixClockwise = (matrix) => {
  return matrix[0].map((_, colIndex) =>
    matrix.map(row => row[colIndex]).reverse()
  );
};

function buildBlockGrid(blocks, width, height, cellSize) {
  const grid = Array.from({ length: height }, () =>
    Array(width).fill(null)
  );

  for (const block of blocks) {
    const startX = Math.round(block.x / cellSize);
    const startY = Math.round(block.y / cellSize);

    block.shape.forEach((row, y) =>
      row.forEach((cell, x) => {
        if (cell) {
          const gridX = startX + x;
          const gridY = startY + y;
          if (
            gridY >= 0 && gridY < height &&
            gridX >= 0 && gridX < width
          ) {
            grid[gridY][gridX] = true;
          }
        }
      })
    );
  }

  return grid;
}


function isPuzzleSolved(hintGrid, blockGrid) {
  const height = hintGrid.length;
  const width = hintGrid[0].length;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const hint = hintGrid[y][x];
      const placed = blockGrid[y][x];

      if (hint && !placed) {
        return false
      }
      if (placed && hint == null) {
        return false
      }
    }
  }

  return true;
} 

  const [puzzleSolved, setPuzzleSolved] = useState(false);

  useEffect(() => {
    const blockGrid = buildBlockGrid(blocks, GRID_WIDTH, GRID_HEIGHT, CELL_SIZE);
    const solved = isPuzzleSolved(PUZZLE_HINTS, blockGrid);
    setPuzzleSolved(solved);
  }, [blocks]);



  const handleTapRotate = (blockId) => {
  setBlocks(prev => {
    const current = prev.find(b => b.id === blockId);
    if (!current) return prev;

    const samePositionBlocks = prev.filter(
      b => b.x === current.x && b.y === current.y
    );

    if (samePositionBlocks.length > 1) {
      return prev;
    }

    const rotatedShape = rotateMatrixClockwise(current.shape);

    const occupied = getOccupiedCells(prev.filter(b => b.id !== blockId));

    const isValid = isPositionValid(
      { ...current, shape: rotatedShape },
      current.x,
      current.y,
      occupied
    );

    if (!isValid) return prev; // ❌ cancel rotation

    return prev.map(b =>
      b.id === blockId
        ? { ...b, shape: rotatedShape }
        : b
    );
  });
};

const blockPositions = {};

for (const block of blocks) {
  const key = `${block.x},${block.y}`;
  if (!blockPositions[key]) {
    blockPositions[key] = [];
  }
  blockPositions[key].push(block);
}


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
  {/* {puzzleSolved ? <p>Congrats!</p> : null} */}
      
      <button
  onClick={() => setUseColorHints(prev => !prev)}
  style={{
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1000
  }}
>
  {useColorHints ? 'Hide Hint Colors' : 'Show Hint Colors'}
</button>
      {/* <button
  onClick={() => setPuzzleSolved(prev => !prev)}
  style={{
    position: 'absolute',
    top: 50,
    right: 10,
    zIndex: 1000
  }}
>
  {useColorHints ? 'Set unsolved' : 'Set solved'}
</button> */}
      <div
        className={`tetris-grid ${puzzleSolved ? '' : ''}`}
        style={{
          width: GRID_WIDTH * CELL_SIZE,
          height: GRID_HEIGHT * CELL_SIZE,
        }}
      >
        {puzzleSolved && (
  <div className="puzzle-solved-message">
  <LinkWrapper routerLink="/post-tetris-lifestyle">wow, y<mark>o</mark>u're pretty good! click here for your next hint :)</LinkWrapper>
  </div>
)}
<div className={`tetris-hint-layer ${puzzleSolved ? 'solved' : ''}`}>

  {PUZZLE_HINTS.map((row, y) =>
    row.map((cell, x) => {
      if (!cell) return null;

      const baseStyle = {
        left: x * CELL_SIZE,
        top: y * CELL_SIZE,
        opacity: 0.25
      };

      const colorStyle = useColorHints
        ? { backgroundColor: blockColor[cell] }
        : {
            backgroundColor: 'grey',
            border: '1px dashed rgba(255,255,255,0.2)'
          };

      return (
        <div
          key={`hint-${x}-${y}`}
          className="grid-hint-cell"
          style={{
            ...baseStyle,
            ...colorStyle
          }}
        />
      );
    })
  )}
</div>


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
        {blocks.map((block) => {
            const key = `${block.x},${block.y}`;
  const stackCount = blockPositions[key]?.length || 0;
  const showCount = stackCount > 1;
          return (<div
            key={`${block.id}-${block.shape.length}-${block.shape[0].length}`}
            className="tetris-block"
            style={{
              transform: `translate(${block.x}px, ${block.y}px)`,
            }}
            onClick={() => handleTapRotate(block.id)}
            onTouchEnd={(e) => {
              // Only rotate if it's a short tap (not a drag)
              if (!dragBlock.current) {
                handleTapRotate(block.id);
              }
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
                key={`${block.id}-${x}-${y}`}
                className="block-cell"
                style={{
                  left: x * CELL_SIZE,
                  top: y * CELL_SIZE,
                  background: blockColor[block.id[0] || 'T']
                }}
              />
            ) : null)))}
            {/* Count bubble */}
      {showCount && (
        <div className="block-count-bubble">
          ×{stackCount}
        </div>
      )}
          </div>)
})}
      </div>
    </div>
  );
}

export default TetrisGrid;
