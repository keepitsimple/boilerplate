import { createServer, STATUS_CODES } from 'http'
import pino from 'pino'
import pinoHttp from 'pino-http'

import healthCheck from './controllers/health-check'
import troop from './controllers/troop'

const logger = pino({ level: process.env.LOG_LEVEL || 'info' })
const port = Number(process.env.PORT) || 3000

const regexNumber = /^\/\d+$/

const server = createServer((req, resp) => {
  pinoHttp({
    logger,
    autoLogging: {
      ignorePaths: ['/healthcheck']
    }
  })(req, resp)
  req.log.debug(req.url)
  if (req.url.toLowerCase() === '/healthcheck') {
    healthCheck(resp)
    return
  }
  // Only URLs like `/[number]` are accepted
  if (req.method === 'GET' && regexNumber.test(req.url)) {
    troop(req, resp)
    return
  }
  resp.writeHead(404, STATUS_CODES[404], {})
  resp.end('Not found')
})

server.listen(port, (err) => {
  if (err) {
    return logger.error(err)
  }
  console.log(`Server is listening on port: ${port}`)
})

process.on('uncaughtException', err => {
  logger.error('There was an uncaught error:', err)
  process.exit(1)
})
