import { unsetToken } from './cookie.js'
import { logInByNameAndPassword } from './auth.js'

/**
 * @param {ServerResponse} res
 * @param {{}} data
 */
const write = (res, data) => res.write(JSON.stringify(data))

/**
 * @param {string} str
 *
 * @returns {{}}
 */
const jsonParse = str => {
  try {
    return JSON.parse(str)
  } catch (error) {
    return {}
  }
}

/**
 * @param {ServerResponse} res
 * @param {StoredUser|null} user
 */
const getWhoami = (res, user) => {
  const result = { authorized: Boolean(user) }

  if (user) {
    result.id = user.id
    result.name = user.name
  }

  write(res, result)
}

/**
 * @param {ServerResponse} res
 * @param {StoredUser|null} user
 */
const postLogOut = (res, user) => {
  if (!user) {
    write(res, { error: 'you are not logged in' })

    return
  }

  if (user.socket) {
    user.socket.close()
    user.socket = null
  }

  user.token = null

  unsetToken(res)

  write(res, { success: true })
}

/**
 * @param {ServerResponse} res
 * @param {StoredUser|null} user
 * @param {Buffer|null} body
 */
const postLogIn = (res, user, body) => {
  if (user) {
    write(res, {
      error: 'you are already logged in',
      id: user.id,
      name: user.name,
    })

    return
  }

  if (!body) {
    write(res, { error: 'need body' })

    return
  }

  const authData = jsonParse(body.toString())
  const name = String(authData.name)
  const password = String(authData.password)

  user = logInByNameAndPassword(res, name, password)

  if (!user) {
    write(res, { error: 'authorization failed' })

    return
  }

  write(res, { id: user.id, name: user.name })
}

/**
 * @param {ServerResponse} res
 * @param {RequestPayload} payload
 */
export const conduct = (res, payload) => {
  const pathString = payload.path.join('/')

  if (pathString === 'api/whoami' && payload.method === 'GET') {
    getWhoami(res, payload.user)
  }

  if (pathString === 'api/log-out' && payload.method === 'POST') {
    postLogOut(res, payload.user)
  }

  if (pathString === 'api/log-in' && payload.method === 'POST') {
    postLogIn(res, payload.user, payload.body)
  }

  res.end()
}
