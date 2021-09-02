import express from 'express'
import pino from 'pino'
import pinoHttp from 'pino-http'
import { SERVICE_UNAVAILABLE } from 'http-status'

import apiV1 from './controllers/api_v1'

const logger = pino({ level: process.env.LOG_LEVEL || 'info' })
const PORT = process.env.PORT || 3000

const app = express()

app.use(function (req, res, next) {
  res.header('Content-Type', 'application/json')
  next()
})

app.use(pinoHttp({
  logger,
  autoLogging: {
    ignorePaths: ['/healthcheck']
  }
}))

app.use(express.json())

app.use('/api/v1', apiV1)

app.get('/healthcheck', (_, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
  }
  try {
    res.send(healthcheck)
  } catch (e) {
    healthcheck.message = e
    res.status(SERVICE_UNAVAILABLE).send()
  }
})

app.get('/', (req, res) => {
  // logger.info(req.url)
  // req.log.debug('something else')
  res.send({
    uptime: process.uptime(),
    message: 'Service is running',
    timestamp: Date.now()
  })
})

app.listen(PORT)
console.log(`Express started on port ${PORT}`)
