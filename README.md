API de Gerenciamento de Tarefas - Desafio Técnico Radix
Esta é uma API de gerenciamento de tarefas construída com NestJS para o desafio técnico da Radix. Ela fornece funcionalidades CRUD para o gerenciamento de tarefas.

Configuração do projeto
Para rodar o projeto localmente:

Instale as dependências:

bash
Copiar código
npm install
Inicie o servidor de desenvolvimento:

bash
Copiar código
npm run start:dev
Compile o projeto para produção:

bash
Copiar código
npm run build
Rode o servidor em produção:

bash
Copiar código
npm run start:prod
Executando os testes
Para executar os testes, utilize os seguintes comandos:

Testes unitários:

bash
Copiar código
npm run test
Testes end-to-end (e2e):

bash
Copiar código
npm run test:e2e
Cobertura de testes:

bash
Copiar código
npm run test:cov
Visão geral da aplicação
Esta API fornece funcionalidades para gerenciar tarefas, como criar, atualizar, recuperar e deletar tarefas. A API foi desenvolvida utilizando o NestJS, um framework Node.js voltado para a criação de aplicações do lado servidor de forma eficiente e escalável.

Visão geral das dependências
@nestjs/common, @nestjs/core, @nestjs/platform-express: Pacotes centrais do NestJS usados para criar a aplicação.
@nestjs/config: Para o gerenciamento de variáveis de ambiente.
@nestjs/mongoose: Integração com o Mongoose para interação com MongoDB.
mongoose: Ferramenta de modelagem de objetos MongoDB, usada para definir esquemas e interagir com o banco de dados.
axios: Utilizado para realizar requisições HTTP.
dotenv: Carrega variáveis de ambiente a partir de um arquivo .env.
reflect-metadata: Habilita o uso de decorators no TypeScript.
rxjs: Biblioteca para programação reativa com observables.
uuid: Para gerar IDs únicos para as tarefas.
Dependências de desenvolvimento
@nestjs/cli, @nestjs/schematics, @nestjs/testing: Ferramentas para o desenvolvimento e testes com NestJS.
jest, ts-jest, @types/jest: Framework de testes Jest e suporte ao TypeScript.
supertest, @types/supertest: Ferramentas para testes de APIs HTTP.
typescript: Suporte à linguagem TypeScript.
eslint, @typescript-eslint/eslint-plugin, @typescript-eslint/parser: Para verificação estática de código TypeScript.
prettier, eslint-config-prettier, eslint-plugin-prettier: Ferramentas para formatação de código.
ts-node, ts-loader: Ferramentas para rodar e compilar código TypeScript no Node.js.
source-map-support: Para melhor exibição de erros durante o desenvolvimento com TypeScript.
Licença
Este projeto está licenciado sob a licença UNLICENSED.