import { createServer, STATUS_CODES } from 'http'
import pino from 'pino'
import pinoHttp from 'pino-http'

const logger = pino({ level: process.env.LOG_LEVEL || 'info' })
const port = process.env.PORT || 3000

const server = createServer((req, resp) => {
  pinoHttp({
    logger,
    autoLogging: {
      ignorePaths: ['/healthcheck']
    }
  })(req, resp)
  req.log.debug(req.url)
  if (req.url === '/healthcheck') {
    const healthcheck = {
      message: 'OK',
      uptime: process.uptime(),
      timestamp: Date.now()
    }
    try {
      resp.end(JSON.stringify(healthcheck))
    } catch (e) {
      healthcheck.message = e.message
      resp.writeHead(503, STATUS_CODES[503], {})
      resp.end(JSON.stringify(healthcheck))
    }
    return
  }
  if (req.url === '/') {
    resp.end('API server running...')
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
