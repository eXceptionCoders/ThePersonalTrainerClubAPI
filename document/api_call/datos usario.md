## Datos usuario

| URI                         | METHOD | HEADERS                |
| --------------------------- | ------ | ------------------- |
| `/api/v1/:lang/datauser` | `GET`  | `{ x-access-token }` |

### Example

`http://localhost:3000/api/v1/es/datauser`

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
    "datetime": "2018-12-11T20:59:12.194Z",
    "data": {
        "_id": "5c0c31e07a487446d42b59dc",
        "coach": true,
        "name": "David",
        "lastname": "López Rodríguez",
        "email": "david@gmail.com",
        "gender": "male",
        "thumbnail": "https://thepersonaltrainerclubcdn-dev.azureedge.net/thumbnails/5c0c31e07a487446d42b59dc-29360183925251304-user-profile.jpg",
        "sports": [
            {
                "_id": "5c072a344d8e218c090e1f58",
                "name": "judo",
                "category": "5c072a334d8e218c090e1f50",
                "icon": "https://thepersonaltrainerclubcdn-dev.azureedge.net/activities/jugo.png"
            },
            {
                "_id": "5c072a334d8e218c090e1f52",
                "name": "futbol",
                "category": "5c072a334d8e218c090e1f4e",
                "icon": "https://thepersonaltrainerclubcdn-dev.azureedge.net/activities/futbol.png"
            }
        ],
        "locations": [
            {
                "type": "Point",
                "coordinates": [
                    28.4815286,
                    -16.4119972
                ],
                "_id": "5c0c37e07a487446d42b59e1",
                "description": "Tacoronte",
                "updatedAt": "2018-12-08T21:30:08.337Z",
                "createdAt": "2018-12-08T21:30:08.337Z"
            },
            {
                "type": "Point",
                "coordinates": [
                    28.4777978,
                    -16.3117767
                ],
                "_id": "5c0c37f77a487446d42b59e2",
                "description": "La Laguna",
                "updatedAt": "2018-12-08T21:30:31.949Z",
                "createdAt": "2018-12-08T21:30:31.949Z"
            }
        ],
        "classes": [
            {
                "location": {
                    "type": "Point",
                    "coordinates": [
                        28.4815286,
                        -16.4119972
                    ]
                },
                "type": "class",
                "registered": 0,
                "_id": "5c0c3dc67a487446d42b59e4",
                "sport": {
                    "_id": "5c072a334d8e218c090e1f52",
                    "name": "futbol",
                    "category": "5c072a334d8e218c090e1f4e",
                    "icon": "https://thepersonaltrainerclubcdn-dev.azureedge.net/activities/futbol.png"
                },
                "price": 25,
                "duration": 30,
                "maxusers": 30,
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                "instructor": {
                    "_id": "5c0c31e07a487446d42b59dc",
                    "lastname": "López Rodríguez",
                    "name": "David",
                    "thumbnail": "https://thepersonaltrainerclubcdn-dev.azureedge.net/thumbnails/5c0c31e07a487446d42b59dc-29360183925251304-user-profile.jpg"
                },
                "place": "Tacoronte",
                "date": "2018-12-08T21:55:18.399Z",
                "createdAt": "2018-12-08T21:55:18.399Z",
                "updatedAt": "2018-12-08T21:55:18.399Z",
                "__v": 0
            }
        ],
        "activeBookings": []
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