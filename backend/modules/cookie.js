const ZERO_UTC = (new Date(0)).toUTCString()

/**
 * @param {string} [cookie]
 *
 * @returns {string}
 */
export const getToken = cookie => {
  if (!cookie) {
    return ''
  }

  const match = /token=(\w+)/.exec(cookie)

  return match ? match[1] : ''
}

/**
 * @param {ServerResponse} res
 * @param {string} token
 */
export const setToken = (res, token) => {
  const value = [
    `token=${token}`,
    'SameSite=Strict',
    'Path=/',
    'HttpOnly',
    'Secure',
  ].join('; ')

  res.setHeader('Set-cookie', value)
}

/**
 * @param {ServerResponse} res
 */
export const unsetToken = res => {
  res.setHeader('Set-cookie', `token=deleted; Path=/; Expires=${ZERO_UTC}`)
}
