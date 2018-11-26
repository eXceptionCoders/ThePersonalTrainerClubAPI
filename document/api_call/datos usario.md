## Datos usuario

| URI                         | METHOD | HEADERS                |
| --------------------------- | ------ | ------------------- |
| `/api/v1/:lang/data/user` | `GET`  | `{ x-access-token }` |

### Example

`http://localhost:3000/api/v1/es/data/user/`

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
        "thumbnail": "https://randomuser.me/api/portraits/med/men/3.jpg",
        "sport": [
            {
                "type": "sport",
                "_id": "5bef2db30ae5006f4c51d455",
                "name": "tenis",
                "category": "5bef2db10ae5006f4c51d440",
              "__v": 0
            },
        ],
         "location": [
            {
                "type": "location",
                "_id": "5bfc1a6440dbed0d99ed5755",
                "description": "Manuel",
                "location": {
                    "type": "Point",
                    "coordinates": [
                        40.357182,
                        -1.182673
                    ],
                    "_id": "5bfc1a6440dbed0d99ed5756"
                },
                "user": "5bfbfc958a31150c2e44f7fa",
                "createdAt": "2018-11-26T16:08:04.481Z",
                "updatedAt": "2018-11-26T16:08:04.481Z",
                "__v": 0
            }
        ]
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