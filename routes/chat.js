const express = require('express')
const app = express.Router()
const { io } = require('../server')

//chatbot

const config = require('../config.json')
const Message = require('../models/chat/chat')

app.get('/', async (req, res) => {
    let GetMessage = await Message.find()
    res.render('./chat/main', {req: req, message: GetMessage, config: config})
})

io.on('connection', (socket) => {

    socket.on('sendMessage', async (data) => {

        const PostMessage = new Message({
            username: data[1],
            message: data[2],
            icon: data[0]
        })
        await PostMessage.save()

        let messageObject = new Array(data[0], data[1], data[2])
        socket.broadcast.emit('Message', messageObject)
    }) 
})

module.exports = {app: app}