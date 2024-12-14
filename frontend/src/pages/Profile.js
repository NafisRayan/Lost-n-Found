import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getUserProfile, logoutUser } from '../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        if (!dateString) return 'Never';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

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
    }, [navigate]);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('userToken');
            if (token) {
                await logoutUser(token);
                localStorage.removeItem('userToken');
                toast.success('You have logged out successfully.');
                navigate('/login');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error logging out');
        }
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
                <ul className="list-disc pl-5 mt-2">
                    <li>Last Logged in on {formatDate(user?.lastLogin)}</li>
                    <li>Last Logged out on {formatDate(user?.lastLogout)}</li>
                </ul>
                <button 
                    onClick={handleLogout} 
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded mt-4 transition duration-300"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;