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

  // color: ['#3586FF', '#E0C9FF', '#FAA365', '#FC7676']
  slices: [{color:'#3586FF'}, {color:'#E0C9FF'}, {color:'#FAA365'}, {color:'#FC7676'}]
    return (
        <Chart
          chartType="PieChart"
          data={ data }
          options={ { title: 'Expenses Overview', 
                      is3D: false, 
                      slices: [{color:'#3586FF'}, {color:'#E0C9FF'}, {color:'#FAA365'}, {color:'#FC7676'}]} }
          width={"100%"}
          height={"250px"}
        />
      );
}
  

export default PieDataChart;