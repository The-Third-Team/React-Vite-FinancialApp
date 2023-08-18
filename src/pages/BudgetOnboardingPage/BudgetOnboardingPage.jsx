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
        console.log('budgetData: ', budgetData)
    }, [])

    useEffect(() => {
        getGroupCategories(currentGroupIdx)
    }, [currentGroupIdx])


    const getGroupCategories = () => {
        console.log('categories: ', categories)
        const groupCategories = categories.filter((category) => category.group === categoryGroups[currentGroupIdx].name)
        console.log('categoryGroups: ', groupCategories)
        setCurrentGroupCategories(groupCategories)
    }

    const initializeEmptyBudget = () => {
        let i = 0
        const initialBudgetData = {}
        console.log(categories)
        for (const category of categories) {
            initialBudgetData[category.name] = ''
            i++
        }
        console.log(initialBudgetData)
        setBudgetData(initialBudgetData)
    }

    const editBudgetData = (field, amount) => {
        setBudgetData({...budgetData, [field]: amount})
        console.log('budgetData: ', budgetData)
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
