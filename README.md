<div align="center">
  <img src="tasktodo-mobile/assets/logo.png" alt="Task To Do" width="140" />

  <h1>📋 Task To Do</h1>
  <p>Gerenciamento de tarefas, categorias e fornecedores</p>
</div>

<div align="center">

![Java 17](https://img.shields.io/badge/Java_17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Expo](https://img.shields.io/badge/Expo_SDK_56-000020?style=for-the-badge&logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

</div>

---

## 💡 Sobre o projeto

O **Task To Do** é uma aplicação de organização de tarefas criada para o contexto de desenvolvimento mobile. O sistema permite registrar tarefas, classificá-las por categoria, definir prioridade e relacionar fornecedores quando necessário.

O projeto é dividido em duas partes principais:

- **`backend`** — API REST em Java com Spring Boot
- **`tasktodo-mobile`** — aplicativo mobile em Expo e React Native

---

## ✨ Funcionalidades

- ✅ Cadastro, listagem, edição e exclusão de tarefas
- 📌 Controle de tarefas concluídas e pendentes
- 🔥 Definição de prioridade da tarefa
- 📂 Organização por categorias
- 🏢 Cadastro e gerenciamento de fornecedores
- 🔗 Vínculo de fornecedores a tarefas
- 🔍 Consultas por status, prioridade, categoria, título e vencimento
- 🔐 Autenticação JWT

---

## 🛠️ Tecnologias

### Backend

| Tecnologia | Versão |
|---|---|
| Java | 17 |
| Spring Boot | - |
| Spring Web | - |
| Spring Data JPA | - |
| Spring Security + JWT | - |
| Bean Validation | - |
| PostgreSQL | - |
| Maven | - |

### Mobile

| Tecnologia | Versão |
|---|---|
| Expo SDK | 56 |
| React Native | - |
| React Navigation | - |
| Axios | - |
| Expo Vector Icons | - |

---

## 📂 Estrutura do projeto

```
.
├── backend/
│   └── src/main/java/com/br/tasktodo/
│       ├── config/        # Inicialização e configurações
│       ├── controller/    # Rotas REST
│       ├── dto/           # Objetos de transferência
│       ├── exception/     # Tratamento de erros
│       ├── model/         # Entidades do banco
│       ├── repository/    # Acesso a dados
│       └── service/       # Regras de negócio
│
└── tasktodo-mobile/
    ├── App.js
    └── src/
        ├── componentes/   # Componentes reutilizáveis
        ├── dados/         # Dados estáticos
        ├── paginas/       # Telas do app
        ├── servicos/      # Chamadas HTTP e utilitários
        └── tema/          # Tema escuro
```

---

## 📦 Entidades

### Task

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | Long | Identificador único |
| `titulo` | String | Título da tarefa |
| `descricao` | String | Descrição detalhada |
| `dataVencimento` | LocalDate | Data de vencimento |
| `concluida` | Boolean | Status de conclusão |
| `prioridade` | Integer | Nível de prioridade |
| `categoria` | Category | Categoria vinculada |
| `fornecedores` | Set<Fornecedor> | Fornecedores vinculados |

### Category

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | Long | Identificador único |
| `nome` | String | Nome da categoria |
| `descricao` | String | Descrição da categoria |

### Fornecedor

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | Long | Identificador único |
| `nome` | String | Nome do fornecedor |
| `cnpj` | String | CNPJ (14 dígitos) |

---

## 📡 Endpoints da API

Base: `http://localhost:8080/api`

### Tarefas

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/tasks` | Lista todas |
| `GET` | `/tasks/{id}` | Busca por ID |
| `POST` | `/tasks` | Cria nova |
| `PUT` | `/tasks/{id}` | Atualiza |
| `DELETE` | `/tasks/{id}` | Remove |
| `PUT` | `/tasks/{id}/concluir` | Alterna conclusão |
| `GET` | `/tasks/categoria/{id}` | Filtra por categoria |
| `GET` | `/tasks/status/{concluida}` | Filtra por status |
| `GET` | `/tasks/prioridade/{prioridade}` | Filtra por prioridade |
| `GET` | `/tasks/buscar?titulo={titulo}` | Busca por título |
| `GET` | `/tasks/vencimento/hoje` | Vencendo hoje |
| `GET` | `/tasks/vencidas` | Tarefas vencidas |
| `GET` | `/tasks/pendentes` | Tarefas pendentes |
| `GET` | `/tasks/periodo?dataInicio=&dataFim=` | Filtra por período |

### Categorias

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/categorias` | Lista todas |
| `GET` | `/categorias/{id}` | Busca por ID |
| `POST` | `/categorias` | Cria nova |
| `PUT` | `/categorias/{id}` | Atualiza |
| `DELETE` | `/categorias/{id}` | Remove |

### Fornecedores

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/fornecedores` | Lista todos |
| `GET` | `/fornecedores/{id}` | Busca por ID |
| `POST` | `/fornecedores` | Cria novo |
| `PUT` | `/fornecedores/{id}` | Atualiza |
| `DELETE` | `/fornecedores/{id}` | Remove |

---

## 🗄️ Banco de dados

O backend utiliza PostgreSQL. Crie o banco antes de iniciar:

```sql
CREATE DATABASE "TASKDODB";
```

As configurações de conexão são definidas via variáveis de ambiente (ou valores padrão no `application.properties`):

| Variável | Descrição | Padrão |
|---|---|---|
| `DB_URL` | URL de conexão | `jdbc:postgresql://localhost:5432/TASKDODB` |
| `DB_USERNAME` | Usuário | `postgres` |
| `DB_PASSWORD` | Senha | *(definir via ambiente)* |

---

## 🚀 Como executar

### Backend

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

A API ficará disponível em `http://localhost:8080`.

### Mobile

```powershell
cd tasktodo-mobile
npm install
npx expo start --clear
```

Para usar uma porta específica:

```powershell
npx expo start --port 8082 --clear
```

---

## 📱 Ícone do projeto

O ícone principal fica em `tasktodo-mobile/assets/logo.png`, usado no cabeçalho deste README e como ícone do app Expo.

---

## 📌 Observações

- Em celular físico, o app mobile não deve usar `localhost` para acessar o backend. Use o IP da máquina na rede local ou configure `adb reverse tcp:8080 tcp:8080`.
- Exemplos completos de chamadas da API estão em `backend/EXEMPLOS_API.md`.

---

<div align="center">

*"Não é sobre ter tempo. É sobre ter prioridades."*

</div>
