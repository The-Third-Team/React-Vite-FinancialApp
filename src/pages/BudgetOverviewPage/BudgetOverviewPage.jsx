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
  const [bankBalance, setUserBalance] = useState({})
  const [bankName, setBankName] = useState("")

  useEffect(() => {
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

    // async function getAccountBalance(){

    //     // retrieves account number, and further retrieves user account balance
    //     await accountsAPI.getUserAccountBalance(user.id)
    //       .then((userAccountObject) => {
    //         console.log(userAccountObject)
    //         setBankName(userAccountObject.name)
    //         return userAccountObject.accountNumber
    //       }).then((accountNumber) => {
    //         const accountBalance = accountsAPI.getUserBalance(accountNumber)
    //         setUserBalance(accountBalance)
    //       }).catch((error) => {
    //         console.log(error)
    //       })
        

    // }

    getUserBudgets()
    // getAccountBalance()
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

