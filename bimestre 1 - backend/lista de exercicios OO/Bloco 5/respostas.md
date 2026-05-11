1. O que é um **Fat Model** e por que ele é considerado um problema em aplicações que tendem a crescer?

Um Fat Model é um modelo (como uma classe de domínio) que contém uma grande quantidade de lógica de negócio, validações, regras de processamento e até mesmo responsabilidades que deveriam estar em outras camadas, como controladores ou serviços. Ele é considerado um problema porque viola o Princípio da Responsabilidade Única (SRP), tornando o código difícil de manter, testar e escalar. À medida que a aplicação cresce, o modelo se torna inchado, misturando responsabilidades, o que leva a bugs, duplicação de código e dificuldade em refatorar sem quebrar outras partes do sistema.

2. Por que o `TarefaService` recebe o `TarefaRepository` via constructor em vez de criá-lo internamente com `new TarefaRepository()`? Que vantagem isso traz?

O `TarefaService` recebe o `TarefaRepository` via injeção de dependência no construtor para promover o desacoplamento e facilitar os testes. Em vez de criar a dependência internamente, ela é passada de fora, o que permite injetar mocks ou stubs durante os testes unitários, tornando-os mais isolados e confiáveis. Além disso, isso facilita a troca de implementações (por exemplo, trocar de repositório em memória para um banco de dados) sem alterar o código do service, seguindo princípios como Inversão de Controle (IoC) e Dependency Inversion Principle (DIP).

3. O `server.js` foi chamado de **Composition Root**. Em suas próprias palavras, qual é o papel desse arquivo na nova arquitetura?

O `server.js` é o Composition Root porque é o local onde todas as dependências da aplicação são compostas e injetadas. Ele instancia os objetos das camadas (Repository, Service, Controller) e conecta-os uns aos outros, configurando a estrutura da aplicação. Esse arquivo centraliza a criação de objetos e garante que as dependências sejam resolvidas corretamente, mantendo as outras camadas limpas e focadas em suas responsabilidades, sem se preocuparem com como as dependências são criadas.

4. Se você precisasse trocar o armazenamento em memória por um banco de dados PostgreSQL, **quais arquivos você precisaria criar ou modificar** com a arquitetura atual? Justifique.

Com a arquitetura atual, eu precisaria criar ou modificar principalmente o `TarefaRepository`. Criaria uma nova implementação do repositório que usa PostgreSQL (por exemplo, `TarefaRepositoryPostgres`), modificando os métodos para executar queries SQL em vez de manipular arrays em memória. Também poderia precisar ajustar o `server.js` (Composition Root) para instanciar o novo repositório em vez do antigo. Os arquivos de Service, Controller e Routes permaneceriam praticamente iguais, pois eles dependem apenas da interface do repositório, não da implementação específica. Isso justifica a vantagem da injeção de dependência e separação de camadas, permitindo trocar o armazenamento sem afetar a lógica de negócio.

5. Observe o método `alternarConcluido` no `TarefaService`:
   Por que essa lógica está no **Service** e não no **Repository**?

A lógica de `alternarConcluido` está no Service porque envolve uma regra de negócio: buscar a tarefa, verificar se existe, e então alternar o status de concluído. O Repository deve se limitar a operações básicas de acesso a dados (CRUD), como buscar, salvar, atualizar e remover registros. Colocar essa lógica no Repository violaria a separação de responsabilidades, misturando lógica de negócio com acesso a dados. O Service coordena essas operações, aplicando regras de negócio antes de delegar ao Repository, mantendo o código mais organizado e testável.
