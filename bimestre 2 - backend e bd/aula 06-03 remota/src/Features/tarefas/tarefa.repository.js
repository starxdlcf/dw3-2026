// @file: src/repositories/tarefa.repository.js

import client from '../../database/client.js'

class TarefaRepository {
  constructor() {
    this.tarefas = [
      { id: 1, descricao: "Fazer compras", concluido: false },
      { id: 2, descricao: "Lavar o carro", concluido: false },
      { id: 3, descricao: "Estudar Fastify", concluido: true }
    ]
  }

  async buscarTodos({busca = null, concluido = undefined } = {}) {
  console.log("Repository: buscarTodos chamado com filtros:")
  
  let query = `
    SELECT
      t.id,
      t.descricao,
      t.concluido,
      t.criada_em,
      t.projeto_id,
      p.nome AS projeto_nome
    FROM tarefas t
    LEFT JOIN projetos p
      ON p.id = t.projeto_id
  `
  const valores = []
  let contador = 1

  // Exercício 1: Filtro por descrição usando ILIKE (case-insensitive)
  if (busca) {
    query += ` AND descricao ILIKE $${contador}`
    valores.push(`%${busca}%`) // % permite buscar em qualquer parte do texto
    contador++
  }

  // Exercício 2: Filtro por status concluído
  if (concluido !== undefined && concluido !== '') {
    query += ` AND concluido = $${contador}`
    // Converte a string da query ('true'/'false') para booleano real
    valores.push(concluido === 'true' || concluido === true)
    contador++
  }

  // Ordenar por id
  query += ` ORDER BY id`

  const resultado = await client.query(query, valores)
  return resultado.rows
}

  async buscarPorId(id) {
    console.log("Repository: buscarPorId chamado")
    const resultado = await client.query(`
      SELECT id, descricao, concluido, criada_em
      FROM tarefas
      WHERE id = $1
    `, [id])
    return resultado.rows[0] ?? null
  }

  async buscarPorProjetoId(projetoId) {
    console.log("Repository: buscarPorProjetoId chamado")
    const resultado = await client.query(`
      SELECT id, descricao, concluido, criada_em, projeto_id
      FROM tarefas
      WHERE projeto_id = $1
      ORDER BY id
    `, [projetoId])
    return resultado.rows[0] ?? null
  }

 async salvar(tarefa) {
  const resultado = await client.query(
    `
      INSERT INTO tarefas (descricao, concluido, projeto_id)
      VALUES ($1, $2, $3)
      RETURNING id, descricao, concluido, criada_em, projeto_id
    `,
    [tarefa.descricao, tarefa.concluido, tarefa.projetoId]
  )

  return resultado.rows[0]
}

 async atualizar(id, dadosAtualizados) {
  const tarefaAtual = await this.buscarPorId(id)

  if (!tarefaAtual) return null

  const tarefaFinal = {
    ...tarefaAtual,
    ...dadosAtualizados,
    id: tarefaAtual.id
  }

  const resultado = await client.query(
    `
      UPDATE tarefas
      SET descricao = $1,
          concluido = $2
      WHERE id = $3
      RETURNING id, descricao, concluido, criada_em
    `,
    [tarefaFinal.descricao, tarefaFinal.concluido, id]
  )

  return resultado.rows[0] ?? null
}

 async remover(id) {
  const resultado = await client.query(
    `
      DELETE FROM tarefas
      WHERE id = $1
    `,
    [id]
  )

  return resultado.rowCount > 0
}

  async buscarPendentes() {
    console.log("Repository: buscarPendentes chamado")
    return this.tarefas.filter(t => !t.concluido)
  }

  async obterContagemResumo(){
  console.log("Repository: obterContagemResumo chamado")
  
  // Usamos funções agregadas do SQL com FILTER para contar condicionalmente em uma única consulta
  const resultado = await client.query(`
    SELECT 
      COUNT(*)::INT as total,
      COUNT(*) FILTER (WHERE concluido = true)::INT as concluidas,
      COUNT(*) FILTER (WHERE concluido = false)::INT as pendentes
    FROM tarefas
  `)

  return resultado.rows[0]
}

}

 

export default TarefaRepository