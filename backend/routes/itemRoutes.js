const express = require('express');
const router = express.Router();
const Item = require('../models/Item'); // Import the Item model

let items = []; // In-memory storage for items

// Create a new item
router.post('/items', async (req, res) => {
    console.log('Request body:', req.body); // Log the incoming request body
    const { name, category, imageUrl, status } = req.body;
    try {
        const newItem = await Item.create({ name, category, imageUrl, status });
        res.status(201).json(newItem);
    } catch (error) {
        console.error('Error saving item:', error);
        res.status(500).json({ message: 'Error saving item' });
    }
});

// Get all items
router.get('/items', (req, res) => {
    res.json(items);
});

// Update an item
router.put('/items/:id', (req, res) => {
    const { id } = req.params;
    const { name, category, imageUrl, status } = req.body;
    const item = items.find(item => item.id === parseInt(id));
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
router.delete('/items/:id', (req, res) => {
    const { id } = req.params;
    items = items.filter(item => item.id !== parseInt(id));
    res.status(204).send();
});

module.exports = router;
