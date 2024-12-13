// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Registration
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
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
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

// Get User Profile
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    if (user) {
        res.json({ _id: user._id, name: user.name, email: user.email });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

module.exports = { registerUser, loginUser, getUserProfile };