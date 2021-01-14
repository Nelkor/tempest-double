const messages = {
  403: 'Forbidden',
}

/**
 * @param {ServerResponse} res
 * @param {number} code
 */
const sendError = (res, code) => {
  res.statusCode = code
  res.statusMessage = messages[code]

  res.end()
}

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
export const breakConnection = (req, res) => {
  sendError(res, 403)

  req.destroy()
}
