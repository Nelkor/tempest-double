/** @type {StoredUser[]} */
export const users = [
  {
    id: 1,
    name: 'Light',
    password: '1234',
    token: null,
    socket: null,
    radix: 10,
  },
  {
    id: 2,
    name: 'Dark',
    password: '5678',
    token: null,
    socket: null,
    radix: 10,
  },
]

/**
 * @param {number} id
 *
 * @return {StoredUser}
 */
export const getUserById = id => {
  return users.find(user => user.id === id)
}

/**
 * @param {string} name
 *
 * @return {StoredUser}
 */
export const getUserByName = name => {
  return users.find(user => user.name.toLowerCase() === name.toLowerCase())
}
