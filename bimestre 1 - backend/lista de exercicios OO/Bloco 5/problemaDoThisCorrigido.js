class Contador {
  constructor() {
    this.valor = 0;
  }

  iniciar() {
    // agora usando a arrow function, o this vai puxar a instância do Contador, por causa de um erro interno q acontece no js uma funcao normal nao puxa o this da classe
    setInterval(() => {
      this.valor++;
      console.log(this.valor);
    }, 1000); // esse 1000 é 1000 milissegundos q é a mesma coisa q 1 segundo
  }
}

const meuContador = new Contador();
meuContador.iniciar(); // agora vai imprimir 1,2,3 etc durante o tempo q estiver rodando