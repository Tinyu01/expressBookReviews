const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const jwt = require('jsonwebtoken');
const JWT_SECRET = "your_secret_key"; // Replace with your actual secret

// User registration storage
let registered_users = [];

// Check if user exists
const doesExist = (username) => {
    return registered_users.some(user => user.username === username);
}

// Task 1: Get all books available in the shop
public_users.get('/', function (req, res) {
    try {
        return res.status(200).json({
            message: "Books retrieved successfully",
            books: JSON.stringify(books, null, 2)
        });
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving books", error: error.message });
    }
});

// Task 2: Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    try {
        const isbn = req.params.isbn;
        const book = books[isbn];
        
        if (book) {
            return res.status(200).json({
                message: "Book retrieved successfully",
                book: book
            });
        } else {
            return res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving book", error: error.message });
    }
});

// Task 3: Get book details based on author
public_users.get('/author/:author', function (req, res) {
    try {
        const author = req.params.author.toLowerCase();
        const bookKeys = Object.keys(books);
        const authorBooks = {};
        
        bookKeys.forEach(key => {
            if (books[key].author.toLowerCase().includes(author)) {
                authorBooks[key] = books[key];
            }
        });
        
        if (Object.keys(authorBooks).length > 0) {
            return res.status(200).json({
                message: "Books by author retrieved successfully",
                books: authorBooks
            });
        } else {
            return res.status(404).json({ message: "No books found by this author" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving books by author", error: error.message });
    }
});

// Task 4: Get book details based on title
public_users.get('/title/:title', function (req, res) {
    try {
        const title = req.params.title.toLowerCase();
        const bookKeys = Object.keys(books);
        const titleBooks = {};
        
        bookKeys.forEach(key => {
            if (books[key].title.toLowerCase().includes(title)) {
                titleBooks[key] = books[key];
            }
        });
        
        if (Object.keys(titleBooks).length > 0) {
            return res.status(200).json({
                message: "Books by title retrieved successfully",
                books: titleBooks
            });
        } else {
            return res.status(404).json({ message: "No books found with this title" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving books by title", error: error.message });
    }
});

// Task 5: Get book review
public_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review;
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(403).json({ message: "Authorization token required" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const username = decoded.username;

    if (!books[isbn]) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (!books[isbn].reviews) {
      books[isbn].reviews = {};
    }

    books[isbn].reviews[username] = review;
    return res.status(200).json({ message: "Review posted successfully" });
    
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
});

// Task 6: Register a new user
public_users.post("/register", (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Validate input
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }
        
        if (username.length < 3) {
            return res.status(400).json({ message: "Username must be at least 3 characters long" });
        }
        
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        
        // Check if user already exists
        if (doesExist(username)) {
            return res.status(409).json({ message: "User already exists" });
        }
        
        // Register new user
        registered_users.push({ username, password });
        
        return res.status(201).json({ 
            message: "User registered successfully",
            username: username 
        });
        
    } catch (error) {
        return res.status(500).json({ message: "Error registering user", error: error.message });
    }
});

// Task 10: Get all books using async/await with Axios
public_users.get('/async/books', async (req, res) => {
    try {
        // Simulate API call to get books
        const response = await new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: {
                        message: "Books retrieved successfully using async/await",
                        books: books
                    }
                });
            }, 100);
        });
        
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving books with async/await", error: error.message });
    }
});

// Task 11: Get book by ISBN using async/await with Axios
public_users.get('/async/isbn/:isbn', async (req, res) => {
    try {
        const isbn = req.params.isbn;
        
        const response = await new Promise((resolve, reject) => {
            setTimeout(() => {
                const book = books[isbn];
                if (book) {
                    resolve({
                        data: {
                            message: "Book retrieved successfully using async/await",
                            book: book
                        }
                    });
                } else {
                    reject(new Error("Book not found"));
                }
            }, 100);
        });
        
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
});

// Task 12: Get books by author using async/await with Axios
public_users.get('/async/author/:author', async (req, res) => {
    try {
        const author = req.params.author.toLowerCase();
        
        const response = await new Promise((resolve, reject) => {
            setTimeout(() => {
                const bookKeys = Object.keys(books);
                const authorBooks = {};
                
                bookKeys.forEach(key => {
                    if (books[key].author.toLowerCase().includes(author)) {
                        authorBooks[key] = books[key];
                    }
                });
                
                if (Object.keys(authorBooks).length > 0) {
                    resolve({
                        data: {
                            message: "Books by author retrieved successfully using async/await",
                            books: authorBooks
                        }
                    });
                } else {
                    reject(new Error("No books found by this author"));
                }
            }, 100);
        });
        
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
});

// Task 13: Get books by title using async/await with Axios
public_users.get('/async/title/:title', async (req, res) => {
    try {
        const title = req.params.title.toLowerCase();
        
        const response = await new Promise((resolve, reject) => {
            setTimeout(() => {
                const bookKeys = Object.keys(books);
                const titleBooks = {};
                
                bookKeys.forEach(key => {
                    if (books[key].title.toLowerCase().includes(title)) {
                        titleBooks[key] = books[key];
                    }
                });
                
                if (Object.keys(titleBooks).length > 0) {
                    resolve({
                        data: {
                            message: "Books by title retrieved successfully using async/await",
                            books: titleBooks
                        }
                    });
                } else {
                    reject(new Error("No books found with this title"));
                }
            }, 100);
        });
        
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
});

// Export registered users for use in auth_users.js
public_users.getRegisteredUsers = () => registered_users;

module.exports.general = public_users;