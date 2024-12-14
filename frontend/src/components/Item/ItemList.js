import React, { useEffect, useState } from 'react';
import { getItems } from '../../services/api'; 

const ItemList = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await getItems(); 
                setItems(response);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        fetchItems();
    }, []);

    return (
        <div className="p-8 bg-gray-900 text-white min-h-screen">
            <h2 className="text-3xl font-bold mb-4 text-center">Items</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {items.map(item => (
                    <div key={item.id} className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p>Category: {item.category}</p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded mt-2 transition duration-300">Edit</button>
                        <button className="bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded mt-2 transition duration-300">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ItemList;