# Exercícios - Roteiro 15

## Exercício 1 - Explicar a entrada do ORM

O ORM entra depois do SQL puro porque primeiro é importante entender como o banco funciona. Com SQL, aprendemos como as tabelas são criadas e como as consultas são feitas de verdade.

O ORM ajuda a escrever essas consultas usando JavaScript, mas ele não esconde totalmente o banco. Por isso, saber SQL facilita entender o que o ORM está fazendo e corrigir problemas quando eles aparecerem.

## Exercício 2 - Mapear `projetos`

Para este exercício, a tabela `projetos` foi representada no arquivo `src/database/schema.js`, como descrito no roteiro, ficando dessa forma:

```js
export const projetos = pgTable('projetos', {
  id: serial('id').primaryKey(),
  nome: text('nome').notNull(),
})
```

O `id` identifica cada projeto e o `nome` guarda o nome dele. O schema apenas representa uma tabela que já existe no banco; ele não cria uma tabela nova sozinho.

## Exercício 3 - Ler projetos com Drizzle

Foi criado o arquivo `src/scripts/lista-projetos-drizzle.js` para buscar os projetos, com o trecho de busca ficando dessa forma:

```js
const lista = await db.select().from(projetos).orderBy(projetos.id)

console.table(lista)
```

O resultado mostrou os projetos ordenados pelo identificador:

- Projeto API DW3
- Projeto Banco Relacional
- Projeto Integração Frontend

## Exercício 4 - Comparar uma operação

Como já vimos anteriormente, uma mesma consulta pode ser feita com SQL puro:

```js
await pool.query(
  'SELECT id, descricao, concluido FROM tarefas ORDER BY id',
)
```

Ou usando Drizzle:

```js
const lista = await db.select().from(tarefas).orderBy(tarefas.id)
```

Eu achei o SQL mais fácil de entender no começo, porque ele mostra exatamente o que será feito no banco. O Drizzle fica mais parecido com JavaScript e pode ajudar a organizar o código, mas é preciso conhecer o schema e aprender a sintaxe dele.

O SQL dá mais controle e mostra melhor a consulta original. O Drizzle pode deixar o código menor e diminuir a necessidade de escrever strings SQL. Os dois acessam o mesmo banco e podem ser usados dependendo da situação.

Particularmente, acho que o Drizzle é mais versátil e profissional que o SQL puro, mas preciso ainda me acostumar com a sintaxe nova, algo que vou fazer no projeto de Projeto Integrador e DW3 com meus colegas nesse bimestre, tendo a oportunidade de melhorar meu ORM.
