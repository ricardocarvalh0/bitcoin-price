import React from 'react';
import backgroundImg from './img/background.jpg';
import './App.css';
import PriceChart from "./components/Chart";
import ModalDialog from "./components/ModalDialog";
import Calculator from "./components/Calculator";

function App() {
    const [showChart, setShowChart] = React.useState(false);

    return (
        <div
            className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
            <img src={backgroundImg} alt=""
                 className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
                 width="1308"/>
            <div
                className="relative bg-white shadow-xl ring-1 ring-gray-900/10 mx-auto rounded-lg border-b border-gray-900/10"
            >
                <Calculator onClick={() => setShowChart(true)}/>
                {showChart && (
                    <ModalDialog open={showChart} setOpen={setShowChart}>
                        <PriceChart/>
                    </ModalDialog>
                )}
            </div>
        </div>
    );
}

export default App;
