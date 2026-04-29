*Qual é o erro e por que ele acontece?* 

O erro acontece pois uma função normal (sem ser arrow function) acaba criando um contexto próprio pro this, até como se ele fosse uma variável. Então, dentro da função setInterval no código, o this não aponta mais para a instância da classe por conta dessa "falha" de interpretação que ocorre internamente no javascript, resultando em undefined ou nan quando rodamos o programa, já que o this.contador não funciona.

*O que muda no comportamento do this ao usar uma arrow function?*

 A arrow function (() => {}), ao invés de criar um novo contexto pro this, captura o this do escopo em que ela foi definida. Ou seja, o this vai apontar pra instância da classe, portanto manterá seu valor e vai funcionar corretamente, sem imprimir undefined ou nan. Não s sabe muito bem o porquê desse erro acontecer, mas ele é facilmente resolvido usando a arrow function, como o mostrado no código corrigido.