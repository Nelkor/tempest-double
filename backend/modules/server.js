import { createServer } from 'http'

import ws from 'ws'

import { httpApp } from './http-app.js'
import { wsApp } from './ws-app.js'

/**
 * @param {number} port
 */
export const listen = port => {
  const server = createServer(httpApp)
  const wsServer = new ws.Server({ server })

  wsServer.on('connection', wsApp)

  server.listen(port, 'localhost')
}
