import React, { useState } from 'react'

export default function BudgetSubcategoryField({name, amount}) {

  const [budgetAmount, setBudgetAmount] = useState(amount)

  return (
    <div className='flex justify-between mb-8'>
        <div className='flex justify-end w-[60%]'>
            <div>{name}</div>
        </div>
        <div className='flex justify-center w-20 py-1 border-black border-[1px] rounded-sm'>
            <div className='flex'>
                $
                <input className='w-12 bg-red-200' value={budgetAmount} onChange={(e) => setBudgetAmount(e.target.value)} maxLength={6}/> 
                {/* I can't seem to find out how to keep the value consistantly centered right now... */}
                {/* this might work: */}
                {/* https://stackoverflow.com/questions/65011555/auto-scaling-input-to-width-of-value-in-react */}
            </div>
            {/* <input className='bg-red-200' placeholder=''/> */}
        </div>
    </div>
  )
}
