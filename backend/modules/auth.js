import { parseToken, createToken, LIFETIME } from './token.js'
import { getUserById, getUserByName } from './users.js'
import { setToken, unsetToken } from './cookie.js'

/**
 * @param {ServerResponse} res
 * @param {string} token
 *
 * @returns {null|StoredUser}
 */
export const logInByToken = (res, token) => {
  if (!token) {
    return null
  }

  const { id, expires } = parseToken(token)
  const user = getUserById(id)
  const now = Date.now()

  if (!user || user.token !== token) {
    unsetToken(res)

    return null
  }

  if (expires < now) {
    if (user.socket) {
      user.socket.close()
      user.socket = null
    }

    unsetToken(res)

    return null
  }

  if (expires - now < LIFETIME - 1000 * 60 * 60 * 2) {
    user.token = createToken(user.id)

    setToken(res, user.token)
  }

  return user
}

/**
 * @param {ServerResponse} res
 * @param {string} name
 * @param {string} password
 *
 * @return {null|StoredUser}
 */
export const logInByNameAndPassword = (res, name, password) => {
  const user = getUserByName(name)

  if (!user || user.password !== password) {
    return null
  }

  if (user.socket) {
    user.socket.close()
    user.socket = null
  }

  user.token = createToken(user.id)

  setToken(res, user.token)

  return user
}
