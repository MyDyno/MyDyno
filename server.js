const express = require('express')
const app = express()
const server = require('http').createServer(app)
const subdomain = require('express-subdomain')
const io = require('socket.io')(server)
module.exports = {io: io}
const mongoose = require('mongoose');
const session = require('express-session')
const MongoDBSession = require('connect-mongodb-session')(session)
const config = require('./config.json')
const newsLetterSubsModel = require('./models/subscribers/newsletter')

async function startupCmd(){
    let myModel = await newsLetterSubsModel.findOne({name: 'Website'})
    if(!myModel){
        let toCreate = await newsLetterSubsModel.create({
            name: 'Website',
            subscribers: []
        })
        await toCreate.save()
    }
}
startupCmd()

const discordRouter = require('./routes/discord')
const chatRouter = require('./routes/chat')
const accountRouter = require('./routes/account')
const novelcovidRouter = require('./routes/novelcovid')
const redirectRouter = require('./routes/redirect')

mongoose.connect(config.mongodb_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => {
    console.log('Database: Connected to mongoose!')
})
.catch((err) => {
    console.log('Database: Couldn\'t connet to mongoose! Error: ' + err)
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use('/assets', express.static('assets'))

const store = new MongoDBSession({
    uri: config.mongodb_url,
    collection: 'loginSessions'
})
app.use(session({
    secret: config.session_secret,
    resave: false,
    saveUninitialized: false,
    maxAge: Date.now() + (1 * 86400 * 1000),
    store: store
}))

app.use((req, res, next) => {
    config.socket_url = req.headers.host
    next()
})

app.use(subdomain('discord', discordRouter.app));
app.use('/discord', discordRouter.app)
app.use('/chat', chatRouter.app)
app.use('/account', accountRouter.app)
app.use('/novelcovid', novelcovidRouter.app)
app.use('/redirect', redirectRouter.app)

app.get('/', (req, res) => {
    res.render('home', {req: req, config: config})
})

app.get('/terms-of-service', (req, res) => {
    res.render('tos', {req: req, config: config})
})

app.get('/privacy-policy', (req, res) => {
    res.render('privacy-policy', {req: req, config: config})
})

app.post('/newsletterSUB', async (req, res) => {

    let myModel = await newsLetterSubsModel.findOne({name: 'Website'})
    if(myModel.subscribers.find((sub) => sub.email == req.body.subEmail)){
        return res.redirect('/')
    }
    newsLetterSubsModel.findOneAndUpdate(
        {name: 'Website'},
        {
            $push: {
                subscribers: {
                    email: req.body.subEmail
                }
            }
        }
    )
    .then(() => {
        res.redirect('/')
    })
})

let port = process.env.PORT || 5000 || 8000
server.listen(port, () => {
    console.log('Server: listening at port: ' + port)
})