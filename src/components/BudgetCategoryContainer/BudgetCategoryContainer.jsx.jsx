import React, { useEffect, useState } from 'react'
import BudgetCategoryField from '../BudgetCategoryField/BudgetCategoryField'

export default function BudgetCategoryContainer({categories, budgetData, editBudgetData}) {

  // State
  const [displayedCategories, setDisplayedCategories] = useState(categories)

  // useEffect
  useEffect(() => {
    setDisplayedCategories(categories)
  }, [categories])

  return (
    <div className='flex flex-col justify-start w-[70%] h-[30%] text-[14px]'>
        {displayedCategories.map((category, idx) => 
          <BudgetCategoryField
            name={category.name}
            amount={budgetData[category.name]}
            editBudgetData={editBudgetData}
            key={idx}
            />
        )}
    </div>
  )
}
