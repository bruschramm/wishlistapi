**Retrieve a list of clients**
----
  Returns list of JSONs representing clients data.

* **URL**

  /clients

* **Method:**

  `GET`
  
*  **Query Params**
 
   `page=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200
    **Content:** 
    ```json
    {
      "meta": {
          "page": <current_page_number>,
          "size": <clients_list_size>
      },
      "records": [
          {
              "email": <client_email>,
              "name": <client_name>,
              "_id": <client_id>
          },
          ...
      ]
    }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED
    **Content:** 
    ``` json
    {
      "statusCode": 401,
      "error": "Unauthorized"
    }
    ```

* **Sample Call:**

  ```
    curl -X GET http://{endpoint}/clients/ -H 'Authorization: {basic auth}'
  ```

**Retrieve a client**
----
  Returns a JSON with client data.

* **URL**

  /clients/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200
    **Content:** 
    ```json
    {
      "email": <client_email>,
      "name": <client_name>,
      "_id": <client_id>
    }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED
    **Content:** 
    ``` json
    {
      "statusCode": 401,
      "error": "Unauthorized",
    }
    ```

  OR

  * **Code:** 404 NOT FOUND
    **Content:** 
    ```json
    {
      "statusCode": 404,
      "error": "Not Found",
      "message": "Client with id (client-id) not found"
    }
    ```

* **Sample Call:**

    ```
    curl -X GET http://{endpoint}/clients/{client_id} -H 'Authorization: {basic auth}'
  ```


**Create a new client**
----
  Create a new client.

* **URL**

  /clients

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

   **Required:**
 
   `name=[string]`
   `email=[string]`

* **Success Response:**

  * **Code:** 200
    **Content:**
    ```json
    {
      "description": "Successfully created client: <id>"
    }
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST
    **Content:** 
    ```json
    {
      "statusCode": 400,
      "error": "Bad Request",
      "message": "Invalid request payload input"
    }
    ```

  OR

  * **Code:** 409 Conflict
    **Content:** 
    ``` json
    {
      "statusCode": 409,
      "error": "Client with email (<email>) alread exists",
    }
    ```
    
  OR

  * **Code:** 401 UNAUTHORIZED
    **Content:** 
    ``` json
    {
      "statusCode": 401,
      "error": "Unauthorized",
    }
    ```

* **Sample Call:**

  ```
  curl -X POST http://{endpoint}/clients \
    -H 'Authorization: {basi auth}' \
    -H 'Content-Type: application/json' \
    -d '{ "email": {email}, "name": {name}'
  ```

**Update a client**
----
  Update a client.

* **URL**

  /clients/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[string]`

* **Data Params**

   **Required:**
 
   `name=[string]`
   `email=[string]`

* **Success Response:**

  * **Code:** 200
    **Content:** 
    ```json
    {
      "description": "Successfully updated client"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST
    **Content:** 
    ```json
    {
      "statusCode": 400,
      "error": "Bad Request",
      "message": "Invalid request payload input"
    }
    ```
  
  OR

  * **Code:** 401 UNAUTHORIZED
    **Content:** 
    ``` json
    {
      "statusCode": 401,
      "error": "Unauthorized",
    }
    ```

  OR

  * **Code:** 404 NOT FOUND
    **Content:** 
    ```json
    {
        "statusCode": 404,
        "error": "Not Found",
        "message": "Client with id (id) not found"
    }
    ```

  OR

  * **Code:** 409 Conflict
    **Content:** 
    ``` json
    {
      "statusCode": 409,
      "error": "Client with email (email) alread exists",
    }
    ```

* **Sample Call:**

  ```
  curl -X PUT http://{endpoint}/clients/{id} \
    -H 'Authorization: {basi auth}' \
    -H 'Content-Type: application/json' \
    -d '{ "email": {email}, "name": {name} }'
  ```

**Delete a client**
----
  Delete a client.

* **URL**

  /clients/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[string]`

* **Data Params**

   None

* **Success Response:**

  * **Code:** 200
    **Content:** 
    ```json
    {
      "description": "Successfully deleted client"
    }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED
    **Content:** 
    ``` json
    {
      "statusCode": 401,
      "error": "Unauthorized",
    }
    ```

  OR

  * **Code:** 404 NOT FOUND
    **Content:** 
    ```json
    {
      "statusCode": 404,
      "error": "Not Found",
      "message": "Client with id (id) not found"
    }
    ```

* **Sample Call:**

  ```
  curl -X DELETE http://{endpoint}/clients/{id} -H 'Authorization: {basi auth}'
  ```

**Retrieve a client wishlist**
----
  Returns list of JSONs representing products of a client wishlist.

* **URL**

  /wishlists/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[string]`

*  **Query Params**

   **Optional:**
 
   `page=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200
    **Content:** 
    ```json
    {
      "meta": {
          "page": <current_page_number>,
          "size": <clients_list_size>
      },
      "records": [
          {
              "price": <price>,
              "image": <image_url>,
              "url": <url>,
              "id": <id>,
              "title": <title>
          }
      ]
    }
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND
    **Content:** 
    ```json
    {
      "statusCode": 404,
      "error": "Not Found",
      "message": "Wishlist not found for client (<id>)"
    }
    ```
  
  OR

  * **Code:** 401 UNAUTHORIZED
    **Content:** 
    ``` json
    {
      "statusCode": 401,
      "error": "Unauthorized",
    }
    ```

* **Sample Call:**

  ```
    curl -X GET http://{endpoint}/wishlists/{client_id} -H 'Authorization: {basic auth}'
  ```

**Add product to client wishlist**
----
  Add a new product to a client wishlist.

* **URL**

  /wishslists/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[string]`

* **Query Params**

   **Required:**
 
   `product=[string]`

* **Success Response:**

  * **Code:** 200
    **Content:**
    ```json
    {
      "description": "Product successfully added to wishlist"
    }
    ```
 
* **Error Response:**

  * **Code:** 409 Conflict
    **Content:** 
    ```json
    {
      "statusCode": 409,
      "error": "Conflict",
      "message": "Product (<id>) alread added to wishlist"
    }
    ```
  
  OR

  * **Code:** 404 NOT FOUND
    **Content:** 
    ```json
    {
      "statusCode": 404,
      "error": "Not Found",
      "message": "Client with id (id) not found"
    }
    ```

  OR

  * **Code:** 401 UNAUTHORIZED
    **Content:** 
    ``` json
    {
      "statusCode": 401,
      "error": "Unauthorized",
    }
    ```

* **Sample Call:**

  ```
  curl -X PUT http://<endpoint>/wishlists/<client_id>?product=<product-id> \
    -H 'Authorization: BASIC <basic auth>' \
    -H 'Content-Type: application/json'
  ```

**Remove a product from a client wishlist**
----
  Remove a product from a client wishlist.

* **URL**

  /wishlists/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[string]`

* **Query Params**

   **Required:**
 
   `product=[string]`

* **Success Response:**

  * **Code:** 200
    **Content:**
    ```json
    {
      "description": "Product successfully deleted from wishlist"
    }
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND
    **Content:** 
    ```json
    {
      "statusCode": 404,
      "error": "Not Found",
      "message": "Wishlist not found for client (<id>)"
    }
    ```

  OR

  * **Code:** 404 NOT FOUND
    **Content:** 
    ```json
    {
      "statusCode": 404,
      "error": "Not Found",
      "message": "Product not found in wishlist (<id>)"
    }
    ```

  OR

  * **Code:** 401 UNAUTHORIZED
    **Content:** 
    ``` json
    {
      "statusCode": 401,
      "error": "Unauthorized",
    }
    ```

* **Sample Call:**

  ```
  curl -X DELETE http://<endpoint>/wishlists/<client_id>?product=<product-id> \
    -H 'Authorization: BASIC <basic auth>' \
    -H 'Content-Type: application/json'
  ```
