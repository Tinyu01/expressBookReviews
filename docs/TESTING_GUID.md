# Testing Guide for Book Review Application

This guide provides comprehensive testing instructions for all API endpoints using both Postman and cURL commands.

## Prerequisites

1. **Start the server**:
   ```bash
   npm start
   ```
   Server will run on `http://localhost:5000`

2. **Install Postman** (recommended) or use cURL commands

## Test Cases Overview

### Task 1: Get All Books
- **Endpoint**: `GET /`
- **Expected**: List of all books in JSON format

### Task 2: Get Book Details by ISBN
- **Endpoint**: `GET /isbn/:isbn`
- **Expected**: Specific book details

### Task 3: Get Books by Author
- **Endpoint**: `GET /author/:author`
- **Expected**: Books by specified author

### Task 4: Get Books by Title
- **Endpoint**: `GET /title/:title`
- **Expected**: Books with matching title

### Task 5: Get Book Reviews
- **Endpoint**: `GET /review/:isbn`
- **Expected**: Reviews for specified book

### Task 6: Register New User
- **Endpoint**: `POST /register`
- **Expected**: User registration confirmation

### Task 7: User Login
- **Endpoint**: `POST /customer/login`
- **Expected**: JWT token and login confirmation

### Task 8: Add/Modify Book Review (Authenticated)
- **Endpoint**: `PUT /customer/auth/review/:isbn?review=text`
- **Expected**: Review added/modified confirmation

### Task 9: Delete Book Review (Authenticated)
- **Endpoint**: `DELETE /customer/auth/review/:isbn`
- **Expected**: Review deletion confirmation

## Detailed Testing Instructions

## 1. Task 1: Get All Books

### Using Postman:
1. Method: `GET`
2. URL: `http://localhost:5000/`
3. Click "Send"
4. **Screenshot**: Save as `1-getallbooks.png`

### Using cURL:
```bash
curl -X GET http://localhost:5000/
```

**Expected Response:**
```json
{
  "message": "Books retrieved successfully",
  "books": "{\n  \"1\": {\n    \"author\": \"Chinua Achebe\",\n    \"title\": \"Things Fall Apart\",\n    \"reviews\": {}\n  },\n  ...\n}"
}
```

## 2. Task 2: Get Book Details by ISBN

### Using Postman:
1. Method: `GET`
2. URL: `http://localhost:5000/isbn/1`
3. Click "Send"
4. **Screenshot**: Save as `2-getdetailsISBN.png`

### Using cURL:
```bash
curl -X GET http://localhost:5000/isbn/1
```

**Expected Response:**
```json
{
  "message": "Book retrieved successfully",
  "book": {
    "author": "Chinua Achebe",
    "title": "Things Fall Apart",
    "reviews": {}
  }
}
```

## 3. Task 3: Get Books by Author

### Using Postman:
1. Method: `GET`
2. URL: `http://localhost:5000/author/Jane%20Austen`
3. Click "Send"
4. **Screenshot**: Save as `3-getbooksbyauthor.png`

### Using cURL:
```bash
curl -X GET "http://localhost:5000/author/Jane%20Austen"
```

**Expected Response:**
```json
{
  "message": "Books by author retrieved successfully",
  "books": {
    "8": {
      "author": "Jane Austen",
      "title": "Pride and Prejudice",
      "reviews": {}
    }
  }
}
```

## 4. Task 4: Get Books by Title

### Using Postman:
1. Method: `GET`
2. URL: `http://localhost:5000/title/Pride`
3. Click "Send"
4. **Screenshot**: Save as `4-getbooksbytitle.png`

### Using cURL:
```bash
curl -X GET http://localhost:5000/title/Pride
```

**Expected Response:**
```json
{
  "message": "Books by title retrieved successfully",
  "books": {
    "8": {
      "author": "Jane Austen",
      "title": "Pride and Prejudice",
      "reviews": {}
    }
  }
}
```

## 5. Task 5: Get Book Reviews

### Using Postman:
1. Method: `GET`
2. URL: `http://localhost:5000/review/1`
3. Click "Send"
4. **Screenshot**: Save as `5-getbookreview.png`

### Using cURL:
```bash
curl -X GET http://localhost:5000/review/1
```

**Expected Response:**
```json
{
  "message": "Book reviews retrieved successfully",
  "isbn": "1",
  "reviews": {}
}
```

## 6. Task 6: Register New User

### Using Postman:
1. Method: `POST`
2. URL: `http://localhost:5000/register`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
   ```json
   {
     "username": "testuser",
     "password": "testpass123"
   }
   ```
5. Click "Send"
6. **Screenshot**: Save as `6-register.png`

### Using cURL:
```bash
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "testpass123"}'
```

**Expected Response:**
```json
{
  "message": "User registered successfully",
  "username": "testuser"
}
```

## 7. Task 7: User Login

### Using Postman:
1. Method: `POST`
2. URL: `http://localhost:5000/customer/login`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
   ```json
   {
     "username": "testuser",
     "password": "testpass123"
   }
   ```
5. Click "Send"
6. **Important**: Save the session cookies for authenticated requests
7. **Screenshot**: Save as `7-login.png`

### Using cURL:
```bash
curl -X POST http://localhost:5000/customer/login \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "testpass123"}' \
  -c cookies.txt
```

**Expected Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "testuser"
}
```

## 8. Task 8: Add/Modify Book Review (Authenticated)

### Using Postman:
1. Method: `PUT`
2. URL: `http://localhost:5000/customer/auth/review/1?review=This%20is%20a%20great%20book!`
3. **Important**: Make sure to use the session from login (cookies should be automatically included)
4. Click "Send"
5. **Screenshot**: Save as `8-reviewadded.png`

### Using cURL:
```bash
curl -X PUT "http://localhost:5000/customer/auth/review/1?review=This%20is%20a%20great%20book!" \
  -b cookies.txt
```

**Expected Response:**
```json
{
  "message": "Review added successfully",
  "isbn": "1",
  "username": "testuser",
  "review": "This is a great book!"
}
```

## 9. Task 9: Delete Book Review (Authenticated)

### Using Postman:
1. Method: `DELETE`
2. URL: `http://localhost:5000/customer/auth/review/1`
3. Make sure session is active
4. Click "Send"
5. **Screenshot**: Save as `9-deletereview.png`

### Using cURL:
```bash
curl -X DELETE http://localhost:5000/customer/auth/review/1 \
  -b cookies.txt
```

**Expected Response:**
```json
{
  "message": "Review deleted successfully",
  "isbn": "1",
  "username": "testuser"
}
```

## Tasks 10-13: Async/Await Testing

These endpoints use async/await functionality and can be tested similarly:

### Task 10: Get All Books (Async)
```bash
curl -X GET http://localhost:5000/async/books
```
**Screenshot**: Save code implementation as `task10.png`

### Task 11: Get Book by ISBN (Async)
```bash
curl -X GET http://localhost:5000/async/isbn/1
```
**Screenshot**: Save code implementation as `task11.png`

### Task 12: Get Books by Author (Async)
```bash
curl -X GET "http://localhost:5000/async/author/Jane%20Austen"
```
**Screenshot**: Save code implementation as `task12.png`

### Task 13: Get Books by Title (Async)
```bash
curl -X GET http://localhost:5000/async/title/Pride
```
**Screenshot**: Save code implementation as `task13.png`

## Additional Testing Endpoints

### Get User's Own Reviews
```bash
curl -X GET http://localhost:5000/customer/auth/reviews \
  -b cookies.txt
```

### User Logout
```bash
curl -X DELETE http://localhost:5000/customer/auth/logout \
  -b cookies.txt
```

## Error Testing Scenarios

### Test Invalid ISBN
```bash
curl -X GET http://localhost:5000/isbn/999
```

### Test Duplicate User Registration
```bash
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "testpass123"}'
```

### Test Invalid Login
```bash
curl -X POST http://localhost:5000/customer/login \
  -H "Content-Type: application/json" \
  -d '{"username": "wronguser", "password": "wrongpass"}'
```

### Test Unauthorized Access
```bash
curl -X PUT http://localhost:5000/customer/auth/review/1?review=test
# This should fail without proper authentication
```

## Troubleshooting

1. **Server not starting**: Check if port 5000 is available
2. **Authentication issues**: Ensure you're logged in and session is active
3. **Module not found**: Run `npm install` to install dependencies
4. **CORS issues**: Add CORS middleware if testing from browser
5. **Session problems**: Clear browser cookies and re-login

## Screenshots Required for Peer Review

Save the following screenshots in order:
1. `1-getallbooks.png` - Task 1 result
2. `2-getdetailsISBN.png` - Task 2 result
3. `3-getbooksbyauthor.png` - Task 3 result
4. `4-getbooksbytitle.png` - Task 4 result
5. `5-getbookreview.png` - Task 5 result
6. `6-register.png` - Task 6 result
7. `7-login.png` - Task 7 result
8. `8-reviewadded.png` - Task 8 result
9. `9-deletereview.png` - Task 9 result
10. `task10.png` - Task 10 code implementation
11. `task11.png` - Task 11 code implementation
12. `task12.png` - Task 12 code implementation
13. `task13.png` - Task 13 code implementation

## Final Notes

- Always test in sequence (register → login → authenticated operations)
- Keep session active during authenticated requests
- Verify all responses match expected format
- Document any errors encountered during testing