const mongoose = require('mongoose')

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A hotel must have name'],
        unique: true,
    },
    address: {
        type: String,
        required: [true, 'Must have address'],
    },
    ranking: {
        type: String,
        default: 1.2,
    },
    room_price: {
        type: Number,
        required: [true, 'Must have room price'],
    },
})

const Hotel = mongoose.model('Hotel', hotelSchema)

module.exports = Hotel