const express = require('express');
const router = express.Router();
const Item = require('../models/Item'); // Import the Item model

// Create a new item
router.post('/items', async (req, res) => {
    console.log('Request body:', req.body); // Log the incoming request body
    const { name, category, imageUrl, status, username, email, location } = req.body;
    try {
        const newItem = await Item.create({ name, category, imageUrl, status, username, email, location });
        res.status(201).json(newItem);
    } catch (error) {
        console.error('Error saving item:', error); // Log the full error object for better debugging
        res.status(500).json({ message: 'Error saving item', error: error.message });
    }
});

// Get all items
router.get('/items', async (req, res) => {
    try {
        const items = await Item.find(); // Fetch items from MongoDB
        res.json(items);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ message: 'Error fetching items', error: error.message });
    }
});

// Update an item
router.put('/items/:id', (req, res) => {
    const { id } = req.params;
    const { name, category, imageUrl, status } = req.body;
    const item = Item.findById(id);
    if (item) {
        item.name = name;
        item.category = category;
        item.imageUrl = imageUrl;
        item.status = status;
        res.json(item);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// Delete an item
router.delete('/items/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Item.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ message: 'Error deleting item', error: error.message });
    }
});

module.exports = router;
