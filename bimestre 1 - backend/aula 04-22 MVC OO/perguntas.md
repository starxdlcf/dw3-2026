Reflexão sobre OO
Responda às perguntas abaixo com base no que foi visto neste roteiro:

*Qual é a diferença entre uma classe e uma instância? Por que exportamos new TarefaModel() em vez de exportar a própria classe TarefaModel?*
Uma classe é um molde que define como um objeto será (seus dados e métodos). Já uma instância é o objeto real criado a partir dessa classe com new. Exportamos new TarefaModel() para garantir que toda a aplicação use o mesmo objeto, compartilhando o mesmo array de tarefas. Se cada parte criasse sua própria instância, os dados ficariam separados e inconsistentes.

*No TarefaController, o constructor armazena a referência ao model em this.model. O que aconteceria se, em vez disso, cada método do controller importasse o model diretamente? Que problema isso poderia causar?*
Se cada método do controller importasse o model diretamente, o código ficaria mais acoplado e menos flexível. Ao usar this.model no constructor, o controller fica mais organizado e segue o conceito de composição, além de facilitar testes e possíveis mudanças no model no futuro.

**Por que o arquivo tarefa.routes.js não foi transformado em uma classe, mesmo que tecnicamente fosse possível?**
O arquivo de rotas não virou classe porque ele não representa uma entidade com dados e comportamento. Ele apenas faz o mapeamento entre rotas e funções, ou seja, é configuração. Usar classe ali não traria benefício, só aumentaria a complexidade.

*O roteiro menciona o problema do this em callbacks. Descreva com suas próprias palavras quando esse problema ocorre e qual é a solução mais comum em JavaScript moderno.*
O problema do this em callbacks acontece quando um método é passado como função separada do objeto, fazendo com que o this perca a referência correta. A solução mais comum é usar arrow functions, que mantêm o this do contexto original, ou garantir que o método seja chamado diretamente a partir do objeto.