import React, { Component } from 'react';
import './App.css';

const Cell = (props) => {
  const {id, sideLength, cellValue, row, col} = props
  const cellStyle = () => {
    let style = {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      border: '0.025rem solid #7d13ff',
      fontSize: '.8rem',
      textAlign: 'center',
      height: `${sideLength}px`,
      width: `${sideLength}px`,
      color: 'white',
    }
    
    if (cellValue === 1) {
      style.backgroundColor = '#78BD1F' // snake green
    } else if (cellValue === 2) {
      style.backgroundColor = 'red' //
    } else if (cellValue === 0) {
      style.backgroundColor = '#0A233F' //background navy blue
    }
    return style
  }

  return (
    <div id={id} className="grid-item" style={cellStyle()}></div>
  );
}

export default Cell;
