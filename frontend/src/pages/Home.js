import React from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import ItemList from '../components/Item/ItemList';

const Home = () => {
    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <div className="mb-10 hero bg-cover bg-center h-96" style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?city,nights')" }}>
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
            <div className="container mx-auto p-5 bg-gray-900 rounded-lg shadow-lg mt-10">
                <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">We have it all here...</h1>
                <ItemList />
            </div>
        </div>
    );
};

export default Home;