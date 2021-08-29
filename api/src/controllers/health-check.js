import { STATUS_CODES } from 'http'

function healthCheck (resp) {
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
}

export default healthCheck
