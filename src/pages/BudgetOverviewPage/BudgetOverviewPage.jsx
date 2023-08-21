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

const months = {
  "1": "Jan.",
  "2": "Feb.",
  "3": "Mar.",
  "4": "Apr.",
  "5": "May.",
  "6": "Jun.",
  "7": "Jul.",
  "8": "Aug.",
  "9": "Sep.",
  "10": "Oct.",
  "11": "Nov.",
  "12": "Dec."
}

export default function BudgetOverviewPage() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getYear();
    const {user, setUser} = useContext(AuthContext);
    const [userBudgets, setUserBudgets] = useState([]);
    const [income, setIncome] = useState([]);
    const [budgetUpdate, setBudgetUpdate] = useState(false);

    // State change when budget is updated via a "put" request; detected via the useEffect() on this Page. 
    const updateBudgetInformation = () => {
        setBudgetUpdate(!budgetUpdate);
    }

    // 'filterIncome()' returns an array with current month's income 
    const filterIncome = (incomeArray) => {
        const filteredIncomeArr = incomeArray.filter((income) => {
            const createdDate = new Date(income.date);
            const createdMonth = createdDate.getMonth() + 1;
            const createdYear = createdDate.getYear();
            return createdMonth === currentMonth && createdYear === currentYear;
        })
        for (let income of filteredIncomeArr){
            let date = new Date(income.date)
            const month = months[date.getMonth() + 1]
            const day = date.getDay()
            const year = date.getFullYear()
            income["printedDate"]= `${month} ${day}, ${year}`
        }
        return filteredIncomeArr;
    }

    useEffect(() => {
        // (1) Retrieves all existing categories in db, in order to identify categoryId for 'income'.
        // (2) Then using the categoryId assocaited with 'income', retrieves income information for user
        async function getIncomeBalance(){
            await categoriesAPI.getAllCategories()
                .then((response) => {
                    let category;
                    response.forEach((res) => {
                        if (res.name === "Income"){
                            category = res.id;
                        }
                    })
                    return category;
                }).then((categoryId) => {
                    return accountsAPI.getUserIncome(user.id, categoryId);
                }).then((incomeArr) => {
                    return filterIncome(incomeArr);
                }).then((response) => {
                    setIncome(response);
                }).catch((error) => {
                    console.log(error);
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
                    <PageHeader>My Budget Buddy</PageHeader>
                    <div className="md:grid-cols-12 grid gap-2">
                        <div className=" sm:col-span-5 sm:order-1">
                            <div className=" text-center font-bold text-xl pb-1">Analysis</div>
                            <div className="rounded-md border-gray-100 shadow-lg pt-2  bg-white">
                                <h3 className="font-bold text-center mt-2">
                                    Budget Breakdown
                                </h3>
                                <div className="">
                                    <PieDataChart data={ pieData }/>
                                </div>
                            </div>
                            <div className="rounded-md border-gray-100 bg-white p-3 m-2 shadow-lg">
                                <h3 className="font-bold text-center pb-2">
                                    Income
                                </h3>
                                <div className="flex flex-row justify-between ">
                                    {income.map((income, idx) => 
                                        <IncomeDisplayComp income={income} key={idx}/>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="md:w-200 sm:col-span-7 sm:order-2">
                            <div className="w-full ">
                                <div
                                    className="grid grid-cols-3  md:grid-cols-3 md:justify-items-end px-3 justify-items-end font-bold md:text-xl">
                                        <div className="col-span-1 md:col-span-1 justify-self-start">Expenses</div>
                                        <div className="col-span-1 md:col-span-1">Budget</div>
                                        <div className="col-span-1 md:col-span-1">Remaining</div>
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
            </div>
        </>
    )
}

