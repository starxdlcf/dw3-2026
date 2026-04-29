class ContaBancaria {
  #saldo;

  constructor(titular, saldoInicial) {
    this.titular = titular;
    this.#saldo = saldoInicial;
  }

  depositar(valor) {
    this.saldo += valor;
    console.log(`Depósito de R$ ${valor.toFixed(2)} realizado com sucesso.`);
  }

  sacar(valor) {
    if (valor > this.#saldo) {
      console.log("Saldo insuficiente.");
      return;
    }
    this.#saldo -= valor;
    console.log(`Saque de R$ ${valor.toFixed(2)} realizado com sucesso.`);
  }

  exibirSaldo() {
    console.log(`Titular: ${this.titular} | Saldo: R$ ${this.#saldo.toFixed(2)}`);
  }
}


const contaAna = new ContaBancaria("Ana", 150);
const contaCarlos = new ContaBancaria("Carlos", 500);

contaAna.sacar(200); // Saldo insuficiente
contaAna.depositar(50); // Depósito de R$ 50.00 realizado com sucesso.
contaAna.exibirSaldo(); // Titular: Ana | Saldo: R$ 200.00

contaCarlos.sacar(100); // Saque de R$ 100.00 realizado com sucesso.
contaCarlos.exibirSaldo(); // Titular: Carlos | Saldo: R$ 400.00