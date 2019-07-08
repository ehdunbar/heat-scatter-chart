import React from 'react'
import Highcharts from 'highcharts/highmaps'
import HighchartsReact from 'highcharts-react-official'
import styled from 'styled-components'

const Container = styled.div``;

export default class HeatScatter extends React.Component {
  constructor (props) {
    super(props)

    this.options = {
      xAxis: [{
        title: {
          text: 'xAxis'
        },
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        minorTickLength: 0,
        tickLength: 0,
        min: 0,
        startOnTick: false,
        endOnTick:false,
      }, {
        categories: ['90', '180'],
        visible: false
      }],
      yAxis: [{
        title: {
          text: 'yAxis'
        },
        max: 200000,
        ineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        minorTickLength: 0,
        tickLength: 0,
        gridLineColor: 'transparent'
      }, {
        categories: ['100k', '250k'],
        visible: false
      }],
      title: {
        text: 'Combined Heat Scatter Chart'
      },
      colorAxis: {
        min: 0,
        max: 100,
        stops: [
          [0, '#ff9ca2'],
          [0.5, '#fffc9c'],
          [0.9, '#b0ff9c']
        ]
      },
      legend: {
        title: {
          text: 'Historical Win Rates in %'
        },
        align: 'right',
        layout: 'horizontal',
        floating: true,
        borderWidth: 1,
        backgroundColor: 'white',
        verticalAlign: 'top',
        y: -10,
        x: 10
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

    const formatedDataHeat = dataArray.map(row => {
      const x = row[columnNameArray[3].name].value;
      const y = row[columnNameArray[4].name].value;

      const amount = row[columnNameArray[5].name].value || 0;

      return [x, y, amount];
    });


    this.options.xAxis[0].title.text = this.props.queryResponse.fields.dimensions[0].label;
    this.options.yAxis[0].title.text = this.props.queryResponse.fields.dimensions[1].label;

    const formatedDataScatter = dataArray.map(row => {

      const x = row[columnNameArray[0].name].value;
      const y = row[columnNameArray[1].name].value;
      const name = row[columnNameArray[2].name].value;
      const probability = row[columnNameArray[5].name].value;

      const amount = row[columnNameArray[1].name].value || 0;
      const formatedAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      return {
        x: x,
        y: y,
        name: name,
        probability: probability,
        amount: amount,
        formatedAmount: formatedAmount
      };
    });

    const options = {...this.options};
    options.series = [];

    options.series.push({
      type: 'heatmap',
      dataLabels: {
        enabled: true,
        color: '#000000'
      },
      data: [...formatedDataHeat],
      xAxis: 1,
      yAxis: 1
    })

    options.series.push({
      type: 'scatter',
      name: "Opportunities",
      marker: {
        radius: 5,
        fillColor: "#4fadf0",
        lineColor: "#3097e0",
        lineWidth: 2,
        states: {
          hover: {
            enabled: true,
            lineColor: 'rgb(100,100,100)'
          }
        },
        symbol: "circle"
      },
      states: {
        hover: {
          marker: {
            enabled: false
          }
        }
      },
      tooltip: {
        headerFormat:'<b>{point.point.name}</b><br>',
        pointFormat: 'Days Open: <b>{point.x}</b><br/>Opportunity Amount: <b>${point.formatedAmount}</b><br/>Probability: <b>{point.probability}%</b>'
      },
      data: [...formatedDataScatter]
    })

    return (
      <Container>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
      </Container>
    )

  }
}
