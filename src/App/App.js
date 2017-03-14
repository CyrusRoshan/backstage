import React, { Component } from 'react';
import './App.css';

import { request } from '../utils'
import { DISCONNECTED_STATUS, DEFAULT_URL, DEFAULT_NAME, DEFAULT_PING_RATE } from '../constants'

import Header from '../Header/Header';
import GraphHolder from '../GraphHolder/GraphHolder';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: DEFAULT_NAME,
      targetURL: DEFAULT_URL,
      connected: false,
      ping: -1,
      statusColor: DISCONNECTED_STATUS,
      targetInfo: {},
    }

    this.pingTarget(DEFAULT_PING_RATE);
  }

  pingTarget = (pingRate) => {
    var onError = () => {this.updatePingAndStatus(-1)};
    var onSuccess = (ms) => {  
      if (!this.state.connected) {
        this.getTargetInfo();
      }
      this.updatePingAndStatus(ms);
    }

    setInterval(() => {
      request('GET', this.state.targetURL + '/ping', onSuccess, onError, onError)
    }, pingRate);
  }

  getTargetInfo = () => {
    var onError = () => {
      this.setState({connected: false});
    };
    var onSuccess = (ms, resp) => {
      var targetInfo = JSON.parse(resp.responseText);
      targetInfo.ChartInfo = targetInfo.ChartInfo.map(chart => {
        if (chart.Options === '') {
          chart.Options = undefined;
        } else {
          chart.Options = JSON.parse(chart.Options);
        }
        return chart;
      });
      console.log(targetInfo.ChartInfo)

      this.setState({
        name: targetInfo.Name,
        targetInfo: targetInfo,
      })
    }
    request('GET', this.state.targetURL + '/info', onSuccess, onError, onError)
  }

  handleTargetURLChange = (targetURL) => {
    this.setState({targetURL: targetURL})
  }

  updatePingAndStatus = (ping) => {
    this.setState({ping: ping});

    if (ping === -1) {
      this.setState({connected: false, statusColor: DISCONNECTED_STATUS});
      return;
    }
    if (ping > 500) {
      ping = 500;
    }

    var red = Math.round(200 * ping/500 + 20);
    var green = Math.round(200 * (1 - ping/500) + 20);
    this.setState({connected: true, statusColor: `rgb(${red}, ${green}, 50)`});
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
          connected={this.state.connected}
          targetInfo={this.state.targetInfo}
        />
      </div>
    );
  }
}

export default App;
