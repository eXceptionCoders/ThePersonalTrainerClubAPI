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
  "locations": [ "Locations" ]
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
  "place": "String",
  "location": "Location",
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