## Modelos

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
  "sports": [ "_idSport" ],
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
  "icon": "",
  "category": "_idCategoty"
}
```
### Location
```json
{
  "type": "location",
  "user": "_id_user",
  "description": "",
  "location": {
    "type" :{
      "type" : "Point",
      "coordenates" : "[Number]"
    }
  }
}
```
### Cancelation
```json
{
  "type": "cancelation",
  "active": "Boolean",
  "description": "",
  "hoursForCancelation": "Number",
  "repurse": "Number"
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
  "resgistered": "Number",
   "description": ""
}
```
### Booking
```json
{
  "type": "booking",
  "class": "_idClass",
  "user": "_idUser",
}
```
### Review
```json
{
  "type": "review",
  "created": "_idClass",
  "for": "_idUser or _idClass",
  "start": "Number",
  "comment": ""
}
```