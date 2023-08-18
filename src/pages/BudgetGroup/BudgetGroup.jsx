import React, { useState } from 'react'
import BudgetComp from '../../components/BudgetComp/BudgetComp'
import EditField from '../../components/EditField/EditField'
import * as budgetsAPI from "../../utilities/budgets-api"


export default function BudgetGroup({ group, groupName, userBudgets, updateBudgetInformation}) {

  const data = [];

  const updateBudget = async(update) => {
        await budgetsAPI.updateBudget(update)
        .then((response)=>{
            updateBudgetInformation()
        }).catch((err)=>{
            console.log(err)
        })
  }

  userBudgets[groupName].forEach(category => {
    const draft = {
      title: category.name,
      budget: category.budget,
      id: category.id
    }
    data.push(draft);
  })

  const handleOnSave = (update) => {
    const budgetUpdate = {}
    const budgetArr = []
    for (let u of update){
        const entry = {}
        if (u.budget < 0){
            u["budget"] = -u["budget"]
        }
        entry["id"] = u.id;
        entry["data"] = u
        budgetArr.push(entry)
    }
    budgetUpdate["budgets"] = budgetArr
    updateBudget(budgetUpdate)
  }

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
