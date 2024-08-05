const path = require('path');
const express = require("express");
const expressWS = require("express-ws");

const priceController = require('./controllers');
const priceService = require('./services/price');

const WS_PATH = '/live-price'

const priceApp = express();
const priceWS = expressWS(priceApp);

const registerRoutes = () => {
    priceApp.ws(WS_PATH, (_ws, _req) => {
        broadcastCurrentPrice();
    });
    priceApp.use(express.static(path.resolve(__dirname, '../../../client/build')));

    priceApp.get('/api/price/history', priceController.getPriceHistory);
    priceApp.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../../../client/build', 'index.html'));
    });
}

const initializeDB = async () => {
    return priceService.initializeDB();
}

const broadcastCurrentPrice = async () => {
    try {
        const currentPrice = await priceService.refreshPrice();
        const wsServer = priceWS.getWss(WS_PATH);
        wsServer.clients.forEach((client) => {
            client.send(currentPrice);
        });
    } catch (error) {
        console.error('error emitting new price', error);
        throw error;
    }
}


const start = async () => {
    try {
        registerRoutes();
        await initializeDB();
        setInterval(() => {
            broadcastCurrentPrice();
        }, 30000);

        const PORT = process.env.PORT || 3001;
        priceApp.listen(PORT, () => {
            console.log(`Server listening on ${PORT}`);
        });
    } catch (err) {
        console.log('error starting app', err);
        throw err;
    }
}


module.exports = {start};
