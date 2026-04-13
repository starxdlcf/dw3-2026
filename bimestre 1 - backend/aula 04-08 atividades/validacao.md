Indique em qual(is) camada(s) (Routes, Controller ou Model) as seguintes validações deveriam ficar e justifique sua escolha:

1. Verificar se a descrição da tarefa não está vazia ao criar uma nova tarefa.
**Camada**: Model
**Justificativa**: Pois a função do model é acessar e manipular os dados das tarefas, portanto é nessa camada que deve haver a verificação.

2. Verificar se o ID da tarefa existe antes de tentar atualizar ou remover uma tarefa.
**Camada**: Model ou Controller
**Justificativa**: Pois as funções deles são úteis e podem ser usadas para verificação antes que uma ação seja executada pelo model.

3. Verificar se os parâmetros de consulta (query) são válidos ao listar as tarefas (por exemplo, se o valor de concluido é true ou false).
**Camada**: Controller
**Justificativa**: Pois a função do controller é atuar como intermediário entre a view e o controller, portanto é nessa camada que deve haver a verificação de parâmetros válidos.

4. Converter o parâmetro id vindo da URL (que chega como string) para um número (Number) antes de buscar os dados.
**Camada**: Controller
**Justificativa**: Pois a função do controller é atuar como intermediário entre a view e o controller, portanto é nessa camada que deve haver a conversão de parâmetros.

5. Impedir a remoção de uma tarefa que já esteja marcada como "concluída" (regra para preservar o histórico de produtividade).
**Camada**: Model
**Justificativa**: Pois a função do model é acessar e manipular os dados das tarefas, portanto é nessa camada que deve haver a erificação antes da remoção de uma tarefa.

6. Verificar se o usuário já atingiu o limite máximo de 10 tarefas pendentes antes de permitir a criação de uma nova.
**Camada**: Model
**Justificativa**: Pois a função do model é acessar e manipular os dados das tarefas, portanto é nessa camada que deve haver a verificação de quantas tarefas pendentes há.