# API para Emprestimo de Livro

**Autora:** Nara Sakamoto<br>
**Descrição:** Este documento descreve como deve ser as *Requests* e *Responses* da API empresta-livro.

# Modelo de dados

![Modelo de Dados - Emprestimo Livro drawio](https://user-images.githubusercontent.com/16964091/180663047-3fee8a32-7a82-49e3-a26b-cf8a09e98ce6.png)

# API
1. [Livros](#Livros)
2. [Proprietarios](#Proprietarios)
3. [Emprestimos](#Emprestimos)
4. [Clientes](#Clientes)

## Livros

### Exibir ou Listar livros

#### Http Request

```
GET /livros
```

| Query String Parameter | Descrição | Exemplo |
| ----------- | ----------- | ----------- |
| titulo      | parte do titulo do Livro | GET /livros?titulo=SQL |


#### Request Body
```
```

#### Http Response

| Status Code | Description |
| ----------- | ----------- |
| 200 OK      | Sucesso     |
| 500 Internal Server Error   | Em caso de erro na comunicação com o banco de dados |

#### Response Body
```json
[
{"id":1, "titulo":"Lógica", "autor":"Loiane", "id_proprietario": 3},
{"id":2, "titulo":"SQL", "autor":"Kamila", "id_proprietario": 3}
]
```


### Criar um livro

#### Http Request

```
POST /livros
```

#### Request Body
```json
{"titulo":"REST", "autor":"Ana", "id_proprietario":1}
```

#### Http Response
| Status Code | Description |
| ----------- | ----------- |
| 201 Created      | Sucesso     |
| 500 Internal Server Error   | Em caso de erro na comunicação com o banco de dados |
| 400 Bad Request | Caso esteja faltando algum dado para cadastrar o livro |
 
#### Response Body
```json
```




### Editar um livro
#### Http Request
```
PUT /livros/{id}
```
| Parameter | Description |
| ----------- | ----------- |
| id      | Id do Livro     |

#### Request Body
```json
{"autor":"Paula"}
```
#### Http Response
| Status Code | Description |
| ----------- | ----------- |
| 200 OK      | Sucesso     |
| 500 Internal Server Error   | Em caso de erro na comunicação com o banco de dados |
| 404 Not Found | Caso o livro informado não seja encontrado |
#### Response Body
```json
```


### Excluir um livro
#### Http Request
```
DELETE /livros/{id}
```
| Parameter | Description |
| ----------- | ----------- |
| id      | Id do Livro     |
#### Request Body
```json
```
#### Http Response
| Status Code | Description |
| ----------- | ----------- |
| 200 OK      | Sucesso     |
| 500 Internal Server Error   | Em caso de erro na comunicação com o banco de dados |
| 404 Not Found | Caso o livro informado não seja encontrado |
#### Response Body
```json
```



## Proprietarios
### Exibir ou Listar Proprietarios
#### Http Request
```
GET /proprietarios
```
#### Request Body
```
```
#### Http Response
| Status Code | Description |
| ----------- | ----------- |
| 200 OK      | Sucesso     |
| 500 Internal Server Error   | Em caso de erro na comunicação com o banco de dados |
#### Response Body
```json
[
{"id":2, "nome":"Nara", "email":"nara@gmail.com"},
{"id":3, "nome":"Maria", "email":"maria@gmail.com"}
]
```
### Criar um proprietario
#### Http Request
```
POST /proprietarios
```
#### Request Body
```json
{"nome":"Gabi", "email":"gabi@gmail.com"}
```
#### Http Response
| Status Code | Description |
| ----------- | ----------- |
| 201 Created      | Sucesso     |
| 400 Bad Request | Caso esteja faltando algum dado para cadastrar proprietario |
| 500 Internal Server Error   | Em caso de erro na comunicação com o banco de dados |

#### Response Body
```json
```
### Editar um proprietario
#### Http Request
```
PUT /proprietarios/{id}
```
| Parameter | Description |
| ----------- | ----------- |
| id      | Id do proprietario |
#### Request Body
```json
{"nome":"Gabriela"}
```
#### Http Response
| Status Code | Description |
| ----------- | ----------- |
| 200 OK      | Sucesso     |
| 500 Internal Server Error   | Em caso de erro na comunicação com o banco de dados |
| 404 Not Found | Caso o proprietario informado não seja encontrado |
#### Response Body
```json
```
### Excluir um proprietario
#### Http Request
```
DELETE /proprietarios/{id}
```
| Parameter | Description |
| ----------- | ----------- |
| id      | Id do proprietario |
#### Request Body
```json
```
#### Http Response
| Status Code | Description |
| ----------- | ----------- |
| 200 OK      | Sucesso     |
| 500 Internal Server Error   | Em caso de erro na comunicação com o banco de dados |
| 404 Not Found | Caso o proprietario informado não seja encontrado |
#### Response Body
```json
```




## Emprestimos
### Exibir ou Listar Empréstimos
#### Http Request
```
GET /emprestimos
```
| Query String Parameter | Descrição | Exemplo |
| ----------- | ----------- | ----------- |
| data      | data do emprestimo | GET /emprestimos?data="20/07/2022" |
#### Request Body
```
```
#### Http Response
| Status Code | Description |
| ----------- | ----------- |
| 200 OK      | Sucesso     |
| 500 Internal Server Error   | Em caso de erro na comunicação com o banco de dados |
#### Response Body
```json
[
{ "id":1, "id_cliente":1, "id_livro":1, "data_emprestimo":"18/07/2022" },
{ "id":2, "id_cliente":2, "id_livro":3, "data_emprestimo":"17/07/2022" }
]
```
### Criar um Emprestimo
#### Http Request
```
POST /emprestimos
```
#### Request Body
```json
{"id_cliente":3, "id_livro":5, "data_emprestimo":"10/05/2022"}
```
#### Http Response
| Status Code | Description |
| ----------- | ----------- |
| 201 Created      | Sucesso     |
| 400 Bad Request | Caso dados estejam imcompletos |
| 500 Internal Server Error   | Em caso de erro na comunicação com o banco de dados |

#### Response Body
```json
```
### Editar um emprestimo
#### Http Request
```
PUT /emprestimos/{id}
```
| Parameter | Description |
| ----------- | ----------- |
| id      | Id do emprestimo |
#### Request Body
```json
{"data_emprestimo":"10/06/2022"}
```
#### Http Response
| Status Code | Description |
| ----------- | ----------- |
| 200 OK      | Sucesso     |
| 500 Internal Server Error   | Em caso de erro na comunicação com o banco de dados |
| 404 Not Found | Caso o emprestimo informado não seja encontrado |
#### Response Body
```json
```
### Excluir um emprestimo
#### Http Request
```
DELETE /emprestimos/{id}
```
| Parameter | Description |
| ----------- | ----------- |
| id      | Id do emprestimo |
#### Request Body
```json
```
#### Http Response
| Status Code | Description |
| ----------- | ----------- |
| 200 OK      | Sucesso     |
| 500 Internal Server Error   | Em caso de erro na comunicação com o banco de dados |
| 404 Not Found | Caso o emprestimo informado não seja encontrado |
#### Response Body
```json
```

## Clientes
### Exibir ou Listar Clientes
#### Http Request
```
GET /clientes
```
#### Request Body
```
```
#### Http Response
| Status Code | Description |
| ----------- | ----------- |
| 200 OK      | Sucesso     |
| 500 Internal Server Error   | Em caso de erro na comunicação com o banco de dados |
#### Response Body
```json
[
{"id":1, "nome":"José"},
{"id":2, "nome":"Rafael"}
]
```
### Criar um Cliente
#### Http Request
```
POST /clientes
```
#### Request Body
```json
{"nome":"Helena"}
```
#### Http Response
| Status Code | Description |
| ----------- | ----------- |
| 200 OK      | Sucesso     |
| 500 Internal Server Error   | Em caso de erro na comunicação com o banco de dados |
#### Response Body
```json
```
### Excluir um cliente
#### Http Request
```
DELETE /clientes/{id}
```
| Parameter | Description |
| ----------- | ----------- |
| id      | Id do cliente |
#### Request Body
```json
```
#### Http Response
| Status Code | Description |
| ----------- | ----------- |
| 200 OK      | Sucesso     |
| 500 Internal Server Error   | Em caso de erro na comunicação com o banco de dados |
| 404 Not Found | Caso o cliente informado não seja encontrado |
#### Response Body
```json
```
