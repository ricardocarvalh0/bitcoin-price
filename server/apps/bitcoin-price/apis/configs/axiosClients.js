const Axios = require("axios");
const { errorHandler } = require('./axiosUtils')

const coinDeskClient = Axios.create({baseURL: 'https://api.coindesk.com/v1'})

// registering the custom error handler to the
// cmsClient axios instance
coinDeskClient.interceptors.response.use(undefined, (error) => {
    return errorHandler(error)
})

module.exports = { coinDeskClient }
