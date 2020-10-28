# berkadia-CRUD
It contains product entity CRUD api's

Steps to execute API's in local
- git clone https://github.com/ayyappamaddi/berkadia-CRUD.git
- cd berkadia-CRUD
- docker-compose up --build 

Run api's in local envrironment

localIP = docker default machine ip

http://localIP:3001/v1/products/1
 
ProductSchema: 
    { name: String, productType: String, productCategory: String, price: Number,  productId: Number }
  - /v1/products
     Method: Get
     Response: [ { ProductObj }]
  - /v1/products/:productId
    Method: Get
    Response:  { ProductObj }
  - /v1/products/:productId
    Method: post
    body: { ProductObj }
    response:  { ProductObj }
  - /v1/products/:productId
    Method: Put
    body: { ProductObj }
    response:  { ProductObj }
  - /v1/products/:productId
    Method: Delete
