import React, { Component } from 'react';
import Cell from './Cell'
import './App.css';

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridSize: [20, 20],
      snake: [ [10, 10], [10, 9]],
      mouthPos: [10, 10],
      tailPos: [10, 9],
      snakeLength: 1,
      direction: null,
      matrix: []
    };
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
    this.setMatrix(this.state.gridSize, this.state.snake)
  }
    
  handleKeyDown = (event) => {
      if (event.key.startsWith('Arrow')) {
        let matrix = this.state.matrix;
        matrix[this.state.mouthPos[0]][this.state.mouthPos[1]] = false;
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

  setMatrix(dimensions, snake) {
    let matrix = Array(dimensions[0]).fill().map((_,r) => {
      return Array(dimensions[1]).fill().map((_,c) => {
          return false
        })
      }
    )
    snake.forEach(seg => {
      matrix = this.toggleCell(matrix,seg)
    })

    this.setState({
      matrix: matrix,
      snake: snake
    })
  }

  getClearMatrix(dimensions) {
    let matrix = Array(dimensions[0]).fill().map((_,r) => {
      return Array(dimensions[1]).fill().map((_,c) => {
          return false
        })
      }
    )
    return matrix
  }

  setSnakeOnMatrix(matrix, snake) {
    snake.forEach(seg => {
      matrix = this.toggleCell(matrix,seg)
    })
    return matrix
  }

  toggleCell(matrix, coordinates) {
    matrix[coordinates[0]][coordinates[1]] = true
    return matrix
  }

  growSnake() {
    debugger;
  }

  moveSnake(direction) {    
    let snake = this.state.snake;
    const mouth = snake[0]

    let matrix = this.state.matrix;    
    snake.pop(0)
    let newMouth

    if (direction === 'Right') {
      newMouth = [mouth[0], mouth[1] + 1]
    }
    if (direction === 'Left') {          
      newMouth = [mouth[0], mouth[1] - 1]          
    }   
    if (direction === 'Up') {          
      newMouth = [mouth[0] - 1, mouth[1]]          
    }  
    if (direction === 'Down') {          
      newMouth = [mouth[0] + 1, mouth[1]]
    }
    
    newMouth = this.adjustForOutOfBounds(newMouth, this.state.gridSize)

    console.log('newMouth', newMouth);
    snake.unshift(newMouth)
    matrix = this.setSnakeOnMatrix(this.getClearMatrix([20,20]), snake)
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

  render() {

    const dimensions = [20, 20]

    const gridContainerStyle = {
      gridTemplateColumns: '40px '.repeat(dimensions[0])
    }
    
    const getGridItems = (matrix) => {
      return matrix.map((row, rIndex) => {
        return row.map((isActiveCell, cIndex) => {
          return <Cell row={rIndex} col={cIndex} active={isActiveCell} />
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
