// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const itemRoutes = require('./routes/itemRoutes');
app.use('/api', itemRoutes);

// Port configuration
const port = process.env.PORT || 8000;

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});