class Aluno {
  constructor(nome) {
    this.nome = nome;
    this.notas = [];
  }

  adicionarNota(nota) {
    this.notas.push(nota);
  }

  calcularMedia() {
    if (this.notas.length === 0) return 0;

    const soma = this.notas.reduce((acc, nota) => acc + nota, 0);
    return soma / this.notas.length;
  }

  situacao() {
    return this.calcularMedia() >= 6 ? "Aprovado(a)" : "Reprovado(a)";
  }

  exibir() {
    const media = this.calcularMedia().toFixed(2);
    console.log(`${this.nome} | Média: ${media} | ${this.situacao()}`);
  }
}

// Testando o código
const martha = new Aluno("martha");
const carlos = new Aluno("Carlos");

martha.adicionarNota(8);
carlos.adicionarNota(5);
martha.adicionarNota(6);
carlos.adicionarNota(4);
martha.adicionarNota(8.5);
carlos.adicionarNota(6);

martha.exibir(); // martha
// | Média: 7.50 | Aprovado
carlos.exibir(); // Carlos | Média: 5.00 | Reprovado