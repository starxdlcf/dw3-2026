import Fastify from 'fastify'

const server = Fastify() // ({logger: true})  o logger mostra tudo o que acontece, é interessante pro modo dev

const tarefas = [
                  {id:1, descricao: "Fazer compras"},
                  {id:2, descricao: "Lavar o carro"},
                  {id:3, descricao: "Estudar Fastify"}] // simulador de banco de dados

server.get('/tarefas', async (request, reply) => {
  reply.send(tarefas)
})

server.post('/tarefas', async (request, reply) => {
  const tarefa = request.body
  tarefas.push(tarefa)
  reply.send({message: 'tarefa inserida com sucesso'})
})


try {
    console.log('Servidor na porta 3000')
    await server.listen({port: 3000})

} catch (err) {

}