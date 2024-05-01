# API de Gerenciamento de Usuários

Esta é uma API para gerenciamento de usuários, onde os usuários podem se registrar, autenticar, visualizar, atualizar e
excluir suas informações de perfil.

## Recursos Disponíveis

- Registro de usuário
- Autenticação de usuário
- Visualização de informações do usuário
- Atualização de informações do usuário
- Exclusão de conta do usuário

## Configuração

### Requisitos

- Node.js (versão >= 10)
- Express.js
- Mongoose
- Bycrypt
- Jsonwebtoken
- NodeMon
- Dotenv

### Instalação

1. Clone este repositório:
   git clone https://github.com/seu-usuario/nome-do-repositorio.git

2. Instale as dependências:
   npm install
3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:
    ```
    DB_USER=seu-usuario-do-mongodb
    DB_PASSWORD=sua-senha-do-mongodb
    DB_NAME=nome-do-banco-de-dados
    DB_CLUSTER=seu-cluster-do-mongodb
    ```

### Uso

Para iniciar o servidor, execute o seguinte comando:
```
npm run dev
```
Isso iniciará o servidor na porta padrão 3333. Você pode alterar a porta no arquivo `index.js` se desejar.
## Rotas da API

### Registro de Usuário

- **URL**: /auth/registrar

Registra um novo usuário com as informações fornecidas no corpo da solicitação.

Parâmetros do corpo da solicitação:

- `nome`: Nome do usuário
- `email`: Endereço de e-mail do usuário
- `senha`: Senha do usuário
- `idade`: Idade do usuário
- `genero`: Gênero do usuário (masculino, feminino, outro)

### Autenticação de Usuário

- **URL**: /auth/autenticar

Autentica um usuário com base no e-mail e na senha fornecidos no corpo da solicitação. Retorna um token JWT de
autenticação se a autenticação for bem-sucedida.
Parâmetros do corpo da solicitação:

- `email`: Endereço de e-mail do usuário
- `senha`: Senha do usuário

### Visualização de Informações do Usuário

- **URL**: /auth/listar-usuarios

Recupera as informações do usuário com o ID especificado na URL.

### Atualização de Informações do Usuário

- **URL**: auth/atualizar-usuario/:id
  Atualiza as informações do usuário com o ID especificado na URL. Apenas o próprio usuário pode atualizar suas
  informações.
  Parâmetros do corpo da solicitação (opcional):

- `nome`: Novo nome do usuário
- `email`: Novo endereço de e-mail do usuário
- `senha`: Nova senha do usuário
- `idade`: Nova idade do usuário
- `genero`: Novo gênero do usuário

### Exclusão de Conta do Usuário

Exclui a conta do usuário com o ID especificado na URL. Apenas o próprio usuário pode excluir sua conta.
