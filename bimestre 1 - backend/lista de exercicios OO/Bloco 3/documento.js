class Documento {
  constructor(titulo) {
    this.titulo = titulo;
    this.conteudo = "";
    this._historico = [];
  }

  editar(novoConteudo) {
    // precisamos usar isso p salvar o estado atual antes de mudar, senao nao da pra desfazer os passos
    this._historico.push(this.conteudo);
    this.conteudo = novoConteudo;
  }

  desfazer() {
    if (this._historico.length === 0) {
      console.log("Nada para desfazer.");
      return;
    }
    // o pop() funciona igual o shift() mas com o ultimo elemento do arr, por isso usar o push() e o pop() é a forma mais facil de tornar possivel o desfazer
    this.conteudo = this._historico.pop();
  }

  exibir() {
    console.log(`[${this.titulo}] Conteúdo atual: ${this.conteudo}`);
  }
}


const doc = new Documento("Relatório");
doc.editar("Versão 1");
doc.editar("Versão 2");
doc.editar("Versão final");

doc.desfazer();
doc.desfazer();

doc.exibir(); // [Relatório] Conteúdo atual: Versão 1