import React, { useState, useEffect }from "react";
import Cell from './Cell'
import Game from './Game'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Grid = (props) => {
  const [cellSideLength, setCellSideLenth] = useState((window.innerWidth / 20))
  const [gridSize, setGridSize] = useState([20, Math.floor(window.innerHeight / cellSideLength)])
  const [snakeSpeed, setSnakeSpeed] = useState(500)
  // const [snake, setSnake] = useState([ [10, 10] ])
  // const [foodPos, setFoodPos] = useState([])
  const [direction, setDirection] = useState(null)
  const [matrix, setMatrix] = useState([])
  const [game, setGame] = useState(new Game(gridSize[1], gridSize[0]))
  // const [points, setPoints] = useState(0)

  useEffect(() => {
    // let game = new Game(gridSize[1], gridSize[0])
    // matrix.setRandomFood()
    // console.log('matrix', matrix.generateMatrix())
  // let matrix = initializeMatrix(gridSize)
  // matrix = initializeSnake(matrix)
  // matrix = setRandomFoodOnMatrix(matrix) 
  // // initialize Menu 
  // setMatrix(matrix)
  // handleResize()
  // let matrix = new Matrix(gridSize[1], gridSize[0])
  // matrix.setRandomFood()
  // matrix.setInitialSnakePosititon()
    game.setRandomFood()
    game.setInitialSnakePosititon()
    setGame(game)
    document.addEventListener('keydown', handleKeyDown)
    window.addEventListener("resize", handleResize);
    setMatrix(game.generateMatrix())
  }, []);

  const handleResize = () => {
    calculateAndSetGridSize() 
    let game = new Game(gridSize[1], gridSize[0])
    // let matrix = new Matrix(gridSize[1], gridSize[0])
    game.setRandomFood()
    game.setInitialSnakePosititon()
    setMatrix(game.generateMatrix())    
  }  

  const calculateAndSetGridSize = () => {
    if (window.innerWidth > window.innerHeight) {
      setCellSideLenth(Math.floor((window.innerWidth / 20)))
      setGridSize([20, Math.floor(window.innerHeight / cellSideLength)])
    } else {
      setCellSideLenth(Math.floor((window.innerWidth / 12)))
      setGridSize([20, Math.floor(window.innerHeight / cellSideLength)])
    }
  }

  useEffect(() => {
    setInterval(() => {
      game.moveSnake()
      setMatrix(game.generateMatrix())
      setGame(game)
      }, snakeSpeed)
  }, [])

  // useEffect(() => {
  //     moveSnake(direction)
  // }, [direction])


  // const initializeMatrix = (gridSize, snake) => {
  //   console.log('gridSize', gridSize)
  //   console.log('snake', snake)
  //   let matrix = Array(gridSize[1]).fill().map((_,r) => {
  //     return Array(gridSize[0]).fill().map((_,c) => {
  //         return 0 // 0 = background
  //       })
  //     }
  //   )
  //   return matrix
  // }

  // const initializeSnake = (matrix) => {
  //   // Set snake location to value of 1
  //   let snakeHead = snake[0]
  //   matrix[snakeHead[0]][snakeHead[1]] = 1
  //   return matrix
  // }

  // const setCell = (matrix, coordinates, value) => {
  //   matrix[coordinates[0]][coordinates[1]] = value
  //   return matrix
  // }

  // const getCellId = (coords) => {
  //   return coords[0].toString() + coords[1].toString()
  // }

  // const getCellValue = (coords) => {
  //   let row = coords[0]
  //   let col = coords[1]
  //   return matrix[row][col]
  // }

  // const reInitializeMatrix = (matrix, snake, foodPos) => {
  //   snake.forEach(seg => {
  //     matrix = setCell(matrix,seg,1)
  //   })

  //   // Set food
  //   matrix = setfoodPosOnMatrix(matrix, foodPos)
  //   return matrix
  // }

  // const getClearMatrix = (gridSize) => {
  //   let matrix = Array(gridSize[1]).fill().map((_,r) => {
  //     return Array(gridSize[0]).fill().map((_,c) => {
  //         return 0
  //       })
  //     }
  //   )
  //   return matrix
  // }  

  // const adjustForOutOfBounds = (mouthPos, gridSize) => {    
  //   if (mouthPos[0] === -1) {
  //     // Adjust for out of bounds Up
  //     mouthPos[0] = gridSize[1] -1
  //   } else if (mouthPos[0] === gridSize[1]) {
  //     // Adjust for out of bounds Down
  //     mouthPos[0] = 0
  //   } else if (mouthPos[1] === -1) {
  //     // Adjust for out of bounds Left
  //     mouthPos[1] = gridSize[0] -1
  //   } else if (mouthPos[1] === gridSize[0]) {
  //     mouthPos[1] = 0
  //   }
  //   return mouthPos
  // }  

  // const moveSnake = (direction) => {  
  //   const mouthPos = snake[0]    
  //   let nextMouth

  //   if (!direction) {
  //     return null
  //   }

  //   if (direction === 'Right') {
  //     nextMouth = [mouthPos[0], mouthPos[1] + 1]
  //   }
  //   if (direction === 'Left') {          
  //     nextMouth = [mouthPos[0], mouthPos[1] - 1]          
  //   }   
  //   if (direction === 'Up') {          
  //     nextMouth = [mouthPos[0] - 1, mouthPos[1]]          
  //   }  
  //   if (direction === 'Down') {          
  //     nextMouth = [mouthPos[0] + 1, mouthPos[1]]
  //   }

  //   nextMouth = adjustForOutOfBounds(nextMouth, gridSize)

  //   if (getCellValue(nextMouth) == 2) {
  //     console.log('yummmmm')
  //     // Update mouth of snake to nextMouth
  //     // Reset Food
  //     // Add 1 point
  //     snake.unshift(nextMouth)   
  //     setFoodPos(generateRandomFoodPos(gridSize));
  //     setPoints(points+1)
  //     setSnake(snake)
  //     setFoodPos(foodPos)
  //     setDirection(direction)
  //     let matrix = reInitializeMatrix(getClearMatrix(gridSize), snake, foodPos)
  //     setMatrix(matrix)      
  //   } else if (snake.map(seg => getCellId(seg)).includes(getCellId(nextMouth))) {
  //     // Reset the game back to default
  //     setSnake([[10, 10]])
  //     setFoodPos(generateRandomFoodPos(gridSize));
  //     setDirection(null)
  //     setPoints(0)
  //     setSnake(snake)
  //     setFoodPos(foodPos)
  //     setDirection(direction)
  //     let matrix = reInitializeMatrix(getClearMatrix(gridSize), snake, foodPos)
  //     setMatrix(matrix)        
  //   } else {
  //     // Otherwise just remove tail and add it to nextMouth
  //     // to simulate movement of the snake.
  //     snake.pop(0)
  //     snake.unshift(nextMouth) 
  //     let matrix = reInitializeMatrix(getClearMatrix(gridSize), snake, foodPos)
  //     setMatrix(matrix)             
  //   }        
  // }

  // const setRandomFoodOnMatrix = (matrix) => {
  //   // Random food location is generated. If that location is blank set the food.
  //   // But if that location is taken by the snake, then recursively run 
  //   // this function again.
  //   let newMatrix = matrix;
  //   const foodPos = generateRandomFoodPos([newMatrix.length, newMatrix[0].length])
  //   console.log('foodPos', foodPos)
  //   if (newMatrix[foodPos[0]][foodPos[1]] === 0) {
  //     newMatrix[foodPos[0]][foodPos[1]] = 2 // 2 = food
  //   } else {
  //     newMatrix = setRandomFoodOnMatrix(newMatrix)
  //   }      
  //   return newMatrix
  // }  

  // const setfoodPosOnMatrix = (matrix, foodPos) => {
  //   matrix[foodPos[0]][foodPos[1]] = 2   
  //   return matrix
  // }

  // const generateRandomFoodPos = (gridSize) => {
  //   console.log([Math.floor(Math.random() * gridSize[0]), Math.floor(Math.random() * gridSize[1])])
  //   return [Math.floor(Math.random() * gridSize[0]), Math.floor(Math.random() * gridSize[1])]
  // }

      
  const getGridItems = (matrix) => {
    return matrix.map((row, rIndex) => {
      return row.map((cellValue, cIndex) => {
        return <Cell key={`${rIndex}${cIndex}`} id={`${rIndex}${cIndex}`} sideLength={cellSideLength} row={rIndex} col={cIndex} cellValue={cellValue} />
      })
    })
  }

  const gridContainerStyle = () => {
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
      let newDirection = game.direction;
              
      if (event.key  === 'ArrowRight' && game.direction !== 'left') {      
        newDirection = 'right'        
      } else if (event.key === 'ArrowLeft' && game.direction !== 'right') {          
        newDirection = 'left'           
      } else if (event.key === 'ArrowUp' && game.direction !== 'down') {       
        newDirection = 'up'               
      } else if (event.key === 'ArrowDown' && game.direction !== 'up') {          
        newDirection = 'down'        
      } else {
        // newDirection = direction
      }
      game.setDirection(newDirection)  
      setMatrix(game.generateMatrix())
      setGame(game)
    }
}

if (game.gameOver) {
  return(
    <div>Game Over</div>
  )
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