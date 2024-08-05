import React from 'react';
import {Chart} from "react-google-charts";

interface PriceHistory {
    timestamp: string;
    price: number;
}

const PRICE_HISTORY_URI = "/api/price/history"
const CHART_AXIS = ["Time", "Price"]
const CHART_OPTIONS = {
    title: "Bitcoin Price",
    curveType: "function",
    legend: {position: "bottom"},
};

function PriceChart() {
    const [priceHistory, setPriceHistory] = React.useState<PriceHistory[]>([]);

    React.useEffect(() => {
        fetch(PRICE_HISTORY_URI)
            .then((res) => res.json())
            .then((data) => setPriceHistory(data));
    }, []);

    if (!priceHistory.length) {
        return <>"No price history yet"</>;
    }

    const chartData = [CHART_AXIS, ...priceHistory.map(({timestamp, price}) => [new Date(timestamp), price])]
    return (
        <Chart
            chartType="LineChart"
            data={chartData}
            width="50vw"
            height="50vh"
            options={CHART_OPTIONS}
        />
    );
}

export default PriceChart;
