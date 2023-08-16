import React, { useEffect, useState, useContext } from 'react'

import { AuthContext } from '../App/App'

import * as budgetsAPI from '../../utilities/budgets-api'

import BudgetOverviewPage from '../BudgetOverviewPage/BudgetOverviewPage'
import BudgetOnboardingPage from '../BudgetOnboardingPage/BudgetOnboardingPage'

// use this as a template for the data object to send for back end
// const initialBudget = {
//     "name":"Car",   // name of budget field, as a string
//     "budget":200,   //budget value, as an int
//     "categoryId":7, // category id, as an in
//     "userId": 1     // userId, as an int
// }
// 👍
//"categoryId"| "name"
//   1        | Restaurant    | Restaurant related transaction    | Food & Dining
//   2        | Grocery       | Grocery related transaction       | Food & Dining
//   3        | Coffee Shops  | Coffee related transaction        | Food & Dining
//   4        | Clothing      | Clothing related transaction      | Shopping
//   5        | Jewelry       | Jewelry related transaction       | Shopping
//   6        | Rent/Mortgage | Rent/Mortgage related transaction | Bills
//   7        | Car           | Car related transaction           | Bills
//   8        | Insurance     | Insurance related transaction     | Bills
//   9        | Utilities     | Utilities related transaction     | Bills
//   10       | Movies        | Movies related transaction        | Entertainment
//   11       | Streaming     | Streaming related transaction     | Entertainment
//   12       | Activities    | Activities related transaction    | Entertainment

export default function BudgetPage() {

    const { user, setUser } = useContext(AuthContext)

    const [budget, setBudget] = useState([])
    const [newBudget, setNewBudget] = useState(false)

    // if user does not have a budget, immediately load the budget onboarding page

    useEffect(() => {
        async function getUserBudget() {
            try {
                const userBudget = await budgetsAPI.getUserBudget(user.id)
                if (userBudget.length === 0) {
                setNewBudget(true)
                }
                setBudget(userBudget)
            } catch (error) {
                console.log(error)
            }
        }
        getUserBudget();
    }, [])
  
    const createUserBudget = async (budgetData) => {
        const createdBudget = await budgetsAPI.createUserBudget(user.id, budgetData);
        console.log(createdBudget);
        setBudget(createdBudget);
    }

    const updateUserBudget = async (updatedBudgetData) => {
        const updatedBudget = await budgetsAPI.updateUserBudget(user.id, updatedBudgetData);
        console.log(createdBudget);
        setBudget(updatedBudget);
    }


  return (
    <>
    {userBudget ?
    <BudgetOverviewPage budget={budget}/>
    :
    <BudgetOnboardingPage budget={budget} createUserBudget={createUserBudget} updateUserBudget={updateUserBudget}/>
    }
    </>
  )
}
