# Whishlist API

Wishlist API is a REST API implemented in Nodejs that provides endpoints to manage Clients and their wishlists. 

## Dependecies

 . Nodejs v12.16.0 [https://nodejs.org/en/]()
 
 . NVM [https://github.com/creationix/nvm#install-script]()
 
 . Docker Compose [https://docs.docker.com/compose/install/#install-compose]()

Após instalado

`nvm install v12.16.0`

`nvm use v12.16.0`

## Setup

### Install and start dependecies
```bash
docker-compose build
docker-compose up -d
```

### To install the project:
```bash
npm install
```

### Start the system

```bash
npm start
```

### Run tests

```bash
npm test
```

### Run coverage

```bash
npm run coverage
```

### Run prettier

```bash
 npm run prettier
```

### Run lint

```bash
 npm run lint
```

## Wishlist API

| Method | Route | Action |
|-|-|-|
| GET | /clients | Retrieve list of clients |
| GET | /clients/\<client-id> | Retrieve a client |
| POST | /clients | Create a new client |
| PUT | /clients/\<client-id> | Update an existing client |
| DELETE | /clients/\<client-id> | Delete a client |
| PUT | /wishlists/\<client-id> | Add a product to client wishlist |
| GET | /wishlists/\<client-id> | Retrieve a client wishlist |
| DELETE | /wishlists/\<client-id> | Delete a product from a client wishlist |

#### Documentation
[Wishlist API documentation](API.md)

**PS: Basic authentication is required**, the users credentials can be set up at [credentials.yaml](credentials.yaml).