// controllers/userController.js
const User = require('../models/User');
const ActivityLog = require('../models/ActivityLog');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// controllers/userController.js
const registerUser = async (req, res) => {
    console.log('Received registration data:', req.body); // Log the incoming request body
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
    });

    res.status(201).json({ _id: user._id, name: user.name, email: user.email });
};

// User Login
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        
        // Log the login activity with current timestamp
        await ActivityLog.create({
            userId: user._id,
            username: user.name,
            email: user.email,
            action: 'login',
            timestamp: new Date()
        });

        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

// Handle Logout
const logoutUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        
        // Log the logout activity with current timestamp
        await ActivityLog.create({
            userId: user._id,
            username: user.name,
            email: user.email,
            action: 'logout',
            timestamp: new Date()
        });

        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ message: 'Error logging out' });
    }
};

// Get User Profile
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        
        // Get last login and logout, sorted by timestamp in descending order
        const lastLogin = await ActivityLog.findOne({ 
            userId: user._id, 
            action: 'login' 
        }).sort({ timestamp: -1 });
        
        const lastLogout = await ActivityLog.findOne({ 
            userId: user._id, 
            action: 'logout' 
        }).sort({ timestamp: -1 });

        if (user) {
            res.json({ 
                _id: user._id, 
                name: user.name, 
                email: user.email,
                lastLogin: lastLogin ? lastLogin.timestamp : null,
                lastLogout: lastLogout ? lastLogout.timestamp : null
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Profile error:', error);
        res.status(500).json({ message: 'Error fetching user profile' });
    }
};

module.exports = { registerUser, loginUser, logoutUser, getUserProfile };