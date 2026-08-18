require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { errorHandler } = require('./src/middleware/errorHandler')

const bookingsRouter = require('./src/routes/bookings')
const servicesRouter = require('./src/routes/services')
const contactRouter  = require('./src/routes/contact')
const chatRouter = require('./src/routes/chat')

const app = express()
const PORT = process.env.PORT || 3001
const allowedOrigins = [
  'http://localhost:5173',
  process.env.CLIENT_URL,
].filter(Boolean)

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`))
  },
  credentials: true,
}))
app.use(express.json())

app.get('/api/health', (_, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }))

app.use('/api/bookings', bookingsRouter)
app.use('/api/services',  servicesRouter)
app.use('/api/contact',   contactRouter)
app.use('/api/chat',      chatRouter)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`\n🚗  Wow Detailing API running at http://localhost:${PORT}`)
  console.log(`    Health check: http://localhost:${PORT}/api/health\n`)
})
