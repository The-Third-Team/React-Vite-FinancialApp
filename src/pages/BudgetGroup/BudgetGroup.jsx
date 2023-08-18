import React, { useState } from 'react'
import BudgetComp from '../../components/BudgetComp/BudgetComp'
import EditField from '../../components/EditField/EditField'
import * as budgetsAPI from "../../utilities/budgets-api"


export default function BudgetGroup({ groupName, group, groupidx, userBudgets, updateBudgetInformation}) {

  const colors = ['#3586FF','#E0C9FF','#FAA365','#FC7676']
  const data = [];

  const updateBudget = async(update) => {
        await budgetsAPI.updateBudget(update)
        .then((response)=>{
            updateBudgetInformation()
        }).catch((err)=>{
            console.log(err)
        })
  }

//   userBudgets[groupName].forEach(category => {
//     const draft = {
//       title: category.name,
//       budget: category.budget,
//       id: category.id
//     }
//     data.push(draft);
//   })

  group.forEach(category => {
    const draft = {
      title: category.name,
      budget: category.budget,
      id: category.id
    }
    data.push(draft);
  })

  //const sortedData = data.slice().sort((a,b) => a.id - b.id)

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

  console.log(colors[groupidx])
  return (
    <>
        <div className=" rounded-md p-2 mx-2 my-1 bg-white shadow-lg">

            <div className="rounded-md" style={{backgroundColor:`${colors[groupidx]}`}}>
                <div className="text-md font-bold flex justify-start">
                  <div className="flex items-center"><span className="ml-2 text-white">{groupName}</span></div>
                  <div className="content-start "><EditField category={ groupName } data={ data } onSave={handleOnSave} /></div>
                </div>
            </div>
            <div className="">
                {group.map((category, idx) => 
                    <BudgetComp key={idx} category={category} userBudgets={userBudgets} />)}
            </div>

        </div>
    </>
  )
}
