class Cliente {
  constructor(nome, email) {
    this.nome = nome;
    this.email = email;
  }

  exibir() {
    return `${this.nome} <${this.email}>`;
  }
}

class Pedido {
  constructor(id, cliente) {
    this.id = id;
    this.cliente = cliente; // Composição: recebendo um objeto da classe Cliente
    this.itens = [];
    this.status = "aberto";
  }

  adicionarItem(descricao, valor) {
    if (this.status !== "aberto") {
      console.log("Não é possível adicionar itens a um pedido fechado.");
      return;
    }
    this.itens.push({ descricao, valor });
  }

  total() {
    return this.itens.reduce((acc, item) => acc + item.valor, 0);
  }

  fechar() {
    this.status = "fechado";
  }

  exibir() {
    console.log(`Pedido #${this.id} - ${this.status}`);
    console.log(`Cliente: ${this.cliente.exibir()}`);
    console.log("Itens:");
    this.itens.forEach(item => console.log(`- ${item.descricao}: R$ ${item.valor.toFixed(2)}`));
    console.log(`Total: R$ ${this.total().toFixed(2)}`);
  }
}


const ana = new Cliente("Ana", "ana@email.com");
const pedidoAna = new Pedido(101, ana);

pedidoAna.adicionarItem("Teclado", 150);
pedidoAna.adicionarItem("Mouse", 80);
pedidoAna.fechar();
pedidoAna.exibir();