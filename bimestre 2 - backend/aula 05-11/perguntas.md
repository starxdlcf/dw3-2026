1. O que é um **Fat Model** e por que ele é considerado um problema em aplicações que tendem a crescer?


2. Por que o `TarefaService` recebe o `TarefaRepository` via constructor em vez de criá-lo internamente com `new TarefaRepository()`? Que vantagem isso traz?


3. O `server.js` foi chamado de **Composition Root**. Em suas próprias palavras, qual é o papel desse arquivo na nova arquitetura?


4. Se você precisasse trocar o armazenamento em memória por um banco de dados PostgreSQL, **quais arquivos você precisaria criar ou modificar** com a arquitetura atual? Justifique.


5. Observe o método `alternarConcluido` no `TarefaService`:
Por que essa lógica está no **Service** e não no **Repository**?