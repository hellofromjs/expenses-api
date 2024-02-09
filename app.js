const express = require('express')
const expensesRouter = require('./routes/expensesRouter')
const morgan = require('morgan')

const app = express()

app.use(morgan('dev'))
app.use(express.json())

// mounting router
app.use('/api/v1/expenses', expensesRouter)

module.exports = app