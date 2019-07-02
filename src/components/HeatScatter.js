import React from 'react';
import styled from 'styled-components'

import HeatMap from './HeatMap';
import ScatterPlot from './ScatterPlot';

export default class HeatScatter extends React.Component {
  render() {

    const Container = styled.div``;

    const heatStyle = {
      position: 'absolute'
    };

    const scatterStyle = {
      position: 'absolute'
    };

    return (
      <Container>
        <HeatMap
          key="heat_map"
          config={this.props.config}
          data={this.props.data}
          done={this.props.done}
          queryResponse={this.props.queryResponse}
          style={heatStyle}
        />
        <ScatterPlot
          key="scatter_plot"
          config={this.props.config}
          data={this.props.data}
          done={this.props.done}
          queryResponse={this.props.queryResponse}
          style={scatterStyle}
        />
      </Container>
    )
  }
}
