<div align="center">
  <img src="tasktodo-mobile/assets/logo.png" alt="Task To Do" width="140" />

  <h1>Task To Do</h1>
  <p>Aplicacao para gerenciamento de tarefas, categorias e fornecedores.</p>
</div>

## Ideia do projeto

O Task To Do e uma aplicacao de organizacao de tarefas criada para o contexto de desenvolvimento mobile. O sistema permite registrar tarefas, classifica-las por categoria, definir prioridade e relacionar fornecedores quando necessario.

O projeto e dividido em duas partes principais:

- `backend`: API REST em Java com Spring Boot.
- `tasktodo-mobile`: aplicativo mobile em Expo e React Native.

## Funcoes

- Cadastro, listagem, edicao e exclusao de tarefas.
- Controle de tarefas concluidas e pendentes.
- Definicao de prioridade da tarefa.
- Organizacao por categorias.
- Cadastro e gerenciamento de fornecedores.
- Vinculo de fornecedores a tarefas.
- Consultas por status, prioridade, categoria, titulo e vencimento.

## Tecnologias

### Backend

- Java 17
- Spring Boot
- Spring Web
- Spring Data JPA
- Bean Validation
- PostgreSQL
- Maven

### Mobile

- Expo SDK 56
- React Native
- React Navigation
- Axios
- Expo Vector Icons

## Arquitetura

```text
.
+-- backend/
|   +-- src/main/java/com/br/tasktodo/
|   |   +-- config/
|   |   +-- controller/
|   |   +-- dto/
|   |   +-- exception/
|   |   +-- model/
|   |   +-- repository/
|   |   +-- service/
|   +-- database/
|
+-- tasktodo-mobile/
    +-- App.js
    +-- src/
        +-- componentes/
        +-- dados/
        +-- paginas/
        +-- servicos/
        +-- tema/
```

O backend segue uma organizacao em camadas:

- `controller`: rotas REST.
- `service`: regras de negocio.
- `repository`: acesso ao banco.
- `model`: entidades persistidas.
- `dto`: objetos de transferencia de dados.
- `exception`: tratamento padronizado de erros.

O app mobile segue a base usada nas aulas, com telas separadas por pagina, estilos por tela, componentes reutilizaveis e um servico central para chamadas HTTP.

## Entidades principais

### Task

Representa uma tarefa.

Campos principais:

- `id`
- `titulo`
- `descricao`
- `dataVencimento`
- `concluida`
- `prioridade`
- `categoria`
- `fornecedores`

### Category

Representa uma categoria usada para organizar tarefas.

Campos principais:

- `id`
- `nome`
- `descricao`

### Fornecedor

Representa um fornecedor que pode ser vinculado a uma tarefa.

Campos principais:

- `id`
- `nome`
- `cnpj`
- `tasks`

## Endpoints principais

Base da API:

```text
http://localhost:8080/api
```

### Tarefas

- `GET /tasks`
- `GET /tasks/{id}`
- `POST /tasks`
- `PUT /tasks/{id}`
- `DELETE /tasks/{id}`
- `PUT /tasks/{id}/concluir`
- `GET /tasks/categoria/{categoryId}`
- `GET /tasks/status/{concluida}`
- `GET /tasks/prioridade/{prioridade}`
- `GET /tasks/buscar?titulo={titulo}`
- `GET /tasks/vencimento/hoje`
- `GET /tasks/vencidas`
- `GET /tasks/pendentes`
- `GET /tasks/periodo?dataInicio={yyyy-MM-dd}&dataFim={yyyy-MM-dd}`

### Categorias

- `GET /categorias`
- `GET /categorias/{id}`
- `POST /categorias`
- `PUT /categorias/{id}`
- `DELETE /categorias/{id}`

### Fornecedores

- `GET /fornecedores`
- `GET /fornecedores/{id}`
- `POST /fornecedores`
- `PUT /fornecedores/{id}`
- `DELETE /fornecedores/{id}`

## Banco de dados

O backend usa PostgreSQL.

Configuracao padrao:

```text
Banco: TASKDODB
Usuario: postgres
Porta: 5432
```

Comando para criar o banco:

```sql
CREATE DATABASE "TASKDODB";
```

## Como executar

### Backend

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

A API ficara disponivel em:

```text
http://localhost:8080
```

### Mobile

```powershell
cd tasktodo-mobile
npm install
npx expo start --clear
```

Para usar uma porta especifica:

```powershell
npx expo start --port 8082 --clear
```

## Icone do projeto

O icone principal do projeto fica em:

```text
tasktodo-mobile/assets/logo.png
```

Esse arquivo e usado no cabecalho deste README e tambem como icone do app Expo.

## Observacoes

- Em celular fisico, o app mobile nao deve usar `localhost` para acessar o backend. Use o IP da maquina na rede local.
- Exemplos completos de chamadas da API estao em `backend/EXEMPLOS_API.md`.
