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
      direction: null
    };
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }
    
  handleKeyDown = (event) => {
      if (event.key.startsWith('Arrow')) {
        this.setState({
          direction: event.key.split('Arrow')[1]
        })
        console.log(this.state.direction);    
        if (this.state.direction === 'Right') {
          let snakeMouth = this.state.snakeMouth;
          snakeMouth += 1;
          this.setState({
            snakeMouth: snakeMouth
          })
        }
        if (this.state.direction === 'Left') {
          let snakeMouth = this.state.snakeMouth;
          snakeMouth -= 1;
          this.setState({
            snakeMouth: snakeMouth
          })
        }   
        if (this.state.direction === 'Up') {
          let snakeMouth = this.state.snakeMouth;
          snakeMouth -= 20;
          this.setState({
            snakeMouth: snakeMouth
          })
        }  
        if (this.state.direction === 'Down') {
          let snakeMouth = this.state.snakeMouth;
          snakeMouth += 20;
          this.setState({
            snakeMouth: snakeMouth
          })
        }           
      }
  }

  render() {

    const dimensions = [20, 20]

    const gridContainerStyle = {
      gridTemplateColumns: '40px '.repeat(dimensions[0])
    }

    const getGridItems = (dimensions) => {
      return Array(dimensions[0] * dimensions[1]).fill().map((_, i) => {
        if (i === this.state.snakeMouth) {
          return <Cell id={i} active={true}/>
        } else {
          return <Cell id={i} active={false}/>
        }
      });
    }
    
    return (
      <div className="grid-container" style={gridContainerStyle} onKeyDown={this.handleKeyDown} >
        {getGridItems(dimensions)}
      </div>
    );
  }
}

export default Grid;
