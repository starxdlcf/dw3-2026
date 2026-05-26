// @file: src/server.js

import Fastify from 'fastify'
import tarefaRoutes from './routes/tarefas.route.js' // Ajuste o caminho conforme sua estrutura
import { AppError } from './errors/AppError.js'

const server = Fastify({ logger: true })

// ==========================================
// TRATAMENTO DE ERROS GLOBAL (A Rede de Segurança)
// ==========================================
server.setErrorHandler((error, request, reply) => {
  // 1. Verifica se o erro foi uma exceção intencional da nossa regra de negócio
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      status: 'error',
      message: error.message
    })
  }

  // 2. Se for um erro inesperado do sistema (Ex: Erro de sintaxe, conexão, etc.)
  console.error('🔥 ERRO INTERNO NÃO TRATADO:', error)

  // Retorna 500 genérico sem expor detalhes sensíveis de código ao usuário final
  return reply.status(500).send({
    status: 'error',
    message: 'Internal Server Error'
  })
})

// ==========================================
// REGISTRO DE ROTAS
// ==========================================
server.register(tarefaRoutes)

const start = async () => {
  try {
    await server.listen({ port: 3000 })
    console.log("🚀 Servidor rodando na porta 3000")
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()