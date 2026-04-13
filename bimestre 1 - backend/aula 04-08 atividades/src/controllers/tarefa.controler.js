  import { listar, criar, resumo, buscarPorId, atualizar, alternarConcluido, remover } from '../models/tarefa.model.js'  


  // Processa requisições da rota `GET /tarefas`
    export async function listarTarefas(request, reply) {

      console.log("Controller: listarTarefas chamado")

      const { busca, concluido } = request.query
      const resultado = await listar({ busca, concluido })

      return reply.send(resultado)

    }

    // Processa requisições da rota `POST /tarefas`
    export async function criarTarefa(request, reply) {
      console.log("Controller criarTarefa buscada")

      const { descricao } = request.body
      const novaTarefa = await criar(descricao)
      
      return reply.status(201).send(novaTarefa)


    }

    // Processa requisições da rota `GET /tarefas/resumo`
    export async function obterResumo(request, reply) { 
      console.log("Controller obterResumo buscada")

      const resultado = await resumo()
      
      return reply.send(resultado)

    }

    // Processa requisições da rota `GET /tarefas/:id`
    export async function obterTarefa(request, reply) {
      console.log("Controller obterTarefa buscada")

      const id = Number(request.params.id)
      
      const tarefa = await buscarPorId(id)

      reply.send(tarefa)
    }

    // Processa requisições da rota `PATCH /tarefas/:id`
    export async function atualizarTarefa(request, reply) {
      console.log("Controller atualizarTarefa buscada")

      const id = Number(request.params.id)
      const dadosAtualizados = request.body

      const tarefaAtualizada = await atualizar(id, dadosAtualizados)


      return reply.send(tarefaAtualizada)
    }

    // Processa requisições da rota `PATCH /tarefas/:id/concluir`
    export async function concluirTarefa(request, reply) {
      console.log("Controller concluirTarefa buscada")

      const id = Number(request.params.id)
      const tarefaAtualizada = await alternarConcluido(id)
      
      return reply.send(tarefaAtualizada)
    }

    // Processa requisições da rota `DELETE /tarefas/:id`
    export async function removerTarefa(request, reply) {
      console.log("Controller removerTarefa buscada")

      const id = Number(request.params.id)
      const resultado = await remover(id)

      return reply.send(resultado)
    }

    export async function listarTarefasPendentes(reply) {
      console.log("Controller listarTarefasPendentes buscada")

      const resultado = await listarPendentes({ concluido: false })

      return reply.send(resultado)
    }