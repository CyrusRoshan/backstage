import React, { Component } from 'react';
import './App.css';

import { random } from '../utils'
import { STAGELOADING_OPTIONS } from '../constants'

import Header from '../Header/Header';
import GraphHolder from '../GraphHolder/GraphHolder';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: random(STAGELOADING_OPTIONS),
      targetURL: 'http://localhost:3000',
      connected: false,
    }
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <div className="App">
        <Header
          name={ this.state.name }
          targetURL={ this.state.targetURL }
          connected={ this.state.connected }
          onChange={ this.handleChange }
        />
        <GraphHolder
          targetURL={ this.state.targetURL }
          name={ this.state.name }
          connected={ this.state.connected }
          onChange={ this.handleChange }
        />
      </div>
    );
  }
  // <GraphHolder/>
}

export default App;
