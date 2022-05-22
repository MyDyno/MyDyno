const express = require('express')
const app = express.Router()

app.get('/github', (req, res) => {
    res.redirect('https://github.com/mydyno')
})

app.get('/discord', (req, res) => {
    res.redirect('/discord')
})

module.exports = {app: app}