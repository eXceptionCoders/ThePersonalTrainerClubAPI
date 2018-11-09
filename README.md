# The Personal Trainer Club API

## Información general

**The Personal Trainer Club API** es un API para la gestión de entrenadores & deportistas.

La api permite las siguientes acciones:

- Registro de usuarios.
- Autenticación.
- Alta de clases.
- Busqueda de clases.
- Insccripcion en una clase.

Para iniciar el API: `npm run start`
Para iniciar el cluster: `npm run cluster`

## Demo desplegada en Azure

[API](https://thepersonaltrainerclubapi.azurewebsites.net)

[![Deploy to Azure](http://azuredeploy.net/deploybutton.png)](https://azuredeploy.net/)

# Configuración de la API

Para configurar correctamente el API crear un fichero *.env* con los siguientes parámetros de configuración:
- **MONGODB_CONNECTIONSTRING**: URL de conexión a una instancia de MongoDB.
- **SALT_WORK_FACTOR**: Numero entero que será el factor para generar el hash del password (10 por ejemplo).
- **JWT_SECRET**: Cadena alfanumérica que servirá como clave secreta para generar los tokens de autenticación.
- **JWT_EXPIRESIN**: Tiempo de espiración del JWT.
```
MONGODB_CONNECTIONSTRING=mongodb://localhost/nodepop
SALT_WORK_FACTOR=10
JWT_SECRET=AGDW2123lSAL204AL02LAUS2LS
JWT_EXPIRESIN=2d
```
## TODO: Inicialización de base de datos de pruebas

Para generar una base de datos cambiar la varibale INITDB en el .env:
```
INITDB = true
```
El script generará las cancelaciones, las categorias, los deportes y 3 usuarios.

## Respuestas de la API

Las respuestas de la API están estandarizadas y devuelven una estructura común con los siguientes campos.
```json
{
    "version": "1.0.0",
    "status": "success",
    "message": "OK",
    "datetime": "2017-12-16T18:20:34.871Z"
}
```
En el caso de que la llamada devuelva algún dato se añade el campo **data**.

```json
{
    "version": "1.0.0",
    "status": "success",
    "message": "OK",
    "datetime": "2017-12-16T18:21:06.702Z",
    "data": []
}
```
En el caso de que la llamada devuelva un resultado paginado se añade el campo **data** y **total**. Este último representa el número total de elementos.
```json
{
    "version": "1.0.0",
    "status": "success",
    "message": "OK",
    "datetime": "2017-12-16T18:21:06.702Z",
    "data": [
        {
            "_id": "5a3444d83241a4ceea3457f8",
        },
        {
            "_id": "5a3444d83241a4ceea343479",
        }
    ],
    "total": 19
}
```
En caso de error se añade el campo **error**.

```json
{
    "version": "1.0.0",
    "status": "error",
    "message": "Query params error",
    "datetime": "2017-12-16T19:13:25.886Z",
    "error": {
        "page": "'page' debe ser un múmero"
    }
}
```

## Modelo

### User
```json
{
    "type": "user",
    "coach": "Boolean",
    "name": "",
    "lastName": "",
    "thumbnail": "",
    "email": "",
    "password": "",
    "sports": [],
    "classes": [],
}
```
### Categoty

```json
{
    "type": "category",
    "name": "",
}
```

### Sport

```json
{
    "type": "sport",
    "name": "",
    "category": "_idCategoty"
}
```

### Cancelation

```json
{
    "type": "cancelation",
    "active": "Boolean",
    "description": "",
    "hoursForCancelation": "Number",
    "discount": "Number"
}
```

### Classes
```json
{
    "type": "classes",
    "instructor": "_idUser",
    "sport": "_idSport",
    "duration": "Number",
    "price": "Number",
    "description": ""
}
```
### Booking
```json
{
    "type": "booking",
    "active": "Boolean",
    "classReference": "_idClass",
    "registered": "Number",
    "listUsers": [],
}
```
## Registro de usuarios

|URI             |METHOD                         |BODY                 |
|----------------|-------------------------------|---------------------|
|`/api/v1/:lang/users/signup`|`POST`|`{ name, lastname, email, password, thumbnail, coach }`|

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

## Solicitud datos usuario

| URI                         | METHOD | HEADERS                |
| --------------------------- | ------ | ------------------- |
| `/api/v1/:lang/getuserdata` | `GET`  | `{ x-access-token }` |

### Example

`http://localhost:3000/api/v1/es/datauser/`

##### Headers

```json
{
    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWEzNTdlMzQzZmIxN2JmM2Q4NDBmYjlkIiwiaWF0IjoxNTEzNDU1NzI2LCJleHAiOjE1MTM2Mjg1MjZ9.G40iThNnq63TkZkOwG8M14yjTUow7U4ys52hRuS2VE4",
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
        "coach": true,
        "name": "Carlos",
        "lastname": "Sanchez",
        "thumbnail": "https://...",
        "sports": [],
        "classes": [],
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
    "error": "No existe el usuario especificado"
}
```

## Seleccion de deportes

| URI                         | METHOD | BODY                       | HEADERS|
| --------------------------- | ------ | -------------------------- |--------|
| `/api/v1/:lang/changesport` | `POST` | `{ listsport}`     |`{ x-access-token }`|

### Example

`http://localhost:3000/api/v1/es/changesport/`

##### Body

```json
{
    "listsport": ["tenis", "baloncesto"],
}
```
##### Headers

```json
{
    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWEzNTdlMzQzZmIxN2JmM2Q4NDBmYjlkIiwiaWF0IjoxNTEzNDU1NzI2LCJleHAiOjE1MTM2Mjg1MjZ9.G40iThNnq63TkZkOwG8M14yjTUow7U4ys52hRuS2VE4",
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
    "message": "Authentication error",
    "datetime": "2017-12-16T20:36:03.554Z",
    "error": "No se pudo actualizar la lista"
}
```
## Crear una clase

| URI                         | METHOD | BODY                       | HEADERS|
| --------------------------- | ------ | -------------------------- |--------|
| `/api/v1/:lang/classes/add` | `POST` | `{ sport, duration, price, description}`     |`{ x-access-token }`|

### Example

`http://localhost:3000/api/v1/es/classes/add`

##### Body

```json
{
    "sport": "tenis",
    "duration": 30,
    "price": 20,
    "desription": "Clase de tecniac basica"
}
```
##### Headers

```json
{
    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWEzNTdlMzQzZmIxN2JmM2Q4NDBmYjlkIiwiaWF0IjoxNTEzNDU1NzI2LCJleHAiOjE1MTM2Mjg1MjZ9.G40iThNnq63TkZkOwG8M14yjTUow7U4ys52hRuS2VE4",
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
    "message": "Authentication error",
    "datetime": "2017-12-16T20:36:03.554Z",
    "error": "No se pudo crear la clase"
}
```