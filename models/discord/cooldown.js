const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    userId: {
        type: String,
        require: true,
    },
    dailyCooldown: {
        type: Number,
    },
    workCooldown: {
        type: Number,
    },
    fishCooldown:{
        type: Number,
    },
    huntCooldown: {
        type: Number,
    },
    digCooldown:{
        type: Number,
    },
    quizCooldown:{
        type: Number,
    },
    rpsCooldown:{
        type: Number,
    },
})

module.exports = mongoose.model('discordCooldown', schema)