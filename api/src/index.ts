import { createServer } from 'http'
import * as pino from 'pino'
import { db } from './db'
//
const logger = pino({ level: 'debug' })
const port = process.env.PORT ? +process.env.PORT : 3000
//
const server = createServer(async (req, resp) => {
  logger.info(`${req.url}`)
  // The pool.query method automatically returns connection back to the connection pool.
  const data = await db.query('SELECT version()')
  resp.end(`API server response. DB version:  ${data.rows[0].version} `)
})

server.listen(port,  () => {
  console.log(`Server is listening on port: ${port}`)
})
