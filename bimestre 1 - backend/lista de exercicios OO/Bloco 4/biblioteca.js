class Livro {
  constructor(titulo, autor) {
    this.titulo = titulo;
    this.autor = autor;
    this.disponivel = true;
  }

  emprestar() {
    if (!this.disponivel) {
      console.log("Livro indisponível.");
      return;
    }
    this.disponivel = false; // coloca fora das chaves p nao ser alterado de fora (dai n precisa usar #)
  }

  devolver() {
    this.disponivel = true;
  }

  exibir() {
    const status = this.disponivel ? "Disponível" : "Indisponível";
    return `${this.titulo} — ${this.autor} — ${status}`;
  }
}

class Biblioteca {
  constructor(nome) {
    this.nome = nome;
    this.acervo = [];
  }

  adicionar(livro) {
    this.acervo.push(livro);
  }

  buscar(titulo) {
    return this.acervo.find(livro => livro.titulo === titulo) || null;
  }

  emprestar(titulo) {
    const livro = this.buscar(titulo);
    if (!livro) {
      console.log("Livro não encontrado.");
      return;
    }
    livro.emprestar();
  }

  devolver(titulo) {
    const livro = this.buscar(titulo);
    if (livro) {
      livro.devolver();
    }
  }

  exibirAcervo() {
    console.log(`--- Acervo da ${this.nome} ---`);
    this.acervo.forEach(livro => console.log(livro.exibir()));
  }
}

// Testando o código
const biblio = new Biblioteca("Biblioteca Central");
const livro1 = new Livro("O Alquimista", "Paulo Coelho");
const livro2 = new Livro("1984", "George Orwell");
const livro3 = new Livro("Duna", "Frank Herbert");

biblio.adicionar(livro1);
biblio.adicionar(livro2);
biblio.adicionar(livro3);

biblio.emprestar("1984");
biblio.emprestar("Duna");
biblio.devolver("1984");

biblio.exibirAcervo(); 
// --- Acervo da Biblioteca Central ---
// O Alquimista — Paulo Coelho — Disponível
// 1984 — George Orwell — Disponível
// Duna — Frank Herbert — Indisponível