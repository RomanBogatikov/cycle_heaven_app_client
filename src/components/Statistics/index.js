import React, { Component } from 'react';
import Chart from 'chart.js';

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sales: '',
    }
  }


  render() {
    return (
      <div>
        <BarChart sales={this.state.sales}/>
      </div>
    )
  }
}

class BarChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sales: [],
    }
  }

  componentDidMount() {
    this.getSales();
  }

  getSales() {
    fetch('https://cycle-heaven-api.herokuapp.com/sales')
    .then(response => response.json())
    .then(json => this.prepareData(json))
    .then(data => this.createChart(data))
    .catch(err => console.log(err));
  }

  createChart(data) {
    const ctx = document.querySelector('#sales');
    const salesChart = new Chart(ctx, {
      type: 'line',
      data: data,
    });
  }

  prepareData(data) {
    const chartData = {
      labels: [],
      datasets: [
        {
          label: 'road bicycles',
          data: [],

          fill: false,
          lineTension: 0,

          backgroundColor: "rgba(192, 77,77,.5)",
          borderColor: "rgba(192, 77,77,1)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(192, 77,77,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(192,77,77,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          spanGaps: false,
        },
        {
          label: 'mountain bicycles',
          data: [],

          fill: false,
          lineTension: 0,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          spanGaps: false,
        },
        {
          label: 'touring bicycles',
          data: [],

          fill: false,
          lineTension: 0,
          backgroundColor: "rgba(21,198,39,0.4)",
          borderColor: "rgba(21,198,39,1)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(21,198,39,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(21,198,39,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          spanGaps: false,
        },
      ]
    }

    data.forEach( sale => {
      chartData.labels.push(sale.month);
      chartData.datasets[0].data.push(sale.average_road);
      chartData.datasets[1].data.push(sale.average_mountain);
      chartData.datasets[2].data.push(sale.average_touring);
    })

    return chartData;
  }

  render() {
    return (
      <div>
        <h1>Monthly sales by category:</h1>
        <canvas id="sales" width="300" height="100"></canvas>
      </div>
    )
  }
}




export default Statistics;
