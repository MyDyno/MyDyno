const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    userId: {
        type: String,
        require: true,
    },
    cash: {
        type: Number,
    },
    bank: {
        type: Number,
    },
    inventory: {
        type: Array
    },
})

module.exports = mongoose.model('discordEconomy', schema)