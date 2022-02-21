class Game {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols
    this.foodPos = [0,0]
    this.snake = []
    this.direction = null
  }

  generateMatrix() {
    console.log('generating matrix')
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
    let nextMouth = [this.getSnakeMouthPos()[0], this.getSnakeMouthPos()[1] - 1]
    this.snake.pop(0)
    this.snake.unshift(nextMouth)
    console.log('left')
  }

  moveSnakeRightOneSquare() {
    console.log('right')
    let nextMouth = [this.getSnakeMouthPos()[0], this.getSnakeMouthPos()[1] + 1]
    this.snake.pop(0)
    this.snake.unshift(nextMouth)
  }

  moveSnakeUpOneSquare() {
    console.log('up')
    let nextMouth = [this.getSnakeMouthPos()[0] - 1, this.getSnakeMouthPos()[1]] 
    this.snake.pop(0)
    this.snake.unshift(nextMouth)
  }

  moveSnakeDownOneSquare() {
    console.log('down')
    let nextMouth = [this.getSnakeMouthPos()[0] + 1, this.getSnakeMouthPos()[1]]
    this.snake.pop(0)
    this.snake.unshift(nextMouth)
  }

  setDirection(direction) {
    this.direction = direction
  }

  moveSnake() {
    console.log('move snake')
    switch(this.direction) {
      case 'left':
        this.moveSnakeLeftOneSquare()
        break;
      case 'right':
        this.moveSnakeRightOneSquare()
        break;
      case 'up':
        this.moveSnakeUpOneSquare()
        break;
      case 'down':
        this.moveSnakeDownOneSquare()
        break;
      default:
        return
    }   
  }

  evaluateGameState() {
    // if head on food
    // if head on snake
    // else
  }
}

export default Game