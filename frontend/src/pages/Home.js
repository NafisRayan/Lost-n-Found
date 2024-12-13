import React from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div className="bg-gray-900 text-white min-h-screen">
            
            <div className="hero bg-cover bg-center h-96" style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?city,nights')" }}>
                <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
                    <motion.h1 
                        className="text-5xl font-bold text-center"
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ duration: 1 }}
                    >
                        Welcome to Lost and Found
                    </motion.h1>
                </div>
            </div>
            <div className="p-8">
                <h2 className="text-3xl font-bold mb-4 text-center">Find Your Lost Items</h2>
                <p className="text-center mb-8">Report found items or search for your lost belongings.</p>
                <div className="flex justify-center">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition duration-300">
                        Get Started
                    </button>
                </div>
                <h2 className="text-2xl font-bold mt-10 mb-4 text-center">Featured Items</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Example Item Card */}
                    <motion.div 
                        className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                        whileHover={{ scale: 1.05 }}
                    >
                        <h3 className="font-semibold">Lost Wallet</h3>
                        <p>Category: Personal Item</p>
                    </motion.div>
                    {/* Add more item cards as needed */}
                </div>
            </div>
        </div>
    );
};

export default Home;