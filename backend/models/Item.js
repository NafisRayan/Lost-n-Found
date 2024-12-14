const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: String,
    category: String,
    imageUrl: String,
    status: String,
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
