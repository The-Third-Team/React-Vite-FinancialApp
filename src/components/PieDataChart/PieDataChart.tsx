import React from "react";

import { PieChart } from 'react-minimal-pie-chart';

interface ChartItem {
    title: string,
    value: number,
    color: string
}

interface Properties {
    data: ChartItem[],
}

const PieDataChart = ({ data }: Properties) => {

    return  <PieChart 
                style={{
                    fontFamily:
                    '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
                    fontSize: '6px',
                }}
                data={ data }
                lineWidth={60}
                segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
                animate
                label={({ dataEntry }) => Math.round(dataEntry.percentage) + '%'}
                labelStyle={{
                fill: '#fff',
                opacity: 0.75,
                pointerEvents: 'none',
            }}/>;
}

export default PieDataChart;