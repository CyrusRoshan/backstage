import React, { Component } from 'react';
import './Header.css';

import { request } from '../utils'

const DISCONNECTED_STATUS = 'rgb(255, 0, 0)'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      targetURL: props.targetURL,
      connected: props.connected,
      ping: -1,
      statusColor: DISCONNECTED_STATUS,
    }

    var onSuccess = (ms) => { this.updatePingAndStatus(ms) };
    var onError = () => { this.updatePingAndStatus(-1) };

    setInterval(() => {
      request('GET', this.state.targetURL, onSuccess, onError, onError)
    }, 1000);
  }

  changeURL = (event) => {
    this.setState({ targetURL: event.target.value });
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
    // const fillStyle = ;

    return (
      <div className="Header">
        <div className="Title">backstage</div>
        <input className="TargetURL" type="text" onChange={ this.changeURL } value={ this.state.targetURL }/>
        <div className="Status" style={{ backgroundColor: this.state.statusColor }}></div>
        <div className="Ping">Ping: { this.state.ping }ms</div>
        <div className="Name">Production{ !this.state.connected && ' delayed' }: { this.state.name }</div>
      </div>
    );
  }
}

export default Header
