import { listen } from './modules/server.js'
import { startFeed } from './modules/feed.js'

const PORT = 3061

listen(PORT)
startFeed()
