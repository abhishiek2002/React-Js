import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(6);
  const [isNum, setIsNum] = useState(false);
  const [isChar, setIsChar] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass =""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(isNum) str += "0123456789"
    if(isChar) str += "!@#$%^&*_+-=~"

    for(let i=0; i<length; i++){
      pass += str[Math.floor(Math.random()*str.length)]
    }

    setPassword(pass)
    
  }, [length, isChar, isNum, setPassword]);

  useEffect(() => {
    passwordGenerator()
  }, [length, isChar, isNum])

  const passwordRef = useRef(null);

  const copyPassword = () => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }
  

  return (
    <>
      <div className='flex flex-col content-center max-w-md bg-gray-500 text-black justify-center mx-auto rounded-lg my-4 p-3 ' >
        <h1 className='text-white text-center'>Password Generator</h1>
        
        {/* Password Field */}
        <div className='flex'>
        <input 
        className='w-full bg-white rounded-l-md my-2 p-1' placeholder='password'
        value={password}
        ref={passwordRef}
        />

        {/* Password Copy Button */}
        <button 
        className='bg-red-400 rounded-r-md my-2 p-1 cursor-pointer'
        onClick={copyPassword}
        >
        Copy
        </button>

        </div>

        {/* Password Dependencies */}
        <div className='flex gap-x-2'>

          {/* Length Dependency */}
          <div className='flex gap-x-1 content-center'>
          <input
          type="range"
          min={6}
          max={100}
          Value={length}
          className='cursor-pointer'
          onChange={(e) => setLength(e.target.value)}
           />
           <label >Length: {length}</label>

          </div>

          {/* Number Dependency */}
          <div className='flex gap-x-1 contain-content'>
            <input 
            type="checkbox"
            className='cursor-pointer'
            defaultChecked={isNum}
            onChange={() => setIsNum(prev => !prev)}
             />
             <label > Number</label>
          </div>

          {/* Char Dependency */}
          <div className='flex gap-x-1 contain-content'>
            <input 
            type="checkbox"
            className='cursor-pointer'
            defaultChecked={isChar}
            onChange={() => setIsChar(prev => !prev)}
             />
             <label >Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
