import React, {useEffect, useState, useContext} from 'react'
import BudgetComp from '../../components/BudgetComp/BudgetComp'
import BudgetGroup from '../BudgetGroup/BudgetGroup'
import Navbar from '../../components/NavBar/Navbar'
import PageHeader from '../../components/PageHeader/PageHeader'
import * as budgetsAPI from "../../utilities/budgets-api"
import * as categoriesAPI from "../../utilities/categories-api"
import { AuthContext } from '../App/App'
import * as accountsAPI from "../../utilities/accounts-api"


export default function BudgetOverviewPage() {
  const {user, setUser} = useContext(AuthContext)

  const [userBudgets, setUserBudgets] = useState([])
  const [income, setIncome] = useState([])

  const filterIncome = (incomeArray) => {
    incomeArray.filter()
  }

  useEffect(() => {
      // retrieves user's budget from budget model and saves as object ('budgetObj')
      // to be read by react components
      async function getUserBudgets(){
          try{
              const budgets = await budgetsAPI.getUserBudget(user.id);
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

      // retrieves all categories to identify categoryId for 'income'
      // then retrieves income information for user
      async function getIncomeBalance(){
          await categoriesAPI.getAllCategories()
              .then((response)=>{
                let category;
                response.forEach((res) => {
                  if (res.name === "Income"){
                    category = res.id
                  }
                })
                return category
              }).then((categoryId) => {
                return accountsAPI.getUserIncome(user.id, categoryId)
              }).then((response)=>{
                setIncome(response)
              }).catch((error) => {
                console.log(error)
              })
        }
    getIncomeBalance()
    getUserBudgets()
  }, [])

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
                    {income.map((income) => {

                    })}
                    {/* <div
                        className="text-gray-300 text-xs">
                        {bankName}</div>
                    <div
                      className="text-xl font-bold"
                      >${bankBalance}</div> */}
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
              {Object.entries(userBudgets).map(([key, value], idx) => 
                <BudgetGroup group={value} groupName={key} userBudgets={userBudgets} key={idx} />
                )}
              
            </div>

      </div>

    </>
  )
}

