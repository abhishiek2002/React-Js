import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8);
  const [isNum, setIsNum] = useState(false);
  const [isChar, setIsChar] = useState(false);
  let [password, setPassword] = useState("");

  
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (isNum) str += "0123456789";
    if (isChar) str += "!@#$%^&*_-+=~";

    for (let i = 0; i < length; i++) {
      pass += `${str[Math.floor(Math.random() * str.length)]}`;
    }
    setPassword(pass);
  }, [length, isChar, isNum, setPassword]);
  
  useEffect(() => {
    passwordGenerator();
  }, [length, isNum, isChar, passwordGenerator])
  
  // 1.useCallback hook mainly uski dependencies ke
  // memoisation ke liye responsible hai mainly ye
  // methods ke references ko apni memory me cache(save)
  // krke rakhta hai taaki component rerender hone
  // par kahi method ka reference change na ho jae or
  // wo ek new method ki tarah hi treat ho warna
  // uspar depend baaki component bhi fhir se
  // rerender honge kyuki method ka reference (means
  // address in the memory) change ho gya hai
  // 2. Wahi useEffect sirf apni dependencies ke
  // behalf par us callback function ko run karwaata
  // agar dependencies change hui to wo useEffect ka
  // callback bhi run hoga jisse uske ander hue task
  // jaise yahan passwordGenerator function ko call
  // krwaana wo invoke ho jaega. 


  // useRef Hook
  const passwordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,3);
    window.navigator.clipboard.writeText(password)
  }, [password])
  

  return (
    <>
      <div className="w-full max-w-md mx-auto rounded-lg px-4 my-8 text-orange-500 bg-gray-500">
        <h1 className="text-white text-center">Password Generator</h1>

        <div className="flex my-2 py-2 ">
          {/* Password Input Field */}
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 bg-white rounded-l-sm"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />

          {/* Password Copy Button  */}
          <button
            className="py-1 px-3 bg-red-400 text-black rounded-r-sm shrink-0 cursor-pointer"
            onClick={copyPasswordToClipboard}
          >
            Copy
          </button>
        </div>

        {/* Password Dependencies */}
        <div className="flex text-sm gap-x-2 justify-between py-3">
          {/* Range Input */}
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>

          {/* IsNum Dependency */}

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={isNum}
              id="numberInput"
              className="cursor-pointer"
              onChange={() => {
                setIsNum((prev) => !prev);
              }}
            />
            <label>Number</label>
          </div>

          {/* IsChar Dependency */}

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={isChar}
              id="charInput"
              className="cursor-pointer"
              onChange={() => {
                setIsChar((prev) => !prev);
              }}
            />
            <label>Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App
