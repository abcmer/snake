import React, { Component } from 'react';
import Cell from './Cell'
import './App.css';

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridSize: [20, 20],
      snakeSpeed: 300,
      snake: [ [10, 10] ],      
      foodPos: [],
      direction: null,
      matrix: [],
      points: 0
    };
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
    this.initializeMatrix(this.state.gridSize, this.state.snake)
    this.interval = setInterval(() => this.moveSnake(this.state.direction), this.state.snakeSpeed);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
    
  handleKeyDown = (event) => {
      if (event.key.startsWith('Arrow')) {
        let matrix = this.state.matrix;
        let newDirection

        let direction = this.state.direction;
                
        if (event.key.split('Arrow')[1] === 'Right' && direction !== 'Left') {
          newDirection = event.key.split('Arrow')[1]          
        } else if (event.key.split('Arrow')[1] === 'Left' && direction !== 'Right') {          
          newDirection = event.key.split('Arrow')[1]          
        } else if (event.key.split('Arrow')[1] === 'Up' && direction !== 'Down') { 
          newDirection = event.key.split('Arrow')[1]          
        } else if (event.key.split('Arrow')[1] === 'Down' && direction !== 'Up') {          
          newDirection = event.key.split('Arrow')[1]          
        } else {
          newDirection = direction
        }

        this.setState({
          direction: newDirection
        })     
      }
  }

  initializeMatrix(dimensions, snake) {
    let matrix = Array(dimensions[0]).fill().map((_,r) => {
      return Array(dimensions[1]).fill().map((_,c) => {
          return 0 // 0 = background
        })
      }
    )
    matrix = this.setRandomFoodOnMatrix(matrix)
    snake.forEach(seg => {
      matrix = this.setCell(matrix,seg,1)
    })

    this.setState({
      matrix: matrix,
      snake: snake
    })
  }

  getClearMatrix(dimensions) {
    let matrix = Array(dimensions[0]).fill().map((_,r) => {
      return Array(dimensions[1]).fill().map((_,c) => {
          return 0
        })
      }
    )
    return matrix
  }
  
  reInitializeMatrix(matrix, snake, foodPos) {
    snake.forEach(seg => {
      matrix = this.setCell(matrix,seg,1)
    })

    // Set food
    matrix = this.setfoodPosOnMatrix(matrix, foodPos)
    return matrix
  }
    
  setCell(matrix, coordinates, value) {
    matrix[coordinates[0]][coordinates[1]] = value
    return matrix
  }

  moveSnake(direction) {    
    let { snake, matrix, foodPos, gridSize, points } = this.state;    
    const mouthPos = snake[0]    
    let nextMouth

    if (!direction) {
      return null
    }

    if (direction === 'Right') {
      nextMouth = [mouthPos[0], mouthPos[1] + 1]
    }
    if (direction === 'Left') {          
      nextMouth = [mouthPos[0], mouthPos[1] - 1]          
    }   
    if (direction === 'Up') {          
      nextMouth = [mouthPos[0] - 1, mouthPos[1]]          
    }  
    if (direction === 'Down') {          
      nextMouth = [mouthPos[0] + 1, mouthPos[1]]
    }

    nextMouth = this.adjustForOutOfBounds(nextMouth, this.state.gridSize)

    if (this.getCellId(nextMouth) === this.getCellId(foodPos)) {
      // Update mouth of snake to nextMouth
      // Reset Food
      // Add 1 point
      snake.unshift(nextMouth)      
      foodPos = this.generateRandomFoodPos(gridSize)   
      points += 1  
    } else if (snake.map(seg => this.getCellId(seg)).includes(this.getCellId(nextMouth))) {
      // Reset the game back to default
      snake = [[10, 10]];
      foodPos = this.generateRandomFoodPos(gridSize);
      direction = null;
      points = 0
    } else {
      // Otherwise just remove tail and add it to nextMouth
      // to simulate movement of the snake.
      snake.pop(0)
      snake.unshift(nextMouth)
      
    }        
    matrix = this.reInitializeMatrix(this.getClearMatrix(gridSize), snake, foodPos)
    this.setState({
      matrix,
      snake,
      foodPos,
      direction,
      points
    })
  }

  getCellId(coords) {
    return coords[0].toString() + coords[1].toString()
  }

  adjustForOutOfBounds(mouthPos, gridSize) {
    // TODO dynamically use state.gridSize
    
    if (mouthPos[0] === -1) {
      // Adjust for out of bounds Up
      mouthPos[0] = gridSize[0] -1
    } else if (mouthPos[0] === gridSize[0]) {
      // Adjust for out of bounds Down
      mouthPos[0] = 0
    } else if (mouthPos[1] === -1) {
      // Adjust for out of bounds Left
      mouthPos[1] = gridSize[1] -1
    } else if (mouthPos[1] === gridSize[1]) {
      mouthPos[1] = 0
    }
    return mouthPos
  }

  setRandomFoodOnMatrix(matrix) {
    // Random food location is generated. If that location is blank set the food.
    // But if that location is taken by the snake, then recursively run 
    // this function again.
    const foodPos = this.generateRandomFoodPos([matrix.length, matrix[0].length])
    if (matrix[foodPos[0]][foodPos[1]] === 0) {
      matrix[foodPos[0]][foodPos[1]] = 2 // 2 = food
      this.setState({
        foodPos: foodPos
      })
    } else {
      matrix = this.setRandomFoodOnMatrix(matrix)
    }      
    return matrix
  }  

  setfoodPosOnMatrix(matrix, foodPos) {
    matrix[foodPos[0]][foodPos[1]] = 2   
    return matrix
  }

  generateRandomFoodPos(gridSize) {
    return [Math.floor(Math.random() * gridSize[0]), Math.floor(Math.random() * gridSize[1])]
  }

  render() {

    const dimensions = [20, 20]

    const gridContainerStyle = {
      gridTemplateColumns: '40px '.repeat(dimensions[0])
    }
    
    const getGridItems = (matrix) => {
      return matrix.map((row, rIndex) => {
        return row.map((cellValue, cIndex) => {
          return <Cell row={rIndex} col={cIndex} cellValue={cellValue} />
        })
      })
    }
    
    return (
      <div className="game">
        <div className="grid-container" style={gridContainerStyle} onKeyDown={this.handleKeyDown} >
          {getGridItems(this.state.matrix)}
        </div>
        <h1>Points: {this.state.points}</h1>
      </div>
      
    );
  }
}

export default Grid;
