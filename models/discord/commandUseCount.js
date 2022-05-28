const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    name: {
        type: String,
        require: true,
    },
    commands: {
        type: Array
    }
})

module.exports = mongoose.model('discordCmdUseCount', schema)