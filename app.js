require('dotenv').config()
const port = process.env.PORT
const { sequelize, User } = require('./models')
const express = require('express')
const app = express()
const validator = require('email-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('./middleware/auth')
const nodemailer = require('nodemailer')
const getJSON = require('get-json')

app.use(express.json())

app.get('/users', async (req, res) => {
    const users = await User.findAll()

    return res.json({ users })
})

app.post('/signup', async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body
        const oldUser = await User.findOne({ where: { email } })

        if (!(firstname && lastname && email && password))
            return res.status(400).send('All input is required.')
        else if (!validator.validate(email))
            return res.status(400).send('Email is not valid.')
        else if (oldUser) 
            return res.status(409).send('User already exist. Please log in.')

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ firstname, lastname, email, password: hashedPassword })
        return res.status(201).json({ user })

    } catch (err) {
        console.log(err)
    }
})

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })
        
        if (!(email && password))
            return res.status(400).send('All input is required.')
        else if (!user) 
            return res.status(401).send('Email is not registered.')
        else if (!await bcrypt.compare(password, user.password)) 
            return res.status(400).send('Password is not correct.')

        const token = jwt.sign(
            { email },
            process.env.TOKEN_KEY,
            { expiresIn: '1h' }
        )

        return res.status(200).json({ user, token })
        
    } catch (err) {
        console.log(err)
    }
})

app.post('/sendemail', auth, async (req, res) => {
    const { email } = req.user
    const user = await User.findOne({ where: { email } })
    const url = await encodeURI(`http://api.icndb.com/jokes/random?firstName=${user.firstname}&lastName=${user.lastname}`)

    getJSON(url, (err, resp) => {
        if (err)
            console.log(err)
        else {
            const transporter = nodemailer.createTransport({
                service: process.env.EMAIL.split('@')[1],
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASSWORD
                }
            })
            
            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: 'Sending email using Node.js',
                text: resp.value.joke
            }

            transporter.sendMail(mailOptions, (err) => {
                if (err)
                    console.log(err)
                else
                    return res.status(200).json({ resp })
            })
        }
    })
})

app.listen(port, async () => {
    console.log(`Server up on http://localhost:${port}.`)
    await sequelize.authenticate()
    console.log('Database Connected!')
})
