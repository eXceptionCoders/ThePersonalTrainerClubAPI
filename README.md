# The Personal Trainer Club API

## Información general

**The Personal Trainer Club API** es un API para la gestión de entrenadores & deportistas. La api permite las siguientes acciones:
- Registro de usuarios.
- Autenticación.
- TODO ...

Para iniciar el API: `npm run start`
<br>
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

Para generar una base de datos de prueba ejecutar el comando siguiente:
```
npm run installDB
```
El script generará 10 usuarios y 50 anuncios que vinculará aleatoriamente a los usuarios.

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
	"data": [
		"work",
		"lifestyle",
		"motor",
		"mobile"
	]
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
			"user": "5a3444d73241a4ceea3457f3",
			"name": "Clothes",
			"description": "Ri miz zuzuja tufupa sis.",
			"price": 6227.88,
			"photo": "images/ads/500x300/05.jpg",
			"createdAt": "2017-12-15T21:55:36.049Z",
			"tags": [
				"lifestyle",
				"mobile"
			],
			"forSale": true,
			"type": "ad"
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
	"name": "",
	"lastName": "",
	"birthday": "yyyy-mm-dd",
	"gender": "male | female",
	"thumbnail": "",
	"email": "",
	"locations": [],
	"description": "",
	"password": "",
	"classes": [],
	"createdAt": ""
}
```
### Review
```json
{
	"type": "review",
	"user": "",
	"stars": 4,
	"comment": "",
	"createdAt": ""
}
```
### Class
```json
{
	"type": "class",
	"user": "",
	"name": "",
	"description": "",
	"freeCoupon": false,
	"forSale": true,
	"price": 0,
	"photo": "",
	"startDate": "",
	"endDate": "",
	"time": {
		"hour": "",
		"minute": "",
	},
	"duration": 0.5,
	"frecuency": "unique | diary | weekly | monthly",
	"quota": 10,
	"location": {
		"type": "Point",
		"description": "",
		"coordinates": []
	},
	"activities": [],
	"createdAt": ""
}
```
### Activity
```json
{
	"type": "activity",
	"name": "",
	"category:": "",
	"thumbnail": "",
	"description": "",
	"createdAt": ""
}
```
### Booking
```json
{
	"type": "booking",
	"user": "",
	"class": "",
	"comment": "",
	"freeCoupon": false,
	"date": "",
	"createdAt": ""
}
```
## Registro de usuarios

|URI             |METHOD                         |BODY                 |
|----------------|-------------------------------|---------------------|
|`/api/v1/:lang/users/signup`|`POST`|`{ name, gender, email, password }`|

### Example
`http://localhost:3000/api/v1/es/users/signup`
##### Body
```json
{
	"name": "Carlos",
	"gender": "male",
	"email": "carlos@test.com",
	"password": "1234"
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