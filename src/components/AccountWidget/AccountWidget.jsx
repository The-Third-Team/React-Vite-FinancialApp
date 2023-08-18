import React from 'react'
import { Link } from 'react-router-dom'

export default function AccountWidget({name, linkTo, imgSrc}) {
  return (
    <div className='flex flex-col items-center w-full'>
    
      <Link to={linkTo} className='flex flex-col justify-center items-center w-[60px] h-[60px] bg-white mx-2 mt-2 border-black border-[1px] rounded-[10px]'>
        <img src={imgSrc} className='w-[100%]'/>
      </Link>
      <div className='text-center text-[12px] mb-2 mt-1'>
          {name}
      </div>
    </div>
  )
}
