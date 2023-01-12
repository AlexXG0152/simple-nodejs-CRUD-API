<h1 align="center">Welcome to simple-nodejs-CRUD-API 👋</h1>
<p align="center">
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/AlexXG0152/simple-nodejs-CRUD-API#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/AlexXG0152/simple-nodejs-CRUD-API/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/AlexXG0152/simple-nodejs-CRUD-API/blob/master/LICENSE" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/github/license/AlexXG0152/simple-nodejs-CRUD-API" />
  </a>
</p>

### This is simple CRUD API using in-memory database underneath.

### 🏠 [Homepage](https://github.com/AlexXG0152/simple-nodejs-CRUD-API)

## Prerequisites

Use:

Node.js 18.12.1 LTS

Typescript ^4.9.4



## Install

```sh
npm install
```

## Usage

There are 3 modes of running application (development and production):
1. Development.
The application is run in development mode using nodemon.

```sh
start:dev
```

2. Production.
The application is run in production mode.

```sh
start:prod
```

3. Scaling
Horizontal scaling for application. Script starts multiple instances of application using the Node.js Cluster API (equal to the number of logical processor cores on the host machine, each listening on port PORT + n) with a load balancer that distributes requests across them (using Round-robin algorithm). For example: host machine has 4 cores, PORT is 4000. On localhost:4000/api load balancer is listening for requests. On localhost:4001/api, localhost:4002/api, localhost:4003/api, localhost:4004/api workers are listening for requests from load balancer. When user sends request to localhost:4000/api, load balancer sends this request to localhost:4001/api, next user request is sent to localhost:4002/api and so on. After sending request to localhost:4004/api load balancer starts from the first worker again (sends request to localhost:4001/api).

```sh
start:multi
```

## Run tests

```sh
start:tests
```

Also for testing you can import Postman json file with requests and check API.

## API Map

Endpoint:  
```sh
api/users
```

| Method | URL                               | Status Code | Description                             |
|--------|-----------------------------------|-------------|-----------------------------------------|
| GET    | api/users                         | 200         | all users records                       |
| GET    | api/users/${userId}               | 200         | record with id === userId if it exists  |
|        |                                   | 400         | userId is invalid (not uuid)            |
|        |                                   | 404         | record with id === userId doesn't exist |
| POST   | api/users                         | 201         | newly created record                    |
|        |                                   | 400         | body does not contain required fields   |
| PUT    | api/users/{userId}                | 200         | updated record                          |
|        |                                   | 400         | userId is invalid (not uuid)            |
|        |                                   | 404         | record with id === userId doesn't exist |
| DELETE | api/users/{userId}                | 204         | record is found and deleted             |
|        |                                   | 400         | userId is invalid (not uuid)            |
|        |                                   | 404         | record with id === userId doesn't exist |
| GET    | api/some-non/existing/resource    | 404         | Not found                               |


## Author

👤 **alexxg0152**

* Website: https://github.com/AlexXG0152
* Github: [@AlexXG0152](https://github.com/AlexXG0152)

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2023 [alexxg0152](https://github.com/AlexXG0152).<br />
This project is [ISC](https://github.com/AlexXG0152/simple-nodejs-CRUD-API/blob/master/LICENSE) licensed.
