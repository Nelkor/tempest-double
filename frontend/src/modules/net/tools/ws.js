/**
 * @param {function} onOpen
 * @param {function} onMessage
 * @param {function} onClose
 *
 * @return {function(string): void}
 */
export const connect = (onOpen, onMessage, onClose) => {
  const socket = new WebSocket(`wss://${location.host}/realtime-connection`)

  socket.onopen = onOpen
  socket.onmessage = onMessage
  socket.onclose = onClose

  socket.onerror = () => socket.close()

  return data => socket.send(JSON.stringify(data))
}
