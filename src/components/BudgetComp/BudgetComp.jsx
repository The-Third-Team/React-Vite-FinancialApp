import React from 'react'


export default function BudgetComp({ category, userBudget}) {



  return (
    <>
      <div className="grid grid-cols-6">
        <div className="col-span-3">{category.name}</div>
        <div className="col-span-2">${category.budget}</div>
        <div className="col-span-1">${category.remaining}</div>

      </div>
    </>
  )
}
