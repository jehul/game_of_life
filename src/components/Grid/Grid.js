import React, { useState, useCallback, useRef } from "react";
import produce from "immer";

import Button from "../Button";

import "./Grid.css";

const numRows = 50;
const numCols = 80;

const operations = [
  [0, 1],
  [0, -1],
  [-1, 0],
  [1, 0],
  [1, 1],
  [-1, -1],
  [-1, 1],
  [1, -1],
];

const createEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
};

const Grid = () => {
  const [grid, setGrid] = useState(() => {
    return createEmptyGrid();
  });

  const [running, setRunning] = useState(false);

  const handleClick = (i, j) => {
    console.log(i, j);
    const newGrid = produce(grid, (gridCopy) => {
      gridCopy[i][j] = !grid[i][j];
    });
    setGrid(newGrid);
  };

  const createRandomGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(
        Array.from(Array(numCols), () => (Math.random() > 0.5 ? 1 : 0))
      );
    }
    setGrid(rows);
  };

  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const i2 = i + x;
              const j2 = j + y;
              if (i2 >= 0 && i2 < numRows && j2 >= 0 && j2 <= numCols) {
                neighbors += g[i2][j2];
              }
            });
            // DIES: fewer than 2 more than 3
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][j] = 0;
            } else if (neighbors === 3 && g[i][j] === 0) {
              gridCopy[i][j] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, 100);
  }, []);

  return (
    <React.Fragment>
      <div className="button-container">
        <Button
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
              runSimulation();
            }
          }}
        >
          {running ? "Stop" : "Start"}
        </Button>

        <Button
          onClick={() => {
            setGrid(createEmptyGrid());
          }}
        >
          Clear
        </Button>

        <Button onClick={() => createRandomGrid()}>Random</Button>
      </div>
      <div className="grid-flex-container">
        <div
          className="grid-container"
          style={{ gridTemplateColumns: `repeat(${numCols}, 10px)` }}
        >
          {grid.map((row, i) =>
            row.map((col, j) => (
              <div
                key={`${i}-${j}`}
                onClick={() => {
                  handleClick(i, j);
                }}
                className="grid-square"
                style={{ backgroundColor: grid[i][j] ? "black" : undefined }}
              ></div>
            ))
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Grid;
