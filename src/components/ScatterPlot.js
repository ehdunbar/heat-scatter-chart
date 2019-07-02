import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import styled from 'styled-components'


const Container = styled.div``;

export default class Scatter extends React.Component {
  constructor (props) {
    super(props)

    // Highchart Options
    this.options = {
      chart: {
        type: 'scatter',
        zoomType: 'xy',
        backgroundColor: 'transparent',
        marginRight: 90
      },
      title: {
        text: 'Heat-Scatter Plot'
      },
      xAxis: {
        title: {
          text: 'X Axis Name'
        },
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        minorTickLength: 0,
        tickLength: 0,
        min: 0,
        startOnTick: false,
        endOnTick:false
      },
      yAxis: {
        title: {
          text: 'Y Axis Name'
        },
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        minorTickLength: 0,
        tickLength: 0,
        gridLineColor: 'transparent'
      },
      plotOptions: {
        scatter: {
          marker: {
            radius: 5,
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
          }
        }
      },
      series: [],
      credits: {
        enabled: false
      }
    }
  }

  render() {

    this.options.xAxis.title.text = this.props.queryResponse.fields.dimensions[0].label;
    this.options.yAxis.title.text = this.props.queryResponse.fields.dimensions[1].label;

    const columnNameArray = this.props.queryResponse.fields.dimensions;
    var dataArray = this.props.data;


    const formatedData = dataArray.map(row => {

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

    const options = { ...this.options };
    options.series = [];

    options.series.push({
      name: "Opportunities",
      marker: {
        fillColor: "#4fadf0",
        lineColor: "#3097e0",
        lineWidth: 2
      },
      data: [...formatedData]
    })

    options.chart.height = document.documentElement.clientHeight - 50

    console.log("ScatterPlot")

    return (
      <Container style={{position: 'absolute', width: '100%', height: '100%'}}>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
      </Container>
    )
  }
}
