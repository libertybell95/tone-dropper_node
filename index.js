const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const path = require('path')
const config = require('config')

const Auth = require('./routes/Auth')
const Tones = require('./routes/Tones')
const Users = require('./routes/Users')

require('./models/init')

const app = express()
const PORT = config.get('port') || 8080

app.use(bodyParser.json())
app.use(cookieParser())
app.use(morgan('tiny'))

app.use(express.static(path.join(__dirname, 'client/build')))
app.use('/auth', Auth)
app.use('/tones', Tones)
app.use('/users', Users)

app.listen(PORT, console.log(`Listening on port ${PORT}`))
