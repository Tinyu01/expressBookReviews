const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
    // Check if username exists in users array
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    return userswithsamename.length > 0;
}

const authenticatedUser = (username, password) => {
    // Check if username and password match the one we have in records
    let validusers = users.filter((user) => {
        return (user.username === username && user.password === password);
    });
    return validusers.length > 0;
}

// Login and create JWT access token
regd_users.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    // Check if username or password is missing
    if (!username || !password) {
        return res.status(404).json({ message: "Error logging in" });
    }
    
    // Authenticate user
    if (authenticatedUser(username, password)) {
        // Generate JWT access token
        let accessToken = jwt.sign({
            data: password
        }, 'access', { expiresIn: 60 * 60 });
        
        // Store access token and username in session
        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).send("User successfully logged in");
    } else {
        return res.status(208).json({ message: "Invalid Login. Check username and password" });
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.query.review;
    const username = req.session.authorization?.username; // Optional chaining

    // Check if user is logged in
    if (!username) {
        return res.status(403).json({ message: "User not logged in" });
    }

    // Check if review is provided
    if (!review) {
        return res.status(400).json({ message: "Review text required" });
    }

    // Check if book exists
    if (books[isbn]) {
        if (!books[isbn].reviews) books[isbn].reviews = {}; // Initialize reviews
        books[isbn].reviews[username] = review;
        return res.status(200).send("Review successfully posted");
    } else {
        return res.status(404).json({ message: `ISBN ${isbn} not found` });
    }
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const username = req.session.authorization.username;
    
    if (books[isbn]) {
        if (books[isbn].reviews[username]) {
            delete books[isbn].reviews[username];
            return res.status(200).send("Review successfully deleted");
        } else {
            return res.status(404).json({message: "Review not found for this user"});
        }
    } else {
        return res.status(404).json({message: `ISBN ${isbn} not found`});
    }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
