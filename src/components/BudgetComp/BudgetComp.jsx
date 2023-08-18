import React from 'react'


export default function BudgetComp({ category, userBudget}) {



  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-5 flex items-center"><span className="inline-block align-middle">{category.name}</span></div>
        <div className="col-span-3 flex items-center justify-end text-right "><span className="inline-block align-middle">${category.budget}</span></div>
        <div className="col-span-1"></div>
        <div className={`col-span-3 p-1 m-1 flex items-center justify-end  rounded-md text-right ${ category.remaining < 0 ? 'bg-[#FFB8B8]' : 'bg-[#9EEA8B]'}`}>${category.remaining}</div>
      </div>
    </>
  )
}
