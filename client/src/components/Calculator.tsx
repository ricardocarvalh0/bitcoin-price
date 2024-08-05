import React from "react";

interface CalculatorProps {
    onClick: () => void;
}

const Calculator = ({onClick}: CalculatorProps) => {
    const [currentPrice, setCurrentPrice] = React.useState<number>();
    const [typedAmount, setTypedAmount] = React.useState<string>('');
    const [showPriceUpdatedAnimation, setShowPriceUpdatedAnimation] = React.useState<boolean>(false);
    const [status, setStatus] = React.useState<string>('Connecting...');

    React.useEffect(() => {
        const socket = new WebSocket('ws://localhost:3001/live-price');
        socket.addEventListener('open', () => {
            setStatus('Waiting current price...');
        })
        socket.addEventListener('message', (event) => {
            setCurrentPrice(parseFloat(event.data));
        });

        return () => socket.close();
    }, []);

    React.useEffect(() => {
        setShowPriceUpdatedAnimation(true);
        setTimeout(() => {
            setShowPriceUpdatedAnimation(false);
        }, 5000)
    }, [currentPrice])

    const formattedPrice = currentPrice ?
        currentPrice.toFixed(2).toLocaleString() :
        status;

    const amount = parseFloat(typedAmount)
    const formattedBitcoinAmount = amount && currentPrice ?
        `${(amount / currentPrice).toFixed(8).toLocaleString()} Bitcoin` :
        '';

    return (
        <div className="flex flex-col gap-4 px-10 p-4" onClick={onClick}>
            <div className="flex gap-2 items-center">
                <h2 className="text-center font-semibold text-gray-900">
                    Live price
                    ($): {formattedPrice}
                </h2>
                {showPriceUpdatedAnimation && (
                    <div className="relative flex h-3 w-3">
                        <span
                            className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"
                        />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"/>
                    </div>
                )}
            </div>
            <div
                className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                onClick={(e) => e.stopPropagation()}
            >
                <input
                    id="amount"
                    name="amount"
                    type="number"
                    value={typedAmount}
                    onChange={(e) => {
                        setTypedAmount(e.target.value)
                    }}
                    placeholder="type your amount"
                    className="block border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0"
                />
            </div>
            <p className="text-center font-semibold text-gray-900" onClick={(e) => e.stopPropagation()}>
                {formattedBitcoinAmount}
            </p>
        </div>
    );
}

export default Calculator;
