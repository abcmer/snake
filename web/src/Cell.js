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
      if (this.props.cellValue === 1) {
        return {backgroundColor: '#78BD1F'} // snake green
      } else if (this.props.cellValue === 2) {
        return {backgroundColor: 'yellow'} //
      } else if (this.props.cellValue === 0) {
        return {backgroundColor: '#0A233F'} //background navy blue
      }
    }

    return (
      <div id={this.props.id} className="grid-item" style={cellStyle()}></div>
    );
  }
}

export default Cell;
