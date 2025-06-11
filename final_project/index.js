const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

// Middleware
app.use(express.json());

// Session middleware for customer routes
app.use("/customer", session({
    secret: "fingerprint_customer",
    resave: true, 
    saveUninitialized: true,
    cookie: { secure: false } // Set to true in production with HTTPS
}));

// Authentication middleware for protected routes
app.use("/customer/auth/*", function auth(req, res, next) {
    // Check if user is logged in and has valid session
    if (req.session.authorization) {
        const token = req.session.authorization['accessToken'];
        
        // Verify JWT token
        jwt.verify(token, "access", (err, user) => {
            if (!err) {
                req.user = user;
                next(); // Proceed to the next middleware
            } else {
                return res.status(403).json({ message: "User not authenticated" });
            }
        });
    } else {
        return res.status(403).json({ message: "User not logged in" });
    }
});

const PORT = 5000;

// Route handlers
app.use("/customer", customer_routes);
app.use("/", genl_routes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Access the application at: http://localhost:${PORT}`);
});