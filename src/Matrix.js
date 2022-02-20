class Matrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols
    this.foodPos = [0,0]
    this.snake = [[rows / 2, cols / 2]]
    this.snakeSquares = {}
  }

  generateMatrix() {
    console.log('this.foodPos', this.foodPos)
    let snakeSet = new Set(this.snake.map(rc => rc.toString()))
    let matrix = Array(this.rows).fill().map((_,r) => {
      return Array(this.cols).fill().map((_,c) => {
        if ([r, c].toString() === this.foodPos.toString()) {
          console.log('food')
          return 2 // 2 = food
        } else if (snakeSet.has([r,c].toString())) {
          console.log('snake')
          return 1 // 1 = snake
        } else {
          console.log('background')
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
    this.snake.push([10,10])
  }
}

export default Matrix