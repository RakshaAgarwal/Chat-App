const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require("./Routes/userRoutes")
const chatRoutes = require("./Routes/chatRoutes")
const messageRoutes = require("./Routes/messageRoutes")

const app = express()
require('dotenv').config()

app.use(express.json())
app.use(cors())
app.use('/api/users', userRoutes)
app.use('/api/chats', chatRoutes)
app.use('/api/messages', messageRoutes)

const port = process.env.PORT || 5000

app.listen(port, (req, res) => {
    console.log(`server running on ${port}`)
})

mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log('Mongoose connected successfully')).catch(err =>  console.log('error',err.message))