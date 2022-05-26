const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    commands: {
        type: Array
    }
})

module.exports = mongoose.model('discordCommandCount', schema)