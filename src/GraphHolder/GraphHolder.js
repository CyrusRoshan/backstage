import React, { Component } from 'react';
import './GraphHolder.css';

import * as chartjs from 'react-chartjs-2';

class GraphHolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      targetURL: props.targetURL,
      charts: [],
    }
  }

  handleChange = (e) => {
    console.log("HANDLING GRAPH STATE", e)
    // this.setState({value: e.target.value});
  }

  setOpts = (globalOpts) => {
    for (var opt in globalOpts) {
      if (globalOpts.hasOwnProperty(opt)) {
        chartjs.defaults.global[opt] = globalOpts[opt];
      }
    }
  }

  chartsToElems = (charts) => {
    return charts.map((chart) => {
      return React.createElement(
        chartjs[chart.type],
        { data: chart.data, options: chart.options },
        null,
      )
    })
  }

  render() {
    // { this.chartsToElems(this.state.charts) }
    return (
      <div className="GraphHolder" onChange={ this.handleChange }>
        { this.state.targetURL }
      </div>
    );
  }
}

export default GraphHolder
