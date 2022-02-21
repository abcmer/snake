class Game {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols
    this.foodPos = [0,0]
    this.snake = []
    this.direction = null
    this.points = 0
    this.gameOver = false
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

  moveSnakeLeftOneSquare() {  
    let nextMouthCol;
    nextMouthCol = this.getSnakeMouthPos()[1] - 1
    // Adjust for out of bounds right
    if (nextMouthCol < 0 ) {
      nextMouthCol = this.cols - 1
    }
    let nextMouth = [this.getSnakeMouthPos()[0], nextMouthCol]
    this.snake.pop(0)
    this.snake.unshift(nextMouth)
    console.log('left')
  }

  moveSnakeRightOneSquare() {
    let nextMouthCol;
    nextMouthCol = this.getSnakeMouthPos()[1] + 1
    // Adjust for out of bounds right
    if (nextMouthCol === this.cols) {
      nextMouthCol = 0
    }
    console.log('right')
    let nextMouth = [this.getSnakeMouthPos()[0], nextMouthCol]
    this.snake.pop(0)
    this.snake.unshift(nextMouth)
  }

  moveSnakeUpOneSquare() {
    let nextMouthRow;
    nextMouthRow = this.getSnakeMouthPos()[0] -1
    if ((nextMouthRow) < 0) {
      nextMouthRow = this.rows -1
    }
    console.log('up')
    let nextMouth = [nextMouthRow, this.getSnakeMouthPos()[1]] 
    this.snake.pop(0)
    this.snake.unshift(nextMouth)
  }

  moveSnakeDownOneSquare() {
    let nextMouthRow;
    nextMouthRow = this.getSnakeMouthPos()[0] + 1
    if (nextMouthRow === this.rows) {
      nextMouthRow = 0
    }
    console.log('down')
    let nextMouth = [nextMouthRow, this.getSnakeMouthPos()[1]]
    this.snake.pop(0)
    this.snake.unshift(nextMouth)
  }

  setDirection(direction) {
    this.direction = direction
  }

  moveSnake() {
    switch(this.direction) {
      case 'left':
        this.moveSnakeLeftOneSquare()
        return this;
        break;
      case 'right':
        this.moveSnakeRightOneSquare()
        return this;
        break;
      case 'up':
        this.moveSnakeUpOneSquare()
        return this;
        break;
      case 'down':
        this.moveSnakeDownOneSquare()
        return this;
        break;
      default:
        return this;
    }   
  }

  evaluateGameState() {
    if (this.snakeHeadOnFood()) {

      console.log('snake on food')
      this.incrementPoints()
      this.setRandomFood()
    } else if (this.snakeCollision()) {
      this.gameOver = true;
      console.log('GAME OVER!!!')
    }
  }

  snakeHeadOnFood() {
    return this.snake[0].toString() === this.foodPos.toString()
  }

  snakeCollision() {
    // Check for snake colision
  }

  incrementPoints() {
    this.points += 1
  }

  increaseSnakeLength() {

  }
}

export default Game