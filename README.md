# Book Review Application

A server-side online book review application with secure REST API using JWT authentication and session management.

## 📋 Project Overview

This project implements a complete book review system with the following features:
- User registration and authentication
- JWT-based session management
- CRUD operations for book reviews
- REST API endpoints for public and authenticated users
- Async/Await and Promise-based operations

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js
- **Authentication**: JWT (JSON Web Tokens)
- **Session Management**: express-session
- **HTTP Client**: Axios
- **Development**: Nodemon

## 📁 Project Structure

```
expressBookReviews/
└── final_project/
    ├── index.js                 # Main server file
    ├── package.json            # Dependencies and scripts
    ├── router/
    │   ├── booksdb.js          # Book database
    │   ├── general.js          # Public user routes
    │   └── auth_users.js       # Authenticated user routes
    └── README.md               # This file
```

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/expressBookReviews.git
   cd expressBookReviews/final_project/
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Development mode**
   ```bash
   npm run dev
   ```

The server will run on `http://localhost:5000`

## 📚 API Endpoints

### Public Endpoints (No Authentication Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all books |
| GET | `/isbn/:isbn` | Get book by ISBN |
| GET | `/author/:author` | Get books by author |
| GET | `/title/:title` | Get books by title |
| GET | `/review/:isbn` | Get book reviews |
| POST | `/register` | Register new user |

### Authenticated Endpoints (Requires Login)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/customer/login` | User login |
| PUT | `/customer/auth/review/:isbn` | Add/modify book review |
| DELETE | `/customer/auth/review/:isbn` | Delete book review |

## 🔐 Authentication Flow

1. **Register**: Create a new user account with username and password
2. **Login**: Authenticate and receive JWT token
3. **Access Protected Routes**: Use JWT token in session for authenticated operations

## 💻 Usage Examples

### Register a new user
```bash
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "testpass"}'
```

### Login
```bash
curl -X POST http://localhost:5000/customer/login \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "testpass"}'
```

### Get all books
```bash
curl http://localhost:5000/
```

### Add a book review (requires authentication)
```bash
curl -X PUT "http://localhost:5000/customer/auth/review/1?review=Great book!" \
  -H "Content-Type: application/json" \
  --cookie "session_cookie_here"
```

## 🧪 Testing

The application can be tested using:
- **Postman**: Import the API collection and test all endpoints
- **cURL**: Use command-line tools for API testing
- **Browser**: Access GET endpoints directly

### Test Cases Covered

1. **Task 1**: Get all books
2. **Task 2**: Get book details by ISBN
3. **Task 3**: Get books by author
4. **Task 4**: Get books by title
5. **Task 5**: Get book reviews
6. **Task 6**: User registration
7. **Task 7**: User login
8. **Task 8**: Add/modify book review
9. **Task 9**: Delete book review
10. **Task 10-13**: Async/Await implementations

## 🔄 Async Operations

Tasks 10-13 implement the same functionality as Tasks 1-4 but using:
- **Promise callbacks** with Axios
- **Async/Await** functions
- **Error handling** for network operations

## 📝 Implementation Notes

### Authentication Mechanism
- Uses JWT tokens for secure authentication
- Session-based authorization for protected routes
- Username and password validation

### Data Storage
- In-memory book database (booksdb.js)
- User credentials stored in session
- Reviews linked to users and books

### Error Handling
- Comprehensive error messages
- Input validation
- Authentication checks
- Database operation errors

## 🐛 Common Issues & Solutions

1. **Port already in use**: Change PORT variable in index.js
2. **Module not found**: Run `npm install` to install dependencies
3. **Authentication failed**: Ensure proper login and session management
4. **CORS issues**: Add CORS middleware if needed for frontend integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- **Lavanya T S**
- **Sapthashree K S**
- **K Sundararajan**
- **IBM Corporation**

## 🎯 Learning Objectives Achieved

- ✅ Create APIs with CRUD operations
- ✅ Implement Session & JWT authentication
- ✅ Use Async/Await and Promises with Axios
- ✅ Create and test REST API endpoints
- ✅ Handle authentication and authorization
- ✅ Implement error handling and validation

---

**Note**: This project is part of the IBM Developer Skills Network course on building server-side applications with Node.js and Express.js.