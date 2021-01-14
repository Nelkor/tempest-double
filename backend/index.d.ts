type StoredUser = {
  id: number
  name: string
  password: string
  token: string | null
  socket: WebSocket | null
  radix: 10,
}

type TokenData = {
  id: number
  expires: number
}

type RequestPayload = {
  method: string
  headers: object
  user: StoredUser | null
  path: string[]
  params: object
  body: Buffer | null
}
