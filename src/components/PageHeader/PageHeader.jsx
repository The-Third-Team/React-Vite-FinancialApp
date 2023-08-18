import React from 'react'

export default function PageHeader({children}) {
  return (
    <div className='font-black text-2xl mt-4 mb-4 tracking-wide'>
        {children}
    </div>
  )
}
