import {useState, useEffect} from 'react';
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
    const [loading, setLoading] = useState<boolean>(false);
    const [priceHistory, setPriceHistory] = useState<PriceHistory[]>([]);

    useEffect(() => {
        setLoading(true);
        fetch(PRICE_HISTORY_URI)
            .then((res) => res.json())
            .then((data) => setPriceHistory(data))
            .finally(() => setLoading(false));
    }, []);

    if (!priceHistory.length) {
        return (
            <div className="text-base text-center p-4">{
                loading ? "Loading price history..." : "No price history yet"
            }</div>
        );
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
