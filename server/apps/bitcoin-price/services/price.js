const { priceAPI } = require('../apis/priceAPI');
const priceDomain = require('../domain/price');

const priceService = {
    initializeDB: async () => {
        return priceDomain.createTables();
    },
    getPriceHistory: async () => {
        return priceDomain.getHistory();
    },
    refreshPrice: async () => {
        try {
            const currentPrice = await priceAPI.getCurrentPrice();

            const price = currentPrice.bpi.USD.rate_float
            const timestamp = currentPrice.time.updatedISO;

            await priceDomain.savePrice(price, timestamp);

            return Promise.resolve(price);
        } catch (error) {
            console.log('Error broadcasting price', error);
            return Promise.reject(error);
        }
    }
}

module.exports = priceService
