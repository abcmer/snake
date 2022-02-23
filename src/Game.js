class Game {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols
    this.foodPos = [0,0]
    this.snake = []
    this.direction = null
    this.points = 0
    this.gameOver = false
    this.nextMouth = []
    this.speed = 500
  }

  generateMatrix() {
    let snakeSet = new Set(this.snake.map(rc => rc.toString()))
    let matrix = Array(this.rows).fill().map((_,r) => {
      return Array(this.cols).fill().map((_,c) => {
        if ([r, c].toString() === this.foodPos.toString()) {
          return 2 // 2 = food
        } else if (snakeSet.has([r,c].toString())) {
          return 1 // 1 = snake
        } else {
          return 0 // 0 = background
        }          
        })
      }
    )
    return matrix;
  }

  setRandomFood() {
    this.foodPos = this.generateRandomFoodPos()
  }

  generateRandomFoodPos() {
    return [Math.floor(Math.random() * this.rows), Math.floor(Math.random() * this.cols)]
  }

  setInitialSnakePosititon() {
    this.snake = [[Math.floor(this.rows / 2), Math.floor(this.cols / 2)]]
  }

  getSnakeMouthPos() {
    return this.snake[0]
  }

  setNextMouth() {

  }

  getMouthOneCellLeft() {  
    let nextMouthCol;
    nextMouthCol = this.getSnakeMouthPos()[1] - 1
    // Adjust for out of bounds right
    if (nextMouthCol < 0 ) {
      nextMouthCol = this.cols - 1
    }
    let nextMouth = [this.getSnakeMouthPos()[0], nextMouthCol]
    return nextMouth
    
  }

  getMouthOneCellRight() {
    let nextMouthCol;
    nextMouthCol = this.getSnakeMouthPos()[1] + 1
    // Adjust for out of bounds right
    if (nextMouthCol === this.cols) {
      nextMouthCol = 0
    }
    let nextMouth = [this.getSnakeMouthPos()[0], nextMouthCol]
    return nextMouth
  }

  getMouthOneCellUp() {
    let nextMouthRow;
    nextMouthRow = this.getSnakeMouthPos()[0] -1
    if ((nextMouthRow) < 0) {
      nextMouthRow = this.rows -1
    }
    let nextMouth = [nextMouthRow, this.getSnakeMouthPos()[1]] 
    return nextMouth
  }

  getMouthOneCellDown() {
    let nextMouthRow;
    nextMouthRow = this.getSnakeMouthPos()[0] + 1
    if (nextMouthRow === this.rows) {
      nextMouthRow = 0
    }
    let nextMouth = [nextMouthRow, this.getSnakeMouthPos()[1]]
    return nextMouth
  }

  setDirection(direction) {
    this.direction = direction
  }

  determineNextMouth() {
    switch(this.direction) {      
      case 'left':
        this.nextMouth = this.getMouthOneCellLeft()
        return this;
        break;
      case 'right':
        this.nextMouth = this.getMouthOneCellRight()
        return this;
        break;
      case 'up':
        this.nextMouth = this.getMouthOneCellUp()
        return this;
        break;
      case 'down':
        this.nextMouth = this.getMouthOneCellDown()
        return this;
        break;
      default:
        return this;
    }   
  }

  moveSnake() {
    this.determineNextMouth(this.direction).processNextMove()
  }

  processNextMove() {
    if (this.nextMouthOnFood()) {
      this.increaseSnakeLength()
      this.setRandomFood()      
      this.incrementPoints()
      this.increaseSnakeSpeed()
      this.regularSnakeMove()    
    } else if (this.futureSnakeCollison()) {
      this.gameOver = true;
    } else if (!this.direction) {  
    } else {
      this.regularSnakeMove()
    }
  }

  nextMouthOnFood() {
    return this.nextMouth.toString() === this.foodPos.toString()
  }

  futureSnakeCollison() {
    if (this.snake.length <= 1) {
      return false
    } else {
      let snakeWithoutHead = this.snake.slice(0,this.snake.length - 1)
      let snakeSet = new Set(snakeWithoutHead.map(rc => rc.toString()))
      let snakeHead = this.nextMouth
      return snakeSet.has(snakeHead.toString())
    }
  }

  incrementPoints() {
    this.points += 1
  }

  increaseSnakeLength() {
    this.snake.push(this.foodPos)
  }

  increaseSnakeSpeed() {
    this.speed += 500
  }

  regularSnakeMove() {
    this.snake.pop(0)
    this.snake.unshift(this.nextMouth)
  }
}

export default Game