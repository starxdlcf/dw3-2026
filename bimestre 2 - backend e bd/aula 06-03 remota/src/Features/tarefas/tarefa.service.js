// @file: src/services/tarefa.service.js
import { AppError } from '../errors/AppError.js'

class TarefaService {
  constructor(repository) {
    this.repository = repository
  }

  async listar(opcoes) {
  console.log("Service: listar chamado")
  const { busca, concluido } = opcoes || {}

  // Delegamos toda a filtragem para o banco de dados através do Repository
  return await this.repository.buscarTodos({ busca, concluido })
}

  async criar(descricao) {
    console.log("descricao recebida:", descricao)
    console.log("Service: criar chamado")
    
    if (!descricao || descricao.descricao.trim() === '') {
      throw new AppError('A descrição da tarefa é obrigatória', 400)
    }

    const todas = await this.repository.buscarPorProjetoId(descricao.idProjeto)
    if (todas) {
      throw new AppError('Já existe um projeto com esse ID', 404)
    }

    return this.repository.salvar({
      descricao: descricao.descricao,
      concluido: false,
      projetoId: descricao.projetoId
    })
  }

  async buscarPorId(id) {
    console.log("Service: buscarPorId chamado")
    const tarefa = await this.repository.buscarPorId(id)
    if (!tarefa) {
      // Lança erro 404 se não encontrar
      throw new AppError('Tarefa não encontrada', 404)
    }
    return tarefa
  }

  async atualizar(id, dadosAtualizados) {
    console.log("Service: atualizar chamado")
    // Se a tarefa não existir, o buscarPorId já lança o erro 404 automaticamente
    const tarefa = await this.buscarPorId(id)

    if (tarefa.concluido) {
      throw new AppError('Não é possível atualizar uma tarefa já concluída', 400)
    }

    return this.repository.atualizar(id, dadosAtualizados)
  }

  async alternarConcluido(id) {
    console.log("Service: alternarConcluido chamado")
    const tarefa = await this.buscarPorId(id)
    return this.repository.atualizar(id, { concluido: !tarefa.concluido })
  }

  async remover(id) {
    console.log("Service: remover chamado")
    const tarefa = await this.buscarPorId(id)

    if (tarefa.concluido) {
      throw new AppError('Não é possível remover uma tarefa já concluída', 400)
    }

    return this.repository.remover(id)
  }

  async obterResumo() {
    console.log("Service: obterResumo chamado")
    const todas = await this.repository.buscarTodos()
    const total = todas.length
    const concluidas = todas.filter(t => t.concluido).length
    const pendentes = total - concluidas
    return { total, concluidas, pendentes }
  }

  async listarPendentes() {
    console.log("Service: listarPendentes chamado")
    return this.repository.buscarPendentes()
  }

  async obterResumo() {
  console.log("Service: obterResumo chamado")
  
  // Busca o resumo calculado de forma performática pelo PostgreSQL
  const resumo = await this.repository.obterContagemResumo()
  
  return resumo
} 
}

export default TarefaService