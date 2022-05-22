const express = require('express')
const app = express.Router()
const covid = require('novelcovid');

app.get('/', async (req, res) => {
    const covidStats = await covid.all();
    const data = [
        {name: 'Cases', value: covidStats.cases.toLocaleString(), inline: true},
        {name: 'Cases Today', value: covidStats.todayCases.toLocaleString(), inline: true},
        {name: 'Deaths', value: covidStats.deaths.toLocaleString(), inline: true},
        {name: 'Deaths Today', value: covidStats.todayDeaths.toLocaleString(), inline: true},
        {name: 'Recovered', value: covidStats.recovered.toLocaleString(), inline: true},
        {name: 'Recovered Today', value: covidStats.todayRecovered.toLocaleString(), inline: true},
        {name: 'Infected Right Now', value: covidStats.active.toLocaleString(), inline: true},
        {name: 'Critical Condition', value: covidStats.critical.toLocaleString(), inline: true},
        {name: 'Tested', value: covidStats.tests.toLocaleString(), inline: true}
    ]

    res.render('novelcovid/novelcovid', { req: req, data: data })
})

module.exports = {app: app}