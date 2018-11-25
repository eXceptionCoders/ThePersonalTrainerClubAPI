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
## Inicialización de base de datos de pruebas

Para generar una base de datos se emplea un programa auxiliar

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

#### Las definiciones de los modelos y las llamadas a **API** se encuentran en la carpeta `document`