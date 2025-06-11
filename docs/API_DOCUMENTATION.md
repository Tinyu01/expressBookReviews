# API Documentation - Book Review Application

## Base URL
```
http://localhost:5000
```

## Authentication
The API uses JWT (JSON Web Tokens) for authentication. Protected routes require a valid JWT token in the session.

## Public Endpoints

### 1. Get All Books
Retrieves a list of all available books in the shop.

**Endpoint:** `GET /`

**Response:**
```json
{
  "message": "Books retrieved successfully",
  "books": "JSON string of all books"
}
```

**Status Codes:**
- `200 OK` - Success
- `500 Internal Server Error` - Server error

---

### 2. Get Book by ISBN
Retrieves details of a specific book using its ISBN.

**Endpoint:** `GET /isbn/:isbn`

**Parameters:**
- `isbn` (string) - The ISBN of the book

**Response:**
```json
{
  "message": "Book retrieved successfully",
  "book": {
    "author": "Author Name",
    "title": "Book Title",
    "reviews": {}
  }
}
```

**Status Codes:**
- `200 OK` - Book found
- `404 Not Found` - Book not found
- `500 Internal Server Error` - Server error

---

### 3. Get Books by Author
Retrieves all books by a specific author.

**Endpoint:** `GET /author/:author`

**Parameters:**
- `author` (string) - The author's name (case-insensitive, partial match)

**Response:**
```json
{
  "message": "Books by author retrieved successfully",
  "books": {
    "isbn": {
      "author": "Author Name",
      "title": "Book Title",
      "reviews": {}
    }
  }
}
```

**Status Codes:**
- `200 OK` - Books found
- `404 Not Found` - No books found by this author
- `500 Internal Server Error` - Server error

---

### 4. Get Books by Title
Retrieves all books matching a specific title.

**Endpoint:** `GET /title/:title`

**Parameters:**
- `title` (string) - The book title (case-insensitive, partial match)

**Response:**
```json
{
  "message": "Books by title retrieved successfully",
  "books": {
    "isbn": {
      "author": "Author Name",
      "title": "Book Title",
      "reviews": {}
    }
  }
}
```

**Status Codes:**
- `200 OK` - Books found
- `404 Not Found` - No books found with this title
- `500 Internal Server Error` - Server error

---

### 5. Get Book Reviews
Retrieves all reviews for a specific book.

**Endpoint:** `GET /review/:isbn`

**Parameters:**
- `isbn` (string) - The ISBN of the book

**Response:**
```json
{
  "message": "Book reviews retrieved successfully",
  "isbn": "1",
  "reviews": {
    "username1": "Review text 1",
    "username2": "Review text 2"
  }
}
```

**Status Codes:**
- `200 OK` - Reviews retrieved
- `404 Not Found` - Book not found
- `500 Internal Server Error` - Server error

---

### 6. Register User
Registers a new user account.

**Endpoint:** `POST /register`

**Request Body:**
```json
{
  "username": "string (min 3 characters)",
  "password": "string (min 6 characters)"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "username": "registered_username"
}
```

**Status Codes:**
- `201 Created` - User registered successfully
- `400 Bad Request` - Invalid input (missing username/password or too short)
- `409 Conflict` - User already exists
- `500 Internal Server Error` - Server error

---

## Authenticated Endpoints

### 7. User Login
Authenticates a user and returns a JWT token.

**Endpoint:** `POST /customer/login`

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt_token_string",
  "username": "username"
}
```

**Status Codes:**
- `200 OK` - Login successful
- `400 Bad Request` - Missing username or password
- `401 Unauthorized` - Invalid credentials
- `500 Internal Server Error` - Server error

---

### 8. Add/Modify Book Review
Adds a new review or modifies an existing review for a book. Requires authentication.

**Endpoint:** `PUT /customer/auth/review/:isbn`

**Parameters:**
- `isbn` (string) - The ISBN of the book

**Query Parameters:**
- `review` (string) - The review text

**Headers:**
- Session cookie (automatically handled after login)

**Response:**
```json
{
  "message": "Review added successfully", // or "Review modified successfully"
  "isbn": "1",
  "username": "username",
  "review": "Review text"
}
```

**Status Codes:**
- `200 OK` - Review added/modified successfully
- `400 Bad Request` - Missing review text
- `403 Forbidden` - User not authenticated
- `404 Not Found` - Book not found
- `500 Internal Server Error` - Server error

---

### 9. Delete Book Review
Deletes a user's review for a specific book. Requires authentication.

**Endpoint:** `DELETE /customer/auth/review/:isbn`

**Parameters:**
- `isbn` (string) - The ISBN of the book

**Headers:**
- Session cookie (automatically handled after login)

**Response:**
```json
{
  "message": "Review deleted successfully",
  "isbn": "1",
  "username": "username"
}
```

**Status Codes:**
- `200 OK` - Review deleted successfully
- `403 Forbidden` - User not authenticated
- `404 Not Found` - Book not found or no review found for this user
- `500 Internal Server Error` - Server error

---

### 10. Get User's Reviews
Retrieves all reviews made by the authenticated user.

**Endpoint:** `GET /customer/auth/reviews`

**Headers:**
- Session cookie (automatically handled after login)

**Response:**
```json
{
  "message": "User reviews retrieved successfully",
  "username": "username",
  "reviews": {
    "isbn": {
      "title": "Book Title",
      "author": "Author Name",
      "review": "User's review"
    }
  }
}
```

**Status Codes:**
- `200 OK` - Reviews retrieved successfully
- `403 Forbidden` - User not authenticated
- `500 Internal Server Error` - Server error

---

### 11. User Logout
Logs out the authenticated user and destroys the session.

**Endpoint:** `DELETE /customer/auth/logout`

**Headers:**
- Session cookie (automatically handled after login)

**Response:**
```json
{
  "message": "Logout successful",
  "username": "username"
}
```

**Status Codes:**
- `200 OK` - Logout successful
- `400 Bad Request` - No active session found
- `500 Internal Server Error` - Server error

---

## Async/Await Endpoints

These endpoints provide the same functionality as the public endpoints but use async/await operations:

### 12. Get All Books (Async)
**Endpoint:** `GET /async/books`

### 13. Get Book by ISBN (Async)
**Endpoint:** `GET /async/isbn/:isbn`

### 14. Get Books by Author (Async)
**Endpoint:** `GET /async/author/:author`

### 15. Get Books by Title (Async)
**Endpoint:** `GET /async/title/:title`

---

## Error Responses

All endpoints may return error responses in the following format:

```json
{
  "message": "Error description",
  "error": "Detailed error message (in development mode)"
}
```

## Authentication Flow

1. **Register** a new user account using `/register`
2. **Login** using `/customer/login` to receive a JWT token and establish a session
3. **Access protected endpoints** using the session (cookies are automatically handled)
4. **Logout** using `/customer/auth/logout` to destroy the session

## Rate Limiting

Currently, no rate limiting is implemented. In production, consider implementing rate limiting for security.

## CORS

CORS is not configured. If accessing from a web frontend, add CORS middleware to the Express application.

## Security Considerations

- JWT tokens expire after 1 hour
- Passwords are stored in plain text (not recommended for production)
- Session secrets should be environment variables in production
- HTTPS should be used in production
- Input validation and sanitization should be enhanced
- Consider implementing password hashing (bcrypt)
- Add request logging and monitoring

## Data Models

### Book Object
```javascript
{
  "author": "string",
  "title": "string", 
  "reviews": {
    "username": "review_text"
  }
}
```

### User Object
```javascript
{
  "username": "string",
  "password": "string"
}
```

### Session Object
```javascript
{
  "authorization": {
    "accessToken": "jwt_token",
    "username": "username"
  }
}
```