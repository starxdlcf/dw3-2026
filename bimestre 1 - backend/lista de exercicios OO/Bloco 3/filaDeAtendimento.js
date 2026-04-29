class FilaAtendimento {
  #fila; //precisa ser declarada aqui p poder assumir realmente o fator de privacidade q o # dá

  constructor() {
    this.#fila = []; // precisa de # pra não ser alterado de fora
    this.contador = 1;
  }

  entrar(nome) {
    this.#fila.push({ senha: this.contador, nome });
    console.log(`Senha ${this.contador} gerada para ${nome}.`);
    this.contador++;
  }

  chamarProximo() {
    if (this.#fila.length === 0) {
      console.log("Fila vazia.");
      return;
    }
    // shift() isola o elemento 0 do arr (o primeiro elemento) em outro arr e retorna ele
    const proximo = this.#fila.shift();
    console.log(`Chamando senha ${proximo.senha} — ${proximo.nome}`);
  }

  tamanho() {
    return this.#fila.length;
  }
}


const fila = new FilaAtendimento();

fila.entrar("Benjamin"); // Senha 1 gerada para Benjamin.
fila.entrar("Naela"); // ...
fila.entrar("Camila");
fila.entrar("Felipe"); 

fila.chamarProximo(); // Chamando senha 1 — Benjamin
fila.chamarProximo(); // Chamando senha 2 — Naela

console.log(`Pessoas restantes na fila: ${fila.tamanho()}`); // Pessoas restantes na fila: 2

fila.chamarProximo(); // Chamando senha 3 — Camila
fila.chamarProximo(); // Chamando senha 4 — Felipe
fila.chamarProximo(); // Fila vazia.