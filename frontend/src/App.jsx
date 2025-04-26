import './App.css'
import Item from './components/Item'
import InputBox from './components/InputBox'
import React, { useState } from 'react'

function App() {
  const [change, setChange] = useState(false);
  
  return (
    <>
      <InputBox setChange={setChange}/>
      <br></br>
      <Item change={change} setChange={setChange}/>
    </>
  )
}

export default App

