import Chart from "react-google-charts";
import React, {CSSProperties} from "react";

export interface ITemperatureGaugeProps {
    style?: CSSProperties
    value: number
    greenFrom?: number
    greenTo?: number
    yellowFrom?: number
    yellowTo?: number
    redFrom?: number
    redTo?: number
    width?: number
    height?: number
}

export const TemperatureGauge = (props: ITemperatureGaugeProps) => {
    const {
        style,
        value
    } = props
    const gaugeData = [
        ['Label', 'Value'],
        ['Cube', +value.toFixed(2)],
    ]
    return <Chart
        style={style}
        chartType="Gauge"
        loader={<div>Loading Chart</div>}
        data={gaugeData}
        options={{
            width: props.width,
            height: props.height,
            majorTicks: [ "0", 20, 40,  60, 80, 100],
            greenFrom: props.greenFrom,
            greenTo: props.greenTo,
            yellowFrom: props.yellowFrom,
            yellowTo: props.yellowTo,
            redFrom: props.redFrom,
            redTo: props.redTo,
            minorTicks: 5,
        }}
    />
}