import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {},
      chartOptions: {},
    };
  }

  componentDidMount() {
    const { pieChartData, pieChartOptions } = this.props;
    this.setState({
      chartData: pieChartData,
      chartOptions: pieChartOptions,
    });
  }

  render() {
    const { chartData, chartOptions } = this.state;

    if (!chartData || !chartData.series || !chartData.labels) {
      console.error("Missing chart data or options");
      return null;
    }

    const { series, labels } = chartData;

    const options = {
      ...chartOptions,
      series: series,
      labels: labels,
    };

    return (
      <>
        <ReactApexChart options={options} series={series} type="pie" width="100%" height="100%" />
      </>
    );
  }
}

export default PieChart;
