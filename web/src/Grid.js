import React, { Component } from 'react';
import Cell from './Cell'
import './App.css';

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snakeMouth:169,
      snakeMouthPos: [10, 10],
      snakeLength: 1,
      direction: null,
      matrix: []
    };
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
    this.setMatrix([20, 20])
  }
    
  handleKeyDown = (event) => {
      if (event.key.startsWith('Arrow')) {
        let matrix = this.state.matrix;
        matrix[this.state.snakeMouthPos[0]][this.state.snakeMouthPos[1]] = false;
        this.setState({
          direction: event.key.split('Arrow')[1]
        })
        console.log(this.state.direction);  
        let snakeMouthPos = this.state.snakeMouthPos;  
        if (this.state.direction === 'Right') {          
          snakeMouthPos[1] += 1;          
        }
        if (this.state.direction === 'Left') {          
          snakeMouthPos[1] -= 1;          
        }   
        if (this.state.direction === 'Up') {          
          snakeMouthPos[0] -= 1;          
        }  
        if (this.state.direction === 'Down') {          
          snakeMouthPos[0] += 1;
        }

        // Set mouth cell active
        matrix[this.state.snakeMouthPos[0]][this.state.snakeMouthPos[1]] = true;

        console.log(this.state.snakeMouthPos)  
        this.setState({
          snakeMouthPos: snakeMouthPos,
          matrix: matrix
        })               
      }



      // rowIndex = this.state.snakeMouthPos[0];
      // colIndex = this.state.snakeMouthPos[1];
      // matrix[row][col] = true;
  }

  setMatrix(dimensions) {
    const matrix = Array(dimensions[0]).fill().map((_,r) => {
      return Array(dimensions[1]).fill().map((_,c) => {
          return false
        })
      }
    )
    // Set initial snake position
    matrix[10][10] = true
    this.setState({
      matrix: matrix
    })
  }

  setCellActive(coordinates) {
    debugger
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
