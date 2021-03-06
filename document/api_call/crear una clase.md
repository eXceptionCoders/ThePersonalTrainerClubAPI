
## Crear una clase

| URI                         | METHOD | BODY                       | HEADERS|
| --------------------------- | ------ | -------------------------- |--------|
| `/api/v1/:lang/classes/add` | `POST` | `{ sport, duration, price, description}`     |`{ x-access-token }`|

### Example

`http://localhost:3000/api/v1/es/classes/add`

##### Body

```json
{
    "sport": "id",
    "location": {
        "type": "Point",
        "description": "",
        "coordinates": []
    },
    "duration": 30,
    "price": 20,
    "desription": "Clase de tecnica basica"
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