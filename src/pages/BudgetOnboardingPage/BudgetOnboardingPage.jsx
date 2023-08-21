import React, { useState, useEffect } from 'react'

// API
import * as categoriesAPI from '../../utilities/categories-api'

// Images (for category groups)
import bills from '../../assets/images/bills.png'
import food from '../../assets/images/food.png'
import shopping from '../../assets/images/shopping.png'
import entertainment from '../../assets/images/entertainment.png'

// Components 
import BudgetOnboardingGroup from '../../components/BudgetOnboardingGroup/BudgetOnboardingGroup';
import BudgetOnboardingLanding from '../BudgetOnboardingLanding/BudgetOnboardingLanding'

export default function BudgetOnboardingPage({categories, createUserBudget}) {

    // State
    const [budgetData, setBudgetData] = useState({})
    const [startedOnboarding, setStartedOnboarding] = useState(false)
    const [currentGroupIdx, setCurrentGroupIdx] = useState(0)
    const [currentGroupCategories, setCurrentGroupCategories] = useState([])

    // Predefined category groups with corresponding images for each slide
    const categoryGroups = [
        {name: 'Bills',
        image: bills},
        {name: 'Food & Dining',
        image: food},
        {name: 'Shopping',
        image: shopping},
        {name: 'Entertainment',
        image: entertainment}
    ]

    // useEffects
    useEffect(() => {
        // creates an object containing all categories of a budget, with empty values for all fields
        const initialBudgetData = {}
        for (const category of categories) {
            initialBudgetData[category.name] = ''
        }
        setBudgetData(initialBudgetData)
        getGroupCategories(currentGroupIdx)
    }, [])

    useEffect(() => {
        getGroupCategories(currentGroupIdx)
    }, [currentGroupIdx])

    // useEffect functions
    const getGroupCategories = () => {
        const groupCategories = categories.filter((category) => category.group === categoryGroups[currentGroupIdx].name)
        setCurrentGroupCategories(groupCategories)
    }

    // Helper functions
    const editBudgetData = (field, amount) => {
        setBudgetData({...budgetData, [field]: amount})
    }

    const updateGroupIdx = (value) => {
        const nextIdx = currentGroupIdx + value;
        setCurrentGroupIdx(nextIdx)
    }

    const updateStartOnboarding = (bool) => {
        setStartedOnboarding(bool)
    }

  return (
    <>
    {startedOnboarding ? 
        <BudgetOnboardingGroup
            budgetData={budgetData}
            editBudgetData={editBudgetData}
            createUserBudget={createUserBudget}
            categories={currentGroupCategories}
            currentGroupIdx={currentGroupIdx}
            groupInfo={categoryGroups[currentGroupIdx]}
            updateGroupIdx={updateGroupIdx}
            updateStartOnboarding={updateStartOnboarding}
            />
        :
        <BudgetOnboardingLanding 
            updateStartOnboarding={updateStartOnboarding}
            />
    }
    </>
  )
}
