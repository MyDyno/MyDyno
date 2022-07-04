const express = require('express')
const app = express.Router()
const config = require('../config.json')
const { discordBotMain } = require('../discord/main')
let client = (new discordBotMain()).discordClient()

app.get('/', async (req, res) => {
    await client;
    res.render('./discord/discord', {req: req, client: client, require: require, config: config,})
})

app.get('/invite', (req, res) => {
    res.redirect(client.config.botInvite)
})

app.get('/support', (req, res) => {
    res.redirect(client.config.supportServer)
})

module.exports = {app: app}