# Serviço de gerenciamento de automoveis

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![SQLite](https://img.shields.io/badge/Sqlite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

Este projeto é o resultado de um teste técnico realizado como parte de um processo seletivo.

> ## Tecnologias Utilizadas

- [Node.js](https://nodejs.org/) - Ambiente de execução JavaScript do lado do servidor
- [Prisma](https://www.prisma.io/) - ORM (Object-Relational Mapping) para interface com banco de dados SQL
- [TypeScript](https://www.typescriptlang.org/) - Linguagem de programação que adiciona tipagem estática ao JavaScript
- [Jest](https://jestjs.io/pt-BR/) - Framework de testes para JavaScript
- [SQLite](https://www.sqlite.org/) - Biblioteca para gerenciamento de banco de dados SQL embutido.

> ## Como Executar

1. Clone o repositório e acesse a pasta do projeto
   ```shell
   git clone https://github.com/gbryan6/seidor-fleet-manager
   cd nome-do-repositorio
    ```
2. Instale os pacotes utilizando o comando `npm install`
3. Crie um arquivo `.env` na raiz do projeto e insira os valores abaixo. Utilize o arquivo `.env-example` como base.
  ```env
  DATABASE_URL="file:./dev.db"
  ```
4. Execute as migrações com o comando `npm run db:migrate`
5. Execute o projeto com o comando `npm run dev`

> ## Testes

1. Para verificar os testes unitários da aplicação execute `npm run test`
2. Para testar as rotas do projeto utilize um api client como `insomnia` ou `postman`.
  - Baixe e importe a request collection no seu api client para auxiliar os testes (insominia): [insominia.json](https://drive.google.com/file/d/133VTrC0CQxNzZXumOnhHpoIAvEX6Xh7p/view?usp=sharing)
3. Verifique o coverage acessando a pasta `coverage` localizada na raiz do projeto, abrindo o arquivo index.html em seu navegador.


> ## Rotas
```
  baseUrl: 'localhost:3333/api/fleet'
```

> ### Automóveis
Listar todos os automóveis

    - Endpoint: GET /automobile
    - Descrição: Retorna uma lista de todos os automóveis cadastrados, com suporte a filtros opcionais.
    - Parâmetros de Consulta:
        - color (opcional): Filtra automóveis por cor.
        - brand (opcional): Filtra automóveis por marca.
    - Controlador: automobileController.listAutomobiles

Buscar automóvel por ID

    - Endpoint: GET /automobile/:id
    - Descrição: Retorna os detalhes de um automóvel com base no ID fornecido.
    - Controlador: automobileController.getAutomobileById

Criar um novo automóvel

    - Endpoint: POST /automobile/create
    - Descrição: Cria um novo automóvel com base nos dados fornecidos no corpo da solicitação.
    - Controlador: automobileController.createAutomobile

Atualizar um automóvel existente

    - Endpoint: PUT /automobile/update/:id
    - Descrição: Atualiza os detalhes de um automóvel existente com base no ID fornecido.
    - Controlador: automobileController.updateAutomobile

Excluir um automóvel

    - Endpoint: DELETE /automobile/delete/:id
    - Descrição: Exclui um automóvel com base no ID fornecido.
    - Controlador: automobileController.deleteAutomobile

> ### Utilização de Automóveis
Listar todas as utilizações de automóveis

    - Endpoint: GET /automobile-utilization
    - Descrição: Retorna uma lista de todas as utilizações de automóveis registradas.
    - Controlador: automobileUtilizationController.listAutomobileUtilizations

Criar uma nova utilização de automóvel

    - Endpoint: POST /automobile-utilization/create
    - Descrição: Registra uma nova utilização de automóvel com base nos dados fornecidos no corpo da solicitação.
    - Controlador: automobileUtilizationController.createAutomobileUtilization

Finalizar uma utilização de automóvel

    - Endpoint: PUT /automobile-utilization/finish/:id
    - Descrição: Finaliza uma utilização de automóvel com base no ID fornecido.
    - Controlador: automobileUtilizationController.finishAutomobileUtilization

> ### Motoristas
Listar todos os motoristas

    - Endpoint: GET /driver
    - Descrição: Retorna uma lista de todos os motoristas cadastrados, com suporte a filtros opcionais.
    - Parâmetros de Consulta:
        - name (opcional): Filtra motoristas por nome.
    - Controlador: driverController.listDrivers

Buscar motorista por ID

    - Endpoint: GET /driver/:id
    - Descrição: Retorna os detalhes de um motorista com base no ID fornecido.
    - Controlador: driverController.getDriverById

Criar um novo motorista

    - Endpoint: POST /driver/create
    - Descrição: Cria um novo motorista com base nos dados fornecidos no corpo da solicitação.
    - Controlador: driverController.createDriver

Atualizar um motorista existente

    - Endpoint: PUT /driver/update/:id
    - Descrição: Atualiza os detalhes de um motorista existente com base no ID fornecido.
    - Controlador: driverController.updateDriver

Excluir um motorista

    - Endpoint: DELETE /driver/delete/:id
    - Descrição: Exclui um motorista com base no ID fornecido.
    - Controlador: driverController.deleteDriver
