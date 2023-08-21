import React, { useEffect, useState, useContext } from 'react'

// Context
import { AuthContext } from '../App/App'

// APIs
import * as budgetsAPI from '../../utilities/budgets-api'
import * as categoriesAPI from '../../utilities/categories-api'

// Components
import BudgetOverviewPage from '../BudgetOverviewPage/BudgetOverviewPage'
import BudgetOnboardingPage from '../BudgetOnboardingPage/BudgetOnboardingPage'

export default function BudgetPage({}) {

    // Authorization / User Context
    const { user, setUser } = useContext(AuthContext)

    // State
    const [budgetCategories, setBudgetCategories] = useState([])
    const [budget, setBudget] = useState([])
    const [isNewBudget, setIsNewBudget] = useState(false)


    // useEffect: if user does not have a budget, immediately load the budget onboarding page
    useEffect(() => {
        getBudgetCategories()
        getUserBudget()
    }, [])

    // useEffect helper functions
    const getBudgetCategories = async () => {
        const retrievedCategories = await categoriesAPI.getFilteredCategories();
        setBudgetCategories(retrievedCategories)
    }

    const getUserBudget = async () => {
        try {
            const userBudget = await budgetsAPI.getUserBudget(user.id)
            if (userBudget.length === 0) {
                setIsNewBudget(true)
            }
            setBudget(userBudget)
        } catch (error) {
            console.log(error)
        }
    }
  
    // Handler: takes care of budget creation using data provided from the onboarding process
    const createUserBudget = async (budgetData) => {
        const budgetsToBeCreated = []
        for (let key in budgetData) {
            if (!budgetData[key]) {
                budgetData[key] = 0
            }
            const individualBudgetData = {
                userId: user.id,
                name: key,
                budget: parseInt(budgetData[key])
            }
            for (let category of budgetCategories) {
                if (key === category.name) {
                    individualBudgetData.categoryId = category.id
                }
            }
            budgetsToBeCreated.push(individualBudgetData)
        }
        const res = await budgetsAPI.createUserBudget(
            {budgets: budgetsToBeCreated}
        )
        setBudget(res)
    }

  return (
    <>
    {isNewBudget ?
        <BudgetOnboardingPage
            budget={budget}
            categories={budgetCategories}
            createUserBudget={createUserBudget}
            />
        :
        <BudgetOverviewPage
            budget={budget}
            />
    }
    </>
  )
}
