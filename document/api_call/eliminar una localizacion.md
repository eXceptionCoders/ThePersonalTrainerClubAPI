
## Eliminar una localizacion

| URI                         | METHOD | BODY                       | HEADERS|
| --------------------------- | ------ | -------------------------- |--------|
| `/api/v1/:lang/location/delete` | `POST` | `{ idLocation}`     |`{ x-access-token }`|

### Example

`http://localhost:3000/api/v1/es/location/add`

##### Body

```json
{
    "description": "Gimnaso PEOPLE",
    "longituded": 40.132334,
    "latitude": -1.345643,
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
    "error": "No se pudo eliminar la localizacion"
}
```