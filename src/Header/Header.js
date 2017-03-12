import React, { Component } from 'react';
import './Header.css';

import { randomNoRepeat } from '../utils'
import { STAGELOADING_OPTIONS } from '../constants'

class Header extends Component {
  randomNoRepeatState = randomNoRepeat()

  targetURLChange = (e) => {
    this.props.onTargetURLChange(e.target.value);
  }

  render() {
    var name = this.props.name;
    var optionalDelay = '';
    if (!this.props.connected) {
      optionalDelay = ' delayed';
      name = this.randomNoRepeatState(STAGELOADING_OPTIONS);
    }

    return (
      <div className="Header">
        <div className="Title">
          backstage
        </div>

        <input
          className="TargetURL"
          type="text"
          value={this.props.targetURL}
          onChange={this.targetURLChange}
        />

        <div
          className="Status"
          style={{ backgroundColor: this.props.statusColor }}>
        </div>

        <div
          className="Ping">
          Ping: {this.props.ping}ms<
        /div>

        <div
          className="Name">
          Production{optionalDelay}: {name}
        </div>
      </div>
    );
  }
}

export default Header
