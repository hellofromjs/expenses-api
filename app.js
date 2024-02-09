
const express = require('express')
const hotelRouter = require('./routes/hotelRoutes')
const morgan = require('morgan')

const app = express()

app.use(morgan('dev'))
app.use(express.json())

// mounting router
app.use('/api/v1/hotels', hotelRouter)

module.exports = app