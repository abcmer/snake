import React, { Component } from 'react';

// import Grid from './Grid';
import Grid2 from './Grid2';
import './App.css';
const height = window.innerHeight;
class App extends Component {

  render() {
    document.body.style.overflow = "hidden"
    return (
      <div className="App" height={height}>
        {/* <Grid/> */}
        <Grid2/>
      </div>
    );
  }
}

export default App;
