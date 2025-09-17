## Avaliação Escola de TI - Tema 6

#### Stacks utilizadas
###### Java 21
###### Angular 19
###### PostgreSQL

#### Subir APP

##### Backend (Spring Boot)
1. Necessário criar banco de dados 'avaliacao' e schema 'avaliacao'
2. Configurar conexão com PostgreSQL no application.properties
3. Executar: `./mvnw spring-boot:run` (na pasta server)

##### Frontend (Angular)
1. Instalar dependências: `npm install` (na pasta front)
2. Executar: `npm start` (na pasta front)
3. Acessar: http://localhost:4200

##### Desenvolvimento
- Backend roda na porta 8080
- Frontend roda na porta 4200 com proxy para o backend
