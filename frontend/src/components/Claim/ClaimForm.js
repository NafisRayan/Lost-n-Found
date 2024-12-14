import React, { useState } from 'react';

const ClaimForm = () => {
    const [itemName, setitemName] = useState('');
    const [document, setDocument] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle claim submission logic here
    };

    return (
        <div className="flex justify-center items-center h-screen bg-black">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-white">Submit Claim</h2>
                <input
                    type="text"
                    placeholder="Item Name"
                    value={itemName}
                    onChange={(e) => setitemName(e.target.value)}
                    className="border p-2 mb-4 w-full bg-gray-700 text-white"
                    required
                />
                <input
                    type="file"
                    onChange={(e) => setDocument(e.target.files[0])}
                    className="border p-2 mb-4 w-full bg-gray-700 text-white"
                />
                <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700 transition duration-300">Submit Claim</button>
            </form>
        </div>
    );
};

export default ClaimForm;