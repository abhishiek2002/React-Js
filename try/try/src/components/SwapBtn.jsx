import React from 'react'

const SwapBtn = ({swap}) => {
  return (
    <button onClick={swap} className='bg-blue-700 text-white py-1 px-2 border rounded-md border-white text-lg mx-auto w-24 block cursor-pointer my-2 hover:brightness-90 hover:border-2 transition-all absolute'>Swap</button>
  )
}

export default SwapBtn
