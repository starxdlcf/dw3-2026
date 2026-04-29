import { ProdutoModel } from '../models/produto.model.js';

export class ProdutoController {
  
  static async listar(request, reply) {
    const produtos = ProdutoModel.findAll();
    return reply.send(produtos);
  }

  static async buscar(request, reply) {
    const { id } = request.params;
    const produto = ProdutoModel.findById(id);

    if (!produto) { //caso o id n exista
      return reply.status(404).send({ erro: "Produto não encontrado" });
    }
    return reply.send(produto);
  }

  static async criar(request, reply) {
    const dados = request.body;

    // se o body for vazio 
    if (!dados) {
       return reply.status(400).send({ erro: "Não existem dados suficientes para criar o produto" });
    }

    // chama o validar p ver se tá tudo ok... se tiver erro ele nao cria o produto e retorna o erro com status 400
    const validacao = ProdutoModel.validar(dados);

    if (!validacao.valido) {
      return reply.status(400).send({ erros: validacao.erros });
    } // aq chama o erro caso n tenha passado da validação

    const novoProduto = ProdutoModel.create(dados);
    return reply.status(201).send(novoProduto);
  } // passou na validacao

  static async deletar(request, reply) {
    const { id } = request.params;
    const removido = ProdutoModel.delete(id);

    if (!removido) {
      return reply.status(404).send({ erro: "Produto não encontrado" });
    }
    return reply.status(204).send(); // 204 significa q n tem conteudo p retornar mas q deu certo a requisicao
  }
}