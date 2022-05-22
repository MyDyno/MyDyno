const express = require('express')
const app = express.Router()
const { discordBotMain } = require('../discord/main')
let client = (new discordBotMain()).discordClient()

app.get('/', (req, res) => {
    res.render('./discord/discord', {req: req, client: client})
})

app.get('/invite', (req, res) => {
    res.redirect(client.config.botInvite)
})

app.get('/support', (req, res) => {
    res.redirect(client.config.supportServer)
})

module.exports = {app: app}