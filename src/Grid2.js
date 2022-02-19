import React, { useState, useEffect }from "react";
import Cell from './Cell'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Grid = (props) => {
  // super(props);
  // this.state = {
  //   gridSize: [20,10],
  //   snakeSpeed: 200,
  //   snake: [ [10, 10] ],      
  //   foodPos: [],
  //   direction: null,
  //   matrix: [],
  //   points: 0
  const [cellSideLength, setCellSideLenth] = useState(parseInt((window.innerWidth / 20)))
  const [gridSize, setGridSize] = useState([20, parseInt(window.innerHeight / cellSideLength)])
  const [snakeSpeed, setSnakeSpeed] = useState(200)
  const [snake, setSnake] = useState([ [10, 10] ])
  const [foodPos, setFoodPos] = useState([])
  const [direction, setDirection] = useState(null)
  const [matrix, setMatrix] = useState([])
  const [points, setPoints] = useState(0)
  

  useEffect(() => {
    // Update the document title using the browser API
    // setGridSize()
    console.log('gridSize', gridSize)
    initializeMatrix(gridSize, snake)
  }, []);


  const initializeMatrix = (gridSize, snake) => {
    let matrix = Array(gridSize[0]).fill().map((_,r) => {
      return Array(gridSize[1]).fill().map((_,c) => {
          return 0 // 0 = background
        })
      }
    )
    matrix = setRandomFoodOnMatrix(matrix)
    snake.forEach(seg => {
      matrix = setCell(matrix,seg,1)
    })

    setMatrix(matrix)
    setSnake(snake)
  }

  const setCell = (matrix, coordinates, value) => {
    matrix[coordinates[0]][coordinates[1]] = value
    return matrix
  }

  const setRandomFoodOnMatrix = (matrix) => {
    // Random food location is generated. If that location is blank set the food.
    // But if that location is taken by the snake, then recursively run 
    // this function again.
    const foodPos = generateRandomFoodPos([matrix.length, matrix[0].length])
    if (matrix[foodPos[0]][foodPos[1]] === 0) {
      matrix[foodPos[0]][foodPos[1]] = 2 // 2 = food
      setFoodPos(foodPos)
    } else {
      matrix = setRandomFoodOnMatrix(matrix)
    }      
    return matrix
  }  

  const setfoodPosOnMatrix = (matrix, foodPos) => {
    matrix[foodPos[0]][foodPos[1]] = 2   
    return matrix
  }

  const generateRandomFoodPos = (gridSize) => {
    return [Math.floor(Math.random() * gridSize[0]), Math.floor(Math.random() * gridSize[1])]
  }

      
  const getGridItems = (matrix) => {
    console.log('matrix', matrix)
    return matrix.map((row, rIndex) => {
      return row.map((cellValue, cIndex) => {
        return <Cell id={`${rIndex}${cIndex}`} sideLength={cellSideLength} row={rIndex} col={cIndex} cellValue={cellValue} />
      })
    })
  }

  const gridContainerStyle = () => {
    console.log('gridSize', gridSize)
    return ({gridTemplateColumns: `${cellSideLength}px `.repeat(gridSize[0])})
    
  }

  const containerStyle = {
    height: window.innerHeight,
    padding: '0px',
    margin: '0px'
  }

  const handleKeyDown = (event) => {
    if (event.key.startsWith('Arrow')) {
      let newDirection

      let direction = direction;
              
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

      setDirection(newDirection)  
    }
}

  
  return (
    <div className="container" style={containerStyle}>
      <div className="row">
        <div className="col-12">
          <div className="grid-container" style={gridContainerStyle()} onKeyDown={handleKeyDown} >
            {getGridItems(matrix)}
          </div>
        </div>
      </div>  
      <div className="row">
        <div className="col-4"/>
        <div className="col-3">
          <h1>Points: {points}</h1>
        </div>
        <div className="col-5"/>   
      </div>             
    </div>      
  );
}

export default Grid