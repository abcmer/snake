import React, { Component } from 'react';
import Cell from './Cell'
import './App.css';

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridSize: [20, 20],
      snake: [ [10, 10], [10, 9]],
      foodCoords: [],
      mouthPos: [10, 10],
      snakeLength: 1,
      direction: null,
      matrix: []
    };
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
    this.initializeMatrix(this.state.gridSize, this.state.snake)
  }
    
  handleKeyDown = (event) => {
      if (event.key.startsWith('Arrow')) {
        let matrix = this.state.matrix;
        let newDirection

        let direction = this.state.direction;

        console.log(this.state.direction);  
                
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

        this.moveSnake(newDirection)         
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
  
  reInitializeMatrix(matrix, snake, foodCoords) {
    snake.forEach(seg => {
      matrix = this.setCell(matrix,seg,1)
    })

    // Set food
    matrix = this.setFoodCoordsOnMatrix(matrix, foodCoords)
    return matrix
  }
    
  setCell(matrix, coordinates, value) {
    matrix[coordinates[0]][coordinates[1]] = value
    return matrix
  }

  growSnake() {
    debugger;
  }

  moveSnake(direction) {    
    let snake = this.state.snake;
    const mouthPos = snake[0]

    let matrix = this.state.matrix;    
    snake.pop(0)
    let newMouth

    if (direction === 'Right') {
      newMouth = [mouthPos[0], mouthPos[1] + 1]
    }
    if (direction === 'Left') {          
      newMouth = [mouthPos[0], mouthPos[1] - 1]          
    }   
    if (direction === 'Up') {          
      newMouth = [mouthPos[0] - 1, mouthPos[1]]          
    }  
    if (direction === 'Down') {          
      newMouth = [mouthPos[0] + 1, mouthPos[1]]
    }
    
    newMouth = this.adjustForOutOfBounds(newMouth, this.state.gridSize)

    console.log('newMouth', newMouth);
    snake.unshift(newMouth)
    matrix = this.reInitializeMatrix(this.getClearMatrix(this.state.gridSize), snake, this.state.foodCoords)
    this.setState({
      matrix: matrix,
      snake: snake
    })
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
    const foodCoords = [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)]
    this.setState({
      foodCoords: foodCoords
    })
    matrix[foodCoords[0]][foodCoords[1]] = 2   
    return matrix
  }  

  setFoodCoordsOnMatrix(matrix, foodCoords) {
    matrix[foodCoords[0]][foodCoords[1]] = 2   
    return matrix
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
      <div className="grid-container" style={gridContainerStyle} onKeyDown={this.handleKeyDown} >
        {getGridItems(this.state.matrix)}
      </div>
    );
  }
}

export default Grid;
