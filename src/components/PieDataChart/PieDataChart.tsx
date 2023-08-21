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
    // color scheme for pie chart: ['#3586FF', '#E0C9FF', '#FAA365', '#FC7676']
    // slices: [{color:'#3586FF'}, {color:'#E0C9FF'}, {color:'#FAA365'}, {color:'#FC7676'}]
    return (
        <Chart
            chartType="PieChart"
            data={ data }
            options={ { is3D: false, 
                        legend: {position: 'none'},
                        chartArea: {width: '80%', height: '80%'},
                        fontSize:12,
                        slices: [{color:'#3586FF', offset:0.01}, {color:'#E0C9FF', offset:0.01}, {color:'#FAA365', offset:0.01}, {color:'#FC7676', offset:0.01}]} }

        />
    );
}
  
export default PieDataChart;

// unused option for pie chart:
// title: 'Expenses Overview', 

// documentation for Google Charts:
// https://developers.google.com/chart/interactive/docs/gallery/piechart#configuration-options