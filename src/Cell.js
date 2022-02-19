import React, { Component } from 'react';
import './App.css';

const Cell = (props) => {
  const {id, sideLength, cellValue} = props
  console.log('id', id)
  console.log('sideLength', sideLength)
  console.log('cellValue', cellValue)
  const cellStyle = () => {
    let style = {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      border: '0.025rem solid #7d13ff',
      padding: '20px',
      fontSize: '30px',
      textAlign: 'center',
      height: `${sideLength}px`
    }
    
    if (cellValue === 1) {
      style.backgroundColor = '#78BD1F' // snake green
    } else if (cellValue === 2) {
      style.backgroundColor = 'red' //
    } else if (cellValue === 0) {
      style.backgroundColor = '#0A233F' //background navy blue
    }
  }

  return (
    <div id={id} className="grid-item" style={cellStyle()}></div>
  );
}

export default Cell;
