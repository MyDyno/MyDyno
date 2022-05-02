const mongoose = require('mongoose')
const Schema = mongoose.Schema

const generalSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('botMessage', generalSchema)