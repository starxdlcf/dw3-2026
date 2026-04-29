class Estoque {
  constructor() {
    this.produtos = [];
  }

  cadastrar(nome, quantidade) {
    const existe = this.produtos.find(p => p.nome === nome);
    if (existe) {
      console.log("Produto já cadastrado.");
      return;
    }
    this.produtos.push({ nome, quantidade });
  }

  entrada(nome, quantidade) {
    const produto = this.produtos.find(p => p.nome === nome);
    if (!produto) {
      console.log("Produto não encontrado.");
      return;
    }
    produto.quantidade += quantidade;
  }

  saida(nome, quantidade) {
    const produto = this.produtos.find(p => p.nome === nome);
    if (!produto) {
      console.log("Produto não encontrado.");
      return;
    }
    if (produto.quantidade - quantidade < 0) {
      console.log("Quantidade insuficiente.");
      return;
    }
    produto.quantidade -= quantidade;
  }

  exibir() {
    this.produtos.forEach(p => console.log(`${p.nome}: ${p.quantidade} unidades`));
  }
}


const meuEstoque = new Estoque();

meuEstoque.cadastrar("Caneta", 30);
meuEstoque.cadastrar("Caderno", 15);
meuEstoque.entrada("Caneta", 20);
meuEstoque.saida("Caderno", 5);

meuEstoque.saida("Caneta", 100);  // Quantidade insuficiente
meuEstoque.saida("Lápis", 10);    // Produto não encontrado

meuEstoque.exibir(); // Caneta: 50 unidades Caderno: 10 unidades