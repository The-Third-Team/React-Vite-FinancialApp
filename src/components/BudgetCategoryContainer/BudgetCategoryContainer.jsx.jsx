import React, { useEffect, useState } from 'react'
import BudgetCategoryField from '../BudgetCategoryField/BudgetCategoryField'

export default function BudgetCategoryContainer({categories, budgetData, editBudgetData}) {

  const [displayedCategories, setDisplayedCategories] = useState(categories)

  useEffect(() => {
    setDisplayedCategories(categories)
  }, [categories])

  return (
    <div className='flex flex-col justify-start w-[70%] h-[24%]'>
        {displayedCategories.map((category, idx) => <BudgetCategoryField name={category.name} amount={budgetData[category.name]} editBudgetData={editBudgetData} key={idx}/>)}
    </div>
  )
}
