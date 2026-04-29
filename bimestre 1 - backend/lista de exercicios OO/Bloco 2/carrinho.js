class Carrinho {
  constructor() {
    this.itens = [];
  }

  adicionar(nome, preco, quantidade) {
    this.itens.push({ nome, preco, quantidade });
  }

  remover(nome) {
    const index = this.itens.findIndex(item => item.nome === nome);
    if (index === -1) {
      console.log("Item não encontrado.");
      return;
    }
    // remove 1 elemento só
    this.itens.splice(index, 1); 
  }

  total() {
    return this.itens.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
  }

  exibir() {
    this.itens.forEach(item => {
      console.log(`${item.quantidade}x ${item.nome} — R$ ${(item.preco * item.quantidade).toFixed(2)}`);
    });
    console.log(`Total: R$ ${this.total().toFixed(2)}`);
  }
}


const meuCarrinho = new Carrinho();

meuCarrinho.adicionar("Arroz", 10, 2);
meuCarrinho.adicionar("Feijão", 8, 1);
meuCarrinho.adicionar("Macarrão", 5, 3);

meuCarrinho.remover("Feijão");
meuCarrinho.exibir(); // 2x Arroz — R$ 20.00  3x Macarrão — R$ 15.00  Total: R$ 35.00