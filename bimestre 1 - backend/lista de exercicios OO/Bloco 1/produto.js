class Produto {
  constructor(nome, preco, estoque) {
    //essas informaçoes sao sensiveis/precisam de #?
    this.nome = nome;
    this.preco = preco;
    this.estoque = estoque;
  }

  disponivel() {
    return this.estoque > 0;
  }

  exibir() {
    const status = this.disponivel() ? "Em estoque" : "Fora de estoque"; // operador ternario é o ? : pra simplificar o if que busca disponivel()
    console.log(`${this.nome} — R$ ${this.preco.toFixed(2)} — ${status}`);
  }
}


const notebook = new Produto("Notebook", 3500, 10);
const mouse = new Produto("Mouse", 150, 0);

notebook.exibir(); // Notebook — R$ 3500.00 — Em estoque
mouse.exibir(); // Mouse — R$ 150.00 — Fora de estoque