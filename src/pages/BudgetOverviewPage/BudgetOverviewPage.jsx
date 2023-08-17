import React, {useEffect, useState, useContext} from 'react'
import BudgetComp from '../../components/BudgetComp/BudgetComp'
import BudgetGroup from '../BudgetGroup/BudgetGroup'
import Navbar from '../../components/NavBar/Navbar'
import PageHeader from '../../components/PageHeader/PageHeader'
import * as budgetsAPI from "../../utilities/budgets-api"
import * as categoriesAPI from "../../utilities/categories-api"
import { AuthContext } from '../App/App'


export default function BudgetOverviewPage() {
  const {user, setUser} = useContext(AuthContext)

  const [userBudgets, setUserBudgets] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    async function getCategoryTypes(){
      try{ 
        const categoryTypes = await categoriesAPI.getAllCategories();
        let categoryObj = {}
        for (let category of categoryTypes){
            if (Object.hasOwn(categoryObj, category.group)){
              categoryObj[category.group].push(category.id)
            } else{
              categoryObj[category.group] = [category.id]  
            }
        }
        setCategories(categoryObj)
      } catch(err){
        console.log(err)
      }
    }

    async function getUserBudgets(){
      try{
          const budgets = await budgetsAPI.getUserBudget(user.id);
          // 
          const budgetObj = {}
          for (let b of budgets){
              if (Object.hasOwn(budgetObj, b.group)){
                budgetObj[b.group].push(b)
              } else {
                budgetObj[b.group] = [b]
              }
          }
          setUserBudgets(budgetObj)
      }catch(err){
        console.log(err)
      }
      
    }
    getCategoryTypes()
    getUserBudgets()
  }, [])
  console.log(categories)
  console.log(userBudgets)

  return (
    <>
      <Navbar/>
      <div className='ml-[15vw] w-[85vw]'>
        <div className='flex flex-col items-center w-[85vw]'>
          <PageHeader>YOUR BUDGET</PageHeader>
            <div 
              className="border-2 border-gray-100 rounded-md p-10"
                >Flowbite pie chart here</div>

            <div
                className="flex"
                >Income</div>
            <div
              className="border-2 border-gray-100 rounded-md p-5"
              >
                <div
                  className="flex flex-row justify-between ">
                    <div
                        className="text-gray-300 text-xs">
                        MEADE PUBLICATIONS*MODE</div>
                    <div
                      className="text-xl font-bold"
                      >$1,234</div>
                </div>
            </div>

            <div className="w-full">
              <div
                className="grid grid-cols-3  px-2 justify-items-end font-bold">
                  <div className="col-span-1">Expenses</div>
                  <div className="col-span-1">Budget</div>
                  <div className="col-span-1">Remaining</div>
              </div>
            </div>

        </div>
            <div>
              {/* {categories.map((category, idx) => 
                <BudgetGroup userBudgets={userBudgets} key={idx} />
                )} */}

              {Object.entries(userBudgets).map(([key, value]) => 
                <BudgetGroup group={value} groupName={key} userBudgets={userBudgets} key={key} />
                )}
              
              {/* {
                userBudgets.map((b, idx) => 
                  <BudgetComp key={idx} budget={b}/>
                )
              } */}
            </div>

      </div>

    </>
  )
}

