import React, { Component } from 'react';
import './Header.css';

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

    setInterval(() => {
      this.pingURL()
    }, 1000);
  }

  changeURL = (event) => {
    this.setState({
      targetURL: event.target.value,
    })
  }

  pingURL = () => {
    // edited from http://stackoverflow.com/a/13975363/4455222
    var started = new Date().getTime();
    var http = new XMLHttpRequest();

    http.open("GET", this.state.targetURL, true);
    http.onreadystatechange = () => {
      if (http.readyState === 4) {
        var ended = new Date().getTime();
        var milliseconds = ended - started;
        this.updateStatus(milliseconds);
      }
    }
    http.onerror = () => {
      this.updateStatus(-1);
    }

    try {
      http.send(null);
    } catch(e) {} // this is expected
  }

  updateStatus = (ping) => {
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
    this.fillStyle = {
      backgroundColor: this.state.statusColor,
    };

    return (
      <div className="Header">
        <div className="Title">backstage</div>
        <input className="TargetURL" type="text" onChange={this.changeURL} value={this.state.targetURL}/>
        <div className="Status" style={this.fillStyle}></div>
        <div className="Ping">Ping: {this.state.ping}ms</div>
        <div className="Name">Production{!this.state.connected && ' delayed'}: {this.state.name}</div>
      </div>
    );
  }
}

export default Header
