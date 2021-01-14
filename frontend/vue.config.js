const path = require('path')
const { readdirSync } = require('fs')

const modules = 'src/modules'
const resolve = str => path.resolve(__dirname, `./${str}`)
const modulesDir = readdirSync(resolve(modules))

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),

        ...modulesDir.reduce((acc, cur) => {
          acc[`@${cur}`] = resolve(`${modules}/${cur}`)

          return acc
        }, {}),
      },
    },
  },
  devServer: {
    disableHostCheck: true,
    https: true,
    port: 443,
    proxy: {
      '^/api': {
        target: 'http://localhost:3061',
      },
      '^/realtime-connection': {
        target: 'ws://localhost:3061',
        ws: true,
      },
    },
  },
}
