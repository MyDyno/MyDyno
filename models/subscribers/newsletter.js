const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    name: {
        type: String,
        require: true,
    },
    subscribers: {
        type: Array
    }
})

module.exports = mongoose.model('newsletterSubs', schema)