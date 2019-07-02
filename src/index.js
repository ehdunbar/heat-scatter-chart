import React from 'react'
import ReactDOM from 'react-dom'
import HeatScatter from './components/HeatScatter';

looker.plugins.visualizations.add({
  options: {
    color: {
      type: "array",
      label: "Color",
      display: "color",
      default: ["#5b5d9a"]
    }
  },
  // Looker runs this function first
  create: function(element, config) {
    element.innerHTML = `
      <style>
        .heat-scatter {
          width: 100%;
          height: 100%;
        }
        .highcharts-container {
        }
      </style>
    `;

    var container = element.appendChild(document.createElement("div"));
    container.className = "heat-scatter";

    this._textElement = container.appendChild(document.createElement("div"));

    this.heatMap = ReactDOM.render(
      <HeatScatter
        done={false}
      />
     ,this._textElement
    );
  },

  updateAsync: function(data, element, config, queryResponse, details, done) {

    this.clearErrors();

    if (queryResponse.fields.dimensions.length < 3) {
      this.addError({title: "Not Enough Dimensions", message: "This Visualization requires 3 dimensions."});
      return;
    }

    this.heatMap = ReactDOM.render(
      <HeatScatter
        key="heat_scatter"
        config={config}
        data={data}
        done={done}
        queryResponse={queryResponse}
        style={{display: 'grid'}}
      />,
      this._textElement
    );

    done()
  }
});
