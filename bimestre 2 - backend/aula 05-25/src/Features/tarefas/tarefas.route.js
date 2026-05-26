// @file: src/routes/tarefa.routes.js

// Importações corrigidas: Removidas as chaves {} para adequação ao 'export default'
import TarefaRepository from './tarefa.repository.js'
import TarefaService from './tarefa.service.js'
import TarefaController from './tarefa.controller.js'

const repository = new TarefaRepository()
const service = new TarefaService(repository)
const controller = new TarefaController(service)

export default async function tarefaRoutes(server, options) {

  server.get('/tarefas', async (request, reply) => {
    console.log("Routes: GET /tarefas chamada")
    controller.listarTarefas(request, reply)
  })

  server.post('/tarefas', async (request, reply) => {
    console.log("Routes: POST /tarefas chamada")
    controller.criarTarefa(request, reply)
  })

  server.get('/tarefas/resumo', async (request, reply) => {
    console.log("Routes: GET /tarefas/resumo chamada")
    controller.obterResumo(request, reply)
  })

  server.get('/tarefas/pendentes', async (request, reply) => {
    console.log("Routes: GET /tarefas/pendentes chamada")
    controller.obterPendentes(request, reply)
  })

  server.get('/tarefas/:id', async (request, reply) => {
    console.log("Routes: GET /tarefas/:id chamada")
    controller.obterTarefa(request, reply)
  })

  server.patch('/tarefas/:id', async (request, reply) => {
    console.log("Routes: PATCH /tarefas/:id chamada")
    controller.atualizarTarefa(request, reply)
  })

  server.patch('/tarefas/:id/concluir', async (request, reply) => {
    console.log("Routes: PATCH /tarefas/:id/concluir chamada")
    controller.concluirTarefa(request, reply)
  })

  server.delete('/tarefas/:id', async (request, reply) => {
    console.log("Routes: DELETE /tarefas/:id chamada")
    controller.removerTarefa(request, reply)
  })
}