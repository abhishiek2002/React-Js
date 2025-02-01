import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  // let counter = 5;

  // const addValue = () => {
  //   counter+=1;
  //   console.log(counter);
        
  // }

  const [counter, setCounter] = useState(5);

  const addValue = () => {
    if (counter<20)
    setCounter(counter + 1);
  }

  const removeValue = () => {
    if (counter>0)
      setCounter(counter - 1)
  }

  return (
    <>
    <h1>Hello! Abhishek</h1>
    <h2>Counter Value : {counter}</h2>

    <button 
    onClick={addValue}>Add Value</button>
    <br />
    <button onClick={removeValue}>Remove Value</button>
    </>
  )
}

export default App
