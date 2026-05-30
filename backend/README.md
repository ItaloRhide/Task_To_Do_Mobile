# Task Todo App - Backend

Backend REST desenvolvido em Java 17 com Spring Boot, Spring Data JPA e PostgreSQL para gerenciamento de tarefas, categorias e fornecedores.

## Tecnologias

- Java 17
- Spring Boot 3.5.4
- Spring Web
- Spring Data JPA
- Bean Validation
- PostgreSQL
- Maven

## Banco de Dados

O backend espera um PostgreSQL local com:

- Banco: `TASKDODB`
- Usuario: `postgres`
- Senha: `123456`
- Porta: `5432`

A configuracao padrao fica em `application.properties`:

```properties
spring.datasource.url=${DB_URL:jdbc:postgresql://localhost:5432/TASKDODB}
spring.datasource.username=${DB_USERNAME:postgres}
spring.datasource.password=${DB_PASSWORD:123456}
```

Se precisar usar outro banco, defina `DB_URL`, `DB_USERNAME` e `DB_PASSWORD` no ambiente.

### Criar o banco local

No PostgreSQL, crie o banco antes de iniciar a aplicacao:

```sql
CREATE DATABASE "TASKDODB";
```

O mesmo comando esta salvo em:

```text
database/create-database.sql
```

O Hibernate cria/atualiza as tabelas automaticamente por causa de:

```properties
spring.jpa.hibernate.ddl-auto=update
```

## Como Executar

### 1. Instalar Maven

Se o comando `mvn` nao existir no terminal, instale o Maven no Windows:

```powershell
winget install Apache.Maven
```

Depois feche e abra o terminal novamente e teste:

```powershell
mvn -v
```

### 2. Rodar o backend com Maven instalado

```bash
mvn spring-boot:run
```

API: `http://localhost:8080`

## Logs

A aplicacao grava logs em:

```text
logs/backend.log
```

Para acompanhar o arquivo em tempo real no PowerShell:

```powershell
Get-Content .\logs\backend.log -Wait -Tail 80
```

Se o Maven mostrar `BUILD SUCCESS`, mas o processo encerrar, verifique esse arquivo. O Spring Boot pode falhar durante a inicializacao da aplicacao e ainda assim o Maven finalizar o comando sem deixar o servidor rodando.

### 3. Opcional: criar Maven Wrapper na pasta

Para deixar o projeto executavel sem depender de Maven global nas proximas maquinas, gere o Maven Wrapper uma vez:

```powershell
mvn -N wrapper:wrapper
```

Depois disso, o comando passa a ser:

```powershell
.\mvnw.cmd spring-boot:run
```

## Entidades

### Task

Representa uma tarefa.

- `id`
- `titulo`
- `descricao`
- `dataVencimento`
- `concluida`
- `prioridade`
- `dataCriacao`
- `dataAtualizacao`
- `categoria`
- `fornecedores`

Regras principais:

- Titulo obrigatorio, maximo 100 caracteres.
- Descricao com maximo de 500 caracteres.
- Data de vencimento obrigatoria e nao anterior a data atual.
- Prioridade obrigatoria entre 1 e 5.
- Categoria obrigatoria.
- Fornecedores opcionais, mas precisam existir quando enviados.

### Category

Representa a categoria de uma tarefa.

- `id`
- `nome`
- `descricao`

### Fornecedor

Representa fornecedores vinculaveis a tarefas.

- `id`
- `nome`
- `cnpj`
- `tasks`

Regras principais:

- Nome obrigatorio.
- CNPJ obrigatorio com 14 digitos.

## Endpoints

### Categorias

| Metodo | Endpoint | Descricao |
|---|---|---|
| GET | `/api/categorias` | Lista categorias |
| GET | `/api/categorias/{id}` | Consulta categoria por ID |
| POST | `/api/categorias` | Cria categoria |
| PUT | `/api/categorias/{id}` | Atualiza categoria |
| DELETE | `/api/categorias/{id}` | Exclui categoria |

### Fornecedores

| Metodo | Endpoint | Descricao |
|---|---|---|
| GET | `/api/fornecedores` | Lista fornecedores |
| GET | `/api/fornecedores/{id}` | Consulta fornecedor por ID |
| POST | `/api/fornecedores` | Cria fornecedor |
| PUT | `/api/fornecedores/{id}` | Atualiza fornecedor |
| DELETE | `/api/fornecedores/{id}` | Exclui fornecedor |

### Tarefas

| Metodo | Endpoint | Descricao |
|---|---|---|
| GET | `/api/tasks` | Lista tarefas |
| GET | `/api/tasks/{id}` | Consulta tarefa por ID |
| POST | `/api/tasks` | Cria tarefa |
| PUT | `/api/tasks/{id}` | Atualiza tarefa |
| DELETE | `/api/tasks/{id}` | Exclui tarefa |
| PUT | `/api/tasks/{id}/concluir` | Marca tarefa como concluida |
| GET | `/api/tasks/categoria/{categoryId}` | Lista tarefas por categoria |
| GET | `/api/tasks/status/{concluida}` | Lista tarefas por status |
| GET | `/api/tasks/prioridade/{prioridade}` | Lista tarefas por prioridade |
| GET | `/api/tasks/buscar?titulo={titulo}` | Busca tarefas por titulo |
| GET | `/api/tasks/vencimento/hoje` | Lista tarefas que vencem hoje |
| GET | `/api/tasks/vencidas` | Lista tarefas vencidas e nao concluidas |
| GET | `/api/tasks/pendentes` | Lista tarefas pendentes por prioridade e vencimento |
| GET | `/api/tasks/periodo?dataInicio={yyyy-MM-dd}&dataFim={yyyy-MM-dd}` | Lista tarefas por periodo de vencimento |

## CORS

O backend aceita requisicoes da origem `http://localhost:4200` para rotas `/api/**`.

## Exemplos

Veja exemplos completos em [EXEMPLOS_API.md](EXEMPLOS_API.md).
