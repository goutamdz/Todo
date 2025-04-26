import React, { useState } from 'react'
import axios from 'axios';

function InputBox({setChange}) {
    const [input,setInput]=useState('');
    const handleSubmit=async (e)=>{
        e.preventDefault()
        if(input.trim() === '') return; // Prevent empty submissions
        
        try{
            const {data}=await axios({
                method:'POST',
                url:'http://localhost:3000/createtodo',
                data:{
                    title:input
                }
            })
            setChange(prev => !prev) // Trigger a change in the parent component to refresh the list
            console.log(data);
        }
        catch(err){
            console.error(err);
            alert('Error creating todo!');
        }

        setInput(''); // Clear the input after submission
    }

  return (
    <div>
        <form onSubmit={(e)=>handleSubmit(e)} >
            <input 
                type="text" 
                placeholder="Search..." 
                className='border-2 border-gray-300 rounded-md p-2 w-96'
                value={input}
                onChange={(e)=>setInput(e.target.value)}
                required
                id='1'
            />
            <button 
                type="submit"
                className='bg-blue-500 text-white rounded-md p-2 cursor-pointer ml-2'
            >
                Add
            </button>   
        </form>
    </div>
  )
}

export default InputBox