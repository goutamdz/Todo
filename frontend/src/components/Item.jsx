import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

function Item({ change, setChange }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            setError(null); // Reset error before fetching
            try {
                const { data } = await axios.get(`${baseURL}/gettodos`);
                setItems(data.todos);
            } catch (err) {
                console.error(err);
                setError('Failed to load todos.');
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, [change]);

    const handleComplete = async (id, status) => {
        setError(null);
        try {
            await axios.put(`${baseURL}/completetodo/${id}`, { status });
            setChange(prev => !prev);
        } catch (err) {
            console.error(err);
            setError('Failed to update item status.');
        }
    };

    const handleEdit = async (item) => {
        setError(null);
        const newTitle = prompt("Edit item:", item.title);
        if (newTitle && newTitle.trim() !== "") {
            try {
                await axios.patch(`${baseURL}/updatetodo/${item._id}`, {
                    title: newTitle,
                    status: item.status,
                });
                setChange(prev => !prev);
            } catch (err) {
                console.error(err);
                setError('Failed to update item.');
            }
        }
    };

    const handleDelete = async (id) => {
        setError(null);
        try {
            await axios.delete(`${baseURL}/deletetodo/${id}`);
            setChange(prev => !prev);
        } catch (err) {
            console.error(err);
            setError('Failed to delete item.');
        }
    };

    return (
        <div>
            <h1 className='text-2xl font-bold'>Todo List</h1>

            {error && <p className='text-red-600 font-semibold'>{error}</p>}

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className='flex flex-col gap-2'>
                    {items.map((item) => (
                        <div key={item._id}>
                            <div className='flex justify-between items-center bg-gray-300 p-4 rounded-lg shadow-md'>
                                <div className='flex items-center gap-2'>
                                    <input
                                        type="checkbox"
                                        checked={item.status === 'completed'}
                                        onChange={() => handleComplete(item._id, item.status === 'completed' ? 'pending' : 'completed')}
                                    />
                                    <p className={`text-lg ${item.status === 'completed' ? 'line-through' : ''}`}>
                                        {item.title}
                                    </p>
                                </div>
                                <div className='flex gap-2'>
                                    <button
                                        className='bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer'
                                        onClick={() => handleEdit(item)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className='bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer'
                                        onClick={() => handleDelete(item._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Item;
