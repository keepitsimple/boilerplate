import { createServer, STATUS_CODES } from 'http'
import pino from 'pino'
import pinoHttp from 'pino-http'
// import { db } from './db'

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

  // The pool.query method automatically returns connection back to the connection pool.
  // const data = await db.query('SELECT version()')
  // resp.end(`API server response. DB version:  ${data.rows[0].version} `)
  resp.end('API server running...')
})

server.listen(port, (err) => {
  if (err) {
    return logger.error(err)
  }
  console.log(`Server is listening on port: ${port}`)
})
