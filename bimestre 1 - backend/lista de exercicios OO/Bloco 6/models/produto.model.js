export class ProdutoModel {
  // uso de # pra tornar privado os atributos 
  static #produtos = [
    { id: 1, nome: "Teclado", preco: 150 },
    { id: 2, nome: "Mouse", preco: 80 },
    { id: 3, nome: "Monitor", preco: 800 }
  ];
  static #proximoId = 4; //forma de "automatizar" os ids pq automaticamente vai pegar o numero de produtos e somar 1

  static findAll() {
    return this.#produtos;
  }

  static findById(id) {
    // conversao de id string p number
    return this.#produtos.find(p => p.id === Number(id));
  }

  static create(dados) {
    const novoProduto = {
      id: this.#proximoId,
      nome: dados.nome,
      preco: dados.preco
    };
    this.#produtos.push(novoProduto);
    this.#proximoId++; //atualiza o id p o proximo produto a ser add
    return novoProduto;
  }

  static delete(id) {
    const index = this.#produtos.findIndex(p => p.id === Number(id));
    if (index === -1) return false; // verficacao do id p saber se existe mesmo ou n
    
    this.#produtos.splice(index, 1); // o splice() vai remover o produto do arr
    return true;
  }

  static validar(dados) {
    const erros = [];

    if (!dados.nome || typeof dados.nome !== 'string' || dados.nome.trim() === '') {
      erros.push("O nome é obrigatório e não pode ser vazio."); // nome obrigadtorio
    }

    if (dados.preco === undefined || typeof dados.preco !== 'number' || dados.preco <= 0) {
      erros.push("O preço é obrigatório e deve ser um número maior que 0."); // verifica o preco p nao ser nulo ou negativo
    }

    if (erros.length > 0) {
      return { valido: false, erros }; 
    }

    return { valido: true };
  }
}