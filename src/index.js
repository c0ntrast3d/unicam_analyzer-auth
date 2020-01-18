require('./models/User')
require('./models/Track')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
const trackRoutes = require('./routes/trackRoutes')
const requireAuth = require('./middlewares/requireAuth')

const app = express()

app.use(bodyParser.json())
app.use(authRoutes)
app.use(trackRoutes)

const mongoUri = 'mongodb+srv://analyzer-admin:rK3xiNIQIzMmhHsp@cluster0-cmaxz.azure.mongodb.net/test?retryWrites=true&w=majority'
if (!mongoUri) {
    throw new Error(
        'Missing serverString'
    )
}
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true
})
mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance')
})
mongoose.connection.on('error', err => {
    console.error('Error connecting to mongo', err)
})

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`)
})

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Listening on port ${port} ...`)
})