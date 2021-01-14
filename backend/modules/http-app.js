import { parse } from 'querystring'

import { breakConnection } from './http-errors.js'
import { conduct } from './http-controller.js'
import { logInByToken } from './auth.js'
import { getToken } from './cookie.js'

const PATH_LIMIT = 10
const MAX_BODY_SIZE = 1024

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
export const httpApp = (req, res) => {
  const { headers, method, url } = req
  const [pathString, queryString] = url.split('?')

  const path = pathString.split('/', PATH_LIMIT).slice(1).filter(Boolean)
  const params = parse(queryString)

  const token = getToken(headers.cookie)
  const user = logInByToken(res, token)

  const contentLength = +headers['content-length']

  const hasBody = method === 'POST'
    && contentLength
    && contentLength <= MAX_BODY_SIZE

  const body = hasBody ? [] : null

  let bodySize = 0

  const onData = chunk => {
    bodySize += chunk.length

    if (!body || bodySize > MAX_BODY_SIZE) {
      breakConnection(req, res)

      return
    }

    body.push(chunk)
  }

  const onClose = () => {
    const payload = {
      headers,
      method,
      path,
      params,
      user,
      body: body ? Buffer.concat(body) : null,
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8')

    conduct(res, payload)
  }

  req.on('data', onData)
  req.on('close', onClose)
}
