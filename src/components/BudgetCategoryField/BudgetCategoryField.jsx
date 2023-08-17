import React, { useState } from 'react'

export default function BudgetCategoryField({name, amount, editBudgetData}) {

  const handleChange = (e) => {
    editBudgetData(name, e.target.value)
  }

  console.log('name: ', name, ' amount: ', amount)

  return (
    <div className='flex justify-between items-center mb-6'>
        <div className='flex justify-end w-[60%]'>
            <div>{name}</div>
        </div>
        <div className='flex justify-center w-24 py-1 bg-gray-200 border-black border-[1px] rounded-sm'>
            <div className='flex'>
                <span className='mr-1'>$</span>
                <input className='w-16 bg-white placeholder-gray-500 rounded-[4px] text-center' name={name} value={amount} type='number' onChange={handleChange} maxLength={6} placeholder='0'/> 
                {/* I can't seem to find out how to keep the value consistantly centered right now... */}
                {/* this might work: */}
                {/* https://stackoverflow.com/questions/65011555/auto-scaling-input-to-width-of-value-in-react */}
            </div>
        </div>
    </div>
  )
}
