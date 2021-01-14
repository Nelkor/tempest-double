import { getToken } from './cookie.js'
import { parseToken } from './token.js'
import { getUserById } from './users.js'

/**
 * @param {WebSocket} socket
 * @param {IncomingMessage} req
 */
export const wsApp = (socket, req) => {
  const token = getToken(req.headers?.cookie)
  const { id, expires } = parseToken(token)
  const user = getUserById(id)

  const authorized = user && user.token === token && expires > Date.now()

  if (!authorized) {
    socket.send('You are not authorized')
    socket.close()

    return
  }

  if (user.socket) {
    user.socket.close()
  }

  user.socket = socket

  /**
   * @param {WebSocket.Data} data
   */
  const onMessage = data => {
    try {
      const { radix } = JSON.parse(data.toString())

      if (Number.isInteger(radix) && radix > 1 && radix < 37) {
        user.radix = radix
      }
    } catch (e) {
    }
  }

  socket.on('message', onMessage)
}
