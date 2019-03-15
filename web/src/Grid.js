import React, { Component } from 'react';
import Cell from './Cell'
import './App.css';

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snake: [ [10, 10], [10, 9]],
      snakeMouthPos: [10, 10],
      snakeTailPos: [10, 9],
      snakeLength: 1,
      direction: null,
      matrix: []
    };
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
    this.setMatrix([20, 20], this.state.snake)
  }
    
  handleKeyDown = (event) => {
      if (event.key.startsWith('Arrow')) {
        let matrix = this.state.matrix;
        matrix[this.state.snakeMouthPos[0]][this.state.snakeMouthPos[1]] = false;
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
    debugger
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
    console.log('newMouth', newMouth);
    snake.unshift(newMouth)
    matrix = this.setSnakeOnMatrix(this.getClearMatrix([20,20]), snake)
    this.setState({
      matrix: matrix,
      snake: snake
    })
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
