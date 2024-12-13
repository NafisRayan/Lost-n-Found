import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto">
                <ul className="flex space-x-4">
                    <li><Link to="/" className="text-white">Home</Link></li>
                    <li><Link to="/profile" className="text-white">Profile</Link></li>
                    <li><Link to="/add-item" className="text-white">Add Item</Link></li>
                    <li><Link to="/submit-claim" className="text-white">Submit Claim</Link></li>
                    <li><Link to="/login" className="text-white">Login</Link></li>
                    <li><Link to="/register" className="text-white">Register</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
