const priceService = require("../services/price")

const priceController = {
    getPriceHistory: async (req, res) => {
        const priceHistory = await priceService.getPriceHistory()
        res.json(priceHistory)
    }
}

module.exports = priceController
