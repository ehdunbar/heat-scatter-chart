import React from 'react'
import Highcharts from 'highcharts/highmaps'
import HighchartsReact from 'highcharts-react-official'
import styled from 'styled-components'


const Container = styled.div``;

export default class HeatMap extends React.Component {
  constructor (props) {
    super(props)

    this.options = {
      chart: {
        type: 'heatmap',
        marginTop: 40,
        marginBottom: 90,
        marginLeft: 60,
        plotBorderWidth: 0,
        borderColor: 'transparent'
      },
      postition: 'absolute',
      title: undefined,
      xAxis: {
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        labels: {
          enabled: false
        },
        minorTickLength: 0,
        tickLength: 0
      },
      yAxis: {
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        labels: {
          enabled: false
        },
        title: undefined,
        minorTickLength: 0,
        tickLength: 0,
        gridLineColor: 'transparent'
      },
      colorAxis: {
        min: 0,
        minColor: '#FFFFFF',
        maxColor: Highcharts.getOptions().colors[0]
      },
      legend: {
        align: 'right',
        layout: 'vertical',
        margin: 0,
        verticalAlign: 'top',
        y: 25,
        symbolHeight: 280
      },
      tooltip: {
        formatter: function () {
          return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> sold <br><b>' +
            this.point.value + '</b> items on <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
        }
      },
      series: [],
      credits: {
        enabled: false
      }
    }
  }

  render() {

    const columnNameArray = this.props.queryResponse.fields.dimensions;
    var dataArray = this.props.data;

    const formatedData = dataArray.map(row => {
      const x = row[columnNameArray[3].name].value;
      const y = row[columnNameArray[4].name].value;

      const amount = row[columnNameArray[5].name].value || 0;

      return [x, y, amount];
    });

    const options = {...this.options};
    options.series = [];

    options.series.push({
      name: 'Sales per employee',
      borderWidth: 1,
      data: [...formatedData],
      dataLabels: {
        enabled: true,
        color: '#000000'
      }
    })

    console.log("HeatMap");

    return (
      <Container style={{position: 'absolute', width: '100%'}}>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
      </Container>
    )
  }
}
