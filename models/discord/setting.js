const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    guildId: {
        type: String,
        require: true,
    },
    prefix: {
        type: String
    }
})

module.exports = mongoose.model('discordSetting', schema)