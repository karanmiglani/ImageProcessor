const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const env = require('dotenv')
const uploadRoutes = require('./routes/uploadRoutes')
const statusRoutes = require('./routes/statusRoutes')
const webhookHandler = require('./webhook/webhook')
const app = express()
connectDB()
env.config()
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 3000
app.use('/api/upload' , uploadRoutes)
app.use('/api/status' , statusRoutes)
app.use('/api/webhook', webhookHandler);

app.listen(port , () => {
    console.log(`Listening at port ${port}`)
})
