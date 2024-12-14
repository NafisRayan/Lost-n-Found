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
            <ul>
                {items.map(item => (
                    <li key={item._id} className="border-b border-gray-600 py-4">
                        <h3 className="text-xl font-semibold">{item.name}</h3>
                        <p>Category: {item.category}</p>
                        <p>Status: {item.status}</p>
                        <p>Username: {item.username}</p>
                        <p>Email: {item.email}</p>
                        <p>Location: {item.location}</p>
                        <p>Timestamp: {new Date(item.timestamp).toLocaleString()}</p>
                        <img src={item.imageUrl} alt={item.name} className="w-32 h-32 object-cover" />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemList;