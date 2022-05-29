const Hapi = require('@hapi/hapi')
const routes = require('./routes')

const port = 5000
const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost'

const init = async (host, port) => {
  const server = Hapi.server({
    host,
    port,
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })

  server.route(routes)
  server.start()
  console.log(`Server Running at ${server.info.uri}`)
}

init(host, port)
