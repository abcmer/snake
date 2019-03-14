import React, { Component } from 'react';
import Cell from './Cell'
import './App.css';

class Grid extends Component {
  render() {

    const dimensions = [20, 20]
    const gridStyle = {
      display: 'grid'
    }
    const rowStyle = {
      border: '1px solid black',
      height: '5%',
      width: '100%'
    }

    const gridContainerStyle = {
      gridTemplateColumns: '50px '.repeat(dimensions[0])
    }

    const gridItemStyle = {
      height: '50px'
    }

    const getGridItems = (dimensions) => {
      return Array(dimensions[0] * dimensions[1]).fill().map((_, i) => {
        return(
          <Cell active={false}/>
        )
      });
    }
    
    return (
      <div className="grid-container" style={gridContainerStyle}>
        {getGridItems(dimensions)}
      </div>
    );
  }
}

export default Grid;
