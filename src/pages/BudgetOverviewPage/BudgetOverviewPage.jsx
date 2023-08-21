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
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getYear();

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
      const filteredIncomeArr = incomeArray.filter((income) => {
        const createdDate = new Date(income.date)
        const createdMonth = createdDate.getMonth() + 1;
        const createdYear = createdDate.getYear();
        return createdMonth === currentMonth && createdYear === currentYear
      })
      return filteredIncomeArr
    }

    useEffect(() => {
        // (1) Retrieves all existing categories in db, in order to identify categoryId for 'income'.
        // (2) Then using the categoryId assocaited with 'income', retrieves income information for user
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
        // Retrieves user's budget from budget model and saves as object ('budgetObj').
        // 'budgetObj' is stored in the state, 'sortedBudget'. 
        // 'sortedBudget' is mapped and rendered as <BudgetGroup /> component. 
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
                const sortedK = Object.keys(budgetObj).sort()
                const sortedBudget = {}
                for (const key of sortedK){
                    sortedBudget[key] = budgetObj[key] 
                }
                setUserBudgets(sortedBudget) 
            }catch(err){
                console.log(err)
            }
        }
        getIncomeBalance()
        getUserBudgets()
    }, [budgetUpdate])

    const pieData = [
        ['Table', 'Head']
    ]

    Object.entries(userBudgets).map(([key, value]) => {
        const data = [key];
        let amount = 0;
        value.forEach(category => {
            amount += category.budget
        });
        data.push(amount);
        pieData.push(data);
    });

    return (
        <>
            <Navbar/>
            <div className='ml-[15vw] w-[85vw] '>
                <div className='fixed top-[-700px] w-[1000px] h-[1000px] bg-[#B0E6DB] rounded-[50%] z-[-10]'></div>
                <div className='flex flex-col items-center '>
                    <PageHeader>My budget</PageHeader>
                    <div className="md:w-200">
                        <div className=" border-gray-100 rounded-md shadow-lg">
                            <PieDataChart data={ pieData }/>
                        </div>
                        <h3 className="font-bold text-center">
                            Income
                        </h3>
                        <div className="rounded-md border-gray-100 bg-white  p-5 m-2 shadow-lg">
                            <div className="flex flex-row justify-between ">
                                {income.map((income, idx) => 
                                    <IncomeDisplayComp income={income} key={idx}/>
                                )}
                            </div>
                        </div>
                        <div className="w-full ">
                            <div
                              className="grid grid-cols-3  md:grid-cols-12 md:justify-items-start px-2 justify-items-end font-bold md:text-xl">
                                <div className="col-span-1 md:col-span-4">Expenses</div>
                                <div className="col-span-1 md:col-span-4">Budget</div>
                                <div className="col-span-1 md:col-span-4">Remaining</div>
                            </div>
                        </div>            
                        <div>
                            {Object.entries(userBudgets).map(([key, value], idx) => 
                                <BudgetGroup groupName={key} group={value} groupidx={idx} userBudgets={userBudgets} updateBudgetInformation={updateBudgetInformation} key={idx} />
                            )}  
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

