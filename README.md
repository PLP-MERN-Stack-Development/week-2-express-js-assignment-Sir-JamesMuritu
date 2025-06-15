[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19707642&assignment_repo_type=AssignmentRepo)
# Express.js RESTful API Assignment

This assignment focuses on building a RESTful API using Express.js, implementing proper routing, middleware, and error handling.

## Assignment Overview

You will:
1. Set up an Express.js server
2. Create RESTful API routes for a product resource
3. Implement custom middleware for logging, authentication, and validation
4. Add comprehensive error handling
5. Develop advanced features like filtering, pagination, and search

# Product API – Express.js Assignment

## Overview
A RESTful API for managing products, built with Express.js and MongoDB. Supports CRUD operations, filtering, pagination, search, authentication, logging, and error handling.

## Getting Started

### Prerequisites
- Node.js v18 or higher
- npm or pnpm
- MongoDB running locally or a MongoDB URI

### Installation
1. Clone your repository:
   ```bash
   git clone <your-repo-url>
   cd week-2-express-js-assignment-<your-username>
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```
3. Copy `.env.example` to `.env` and set your API key:
   ```bash
   cp .env.example .env
   # Edit .env and set API_KEY to a secure random string
   ```
   To generate a secure API key, run:
   ```bash
   head -c 32 /dev/urandom | base64
   ```
   Paste the output as your API_KEY in `.env`.
4. (Optional) Seed the database with sample products:
   ```bash
   node seed.js
   ```
5. Start the server:
   ```bash
   npm start
   # or
   node server.js
   ```

## Environment Variables
- `API_KEY`: Your API key for authentication (required in request headers as `x-api-key`)
- `PORT`: Port to run the server (default: 3000)
- `MONGODB_URI`: MongoDB connection string (default: `mongodb://localhost:27017/products`)

## API Endpoints

### Authentication
All protected routes require an `x-api-key` header with the correct API key.

### Product Routes
- `GET /api/products` – List all products (supports `category`, `page`, `limit` query params)
- `GET /api/products/:id` – Get a product by ID
- `POST /api/products` – Create a new product *(protected, validation required)*
- `PUT /api/products/:id` – Update a product *(protected, validation required)*
- `DELETE /api/products/:id` – Delete a product *(protected)*
- `GET /api/products/search?name=foo` – Search products by name
- `GET /api/products/stats` – Get product statistics by category

### Query Parameters
- `category` (string): Filter products by category
- `page` (number): Page number for pagination (default: 1)
- `limit` (number): Items per page (default: 10)
- `name` (string): Search by product name (for `/search` endpoint)

### Example Requests
#### Get all products
```bash
curl http://localhost:3000/api/products
```
#### Create a product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "x-api-key: <your_api_key>" \
  -d '{"name":"Tablet","description":"10-inch tablet","price":300,"category":"electronics","inStock":true}'
```
#### Search products
```bash
curl http://localhost:3000/api/products/search?name=coffee
```
#### Delete a product
```bash
curl -X DELETE http://localhost:3000/api/products/<product_id> \
  -H "x-api-key: <your_api_key>"
```

## Error Handling
- Returns JSON error responses with appropriate HTTP status codes.
- If you see `{ "error": "Unauthorized: Invalid or missing API key" }`, ensure you are sending the correct `x-api-key` header matching your `.env` file.

## Logging
- All requests are logged with method, URL, and timestamp.

## License
MIT