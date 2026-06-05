# Exemplos de Uso da API Task Todo

Base URL: `http://localhost:8080`

Antes de criar uma tarefa, cadastre uma categoria. O backend exige que toda tarefa tenha uma categoria existente.

## Categorias

### Criar categoria
```bash
curl -X POST http://localhost:8080/api/categorias \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Estudos",
    "descricao": "Tarefas relacionadas a faculdade e cursos"
  }'
```

### Listar categorias
```bash
curl -X GET http://localhost:8080/api/categorias
```

### Consultar categoria por ID
```bash
curl -X GET http://localhost:8080/api/categorias/1
```

### Atualizar categoria
```bash
curl -X PUT http://localhost:8080/api/categorias/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Estudos atualizados",
    "descricao": "Tarefas de estudo revisadas"
  }'
```

### Excluir categoria
```bash
curl -X DELETE http://localhost:8080/api/categorias/1
```

Se existirem tarefas vinculadas a categoria, a API retorna `409 Conflict`.

## Fornecedores

### Criar fornecedor
```bash
curl -X POST http://localhost:8080/api/fornecedores \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Fornecedor Exemplo",
    "cnpj": "12345678000199"
  }'
```

### Listar fornecedores
```bash
curl -X GET http://localhost:8080/api/fornecedores
```

### Consultar fornecedor por ID
```bash
curl -X GET http://localhost:8080/api/fornecedores/1
```

### Atualizar fornecedor
```bash
curl -X PUT http://localhost:8080/api/fornecedores/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Fornecedor Atualizado",
    "cnpj": "12345678000199"
  }'
```

### Excluir fornecedor
```bash
curl -X DELETE http://localhost:8080/api/fornecedores/1
```

## Tarefas

### Criar tarefa
```bash
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Estudar Spring Boot",
    "descricao": "Revisar conceitos de JPA e REST APIs",
    "dataVencimento": "2026-06-15",
    "prioridade": 4,
    "categoria": {
      "id": 1
    },
    "fornecedores": [
      {
        "id": 1
      }
    ]
  }'
```

### Listar tarefas
```bash
curl -X GET http://localhost:8080/api/tasks
```

### Consultar tarefa por ID
```bash
curl -X GET http://localhost:8080/api/tasks/1
```

### Atualizar tarefa
```bash
curl -X PUT http://localhost:8080/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Estudar Spring Boot - Atualizado",
    "descricao": "Revisar JPA, REST APIs e validacoes",
    "dataVencimento": "2026-06-20",
    "prioridade": 5,
    "concluida": false,
    "categoria": {
      "id": 1
    },
    "fornecedores": [
      {
        "id": 1
      }
    ]
  }'
```

### Excluir tarefa
```bash
curl -X DELETE http://localhost:8080/api/tasks/1
```

### Marcar tarefa como concluida
```bash
curl -X PUT http://localhost:8080/api/tasks/1/concluir
```

## Consultas de tarefas

### Buscar tarefas por categoria
```bash
curl -X GET http://localhost:8080/api/tasks/categoria/1
```

### Buscar tarefas por status
```bash
curl -X GET http://localhost:8080/api/tasks/status/true
curl -X GET http://localhost:8080/api/tasks/status/false
```

### Buscar tarefas por prioridade
```bash
curl -X GET http://localhost:8080/api/tasks/prioridade/5
```

### Buscar tarefas por titulo
```bash
curl -X GET "http://localhost:8080/api/tasks/buscar?titulo=Spring"
```

### Buscar tarefas que vencem hoje
```bash
curl -X GET http://localhost:8080/api/tasks/vencimento/hoje
```

### Buscar tarefas vencidas e ainda nao concluidas
```bash
curl -X GET http://localhost:8080/api/tasks/vencidas
```

### Buscar tarefas pendentes ordenadas por prioridade e vencimento
```bash
curl -X GET http://localhost:8080/api/tasks/pendentes
```

### Buscar tarefas por periodo de vencimento
```bash
curl -X GET "http://localhost:8080/api/tasks/periodo?dataInicio=2026-06-01&dataFim=2026-06-30"
```

## Validacoes importantes

- `titulo` e obrigatorio e tem limite de 100 caracteres.
- `descricao` tem limite de 500 caracteres.
- `dataVencimento` e obrigatoria e nao pode ser anterior a data atual.
- `prioridade` e obrigatoria e deve ficar entre 1 e 5.
- `categoria.id` e obrigatorio para criar ou atualizar tarefas.
- Categoria com tarefas vinculadas nao pode ser excluida.
- `nome` da categoria e obrigatorio e tem limite de 100 caracteres.
- `descricao` da categoria tem limite de 255 caracteres.
- `fornecedores` e opcional, mas IDs informados precisam existir.
- `nome` do fornecedor e obrigatorio e tem limite de 150 caracteres.
- `cnpj` de fornecedor deve conter 14 digitos.

## Formato de erro

```json
{
  "timestamp": "2026-05-30T10:00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Dados invalidos",
  "path": "/api/categorias",
  "fields": {
    "nome": "Nome da categoria e obrigatorio"
  }
}
```
