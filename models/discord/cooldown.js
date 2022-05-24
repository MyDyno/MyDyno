const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    userId: {
        type: String,
        require: true,
    },
    cooldowns: {
        type: Array
    },
})

module.exports = mongoose.model('discordCooldown', schema)