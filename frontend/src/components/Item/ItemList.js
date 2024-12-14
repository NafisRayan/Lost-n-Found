import React, { useEffect, useState, useCallback } from 'react';
import { getItems } from '../../services/api';

// Debounce utility function to optimize search input
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [locationKeyword, setLocationKeyword] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const debouncedSearchKeyword = useDebounce(searchKeyword, 500); // Use debounced value
    const debouncedLocationKeyword = useDebounce(locationKeyword, 500); // Debounce location input

    // Fetch items on mount
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await getItems();
                setItems(response);
                setFilteredItems(response); // Initialize filtered items with all items
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        fetchItems();
    }, []);

    // Combined filter logic
    const filterItems = useCallback(() => {
        let results = items;

        // Search filters
        if (debouncedSearchKeyword) {
            results = results.filter(item => {
                const nameMatch = item.name && item.name.toLowerCase().includes(debouncedSearchKeyword.toLowerCase());
                const categoryMatch = item.category && item.category.toLowerCase().includes(debouncedSearchKeyword.toLowerCase());
                const locationMatch = item.location && item.location.toLowerCase().includes(debouncedSearchKeyword.toLowerCase());
                return nameMatch || categoryMatch || locationMatch;
            });
        }

        // Location filter
        if (debouncedLocationKeyword) {
            results = results.filter(item =>
                item.location && item.location.toLowerCase().includes(debouncedLocationKeyword.toLowerCase())
            );
        }

        // Category filter
        if (selectedCategory) {
            results = results.filter(item => item.category === selectedCategory);
        }

        // Date filter: Convert startDate and endDate to YYYY-MM-DD format and filter accordingly
        const startDateValue = startDate ? new Date(startDate).toISOString().split('T')[0] : null;
        const endDateValue = endDate ? new Date(endDate).toISOString().split('T')[0] : null;

        results = results.filter(item => {
            const itemDate = new Date(item.timestamp).toISOString().split('T')[0]; // Get YYYY-MM-DD part only
            if (startDateValue && itemDate < startDateValue) return false;
            if (endDateValue && itemDate > endDateValue) return false;
            return true;
        });

        setFilteredItems(results);
    }, [items, debouncedSearchKeyword, debouncedLocationKeyword, selectedCategory, startDate, endDate]);

    // Trigger the filter whenever one of the filter inputs change
    useEffect(() => {
        filterItems();
    }, [filterItems]);

    return (
        <div className="p-8 bg-gray-900 text-white min-h-screen">
            <h2 className="text-3xl font-bold mb-4 text-center">Items</h2>
            
            <div className="flex flex-wrap mb-8 gap-8">
                <input
                    type="text"
                    placeholder="Search by Name, Category, or Location..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="p-2 rounded w-full sm:w-1/5"
                />

                <input
                    type="text"
                    placeholder="Search by Location..."
                    value={locationKeyword}
                    onChange={(e) => setLocationKeyword(e.target.value)}
                    className="p-2 rounded w-full sm:w-1/5"
                />

                <select
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    value={selectedCategory}
                    className="p-2 rounded w-full sm:w-1/5"
                >
                    <option value="">Select Category</option>
                    {/* Replace with dynamic category options */}
                    <option value="12">Category 1</option>
                    <option value="13">Category 2</option>
                    <option value="33">Category 3</option>
                </select>

                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => {
                        setStartDate(e.target.value);
                        setEndDate(e.target.value);
                    }}
                    className="p-2 rounded w-full sm:w-1/5"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 item-list">
              {filteredItems.map(item => (
                <div className="item-card" key={item._id}>
                  <img src={item.imageUrl} alt={item.name} className="item-image" />
                  <div className="item-details">
                    <h3 className="item-title">{item.name}</h3>
                    <p className="item-description">Category: {item.category}</p>
                    <p className="item-description">Status: {item.status}</p>
                    <p className="item-description">Username: {item.username}</p>
                    <p className="item-description">Email: {item.email}</p>
                    <p className="item-description">Location: {item.location}</p>
                    <p className="item-description">Timestamp: {new Date(item.timestamp).toLocaleString()}</p>
                    <button className="item-button">View Details</button>
                  </div>
                </div>
              ))}
            </div>
        </div>
    );
};

export default ItemList;
