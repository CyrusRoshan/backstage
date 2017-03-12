import React, { Component } from 'react';
import './App.css';

import { request } from '../utils'
import { DISCONNECTED_STATUS } from '../constants'

import Header from '../Header/Header';
import GraphHolder from '../GraphHolder/GraphHolder';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Loading...',
      targetURL: 'http://localhost:3000',
      connected: false,
      ping: -1,
      statusColor: DISCONNECTED_STATUS,
    }

    var onSuccess = (ms) => { this.updatePingAndStatus(ms) };
    var onError = () => { this.updatePingAndStatus(-1) };

    setInterval(() => {
      request('GET', this.state.targetURL, onSuccess, onError, onError)
    }, 1000);
  }

  handleTargetURLChange = (targetURL) => {
    this.setState({targetURL: targetURL})
  }

  updatePingAndStatus = (ping) => {
    this.setState({ ping: ping });

    if (ping === -1) {
      this.setState({ connected: false, statusColor: DISCONNECTED_STATUS });
      return;
    }
    if (ping > 500) {
      ping = 500;
    }

    var red = Math.round(200 * ping/500 + 20);
    var green = Math.round(200 * (1 - ping/500) + 20);
    this.setState({ connected: true, statusColor: `rgb(${red}, ${green}, 50)` });
  }

  render() {
    return (
      <div
      className="App">
        <Header
          name={this.state.name}
          targetURL={this.state.targetURL}
          connected={this.state.connected}
          ping={this.state.ping}
          statusColor={this.state.statusColor}
          onTargetURLChange={this.handleTargetURLChange}
        />
        <GraphHolder
          targetURL={this.state.targetURL}
          name={this.state.name}
          connected={this.state.connected}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default App;
