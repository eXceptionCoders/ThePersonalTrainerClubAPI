## Autenticación

|URI             |METHOD                         |BODY                 |
|----------------|-------------------------------|---------------------|
|`/api/v1/:lang/users/login`|`POST`|`{ email, password }`|

### Example
`http://localhost:3000/api/v1/es/users/login`
##### Body
```json
{
	"email": "adam@test.com",
	"password": "1234"
}
```
##### Response
```json
{
    "version": "1.0.0",
    "status": "success",
    "message": "OK",
    "datetime": "2017-12-16T20:22:06.386Z",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWEzNTdlMzQzZmIxN2JmM2Q4NDBmYjlkIiwiaWF0IjoxNTEzNDU1NzI2LCJleHAiOjE1MTM2Mjg1MjZ9.G40iThNnq63TkZkOwG8M14yjTUow7U4ys52hRuS2VE4"
    }
}
```
##### Error
```json
{
    "version": "1.0.0",
    "status": "error",
    "message": "Authentication error",
    "datetime": "2017-12-16T20:36:03.554Z",
    "error": "Usuario o contraseña incorrecta"
}
```