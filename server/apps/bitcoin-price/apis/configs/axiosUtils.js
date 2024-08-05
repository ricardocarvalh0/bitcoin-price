const errorHandler = (error) => {
    console.error('API error', error)
    return Promise.reject(error)
}

module.exports = { errorHandler }
