import React, { useState, useEffect } from 'react'

import bills from '../../assets/images/bills.png'
import shopping from '../../assets/images/shopping.png'
import entertainment from '../../assets/images/entertainment.png'

import BudgetOnboardingGroup from '../../components/BudgetOnboardingGroup/BudgetOnboardingGroup';
import BudgetOnboardingLanding from '../BudgetOnboardingLanding/BudgetOnboardingLanding'

export default function BudgetOnboardingPage({categories, createUserBudget}) {

    const [budgetData, setBudgetData] = useState({})
    const [startedOnboarding, setStartedOnboarding] = useState(false)

    const categoryGroups = [
        {name: 'Bills',
        image: bills},
        {name: 'Food & Dining',
        image: null},
        {name: 'Shopping',
        image: shopping},
        {name: 'Entertainment',
        image: entertainment}
    ]

    const [currentGroupIdx, setCurrentGroupIdx] = useState(0)

    const [currentGroupCategories, setCurrentGroupCategories] = useState([])

    useEffect(() => {
        initializeEmptyBudget()
        getGroupCategories(currentGroupIdx)
    }, [])

    useEffect(() => {
        getGroupCategories(currentGroupIdx)
    }, [currentGroupIdx])


    const getGroupCategories = () => {
        const groupCategories = categories.filter((category) => category.group === categoryGroups[currentGroupIdx].name)
        setCurrentGroupCategories(groupCategories)
    }

    const initializeEmptyBudget = () => {
        const initialBudgetData = {}
        for (const category of categories) {
            initialBudgetData[category.name] = ''
        }
        setBudgetData(initialBudgetData)
    }

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
        <BudgetOnboardingGroup budgetData={budgetData} editBudgetData={editBudgetData} createUserBudget={createUserBudget} categories={currentGroupCategories} currentGroupIdx={currentGroupIdx} groupInfo={categoryGroups[currentGroupIdx]} updateGroupIdx={updateGroupIdx} updateStartOnboarding={updateStartOnboarding}/>
        :
        <BudgetOnboardingLanding updateStartOnboarding={updateStartOnboarding}/>
    }
        
    </>
  )
}
