# Endpoints do serviço:
  
| Método | Endpoint |Responsabilidade  | 
| ----- | ------------- |------------- |
| POST  | /users  |Criação de usuários  | 
| POST  | /login |Gera um token JWT recebendo email e password no corpo da requisição como JSON.|
| GET  | /users |Lista todos os usuários|
| GET  | /users/profile |Retorna os dados do usuário logado (usuário a qual pertence o token que será necessário neste endpoint).|
| PATCH  | /users/<id> |Atualiza os dados de um usuário.|
| DELETE  | /users/<id> |Deleta usuários do banco.|
  
## POST - /users
Rota para criação de usuário com os seguintes dados:
  
> name: string
> email: string
> password: Receber uma string mas armazena uma hash gerada com o bcrypt
  
> isAdm: boolean
  
> createdOn: É gerado no momento na validação dos dados no formato Date
  
> updatedOn: É gerado no momento na validação dos dados no formato Date, possuí o valor de criação e é atualizado sempre que o usuário é atualizado.
  
> id: Gerado no momento da validação dos dados pelo Banco de dados e é número randômico.
  
- (Regra de negócio)
  - A rota de criação retorna todos os dados, com exceção da hash de senha.
  - Não podem ser cadastrados dois usuário com o mesmo e-mail.
  
## POST - /login
Rota de login recebe email e o password:
  
> O login deve valida se o usuário existe e valida se a senha está correta.
  
> A rota de login retorna um token JWT válido por 24h caso todas as validações passem.
 
## GET - /users
A rota de listagem de usuários retorna todos os dados dos usuários, incluindo os hashs de senhas:
  
> Essa está protegida por um middleware de validação do token JWT
> Essa rota só é acessada por usuários que sejam administradores

## GET - /users/profile
> A rota de perfil retorna os dados do usuário que fez a requisição
> Essa rota está protegida por um middleware de validação do token JWT
  
## PATCH - /users/<id>
A rota de atualização de usuário é capaz de atualizar tanto um quanto todos os dados de um usuário:
  
> Essa rota está protegida por um middleware de validação do token JWT
> O campo updatedAt é atualizado com uma string no formato Date, representando o momento da atualização
  
- (Regra de negócio)
  - O campo isAdm NÃO pode ser atualizado.
  - Apenas administradores podem atualizar qualquer usuário, usuários não-administradores podem apenas atualizar seu próprio usuário.
  - A rota de atualização de usuário retorna os dados do usuário atualizado.
  
## DELETE - /users/<id>
A rota de exclusão de usuário é capaz de excluir usuários:
  
> Está rota é protegida por um middleware de validação do token JWT
  
- (Regra de negócio)
  - Apenas administradores podem excluir qualquer usuário, usuários não-administradores podem apenas excluir seu próprio usuário.
  - A rota de exclusão de usuário retorna um objeto com uma chave de nome "mensagem" com o valor "User deleted with success".

 ---------------------
  
# Exemplos de requisições:
  
  ## Criando usuário:
  
  POST: /users
  
  ```
  {
    "name": "daniel",
    "email": "daniel@kenzie.com",
    "password": "123456",
    "isAdm": true
  }
  ```
  Status: 201 CREATED
  
  ```
  {
	"_id": "62e7bdfcf2fe4483c0fc1f77",
	"name": "daniel",
	"email": "daniel@kenzie.com",
	"isAdm": true,
	"createdOn": "2022-08-01T11:50:20.584Z",
	"updatedOn": "2022-08-01T11:50:20.584Z"
  }
  
  ```
  
## Criando usuário com e-mail já existente:
  
  POST: /users
  
  ```
  {
    "name": "daniel",
    "email": "daniel@kenzie.com",
    "password": "123456",
    "isAdm": true
  }
  ```
  
  Status: 400 BAD REQUEST
  
  ```
  {
      "message": "E-mail already registered",
  }
  ```
----------------------------------------------------  
  ## Login:
  
  POST: /login
  
```
  {
      "email": "daniel@kenzie.com",
      "password": "123456",
  }
```
  Status: 200 OK
  
 ```
    {
        "token": "4b72c6f34b72c6f3-6d0a-6a1-86c6-687d52de4fc7-6d0a-6a1-86c6-687d
        2c6f3-6d0a-6a1-86c6-687d52de4fc74b72c6f3-6d0a-6a1-86c6-687d52de4fc7",
    }
 ```
  
  ## Login inválido:
  POST: /login
  
 ```
{
    "email": "daniel@mail.com",
    "password": "123456",
}
  ```
  
  Status: 401 UNAUTHORIZED
  
  ```
{
    "message": "Wrong email/password",
}
  ``` 
  ----------------------------------------------------  
  
 ## Listando usuários:
  
  GET: /users
  
  - Com header de autorização.
  
  Status: 200 OK
  
  ```
  [
    {
      "_id": "62e7bd625f2f7fffcc4d617c",
      "name": "daniel",
      "email": "daniel@kenzie.com",
      "password": "$2a$10$.ojNDhChN.SqNvB1h8jEfuxysWrXiMRHlCRzrzW4TbcZZP2rA8vAG",
      "isAdm": true,
      "createdOn": "2022-08-01T11:47:46.858Z",
      "updatedOn": "2022-08-01T11:47:46.858Z",
      "__v": 0
    }
  ]
  ``` 
  
  ## Listando usuários sem token:
  
  GET: /users
  
  - Sem header de autorização.
  
  Status: 401 UNAUTHORIZED
  
```
{
    "message": "Missing authorization headers",
}
``` 
  
  ## Listando usuários sem ser administrador:
  
  GET: /users
  
  - Com header de autorização.
  
    Status: 401 UNAUTHORIZED
  
  ```
  {
       "message": "Unauthorized",
  }
  ``` 
  
  ## Dados do perfil:
  
  GET: /users/profile
  
   - Com header de autorização.
  Status: 200 OK
  
  ```
  
	{
		"_id": "62e7bd625f2f7fffcc4d617c",
		"name": "daniel",
		"email": "daniel@kenzie.com",
		"isAdm": true,
		"createdOn": "2022-08-01T11:47:46.858Z",
		"updatedOn": "2022-08-01T11:47:46.858Z",
		"__v": 0
	}
  
  ``` 
  
  ## Dados do perfil sem token:
  
GET: /users/profile
  
- Sem header de autorização.
  
Status: 401 UNAUTHORIZED
  
```
{
      "message": "Missing authorization headers",
}
``` 
  ----------------------------------------------------  
  ## Atualizando usuário:
  
  PATCH: /users/<id>
  
- Com header de autorização.
  
```
{
    "name": "Daniel Kenzie"
    "email": "daniel@kenzie.com.br",
}
``` 
  
  Status: 200 OK
  
```
  {
	"_id": "62e7bdfcf2fe4483c0fc1f77",
	"name": "daniel",
	"email": "daniel2@kenzie.com",
	"isAdm": false,
	"createdOn": "2022-08-01T11:50:20.584Z",
	"updatedOn": "2022-08-01T13:39:50.715Z"
  }
```
  
- Sem header de autorização.
  
Status: 401 UNAUTHORIZED
  
```
{
      "message": "Missing authorization headers",
}
``` 
  
## Atualizando outro usuário sem ser administrador
  
- Com header de autorização.
  
Status: 401 UNAUTHORIZED
  
```
{
      "message": "Missing admin permissions",
}
``` 
  ----------------------------------------------------  
## Excluindo usuário
  
  
DELETE: /users/<id>
  
- Com header de autorização.
  
Status: 200 OK
  
``` 
{
      "message": "User deleted with success",
}
```   
- Sem header de autorização.
  
Status: 401 UNAUTHORIZED
  
```
{
      "message": "Missing authorization headers",
}
``` 
  
## Excluindo outro usuário sem ser administrador  
  
- Com header de autorização.
  
Status: 401 UNAUTHORIZED
  
```
{
      "message": "Missing admin permissions",
}
```  
  
