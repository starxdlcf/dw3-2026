// Import the framework and instantiate it
import server from 'fastify'
const server = Fastify({
  logger: true
})

// Declare a route
server.get('/', async function handler (request, reply) {
  reply.send({ hello: 'world' })
})

// Run the server!
try {
  await server.listen({ port: 3000 })
} catch (err) {
  server.log.error(err)
  process.exit(1)
}