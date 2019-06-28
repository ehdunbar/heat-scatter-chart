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
        marginBottom: 80,
        plotBorderWidth: 1
      },
      title: {
        text: "Heat Map"
      },
      xAxis: {
        // TODO: Might want to just remove the categories
        categories: ['X Axis Categories'],
        title: {
          enabled: true,
          text: 'X Axis Name'
        }
      },
      yAxis: {
        categories: ['Y Axis Categories'],
        title: {
          enabled: true,
          text: 'Y Axis Name'
        }
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
      // TODO: Might need to change the formatter pulling out undefined instead of expected values
      tooltip: {
        formatter: function () {
          return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> sold <br><b>' +
            this.point.value + '</b> items on <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
        }
      },
      series: []
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

      const amount = row[columnNameArray[2].name].value || 0;

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
      <Container>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
      </Container>
    )
  }
}
