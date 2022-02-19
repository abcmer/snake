import React, { useState, useEffect }from "react";
import Cell from './Cell'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Grid = (props) => {
  const [cellSideLength, setCellSideLenth] = useState(Math.floor((window.innerWidth / 20)))
  const [gridSize, setGridSize] = useState([20, Math.floor(window.innerHeight / cellSideLength)])
  const [snakeSpeed, setSnakeSpeed] = useState(200)
  const [snake, setSnake] = useState([ [10, 10] ])
  const [foodPos, setFoodPos] = useState([])
  const [direction, setDirection] = useState(null)
  const [matrix, setMatrix] = useState([])
  const [points, setPoints] = useState(0)

  useEffect(() => {
    // // console.log('gridSize', gridSize)
    // if (window.innerWidth > window.innerHeight) {
    //   console.log('laptop')
    //   setCellSideLenth(Math.floor((window.innerWidth / 20)))
    //   setGridSize([20, Math.floor(window.innerHeight / cellSideLength)])
    // } else {
    //   console.log('mobile')
    //   setCellSideLenth(Math.floor((window.innerHeight / 20)))
    //   setGridSize([Math.floor(window.innerWidth / cellSideLength), 20])
    // }    

  initializeMatrix(gridSize, snake)
  }, []);


  const initializeMatrix = (gridSize, snake) => {
    console.log('gridSize', gridSize)
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
    return ({
      gridTemplateColumns: `${cellSideLength}px `.repeat(gridSize[0]),
      height: window.innerHeight
    })
    
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
        <div className="col-12">
          <div className="grid-container" style={gridContainerStyle()} onKeyDown={handleKeyDown} >
            {getGridItems(matrix)}
          </div>
        </div>          
    </div>      
  );
}
export default Grid