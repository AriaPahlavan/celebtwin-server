# Celebtwin Server

## Development Tools:
* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/)
* [Express](https://expressjs.com/)
* [PostgreSQL](https://postgresql.org/)
* [Clarifai](https://clarifai.com/)

## Run Locally:
1. Clone this repo
2. Run `npm install`
3. Run `npm start`
4. You must add your own API key in the `src/App.js` file to connect to Clarifai.

You can grab Clarifai API key [here](https://clarifai.com/)

__TODOS__
- Set up CircleCI
- Set up session id management
- Configure the Dockerfile


# This is the api server for Celebtwin:

## User Management

### Create a User
```javascript
POST https://stunning-gunnison-41668.herokuapp.com/register
{
  "name": "<desired username>",
  "email": "<desired email>",
  "password": "<desired password (plaintext)>"
}
```

Returns

```javascript
{
  "response": {
    "id": "<user id (int)>",
    "name": "<desired username>",
    "email": "<desired email>",
    "entries": "<image entry count>"
    "joined": "<joining date>"
  },
  "statusCode": 200
}
```

 > If the user already exists the server will return a 400.
```javascript
{
  "error": "unable to register.",
  "statusCode": 400
}
```


### Retrieve a User
__TODOS__
- set up front-end component for updating profile
- or Remove entirely for security reasons.

```javascript
POST https://stunning-gunnison-41668.herokuapp.com/profile/:id
```

Returns

```javascript
{
  "response": {
    "id": "<user id (int)>",
    "name": "<desired username>",
    "email": "<desired email>",
    "entries": "<image entry count>"
    "joined": "<joining date>"
  },
  "statusCode": 200
}
```

> Returns with an error key if there was an error. Though, only for 4xx errors.


## Authentication

### Sign in

```javascript
POST https://stunning-gunnison-41668.herokuapp.com/signin
{
  "username": "<desired username>",
  "password": "<desired password (plaintext)>"
}
```

Returns

```javascript
{
  "response": {
    "id": "<user id (int)>",
    "name": "<desired username>",
    "email": "<desired email>",
    "entries": "<image entry count>"
    "joined": "<joining date>"
  },
  "statusCode": 200
}
```
 > Returns with an error key if there was an error. Though, only for 4xx errors.


## Entry Management

### Clarifai API Call

```javascript
POST https://stunning-gunnison-41668.herokuapp.com/imageUrl
{
 "imageUrl": "<desired image URL>",
}
```

Returns
[Clarifai API Call Response](https://clarifai.com/models/celebrity-image-recognition-model-e466caa0619f444ab97497640cefc4dc)


> If an error occurs will return a 400.

```javascript
{
 "error": "API call error.",
 "statusCode": 400
}
```

### Entry Increment

```javascript
POST https://stunning-gunnison-41668.herokuapp.com/image
{
 "id": "<id of desired user>",
}
```

Returns
```javascript
{
  "response": {
    "entries": "<updated entry count>"
  },
  "statusCode": 200
}
```


> If an error occurs will return a 400.

```javascript
{
 "error": "no such user.",
 "statusCode": 400
}
```
