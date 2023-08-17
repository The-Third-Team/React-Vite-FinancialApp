import React, { useState } from 'react'
import BudgetComp from '../../components/BudgetComp/BudgetComp'

export default function BudgetGroup({ group, groupName, userBudgets }) {

  return (
    <>
        <div className="border-2 rounded-md p-2 mx-2 my-1">
            <div className="py-1">
                <div className="text-md font-bold">{groupName}</div>
            </div>
            <div>
                {group.map((category, idx) => 
                    <BudgetComp key={idx} category={category} userBudgets={userBudgets} />)}
            </div>
        </div>
    </>
  )
}
