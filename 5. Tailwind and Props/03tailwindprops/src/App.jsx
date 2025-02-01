import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <h4 className='bg-green-400 text-xl p-4 rounded-xl' >Tailwind test</h4>
     <Card /> 
     <Card number= {24} /> 
    
    </>
  )
}

export default App
