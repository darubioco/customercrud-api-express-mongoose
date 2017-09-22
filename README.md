# customercrud-api-express-mongoose
RESTful web services to create-read-update-delete customers

## Instructions
Ensure that MongoDB is installed and run these commands:
```
mongod
npm install
npm start
```
Then you can access the API endpoints, which are listed below.

## REST API Endpoints
Base URL is http://localhost:3000/api
- `POST /customers` Create customer
- `GET /customers` Read all customers
- `GET /customers/:customerId` Read customer by id
- `PUT /customers/:customerId` Update customer
- `DELETE /customers/:customerId` Delete customer

## Client applications
You can find an Angular web app that consumes this API at https://github.com/darubioco/customercrud-web-angular
