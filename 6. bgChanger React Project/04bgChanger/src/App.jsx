import { useState } from 'react'

function App() {
  const [color, setColor] = useState("olive");

  return (
    <div className='w-full h-screen duration-200' 
    style={{backgroundColor: color}}>

      <div className='fixed flex flex-wrap justify-center content-center bottom-12 inset-x-0 px-2'>
        <div className='flex flex-wrap justify-center gap-3 bg-white px-3 py-2 rounded-3xl '>
          
          <button className='outline-none px-4 rounded-full py-1 cursor-pointer hover:brightness-50' 
          style={{backgroundColor: "red"}} onClick={() => setColor("red")}>Red</button>
          <button className='outline-none px-4 rounded-full py-1 cursor-pointer hover:brightness-50' 
          style={{backgroundColor: "green"}} onClick={() => setColor("green")}>Green</button>
          <button className='outline-none px-4 rounded-full py-1 cursor-pointer hover:brightness-50' 
          style={{backgroundColor: "blue"}} onClick={() => setColor("blue")}>Blue</button>
          <button className='outline-none px-4 rounded-full py-1 cursor-pointer hover:brightness-50' 
          style={{backgroundColor: "white"}} onClick={() => setColor("white")}>White</button>
          <button className='outline-none px-4 rounded-full py-1 cursor-pointer hover:brightness-50' 
          style={{backgroundColor: "pink"}} onClick={() => setColor("pink")}>Pink</button>
        </div>
       
      </div>
    </div>
  )
}

export default App
