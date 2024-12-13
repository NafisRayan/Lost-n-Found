import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getUserProfile } from '../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('userToken');
            if (!token) {
                toast.error('You need to log in first.');
                navigate('/login');
                return;
            }
            try {
                const data = await getUserProfile(token);
                setUser(data);
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to fetch user profile.');
            } finally {
                setLoading(false);
            }
        };
        fetchUserProfile();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        toast.success('You have logged out successfully.');
        navigate('/login');
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <div className="p-8">
                <h1 className="text-3xl font-bold mb-4">User Profile</h1>
                {user ? (
                    <div className="border rounded-lg p-4 bg-gray-800">
                        <h2 className="text-xl font-semibold">Profile Information</h2>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mt-4 transition duration-300">
                            Edit Profile
                        </button>
                    </div>
                ) : (
                    <p>No user data available.</p>
                )}
                <h2 className="text-xl font-semibold mt-6">Activity Logs</h2>
                <ul className="list-disc pl-5">
                    <li>Logged in on 12/12/2024</li>
                    <li>Reported a lost item on 12/11/2024</li>
                </ul>
                <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded mt-4 transition duration-300">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;