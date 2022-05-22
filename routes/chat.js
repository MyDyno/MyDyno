const express = require('express')
const app = express.Router()
const { io } = require('../server')
const Chatbot = require('discord-chatbot')
const chatbot = new Chatbot({name: 'MyDyno', gender: 'Male'})
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

        // let chatBotReply;
        // await chatbot.chat(data[2]).then((reply) => {chatBotReply = reply})
        // const chatBotPostMessage = new Message({
        //     username: 'MyDyno',
        //     message: chatBotReply,
        //     icon: config.mydynoIcon
        // })
        // await chatBotPostMessage.save()

        // let chatObject = new Array(config.mydynoIcon, 'MyDyno', chatBotReply)
        // socket.broadcast.emit('Message', chatObject)
        // socket.emit('Message', chatObject)
    }) 
})

module.exports = {app: app}