# UDTN-Assessment-API

A NestJS application for managing products with user authentication and role-based access control.

## Description

This project is a RESTful API built with NestJS that allows users to manage products. It includes features for user registration, login, and role-based access control, ensuring that only authorized users can perform certain actions (e.g., creating, updating, or deleting products). The application uses MongoDB for data storage and implements JWT for secure authentication.

## Deployed API

You can try out the API with a deployed database at the following link: [API Documentation and Testing](https://udtn-assessment.vercel.app/swagger). This Swagger UI allows you to explore the available endpoints and test them directly.

## Setup Instructions

To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Mahmoud3mmar/udtn-assessment.gitme.git
   cd udtn-assessment
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following variables. You can check the `.env.example` file for reference:
   ```plaintext
   port=3000
   JWT_SECRET=your_jwt_secret
   MONGODB_URI=mongodb://localhost:27017/your-database
   JWT_EXPIRATION=3600
   ```

4. **Run the application:**
   ```bash
   npm run start
   ```

## How to Run the Tests

To run the tests for the application, use the following command:
```bash
npm run test
```

This will execute all unit tests defined in the project, ensuring that the application behaves as expected.

## Example API Usage

### User Registration

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "user"
}
```

**Response:**
```json
{
  "message": "User successfully registered"
}
```

### User Login

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "your_jwt_token"
}
```

### Product Endpoints

1. **Create a Product**
   - **Endpoint:** `POST /products`
   - **Description:** Creates a new product (Admin only).
   - **Request Body:**
     ```json
     {
       "name": "iPhone 14",
       "description": "Latest Apple smartphone",
       "price": 999.99,
       "stock": 100
     }
     ```
   - **Response:**
     ```json
     {
       "_id": "507f1f77bcf86cd799439011",
       "name": "iPhone 14",
       "description": "Latest Apple smartphone",
       "price": 999.99,
       "stock": 100
     }
     ```

2. **Get All Products**
   - **Endpoint:** `GET /products`
   - **Description:** Retrieves all products with optional pagination and sorting.
   - **Query Parameters:**
     - `page`: (optional) Page number for pagination (default is 1).
     - `limit`: (optional) Number of items per page (default is 10).
     - `sortBy`: (optional) Field to sort by (default is "name").
     - `order`: (optional) Order of sorting (default is "asc").
   - **Response:**
     ```json
     {
       "products": [
         {
           "_id": "507f1f77bcf86cd799439011",
           "name": "iPhone 14",
           "description": "Latest Apple smartphone",
           "price": 999.99,
           "stock": 100
         }
       ],
       "totalItems": 1,
       "totalPages": 1
     }
     ```

3. **Get a Product by ID**
   - **Endpoint:** `GET /products/:id`
   - **Description:** Retrieves a single product by its ID.
   - **Response:**
     ```json
     {
       "_id": "507f1f77bcf86cd799439011",
       "name": "iPhone 14",
       "description": "Latest Apple smartphone",
       "price": 999.99,
       "stock": 100
     }
     ```

4. **Update a Product**
   - **Endpoint:** `PUT /products/:id`
   - **Description:** Updates a product by its ID (Admin only).
   - **Request Body:**
     ```json
     {
       "name": "iPhone 14 Pro",
       "description": "Latest Apple smartphone with advanced features",
       "price": 1099.99,
       "stock": 50
     }
     ```
   - **Response:**
     ```json
     {
       "_id": "507f1f77bcf86cd799439011",
       "name": "iPhone 14 Pro",
       "description": "Latest Apple smartphone with advanced features",
       "price": 1099.99,
       "stock": 50
     }
     ```

5. **Delete a Product**
   - **Endpoint:** `DELETE /products/:id`
   - **Description:** Deletes a product by its ID (Admin only).
   - **Response:**
     ```json
     {
       "message": "Product successfully deleted"
     }
     ```

## License

This project is licensed under the MIT License.