import React, { useState } from 'react'
import BudgetComp from '../../components/BudgetComp/BudgetComp'
import EditField from '../../components/EditField/EditField'

export default function BudgetGroup({ group, groupName, userBudgets }) {

  const data = [];

  userBudgets[groupName].forEach(category => {
    const draft = {
      title: category.name,
      amount: category.budget
    }
    data.push(draft);
  })

  return (
    <>
        <div className="border-2 rounded-md p-2 mx-2 my-1">
            <div className="py-1">
                <div className="text-md font-bold">
                  {groupName}
                  <EditField category={ groupName } data={ data } onSave={handleOnSave} />
                </div>
            </div>
            <div>
                {group.map((category, idx) => 
                    <BudgetComp key={idx} category={category} userBudgets={userBudgets} />)}
            </div>
        </div>
    </>
  )
}
