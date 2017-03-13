import React, { Component } from 'react';
import './GraphHolder.css';

import { request } from '../utils'
import * as chartjs from 'react-chartjs-2';

class GraphHolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      charts: [],
    }
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
        {data: chart.data, options: chart.options},
        null,
      )
    })
  }

  handleChartUpdate = (data) => {
    var charts = this.state.charts;

    for (var i = 0; i < data.length; i++) {
      if (!charts[i]) {
        charts[i] = data[i];
        continue;
      }

      charts[i].Name = data[i].Name;
      charts[i].ReadData = charts[i].ReadData.concat(data[i].ReadData);
      charts[i].ReadData = charts[i].ReadData.slice(Math.max(charts[i].ReadData.length - 30, 0))
    }

    this.setState({charts: charts});
  }

  triggerDataCollection = (() => {
    var wasConnected = this.props.connected;
    var pullData;

    var onSuccess = (ms, resp) => {
      var data = JSON.parse(resp.responseText);
      this.handleChartUpdate(data);
    }
    var onError = () => {
      //TODO: set connected to false
    };

    return () => {
      if (!wasConnected && this.props.connected) {
        if (this.props.targetInfo.GlobalInfo && this.props.targetInfo.GlobalInfo.RefreshRate) {
          pullData = setInterval(() => {
            request('GET', this.props.targetURL + '/data', onSuccess, onError, onError)
          }, this.props.targetInfo.GlobalInfo.RefreshRate)
        } else {
          return;
        }
      } else if (wasConnected && !this.props.connected) {
        clearInterval(pullData);
      }

      wasConnected = this.props.connected;
      return;
    }
  })()

  render() {
    this.triggerDataCollection();
    // { this.chartsToElems(this.state.charts) }
    return (
      <div
        className="GraphHolder">
        {this.state.targetURL}
      </div>
    );
  }
}

export default GraphHolder
