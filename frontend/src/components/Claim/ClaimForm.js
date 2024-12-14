import React, { useState, useEffect } from 'react';
import { addItem, getUserProfile } from '../../services/api'; // Import the functions

const ClaimForm = () => {
    const [itemName, setItemName] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState('claimed'); // Default to 'claimed'
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState(''); // New state for location

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('userToken'); // Fetch token
            if (token) {
                try {
                    const profile = await getUserProfile(token);
                    setUsername(profile.name);
                    setEmail(profile.email);
                } catch (error) {
                    console.error('Error fetching user profile:', error);
                }
            }
        };
        fetchUserProfile();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check the file size (limit to 2MB for example)
            if (file.size > 2 * 1024 * 1024) {
                alert('File size exceeds 2MB');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); // Set the base64 string
            };
            reader.readAsDataURL(file); // Convert to base64
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const itemData = {
            name: itemName,
            category,
            imageUrl: image,
            status,
            username,
            email,
            location, // Include location in item data
        };
        addItem(itemData)
            .then((data) => {
                console.log('Item added:', data);
            })
            .catch((error) => {
                console.error('Error adding item:', error);
            });
    };

    return (
        <div className="flex justify-center items-center h-screen bg-black">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-white">Claim Item</h2>
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
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="mb-4 p-2 rounded bg-gray-700 text-white"
                />
                <input
                    type="file"
                    onChange={handleImageChange}
                    className="mb-4"
                />
                <select className="mb-4 bg-gray-700 text-white" onChange={(e) => setStatus(e.target.value)} defaultValue="claimed">
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

export default ClaimForm;