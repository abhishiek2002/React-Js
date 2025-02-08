import React from 'react'
import { useParams } from 'react-router'

const User = () => {
    const {id} = useParams();

  return (
    <div className='bg-gray-600 text-white text-center text-3xl p-2'>
      User : {id}
    </div>
  )
}

export default User
