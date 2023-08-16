import React from 'react'
import { Link } from 'react-router-dom'

export default function AccountWidget({name, linkTo}) {
  return (
    <Link to={linkTo} className='flex flex-col justify-end w-[28%] h-[80px] bg-gray-400 mx-2 mt-2 border-black border-[1px] rounded-[10px]'>
      <div className='text-center text-[10px] mb-2'>
        {name}
      </div>
    </Link>
  )
}
