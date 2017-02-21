import React, { Component } from 'react';
import { random } from '../utils'
import './Header.css';

const CONECTED = 'CONECTED'
const SLOWED = 'WAITING'
const DISCONNECTED = 'DISCONNECTED'
const ERRORED = 'ERRORED'

const STAGELOADING_OPTIONS = [
  'casting actors',
  'rehearsing play',
  'designing props',
  'breaking legs',
  'painting curtains',
]

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: random(STAGELOADING_OPTIONS),
      status: DISCONNECTED,
      targetURL: 'http://localhost:3000',
    }

    this.handleInput = this.handleInput.bind(this);
  }

  changeURL = (event) => {
    this.setState({
      targetURL: event.target.value,
    })
  }



  render() {
    console.log(this.state)
    return (
      <div className="Header">
        <div className="Title">backstage</div>
        <input className="TargetURL" type="text" onChange={this.changeURL} value={this.state.targetURL}/>
        <div className="Status" value={this.state.status}></div>
        <div className="Name">Production{this.state.status === DISCONNECTED ? '' : ' delayed'}: {this.state.name}</div>
      </div>
    );
  }
}

export default Header
