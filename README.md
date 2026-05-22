# Namu Wellness API

API REST para gerenciar programas de bem-estar, atividades e participações de usuários.

## Funcionalidades

- CRUD de programas em `/programs`
- CRUD de atividades aninhadas em `/programs/:programId/activities`
- Registro de participações em `/participations`
- Resumo do programa em `/programs/:programId/summary`
- Health check em `/health`
- Validações básicas de entrada e tratamento de erros com respostas HTTP adequadas

## Tecnologias Utilizadas

### Node.js
Escolhido pela simplicidade no desenvolvimento de APIs REST e grande ecossistema.

### TypeScript
Utilizado para aumentar previsibilidade, legibilidade e segurança do código através de tipagem estática.

### Express
Framework leve e flexível para construção da API.

### Sequelize + MySQL
ORM utilizado para abstração do banco de dados, mantendo produtividade e organização da camada de persistência.

### Jest
Utilizado para testes unitários das regras de negócio.

### Docker + Docker Compose
Facilitam a execução do projeto em qualquer ambiente, padronizando aplicação e banco de dados.

## Estrutura Utilizadas

- `src/modules/programs`: regras de negócio e rotas de programas
- `src/modules/activities`: regras e rotas de atividades por programa
- `src/modules/participations`: registro de participações
- `src/database`: migrations e seed SQL
- `tests/unit`: testes das regras de negócio

## Configuração

1. Suba tudo com Docker Compose:

```bash
docker compose up --build
```

2. Se quiser rodar localmente fora do Docker, instale as dependências:

```bash
npm install
```

## Endpoints principais

  Health
- `GET /health`

  Programas 
- `GET /programs`
- `POST /programs`
- `GET /programs/:id`
- `PUT /programs/:id`
- `DELETE /programs/:id`

  Atividades
- `GET /programs/:programId/activities`
- `POST /programs/:programId/activities`
- `GET /programs/:programId/activities/:activityId`
- `PUT /programs/:programId/activities/:activityId`
- `DELETE /programs/:programId/activities/:activityId`
- `GET /programs/:programId/summary`
  
  Participantes
- `GET /participations`
- `POST /participations`
- `GET /participations/:id`
- `PUT /participations/:id`
- `DELETE /participations/:id`

## Decisões técnicas

- Mantive o projeto em Express + TypeScript para uma entrega simples e direta.
- Usei Sequelize com queries SQL pontuais para o resumo do programa.
- Separei regras de negócio em services para facilitar teste e leitura.
- Validações são manuais e leves, sem adicionar dependências extras de schema validation.
- O banco sobe com migrations e seed embutidos no Docker Compose.
- Docker sobe a aplicação e o banco juntos

## O que faria com mais tempo

- Adicionaria testes de integração com o MySQL.
- Criaria paginação nas listagens.
- Colocaria um fluxo automático de migrations no bootstrap.
- Publicaria uma documentação Swagger.
