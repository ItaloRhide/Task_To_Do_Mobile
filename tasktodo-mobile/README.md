# Task To Do Mobile

Aplicativo mobile do projeto Task To Do, desenvolvido com Expo e React Native.

## Estrutura

- `App.js`: navegacao principal.
- `src/paginas`: telas do aplicativo.
- `src/componentes`: componentes reutilizaveis.
- `src/servicos/api.js`: configuracao do Axios.
- `src/tema/colors.js`: cores e tema visual.

## Como rodar

Crie um `.env` local com o endereco real do backend quando for usar celular fisico ou gerar build:

```powershell
Copy-Item .env.example .env
```

Edite o valor para o IP da maquina que esta rodando o backend:

```text
EXPO_PUBLIC_API_URL=http://192.168.0.10:8080/api
EXPO_PUBLIC_API_DEBUG=true
```

```powershell
npm install
npx expo start --clear
```

Quando uma chamada para a API falhar, o app registra no terminal do Expo/Metro mensagens no formato:

```text
[API] -> GET http://192.168.0.10:8080/api/tasks
[API] Erro na chamada { ... }
```

No app, a mensagem de erro tambem mostra a URL chamada, a base configurada, status HTTP quando existir e o detalhe original do Axios.

Para gerar o export web:

```powershell
npm run build
```

Veja a documentacao geral no `README.md` da raiz do projeto.
