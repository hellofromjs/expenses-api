const mongoose = require('mongoose')

const expensesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
    },
    amount: {
        type: Number,
        required: [true, 'amount is required'],
    },
    notes: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        required: [true, 'date is required'],
    },
})

const Expenses = mongoose.model('Expenses', expensesSchema)

module.exports = Expenses