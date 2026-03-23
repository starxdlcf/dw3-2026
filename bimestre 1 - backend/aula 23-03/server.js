import Fastify from 'fastify'

const server = Fastify() // ({logger: true})  o logger mostra tudo o que acontece, é interessante pro modo dev


server.get('/tarefas', async (request, reply) => {
  console.log('Requisição recebida!')
  reply.send("Oii!")
})

server.get('/json', async (request, reply) => {
  console.log('Requisição recebida!')
  reply.type('application/json')  .send({nome: "Anna Luísa"})
})

server.get('/html', async (request, reply) => {
  console.log('Requisição recebida!')
  reply.type('text/html') .send("<h1>Olá, Mundo!</h1>") // o type funciona pra mudar qual é o tipo da resposta, ou seja, o navegador interpreta a resposta
})

try {
    console.log('Servidor na porta 3000')
    await server.listen({port: 3000})

} catch (err) {

}