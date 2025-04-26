import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';

function Item({ change, setChange }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const { data } = await axios.get('http://localhost:3000/gettodos');
                setItems(data.todos);
                setLoading(false);
            }
            catch (err) {
                console.error(err);
                setLoading(false);
            }
        }
        fetchItems();

    }, [change])// Trigger fetch when 'change' prop changes

    const handleComplete = async (id, status) => {
        try {
            await axios.put(`http://localhost:3000/completetodo/${id}`, { status: status });
            setChange(prev=>!prev); // Trigger re-fetch of items
            console.log("Item completed successfully");
        }
        catch (err) {
            console.error(err);
        }
    }
    return (
        <div>
            <h1 className='text-2xl font-bold'>Todo List</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className='flex flex-col gap-2'>
                    {items.map((item) => {
                        return (
                            <div key={item._id}>
                                <div className='flex justify-between items-center bg-gray-300 p-4 rounded-lg shadow-md'>
                                    <div className='flex items-center gap-2'>
                                        <input
                                            type="checkbox"
                                            onChange={() => handleComplete(item._id, item.status === 'completed' ? 'pending' : 'completed')}
                                        />
                                        <p className={`text-lg ${item.status === 'completed' ? 'line-through' : ''}`}>{item.title}</p>
                                    </div>
                                    <div className='flex gap-2'>
                                        <button 
                                            className='bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer'
                                            onClick={() => {
                                                const newTitle = prompt("Edit item:", item.title);
                                                if (newTitle) {
                                                    axios.patch(`http://localhost:3000/updatetodo/${item._id}`, { title: newTitle, status: item.status })
                                                        .then(() => setChange(prev => !prev))
                                                        .catch(err => console.error(err));
                                                }
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className='bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer'
                                            onClick={() => {
                                                axios.delete(`http://localhost:3000/deletetodo/${item._id}`)
                                                    .then(() => setChange(prev => !prev))
                                                    .catch(err => console.error(err));
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default Item