const express = require('express')
const app = express.Router()
const User = require('../models/account/user')
const config = require('../config.json')
const nodemailer = require('nodemailer')
let transporter = nodemailer.createTransport({service: 'gmail', auth: {user: config.MyDyno_User, pass: config.MyDyno_Pass}});

const settingAuth = (req, res, next) => {
    if(req.session.isAuth){
        next()
    }
    else{
        res.redirect('/account/login')
    }
}

const LoginRegisterAuth = (req, res, next) => {
    if(req.session.isAuth){
        res.redirect('/')
    }
    else{
        next()
    }
}

app.get('/settings', settingAuth, (req, res) => {
    res.render('./account/settings/settings', {req: req, res: res, User: User})
})

app.get('/login', LoginRegisterAuth, (req, res) => {
    res.render('./account/login/login', {req: req, status: 'Not Registered? <a href="/account/register">Register Now!</a>'})
})

app.get('/register', LoginRegisterAuth, (req, res) => {
    res.render('./account/register/register', {req: req, status: 'Already have an account? <a href="/account/login">Login Now!</a>'})
})

app.post('/login', async (req, res) => {

    let loginUserArray = await User.find()
    let matchEmailLoginUser = loginUserArray.find((user) => user.email.toUpperCase() == req.body.email.toUpperCase())
    let matchPasswordLoginUser = loginUserArray.find((user) => user.email.toUpperCase() == req.body.email.toUpperCase() && user.password == req.body.password)

    if(!matchEmailLoginUser){
        res.render('./account/login/login', {req: req, status: 'Email not found!, please try again!<br>Not Registered? <a href="/account/register">Register Now!</a>'}) 
    }
    else{

        if(!matchPasswordLoginUser){
            res.render('./account/login/login', {req: req, status: 'Wrong password!, please try again!<br>Not Registered? <a href="/account/register">Register Now!</a>'})
        }
        else{
            saveLoginData(req, res)
        }
    }
})

app.post('/register', async (req, res) => {

    let registerUserArray = await User.find()
    let matchEmailRegisterUser = registerUserArray.find((user) => user.email.toUpperCase() == req.body.email.toUpperCase())
    let matchUsernameRegisterUser = registerUserArray.find((user) => user.username.toUpperCase() == req.body.username.toUpperCase())

    if(matchEmailRegisterUser){
        res.render('./account/register/register', {req: req, status: 'That email is already taken!, please try again with a unique email!<br>Already have an account? <a href="/account/login">Login Now!</a>'})
    }
    else{

        if(matchUsernameRegisterUser){
            res.render('./account/register/register', {req: req, status: 'That username is already taken!, please try again with a unique username!<br>Already have an account? <a href="/account/login">Login Now!</a>'})
        }
        else{
            registerNext(req, res)
        }

    }
})

app.post('/verify', (req, res) => {

    if(req.body.verificationCode == req.session.verificationCode){
        saveData(req, res)
    }
    else{
        res.render('./account/verify/verify', {req: req, status: 'Code not matched!<br>Already have an account? <a href="/account/login">Login Now!</a>'})
    }
})

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err) throw err;
        res.redirect('/')
    })
})

app.post('/deleteAccount', async (req, res) => {
    let userEmail = await req.session.email
    await User.deleteOne({email: userEmail})
    req.session.destroy((err) => {
        if(err) throw err;
        res.redirect('/')
    })
})

async function saveLoginData(req, res){

    async function saveLoginCred(){
        let loginUserArray = await User.find()
        let matchLoginUser = loginUserArray.find((user) => user.email.toUpperCase() == req.body.email.toUpperCase())
        req.session.isAuth = true,
        req.session.username = matchLoginUser.username
        req.session.email = matchLoginUser.email
        req.session.password = matchLoginUser.password
        req.session.icon = matchLoginUser.icon
    }
    await saveLoginCred().then(() => {
        res.redirect('/')
    })
}

async function saveData(req, res){

    let userData = new User({
        username: req.session.username,
        email: req.session.email,
        password: req.session.password,
        icon: req.session.icon
    })
    await userData.save()
    res.redirect('/account/login')
}

function registerNext(req, res){
    let randomCode = Math.floor(Math.random() * 999999) + 111111;

    let mailOptions = {
        from: 'mydyno.xyz@gmail.com',
        to: req.body.email,
        subject: 'Email Verification',
        html: 
            `
            <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account. </div>
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <!-- LOGO -->
                <tr>
                    <td bgcolor="#FFA73B" align="center">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#FFA73B" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                    <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome!</h1> <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">Hi ${req.body.username}, thanks for registering, we're excited to have you with us. First, you need to verify your account.</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                <table border="0" cellspacing="0" cellpadding="0">
                                                <h2>Your Code:</h2>
                                                    <tr>
                                                        <td align="center" style="border-radius: 3px;" bgcolor="#FFA73B">
                                                            <a style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #FFA73B; display: inline-block;">
                                                                ${randomCode}
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">If you have any questions, just reply to this email—we're always happy to help out.</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">MyDyno</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            `
    };

    transporter.sendMail(mailOptions, (error, data) => {

        if(error){ 
            res.render('./account/register/register', {req: req, status: 'Couldn\'t send verification email!, please try again!<br>Already have an account? <a href="/account/login">Login Now!</a>'})
            console.log('Error: ' + error)
        }
        else{
            if(!req.body.icon){
                req.body.icon = config.defaultIcon
            }

            req.session.verificationCode = randomCode;
            req.session.username = req.body.username
            req.session.email = req.body.email
            req.session.password = req.body.password
            req.session.icon = req.body.icon
            res.render('./account/verify/verify', {req: req, status: 'A verification code has been sent to your email!<br>Already have an account? <a href="/account/login">Login Now!</a>'})
        }
    })
}

module.exports = {app: app}