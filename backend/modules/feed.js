import { users } from './users.js'

let i = 0

/**
 * @param {StoredUser} user
 */
const feedUser = user => {
  if (!user.socket) {
    return
  }

  user.socket.send(i.toString(user.radix))
}

const tick = () => {
  i++

  users.forEach(feedUser)
}

export const startFeed = () => setInterval(tick, 2e3)
