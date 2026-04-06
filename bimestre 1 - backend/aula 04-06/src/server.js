import Fastify from 'fastify'
import cors from '@fastify/cors'
import tarefaRoutes from './routes/tarefa.route.js'


// Criamos uma instância do servidor Fastify
const server = Fastify()

// Registramos o plugin de CORS para permitir que qualquer origem acesse nossa API
server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
})

server.register(tarefaRoutes, { prefix: '/tarefas' })


// Função para iniciar o servidor. Usamos async/await para lidar com a natureza assíncrona do processo de inicialização do servidor.
const start = async () => {
    // O bloco try/catch é utilizado para lidar com possíveis erros que possam ocorrer durante a inicialização do servidor, como a porta já estar em uso. Se o servidor iniciar com sucesso, ele exibirá uma mensagem no console indicando que está rodando. Caso contrário, o erro será logado e o processo será encerrado com um código de saída 1, indicando que houve uma falha.
    try {
        await server.listen({port: PORT})
        console.log(`Servidor rodando em http://localhost:${PORT}`)
    } catch (erro) {
        console.error(erro)
        process.exit(1)
    }
  
}

// Definimos a porta onde o servidor irá rodar
const PORT = 3000

// Chamamos a função start para iniciar o servidor
	start() 