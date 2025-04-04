# E-Commerce Application Documentation

## Overview
This is a Node.js-based e-commerce application that provides functionality for managing customers, products, carts, and admin operations. It uses PostgreSQL as the database and Sequelize as the ORM.

---

## Features
- **Customer Management**: Register, login, and view customer profiles.
- **Product Management**: CRUD operations for products.
- **Cart Management**: Add, remove, and checkout cart items.
- **Admin Management**: Admin registration and login.
- **Authentication**: JWT-based authentication for customers and admins.

---

## Project Structure
```
e-commerce/
├── config/         # Database configuration
├── controllers/    # Business logic for routes
├── middlewares/    # Authentication and validation middlewares
├── models/         # Sequelize models
├── routes/         # API routes
├── utils/          # Utility functions
├── test/           # HTTP test files
├── .env            # Environment variables
├── index.js        # Application entry point
```

---

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd e-commerce
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the `.env` file:
   ```properties
   DB_USER=your_db_user
   DB_HOST=your_host(localhost for local setup)
   DB_NAME=your_db_name
   DB_PASSWORD=your_db_password
   DB_PORT=5432
   JWT_SECRET_KEY=your_jwt_secret
   ADMIN_JWT_SECRET_KEY=your_admin_jwt_secret
   ```

4. Run the application:
   ```bash
   npm start
   ```

---

## API Endpoints

### Customers
- **POST** `/customers/register` - Register a new customer.
- **POST** `/customers/login` - Login as a customer.
- **GET** `/customers/profile` - View customer profile (requires authentication).

### Products
- **GET** `/products` - Get all products.
- **GET** `/products/:id` - Get product by ID.
- **POST** `/products` - Add a new product (admin only).
- **PUT** `/products/:id` - Update a product (admin only).
- **DELETE** `/products/:id` - Delete a product (admin only).

### Cart
- **GET** `/cart` - Get cart items for a customer.
- **POST** `/cart` - Add an item to the cart.
- **DELETE** `/cart/:id` - Remove an item from the cart.
- **POST** `/cart/checkout` - Checkout the cart.

### Admin
- **POST** `/admin/register/super-secure-endpoint` - Register a new admin.
- **POST** `/admin/login` - Login as an admin.

---

## Testing
Use the provided HTTP test file to test the API endpoints:
```bash
test/index.http
```

---

## Dependencies
- **Express**: Web framework.
- **Sequelize**: ORM for PostgreSQL.
- **JWT**: Authentication.
- **Bcrypt**: Password hashing.

---

## License
This project is licensed under the MIT License.
