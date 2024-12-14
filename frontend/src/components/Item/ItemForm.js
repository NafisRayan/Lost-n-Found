import React, { useState } from 'react';
import { addItem } from '../../services/api'; // Import the addItem function

const ItemForm = () => {
    const [itemName, setItemName] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle item submission logic here
        const itemData = {
            name: itemName,
            category,
            image,
            status
        };
        addItem(itemData)
            .then((data) => {
                console.log('Item added:', data);
                // Optionally reset form fields or show success message
            })
            .catch((error) => {
                console.error('Error adding item:', error);
            });
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-white">Register Item</h2>
                <input
                    type="text"
                    placeholder="Item Name"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    className="border p-2 mb-4 w-full bg-gray-700 text-white"
                    required
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mb-4 p-2 rounded bg-gray-700 text-white"
                />
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="mb-4"
                />
                <select className="mb-4 bg-gray-700 text-white" onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Select Status</option>
                    <option value="available">Available</option>
                    <option value="claimed">Claimed</option>
                </select>
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ItemForm;