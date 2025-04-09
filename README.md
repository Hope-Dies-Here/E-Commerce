# E-Commerce Project

## Overview
This project is an e-commerce platform designed to provide a seamless shopping experience for users. It includes features such as product browsing, a shopping cart, and secure checkout. The backend is powered by Node.js and Supabase, while the frontend uses EJS templates and TailwindCSS for styling.

---

## Features
- User authentication and authorization
- Product catalog with search and filtering
- Shopping cart functionality
- Order management
- Admin panel for product management
- Visual representation via EJS rendering

---

## Tech Stack
- **Backend**: Node.js, Express.js
- **Frontend**: EJS, TailwindCSS
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: JSON Web Tokens (JWT)

---

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd e-commerce
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Configure the `.env` file:
   ```properties
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   JWT_SECRET_KEY=your_jwt_secret
   ADMIN_JWT_SECRET_KEY=your_admin_jwt_secret
   ```
5. Start the development server:
   ```bash
   npm start
   ```

---

## Usage
1. Open your browser and navigate to:
   - `http://localhost:3000/api/...` for API endpoints.
   - `http://localhost:3000/visual` for visual representation via EJS.

---

## Testing
Use the `.bru` HTTP test files located in the `e co/` directory to test API endpoints. These files can be executed using tools like [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client).

---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## Documentation
For detailed documentation, refer to [DOC.md](DOC.md).

---
