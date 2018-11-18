## Registro de usuarios

|URI             |METHOD                         |BODY                 |
|----------------|-------------------------------|---------------------|
|`/api/v1/:lang/users/signup`|`POST`|`{ name, lastname, email, password, thumbnail, coach, description }`|

### Example
`http://localhost:3000/api/v1/es/users/signup`

##### Body
```json
{
    "coach": true,
    "name": "Carlos",
    "lastname": "Sanchez",
    "email": "carlos@test.com",
    "password": "1234",
    "thumbnail": "https//...",
    "description": "Entrenador titulado de fitness"
}
```
##### Response
```json
{
    "version": "1.0.0",
    "status": "success",
    "message": "OK",
    "datetime": "2017-12-16T18:21:41.752Z"
}
```
##### Error
```json
{
    "version": "1.0.0",
    "status": "error",
    "message": "Query params error",
    "datetime": "2017-12-16T20:45:12.593Z",
    "error": {
        "email": "El email no es válido"
    }
}
```