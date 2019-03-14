import React, { Component } from 'react';
import './App.css';

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  render() {
    const cellStyle = () => {
      if (this.props.active) {
        return {
          backgroundColor: 'green'
        }
      } else {
        return {
          backgroundColor: '#2196F3'
        }
      }
    }

    return (
      <div className="grid-item" style={cellStyle()}></div>
    );
  }
}

export default Cell;
