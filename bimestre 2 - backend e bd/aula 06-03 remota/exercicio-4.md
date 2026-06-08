### Exercício 4 — Comparação entre memória e persistência

Quando as tarefas ficam em um array, elas existem só enquanto o servidor estiver rodando. Ao reiniciar a aplicação, esse array é apagado e tudo volta ao estado inicial. Isso é fácil de implementar, mas "mata" os dados entre as execuções.

No PostgreSQL, as tarefas são gravadas no banco de dados, então permanecem salvas mesmo se o servidor for desligado ou reiniciado, já que o banco de dados é responsável por guardar, organizar e recuperar essas informações de forma durável.

Isso muda o comportamento da aplicação: usando apenas arrays, o sistema é mais simples, mas frágil e inadequado para uso na vida real. Com PostgreSQL (ou outros bancos de dados), os dados persistem, tornando o sistema mais confiável e seguro para os usuários.