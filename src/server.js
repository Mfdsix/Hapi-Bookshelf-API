const Hapi = require('@hapi/hapi')

const port = 3000
const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost'

const init = (async ({ host, port }) => {
    const server = Hapi.server({
        host: host,
        port: port
    })

    server.start()
    console.log(`Server Started at ${server.info.url}`)
})

init()