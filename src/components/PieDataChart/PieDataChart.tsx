import React from "react";
import Chart from "react-google-charts";

interface ChartItem {
    title: string,
    value: number,
}

interface Properties {
    data: [],
}

const PieDataChart = ({ data }: Properties) => {

    return (
        <Chart
          chartType="PieChart"
          data={ data }
          options={ { title: 'Expenses Overview', is3D: true } }
          width={"100%"}
          height={"400px"}
        />
      );
}
  

export default PieDataChart;