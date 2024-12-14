const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: String,
    category: String,
    imageUrl: String,
    status: String,
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
