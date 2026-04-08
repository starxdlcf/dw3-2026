import { listarTarefas } from '../controllers/tarefa.controler.js'
import { criarTarefa } from '../controllers/tarefa.controler.js'
import { obterResumo } from '../controllers/tarefa.controler.js'
import { obterTarefa } from '../controllers/tarefa.controler.js'
import { atualizarTarefa } from '../controllers/tarefa.controler.js'
import { concluirTarefa } from '../controllers/tarefa.controler.js'
import { removerTarefa } from '../controllers/tarefa.controler.js'

export default async function tarefaRoutes(server, options) {

  // ROTAS e PROCESSAMENTO das requisições relacionadas às tarefas.

  server.get('/tarefas', async (request, reply) => {
    console.log("Rota GET /tarefas buscada")
    listarTarefas(request, reply)
  })

  server.post('/tarefas', async (request, reply) => {
    console.log("Rota POST /tarefas buscada")
    criarTarefa(request, reply)
  })

  server.get('/tarefas/resumo', async (request, reply) => {
    console.log("Rota GET /tarefas/resumo buscada")
    obterResumo(request, reply)
  })

  server.get('/tarefas/:id', async (request, reply) => {
    console.log("Rota GET /tarefas/:id buscada")
    obterTarefa(request, reply)
  })

  server.patch('/tarefas/:id', async (request, reply) => {
    console.log("Rota PATCH /tarefas/:id buscada")
    atualizarTarefa(request, reply)
  })

  server.patch('/tarefas/:id/concluir', async (request, reply) => {
    console.log("Rota PATCH /tarefas/:id/concluir buscada")
    concluirTarefa(request, reply)
  })

  server.delete('/tarefas/:id', async (request, reply) => {
    console.log("Rota DELETE /tarefas/:id buscada")
    removerTarefa(request, reply)
  })
}