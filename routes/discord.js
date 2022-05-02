const express = require('express')
const app = express.Router()
const { discordBotMain } = require('../discord/main')
let client = (new discordBotMain()).discordClient()

app.get('/', (req, res) => {
    res.render('./discord/discord', {req: req, client: client})
})

app.get('/invite', (req, res) => {
    res.redirect('https://discord.com/api/oauth2/authorize?client_id=833607908104732672&permissions=972549751&scope=bot')
})

app.get('/support', (req, res) => {
    res.redirect('https://discord.gg/Rgj6e8Tuq5')
})

module.exports = {app: app}