### Exercício 4 — Comparação entre memória e persistência

Quando as tarefas ficam em um array, elas existem só enquanto o servidor estiver rodando. Ao reiniciar a aplicação, esse array é apagado e tudo volta ao estado inicial. Isso é fácil de implementar, mas "mata" os dados entre as execuções.

No PostgreSQL, as tarefas são gravadas no banco de dados, então permanecem salvas mesmo se o servidor for desligado ou reiniciado, já que o banco de dados é responsável por guardar, organizar e recuperar essas informações de forma durável.

Isso muda o comportamento da aplicação: usando apenas arrays, o sistema é mais simples, mas frágil e inadequado para uso na vida real. Com PostgreSQL (ou outros bancos de dados), os dados persistem, tornando o sistema mais confiável e seguro para os usuários.


### Exercício 3 - Comparação

**Tráfego de Rede:** Na abordagem em memória, o desempenho é severamente prejudicado porque o banco de dados precisa enviar todas as linhas completas de todas as tarefas pela rede até ao servidor Node.js. Já na abordagem com SQL direto, o tráfego é excelente e mínimo, pois o banco de dados processa tudo internamente e envia de volta apenas uma única linha contendo os três números finais (total, concluídas e pendentes).

**Uso de Memória RAM:** Calcular em memória consome muitos recursos do servidor, pois o Node.js é obrigado a alocar espaço na memória RAM para um array potencialmente gigantesco com todos os dados do banco. Por outro lado, ao delegar a contagem para o SQL, o uso de RAM no Node.js é mínimo, já que a aplicação vai lidar apenas com um objeto extremamente leve contendo o resultado consolidado.

**Velocidade e Performance:* O cálculo em memória torna-se lento à medida que o volume cresce, dado que o JavaScript precisa iterar manualmente (usando métodos como .filter()) sobre cada item do array. Com o SQL direto, a operação é muito rápida, pois os bancos de dados relacionais foram projetados e nativamente otimizados para realizar agregados e contagens estruturadas, tirando proveito de índices.

**Escalabilidade:** A estratégia em memória simplesmente não escala; a aplicação corre o risco de travar por falta de memória ou sofrer de lentidão severa com o aumento de tarefas cadastradas. Em contrapartida, a centralização da lógica de agregação no banco de dados através do SQL é altamente escalável, garantindo que o sistema continue ágil e estável mesmo sob volumes massivos de dados.

### Exercício 4 — Explicação da Arquitetura

1. Por que o SQL de laboratório não deveria continuar no server.js?

O arquivo server.js possui atribuições muito claras e centralizadas na infraestrutura inicial do sistema:  Inicialização: Ele é o responsável por subir a aplicação e garantir que o servidor esteja rodando.  

Configuração Global: É nele que se registram os plugins, as rotas globais e os comportamentos gerais do sistema.  Manter as consultas SQL diretamente no server.js gera sérios problemas de design de software:

- Mistura de Responsabilidades: O arquivo central começa a acumular funções de infraestrutura de rede e de acesso a dados simultaneamente. 

- Degradação da Arquitetura: O server.js não deve se tornar o repositório de regras de negócio ou de consultas ao banco. Permitir isso significa desmontar progressivamente a separação de camadas construída nos módulos anteriores. 

 2. Por que o Repository é o lugar correto para acesso a dados?
 
 Dentro do padrão arquitetural adotado, cada camada possui um contrato e um papel muito bem delimitados:  

 Responsabilidade Exclusiva: O Repository é a camada cuja única função é buscar, salvar, atualizar e remover dados.  

 Isolamento Tecnológico: Quando o mecanismo de armazenamento muda (saindo do array e entrando no PostgreSQL), a alteração de código deve ser contida exclusivamente onde o acesso a dados é gerenciado. 

 Ponto de Contato Único: O Repository funciona como uma barreira de isolamento, tornando-se o único ponto de contato entre a aplicação backend e o banco de dados. Isso impede que outras camadas (como Controllers ou Services) saibam como os dados são guardados.  
 
 3. O que mudou e o que não mudou na arquitetura do sistema?
 
 A substituição da persistência colocou à prova a qualidade da estrutura em camadas, demonstrando que uma alteração profunda de infraestrutura pode ser feita de forma isolada.  
 
 # O que mudou:
 
 A Implementação Interna do Repository: As funções internas de métodos como buscarTodos e salvar foram completamente reescritas para trocar a manipulação de arrays por queries SQL puras com a biblioteca pg.  
 
 O Mecanismo de Persistência: Os dados deixaram de ser voláteis (hospedados na memória RAM do processo do Node.js) e passaram a residir em um banco de dados persistente e externo (PostgreSQL no Neon).  
 
 O Controle de Identificadores (IDs): A responsabilidade de gerar IDs únicos foi delegada ao banco de dados por meio da propriedade SERIAL, eliminando as lógicas manuais baseadas no tamanho do array.  
 
 # O que NÃO mudou:
 
 A Base Arquitetural: A organização das pastas, a injeção de dependência e o tratamento centralizado de erros continuam exatamente os mesmos.  
 
 O Papel do Controller e do Service: O Controller continua focado estritamente em receber requisições HTTP e formular respostas , enquanto o Service permanece orquestrando o comportamento e aplicando as regras de negócio de maneira agnóstica ao banco.  
 
 Os Contratos das Rotas Reais: Os caminhos oficiais da API (/tarefas) e as respostas esperadas pelos clientes externos não sofreram alterações, mudando apenas a origem dos dados retornados.  