export const LIFETIME = 1000 * 60 * 60 * 24 * 2

/**
 * @param {number} id
 *
 * @returns {string}
 */
export const createToken = id => {
  const secret = Array.from({ length: 6 })
    .map(() => Math.random().toString(36).slice(2))
    .reduce((acc, cur) => [...acc, ...cur], [])
    .map(char => Math.random() < .5 ? char.toUpperCase() : char)
    .join('')

  return `${id}_${secret}_${Date.now() + LIFETIME}`
}

/**
 * @param {string} token
 *
 * @returns {TokenData}
 */
export const parseToken = token => {
  const result = { id: 0, expires: 0 }
  const parts = token.split('_')

  if (parts.length !== 3) {
    return result
  }

  const [id, , expires] = parts

  result.id = +id
  result.expires = +expires

  return result
}
