const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

// Function to check if username is valid (exists in registered users)
const isValid = (username) => {
    return users.some(user => user.username === username);
}

// Function to authenticate user
const authenticatedUser = (username, password) => {
    const user = users.find(user => user.username === username && user.password === password);
    return user !== undefined;
}

// Task 7: Login as a registered user
regd_users.post("/login", (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Validate input
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }
        
        // Get registered users from general.js
        const general = require('./general.js');
        const registeredUsers = general.general.getRegisteredUsers();
        
        // Check if user exists in registered users
        const user = registeredUsers.find(u => u.username === username && u.password === password);
        
        if (user) {
            // Generate JWT token
            const accessToken = jwt.sign(
                { username: username },
                "access",
                { expiresIn: '1h' }
            );
            
            // Store token in session
            req.session.authorization = {
                accessToken: accessToken,
                username: username
            };
            
            // Also add to users array for compatibility
            if (!users.find(u => u.username === username)) {
                users.push({ username, password });
            }
            
            return res.status(200).json({ 
                message: "Login successful",
                token: accessToken,
                username: username
            });
        } else {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        
    } catch (error) {
        return res.status(500).json({ message: "Error during login", error: error.message });
    }
});

// Task 8: Add or modify a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    try {
        const isbn = req.params.isbn;
        const review = req.query.review;
        const username = req.session.authorization.username;
        
        // Validate input
        if (!review) {
            return res.status(400).json({ message: "Review text is required" });
        }
        
        // Check if book exists
        if (!books[isbn]) {
            return res.status(404).json({ message: "Book not found" });
        }
        
        // Add or modify review
        if (!books[isbn].reviews) {
            books[isbn].reviews = {};
        }
        
        // Check if user already has a review for this book
        const existingReview = books[isbn].reviews[username];
        
        books[isbn].reviews[username] = review;
        
        const message = existingReview ? 
            "Review modified successfully" : 
            "Review added successfully";
        
        return res.status(200).json({ 
            message: message,
            isbn: isbn,
            username: username,
            review: review
        });
        
    } catch (error) {
        return res.status(500).json({ message: "Error adding/modifying review", error: error.message });
    }
});

// Task 9: Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    console.log("DELETE /auth/review hit"); // Debug log
    try {
        const isbn = req.params.isbn;
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            console.log("No token provided");
            return res.status(403).json({ message: "Authorization token required" });
        }

        const decoded = jwt.verify(token, "access");
        const username = decoded.username;
        console.log(`User ${username} deleting review for ISBN ${isbn}`); // Debug log

        if (!books[isbn]) {
            console.log(`Book ${isbn} not found`);
            return res.status(404).json({ message: "Book not found" });
        }

        if (!books[isbn].reviews?.[username]) {
            console.log(`No review found for user ${username}`);
            return res.status(404).json({ message: "No review found for this user" });
        }

        delete books[isbn].reviews[username];
        console.log("Review deleted successfully"); // Debug log
        return res.status(200).json({ message: "Review deleted successfully" });

    } catch (error) {
        console.error("DELETE error:", error.message); // Debug log
        return res.status(500).json({ message: "Error deleting review", error: error.message });
    }
});

// Get user's own reviews
regd_users.get("/auth/reviews", (req, res) => {
    try {
        const username = req.session.authorization.username;
        const userReviews = {};
        
        // Find all reviews by this user
        Object.keys(books).forEach(isbn => {
            if (books[isbn].reviews && books[isbn].reviews[username]) {
                userReviews[isbn] = {
                    title: books[isbn].title,
                    author: books[isbn].author,
                    review: books[isbn].reviews[username]
                };
            }
        });
        
        return res.status(200).json({
            message: "User reviews retrieved successfully",
            username: username,
            reviews: userReviews
        });
        
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving user reviews", error: error.message });
    }
});

// Logout user
regd_users.delete("/auth/logout", (req, res) => {
    try {
        if (req.session.authorization) {
            const username = req.session.authorization.username;
            
            // Clear session
            req.session.destroy((err) => {
                if (err) {
                    return res.status(500).json({ message: "Error during logout" });
                }
                
                return res.status(200).json({ 
                    message: "Logout successful",
                    username: username 
                });
            });
        } else {
            return res.status(400).json({ message: "No active session found" });
        }
        
    } catch (error) {
        return res.status(500).json({ message: "Error during logout", error: error.message });
    }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;