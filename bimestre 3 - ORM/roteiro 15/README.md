# Roteiro 15 - Entrando no ORM com Drizzle

Laboratório simples baseado no projeto dos Roteiros 13 e 14. O Repository e a API não foram migrados: este diretório apenas experimenta Drizzle usando o mesmo PostgreSQL por meio de um `Pool`.

## Preparação

1. Copie `.env.example` para `.env` e preencha `DATABASE_URL`.
2. Instale as dependências com `npm install`.
3. Confirme a sintaxe com `npm run check`.

## Laboratório

Execute `npm run testa-drizzle` duas vezes. A primeira execução insere uma tarefa de laboratório; a segunda detecta a tarefa existente e não duplica o registro.

Para listar projetos ordenados pelo identificador, execute `npm run lista-projetos`.

O schema apenas descreve tabelas existentes. Ele não cria tabelas nem aplica migrations.

## Comparação

SQL puro:

```js
await pool.query("SELECT id, descricao, concluido FROM tarefas ORDER BY id");
```

Drizzle:

```js
const lista = await db.select().from(tarefas).orderBy(tarefas.id);
```

O SQL deixa explícita a consulta enviada ao PostgreSQL. O Drizzle aproxima a consulta do schema JavaScript e retorna objetos, mas não substitui o conhecimento do banco nem as decisões de modelagem.
