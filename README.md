# API de Gerenciamento de Tarefas

## Introdução

Este é um projeto de back-end desenvolvido para uma entrevista técnica na Radix. Trata-se de uma API de gerenciamento de tarefas construída com NestJS, que permite aos usuários criar, excluir, listar e atualizar tarefas. Além disso, a API possui uma integração com o [NewsAPI](https://newsapi.org/) para exibir notícias relacionadas às palavras-chave das tarefas.

## Stacks
- Nest JS framework com Typescript.
- MongoDB como banco de dados (uristring está no .env)

## Para acessar a documentação da api no swagger

- Acesse http://localhost:3001/api

## Variáveis de ambiente

- MONGODB_URI_PROD=mongodb+srv://samuelufop121035:Y5OEcDJnDdSoGGjo@desafioradixdb.thd2n.mongodb.net/prod?retryWrites=true&w=majority&appName=DesafioRadixDb
- MONGODB_URI_TEST=mongodb+srv://samuelufop121035:Y5OEcDJnDdSoGGjo@desafioradixdb.thd2n.mongodb.net/test?retryWrites=true&w=majority&appName=DesafioRadixDbTest
- NEWS_API_KEY=ca57ea8ed07f44239f3cc3d40ddd6c52
- NEWS_API_URL=https://newsapi.org/v2/everything
- DAYS_TO_TAKE_NEWS=5


## Funcionalidades
- **Gerenciamento de Tarefas:**
  - Adicionar novas tarefas
  - Excluir tarefas existentes
  - Listar todas as tarefas
  - Atualizar tarefas
- **Integração com Notícias:**
  - Busca artigos de notícias relacionados às palavras-chave das tarefas, utilizando a NewsAPI.
  
## Instalação

1. Clone o repositório:
 `git clone https://github.com/SimpleDevSam/back-end `
  2. Instalar dependências:
 `npm install`
 3. Rodar projeto em dev:
 `npm run start:dev ou npm run start `
  4. Compilar para prod:
 `npm run build`
 5. Rodar a build para prod:
 `npm run start:prod`
 ### Testes
 - Testes end-to-end (e2e)
 `npm run test:e2e`


## Dependências/bibliotecas

-   **@nestjs/common**, **@nestjs/core**, **@nestjs/platform-express**: Pacotes centrais do NestJS usados para criar a aplicação.
-   **@nestjs/config**: Para o gerenciamento de variáveis de ambiente.
-   **@nestjs/mongoose**: Integração com o Mongoose para interação com MongoDB.
-   **mongoose**: Ferramenta de modelagem de objetos MongoDB, usada para definir esquemas e interagir com o banco de dados.
-   **axios**: Utilizado para realizar requisições HTTP.
-   **dotenv**: Carrega variáveis de ambiente a partir de um arquivo `.env`.
-   **reflect-metadata**: Habilita o uso de decorators no TypeScript.
-   **rxjs**: Biblioteca para programação reativa com observables.
-   **uuid**: Para gerar IDs únicos para as tarefas.