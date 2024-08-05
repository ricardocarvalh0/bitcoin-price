const {coinDeskClient} = require('./configs/axiosClients');

const priceAPI = {
    getCurrentPrice: async () => {
        const response = await coinDeskClient.request({
            url: `/bpi/currentprice.json`,
            method: "GET",
        })

        return response.data
    }
}

module.exports = {priceAPI}
