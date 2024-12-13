// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// server.js (add this at the top)
const userRoutes = require('./routes/userRoutes');

// Add this line before starting the server
app.use('/api/users', userRoutes);

// Port configuration
const port = process.env.PORT || 5000;

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});