'use client';

import { Component } from 'react';
import Cell from './Cell';
import 'bootstrap/dist/css/bootstrap.min.css';

type Direction = 'Right' | 'Left' | 'Up' | 'Down' | null;
type Matrix = number[][];
type Coords = [number, number];

interface GridState {
  gridSize: [number, number];
  snakeSpeed: number;
  snake: Coords[];
  foodPos: Coords;
  direction: Direction;
  matrix: Matrix;
  points: number;
}

export default class Grid extends Component<Record<string, never>, GridState> {
  interval: ReturnType<typeof setInterval> | null = null;

  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      gridSize: [15, 15],
      snakeSpeed: 200,
      snake: [[10, 10]],
      foodPos: [0, 0],
      direction: null,
      matrix: [],
      points: 0,
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    this.initializeMatrix(this.state.gridSize, this.state.snake);
    this.interval = setInterval(
      () => this.moveSnake(this.state.direction),
      this.state.snakeSpeed
    );
  }

  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval);
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event: KeyboardEvent) => {
    if (event.key.startsWith('Arrow')) {
      let newDirection: Direction;
      const direction = this.state.direction;
      const key = event.key.split('Arrow')[1] as 'Right' | 'Left' | 'Up' | 'Down';

      if (key === 'Right' && direction !== 'Left') {
        newDirection = 'Right';
      } else if (key === 'Left' && direction !== 'Right') {
        newDirection = 'Left';
      } else if (key === 'Up' && direction !== 'Down') {
        newDirection = 'Up';
      } else if (key === 'Down' && direction !== 'Up') {
        newDirection = 'Down';
      } else {
        newDirection = direction;
      }

      this.setState({ direction: newDirection });
    }
  };

  initializeMatrix(dimensions: [number, number], snake: Coords[]) {
    let matrix: Matrix = Array(dimensions[0])
      .fill(null)
      .map(() => Array(dimensions[1]).fill(0));
    matrix = this.setRandomFoodOnMatrix(matrix);
    snake.forEach((seg) => {
      matrix = this.setCell(matrix, seg, 1);
    });
    this.setState({ matrix, snake });
  }

  getClearMatrix(dimensions: [number, number]): Matrix {
    return Array(dimensions[0])
      .fill(null)
      .map(() => Array(dimensions[1]).fill(0));
  }

  reInitializeMatrix(matrix: Matrix, snake: Coords[], foodPos: Coords): Matrix {
    snake.forEach((seg) => {
      matrix = this.setCell(matrix, seg, 1);
    });
    matrix = this.setfoodPosOnMatrix(matrix, foodPos);
    return matrix;
  }

  setCell(matrix: Matrix, coordinates: Coords, value: number): Matrix {
    matrix[coordinates[0]][coordinates[1]] = value;
    return matrix;
  }

  moveSnake(direction: Direction) {
    let { snake, matrix, foodPos, gridSize, points } = this.state;
    const mouthPos = snake[0];
    let nextMouth: Coords;

    if (!direction) return;

    if (direction === 'Right') nextMouth = [mouthPos[0], mouthPos[1] + 1];
    else if (direction === 'Left') nextMouth = [mouthPos[0], mouthPos[1] - 1];
    else if (direction === 'Up') nextMouth = [mouthPos[0] - 1, mouthPos[1]];
    else nextMouth = [mouthPos[0] + 1, mouthPos[1]];

    nextMouth = this.adjustForOutOfBounds(nextMouth, gridSize);

    if (this.getCellId(nextMouth) === this.getCellId(foodPos)) {
      snake.unshift(nextMouth);
      foodPos = this.generateRandomFoodPos(gridSize);
      points += 1;
    } else if (snake.map((seg) => this.getCellId(seg)).includes(this.getCellId(nextMouth))) {
      snake = [[10, 10]];
      foodPos = this.generateRandomFoodPos(gridSize);
      direction = null;
      points = 0;
    } else {
      snake.pop();
      snake.unshift(nextMouth);
    }

    matrix = this.reInitializeMatrix(this.getClearMatrix(gridSize), snake, foodPos);
    this.setState({ matrix, snake, foodPos, direction, points });
  }

  getCellId(coords: Coords): string {
    return coords[0].toString() + coords[1].toString();
  }

  adjustForOutOfBounds(mouthPos: Coords, gridSize: [number, number]): Coords {
    if (mouthPos[0] === -1) {
      mouthPos[0] = gridSize[0] - 1;
    } else if (mouthPos[0] === gridSize[0]) {
      mouthPos[0] = 0;
    } else if (mouthPos[1] === -1) {
      mouthPos[1] = gridSize[1] - 1;
    } else if (mouthPos[1] === gridSize[1]) {
      mouthPos[1] = 0;
    }
    return mouthPos;
  }

  setRandomFoodOnMatrix(matrix: Matrix): Matrix {
    const foodPos = this.generateRandomFoodPos([matrix.length, matrix[0].length]);
    if (matrix[foodPos[0]][foodPos[1]] === 0) {
      matrix[foodPos[0]][foodPos[1]] = 2;
      this.setState({ foodPos });
    } else {
      matrix = this.setRandomFoodOnMatrix(matrix);
    }
    return matrix;
  }

  setfoodPosOnMatrix(matrix: Matrix, foodPos: Coords): Matrix {
    matrix[foodPos[0]][foodPos[1]] = 2;
    return matrix;
  }

  generateRandomFoodPos(gridSize: [number, number]): Coords {
    return [
      Math.floor(Math.random() * gridSize[0]),
      Math.floor(Math.random() * gridSize[1]),
    ];
  }

  render() {
    const dimensions: [number, number] = [15, 15];
    const gridContainerStyle = {
      gridTemplateColumns: '40px '.repeat(dimensions[0]),
    };
    const containerStyle = {
      height: typeof window !== 'undefined' ? window.innerHeight : '100vh',
    };

    const getGridItems = (matrix: Matrix) =>
      matrix.map((row, rIndex) =>
        row.map((cellValue, cIndex) => (
          <Cell
            key={`${rIndex}${cIndex}`}
            id={`${rIndex}${cIndex}`}
            row={rIndex}
            col={cIndex}
            cellValue={cellValue}
          />
        ))
      );

    return (
      <div className="container" style={containerStyle}>
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
            <div
              className="grid-container"
              style={gridContainerStyle}
              onKeyDown={this.handleKeyDown as unknown as React.KeyboardEventHandler}
            >
              {getGridItems(this.state.matrix)}
            </div>
          </div>
          <div className="col-2"></div>
        </div>
        <div className="row">
          <div className="col-4" />
          <div className="col-3">
            <h1>Points: {this.state.points}</h1>
          </div>
          <div className="col-5" />
        </div>
      </div>
    );
  }
}
