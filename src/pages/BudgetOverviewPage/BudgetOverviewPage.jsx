import React, {useEffect, useState, useContext} from 'react'
import BudgetComp from '../../components/BudgetComp/BudgetComp'
import BudgetGroup from '../BudgetGroup/BudgetGroup'
import Navbar from '../../components/NavBar/Navbar'
import PageHeader from '../../components/PageHeader/PageHeader'
import * as budgetsAPI from "../../utilities/budgets-api"
import * as categoriesAPI from "../../utilities/categories-api"
import { AuthContext } from '../App/App'
import * as accountsAPI from "../../utilities/accounts-api"
import IncomeDisplayComp from '../IncomeDisplayComp/IncomeDisplayComp'
import PieDataChart from '../../components/PieDataChart/PieDataChart'


export default function BudgetOverviewPage() {
  const {user, setUser} = useContext(AuthContext)
  const [userBudgets, setUserBudgets] = useState([])
  const [income, setIncome] = useState([])
  const [budgetUpdate, setBudgetUpdate] = useState(false)

  // state change when budget is updated via a "put" request
  const updateBudgetInformation = () => {
      setBudgetUpdate(!budgetUpdate)
  }

  // 'filterIncome()' returns an array with current month's income 
  const filterIncome = (incomeArray) => {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getYear();

    const filteredIncomeArr = incomeArray.filter((income) => {
      const createdDate = new Date(income.date)
      const createdMonth = createdDate.getMonth() + 1;
      const createdYear = createdDate.getYear();
      return createdMonth === currentMonth && createdYear === currentYear
    })
    return filteredIncomeArr
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
              //Object.keys(budgetObj).sort()
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
              }).then((incomeArr) => {
                return filterIncome(incomeArr)
              }).then((response)=>{
                setIncome(response)
              }).catch((error) => {
                console.log(error)
              })
        }
    getIncomeBalance()
    getUserBudgets()
    console.log(userBudgets)
  }, [budgetUpdate])

  const pieData = []

  Object.entries(userBudgets).map(([key, value]) => {
    const data = {
      title: key,
      value: 0,
      color: '#845EC2'
    }
    value.forEach(category => {
      data.value += category.budget
    });
    pieData.push(data);
  });

  return (
    <>
      <Navbar/>
      <div className='ml-[15vw] w-[85vw]'>
        <div className='flex flex-col items-center w-[85vw]'>
          <PageHeader>YOUR BUDGET</PageHeader>
            <div className="border-2 border-gray-100 rounded-md p-10">
            <PieDataChart data={ pieData }/>

            </div>

            <div
                className="flex font-bold"
                >Income</div>
            <div
              className="border-2 border-gray-100 rounded-md p-5 m-2"
              >
                <div
                  className="flex flex-row justify-between ">
                    {income.map((income, idx) => 
                      <IncomeDisplayComp income={income} key={idx}/>
                    )}
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
                <BudgetGroup groupName={key} group={value} userBudgets={userBudgets} updateBudgetInformation={updateBudgetInformation} key={idx} />
                )}
              
            </div>

      </div>

    </>
  )
}

