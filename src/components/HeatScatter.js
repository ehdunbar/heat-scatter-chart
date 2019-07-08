import React from 'react';
import styled from 'styled-components'

import HeatMap from './HeatMap';
import ScatterPlot from './ScatterPlot';

export default class HeatScatter extends React.Component {
  render() {

    const Container = styled.div``;

    return (
      <Container>
        <HeatMap
          key="heat_map"
          config={this.props.config}
          data={this.props.data}
          done={this.props.done}
          queryResponse={this.props.queryResponse}
        />
        <ScatterPlot
          key="scatter_plot"
          config={this.props.config}
          data={this.props.data}
          done={this.props.done}
          queryResponse={this.props.queryResponse}
        />
      </Container>
    )
  }
}
