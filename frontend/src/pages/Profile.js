import React from 'react';
import Navbar from '../components/Navbar';

const Profile = () => {
    return (
        <div className="bg-gray-900 text-white min-h-screen">
            
            <div className="p-8">
                <h1 className="text-3xl font-bold mb-4">User Profile</h1>
                <div className="border rounded-lg p-4 bg-gray-800">
                    <h2 className="text-xl font-semibold">Profile Information</h2>
                    <p>Name: John Doe</p>
                    <p>Email: johndoe@example.com</p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mt-4 transition duration-300">
                        Edit Profile
                    </button>
                </div>
                <h2 className="text-xl font-semibold mt-6">Activity Logs</h2>
                <ul className="list-disc pl-5">
                    <li>Logged in on 12/12/2024</li>
                    <li>Reported a lost item on 12/11/2024</li>
                </ul>
            </div>
        </div>
    );
};

export default Profile;