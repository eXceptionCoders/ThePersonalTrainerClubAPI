## Datos o rutas necesarias para el admin

| URI                         | METHOD | HEADERS                |
| --------------------------- | ------ | ------------------- |
| `/api/v1/:lang/data/admin/users` | `GET`  | `{ x-access-token }` |

### Example

`http://localhost:3000/api/v1/es/admin/users`

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
    "datetime": "2018-12-07T19:40:32.662Z",
    "data": [
        {
            "0": {
                "coach": true,
                "name": "Manuel",
                "lastname": "Perez Soriano",
                "password": "1234",
                "email": "test01@gmail.com",
                "description": "Entrenador especializado en defensa personal",
                "thumbnail": "https://randomuser.me/api/portraits/med/men/1.jpg",
                "sports": [],
                "gender": "male",
                "locations": [
                    {
                        "type": "Point",
                        "description": "Centro deportivo La Cuesta",
                        "coordinates": [
                            -4.838705,
                            41.517896
                        ]
                    }
                ]
            },
            "1": {
                "coach": true,
                "name": "Javier",
                "lastname": "Del Valle Simon",
                "password": "1234",
                "email": "test02@gmail.com",
                "description": "Entrenador de tenis",
                "thumbnail": "https://randomuser.me/api/portraits/med/men/2.jpg",
                "sports": [],
                "gender": "male",
                "locations": [
                    {
                        "type": "Point",
                        "description": "Parque Buena Vista",
                        "coordinates": [
                            -4.487915,
                            41.984999
                        ]
                    },
                    {
                        "type": "Point",
                        "description": "Polideporitvo Madrid",
                        "coordinates": [
                            -16.314164,
                            28.491102
                        ]
                    }
                ]
            },
            "2": {
                "coach": false,
                "name": "Fernando",
                "lastname": "Santiago Sanchez",
                "password": "1234",
                "email": "test03@gmail.com",
                "description": "Me encanta la gente con actitud",
                "thumbnail": "https://randomuser.me/api/portraits/med/men/3.jpg",
                "sports": [],
                "gender": "male",
                "locations": [
                    {
                        "type": "Point",
                        "description": "Casa del deporte",
                        "coordinates": [
                            -16.250426,
                            28.475385
                        ]
                    },
                    {
                        "type": "Point",
                        "description": "Laguna Sport",
                        "coordinates": [
                            -16.409709,
                            28.477816
                        ]
                    },
                    {
                        "type": "Point",
                        "description": "EuroGym",
                        "coordinates": [
                            -16.328035,
                            28.421851
                        ]
                    }
                ]
            },
            "3": {
                "coach": true,
                "name": "Agustin",
                "lastname": "Punter Jarque",
                "password": "1234",
                "email": "test04@gmail.com",
                "description": "Entrenador de multideporte para niños",
                "thumbnail": "https://randomuser.me/api/portraits/med/men/4.jpg",
                "sports": [],
                "gender": "male",
                "locations": [
                    {
                        "type": "Point",
                        "description": "EuroGym",
                        "coordinates": [
                            -16.328035,
                            28.421851
                        ]
                    },
                    {
                        "type": "Point",
                        "description": "Parque Sanabria",
                        "coordinates": [
                            -15.507975,
                            28.051492
                        ]
                    }
                ]
            },
            "4": {
                "coach": false,
                "name": "Eduardo",
                "lastname": "Casino Jarque",
                "password": "1234",
                "email": "test05@gmail.com",
                "description": "Me encanta el deporte ",
                "thumbnail": "https://randomuser.me/api/portraits/med/men/5.jpg",
                "sports": [],
                "gender": "male",
                "locations": [
                    {
                        "type": "Point",
                        "description": "Centro de deportes",
                        "coordinates": [
                            1.982596,
                            41.429238
                        ]
                    },
                    {
                        "type": "Point",
                        "description": "Gym full sport",
                        "coordinates": [
                            1.707717,
                            41.32521
                        ]
                    },
                    {
                        "type": "Point",
                        "description": "Madrid sport",
                        "coordinates": [
                            2.869862,
                            39.663255
                        ]
                    }
                ]
            },
            "5": {
                "coach": false,
                "name": "Giulia",
                "lastname": "Maccari",
                "password": "1234",
                "email": "test06@gmail.com",
                "description": "Me gusta cuidar mi cuerpo y mi alma",
                "thumbnail": "https://randomuser.me/api/portraits/med/women/6.jpg",
                "sports": [],
                "gender": "male",
                "locations": [
                    {
                        "type": "Point",
                        "description": "Parque Sanabria",
                        "coordinates": [
                            -15.507975,
                            28.051492
                        ]
                    },
                    {
                        "type": "Point",
                        "description": "Centro de deportes",
                        "coordinates": [
                            1.982596,
                            41.429238
                        ]
                    }
                ],
                "classes": []
            },
            "6": {
                "coach": true,
                "name": "Maria",
                "lastname": "Simon Callaza",
                "password": "1234",
                "email": "test07@gmail.com",
                "description": "Ven a dejar tus musculos en la bicicleta",
                "thumbnail": "https://randomuser.me/api/portraits/med/women/7.jpg",
                "sports": [],
                "gender": "female",
                "locations": [
                    {
                        "type": "Point",
                        "description": "Gym full sport",
                        "coordinates": [
                            1.707717,
                            41.32521
                        ]
                    }
                ],
                "classes": []
            },
            "7": {
                "coach": true,
                "name": "Jimena",
                "lastname": "Molina Gaos",
                "password": "1234",
                "email": "test08@gmail.com",
                "description": "Titulado en socorrismo y entrenador de natacion",
                "thumbnail": "https://randomuser.me/api/portraits/med//women/8.jpg",
                "sports": [],
                "gender": "female",
                "locations": [
                    {
                        "type": "Point",
                        "description": "Parque Buena Vista",
                        "coordinates": [
                            -4.487915,
                            41.984999
                        ]
                    },
                    {
                        "type": "Point",
                        "description": "Polideporitvo Madrid",
                        "coordinates": [
                            -16.314164,
                            28.491102
                        ]
                    },
                    {
                        "type": "Point",
                        "description": "Casa del deporte",
                        "coordinates": [
                            -16.250426,
                            28.475385
                        ]
                    },
                    {
                        "type": "Point",
                        "description": "Laguna Sport",
                        "coordinates": [
                            -16.409709,
                            28.477816
                        ]
                    },
                    {
                        "type": "Point",
                        "description": "EuroGym",
                        "coordinates": [
                            -16.328035,
                            28.421851
                        ]
                    },
                    {
                        "type": "Point",
                        "description": "Parque Sanabria",
                        "coordinates": [
                            -15.507975,
                            28.051492
                        ]
                    },
                    {
                        "type": "Point",
                        "description": "Centro de deportes",
                        "coordinates": [
                            1.982596,
                            41.429238
                        ]
                    },
                    {
                        "type": "Point",
                        "description": "Gym full sport",
                        "coordinates": [
                            1.707717,
                            41.32521
                        ]
                    },
                    {
                        "type": "Point",
                        "description": "Madrid sport",
                        "coordinates": [
                            2.869862,
                            39.663255
                        ]
                    }
                ],
                "classes": []
            },
            "8": {
                "coach": false,
                "name": "Iara",
                "lastname": "Perez Maccari",
                "password": "1234",
                "email": "test09@gmail.com",
                "description": "",
                "thumbnail": "https://randomuser.me/api/portraits/med//women/9.jpg",
                "sports": [],
                "gender": "female",
                "locations": [
                    {
                        "type": "Point",
                        "description": "Parque Buena Vista",
                        "coordinates": [
                            -4.487915,
                            41.984999
                        ]
                    },
                    {
                        "type": "Point",
                        "description": "Polideporitvo Madrid",
                        "coordinates": [
                            -16.314164,
                            28.491102
                        ]
                    },
                    {
                        "type": "Point",
                        "description": "Casa del deporte",
                        "coordinates": [
                            -16.250426,
                            28.475385
                        ]
                    }
                ],
                "classes": []
            },
            "9": {
                "coach": false,
                "name": "Judit",
                "lastname": "Fraga Abellan",
                "password": "1234",
                "email": "test10@gmail.com",
                "description": "Quiero encontrar gente que le guste el atletismo como a mi",
                "thumbnail": "https://randomuser.me/api/portraits/med//women/10.jpg",
                "sports": [],
                "gender": "female",
                "locations": [
                    {
                        "type": "Point",
                        "description": "EuroGym",
                        "coordinates": [
                            -16.328035,
                            28.421851
                        ]
                    },
                    {
                        "type": "Point",
                        "description": "Parque Sanabria",
                        "coordinates": [
                            -15.507975,
                            28.051492
                        ]
                    }
                ],
                "classes": []
            },
            "type": "user",
            "coach": false,
            "gender": "male",
            "sports": [],
            "_id": "5c0ac4bbe2cf666bcd054d4c",
            "locations": []
        },
        {
            "type": "user",
            "coach": false,
            "gender": "female",
            "sports": [],
            "_id": "5c0ac4f2e2cf666bcd054d63",
            "name": "Judit",
            "lastname": "Fraga Abellan",
            "description": "Quiero encontrar gente que le guste el atletismo como a mi",
            "thumbnail": "https://randomuser.me/api/portraits/med//women/10.jpg",
            "locations": [
                {
                    "type": "Point",
                    "coordinates": [
                        -16.328035,
                        28.421851
                    ],
                    "description": "EuroGym"
                },
                {
                    "type": "Point",
                    "coordinates": [
                        -15.507975,
                        28.051492
                    ],
                    "description": "Parque Sanabria"
                }
            ],
            "classes": []
        },
        {
            "type": "user",
            "coach": true,
            "gender": "male",
            "sports": [],
            "_id": "5c0ac507e2cf666bcd054d6b",
            "name": "Manuel",
            "lastname": "Perez Soriano",
            "description": "Entrenador especializado en defensa personal",
            "thumbnail": "https://randomuser.me/api/portraits/med/men/1.jpg",
            "locations": [
                {
                    "type": "Point",
                    "coordinates": [
                        -4.838705,
                        41.517896
                    ],
                    "description": "Centro deportivo La Cuesta"
                }
            ]
        },
        {
            "type": "user",
            "coach": true,
            "gender": "male",
            "sports": [],
            "_id": "5c0ac54d13ab891a811f07da",
            "name": "Test",
            "lastname": "Beltran Santos",
            "locations": [],
            "createdAt": "2018-12-07T19:09:01.886Z",
            "updatedAt": "2018-12-07T19:09:01.886Z",
            "__v": 0
        }
    ]
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