import React, { useState }from 'react'
import BudgetComp from '../../components/BudgetComp/BudgetComp'
import EditField from '../../components/EditField/EditField'
import * as budgetsAPI from "../../utilities/budgets-api"
import { PropTypes } from 'prop-types';

export default function BudgetGroup({ groupName, group, groupidx, userBudgets, updateBudgetInformation }) {
    const colors = ['#3586FF','#E0C9FF','#FAA365','#FC7676']
    const [openBudget, setOpenBudget] = useState(true)
    const data = [];

  const handleClick= () => {
    setOpenBudget(!openBudget)
  }

    const updateBudget = async(update) => {
        await budgetsAPI.updateBudget(update)
        .then((response)=>{
            updateBudgetInformation()
        }).catch((err)=>{
            console.log(err)
        })
    }

    group.forEach(category => {
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
    // style={{backgroundColor:`${colors[groupidx]}`}}
    return (
        <>
            <div className=" rounded-md p-2 mx-2 my-1 pb-3 bg-white shadow-lg">
                <div 
                    className="rounded-md" 
                    onClick={handleClick}
                    style={{backgroundColor:`${colors[groupidx]}`}}>
                    <div className="text-md font-bold flex justify-start">
                        <div className="flex items-center"><span className="ml-2 text-white">{groupName}</span></div>
                        <div className="content-start"><EditField category={ groupName } data={ data } onSave={handleOnSave} /></div>
                    </div>
                    <div className="grid">
                        <div className="absolute mt-[-5px] w-0 h-0 border-solid border-t-[8px] 
                            border-t-transparent border-x-transparent border-x-[6px]  
                            border-b-[8px] border-white justify-self-center z-[12]"
                            style={{ transform: "rotate(180deg)"}}></div>
                        <div className='absolute mt-[-13px] w-[20px] h-[20px] rounded-[50%] z-[10] bg-black justify-self-center' style={{backgroundColor:`${colors[groupidx]}`}}></div>
                    </div>

                </div>
                { openBudget &&
                <div className="">
                    {group.map((category, idx) => 
                        <BudgetComp key={idx} category={category} userBudgets={userBudgets} />)}
                </div>
                }
            </div>
        </>
    )
}

BudgetGroup.propTypes = {
    groupName: PropTypes.string,
    group: PropTypes.array,
    groupidx: PropTypes.number,
    userBudgets: PropTypes.object,
    updateBudgetInformation: PropTypes.func
}