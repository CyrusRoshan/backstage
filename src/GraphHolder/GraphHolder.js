import React, { Component } from 'react';
// import './GraphHolder.css';

class GraphHolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      targetURL: props.targetURL,
    }
  }

  updateStatus = (ping) => {

  }

  render() {
    return (
      <div className="GraphHolder">

      </div>
    );
  }
}

export default GraphHolder
