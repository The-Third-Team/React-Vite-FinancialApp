import React, { useState, useEffect } from 'react'

import BudgetOnboardingGroup from '../../components/BudgetOnboardingGroup/BudgetOnboardingGroup';

export default function BudgetOnboardingPage({categories, createUserBudget}) {

    const [budgetData, setBudgetData] = useState({})

    const categoryGroups = ['Bills', 'Food & Dining', 'Shopping', 'Entertainment']

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
        const groupCategories = categories.filter((category) => category.group === categoryGroups[currentGroupIdx])
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

  return (
    <>
        <BudgetOnboardingGroup budgetData={budgetData} editBudgetData={editBudgetData} createUserBudget={createUserBudget} categories={currentGroupCategories} currentGroupIdx={currentGroupIdx} groupName={categoryGroups[currentGroupIdx]} updateGroupIdx={updateGroupIdx}/>
    </>
  )
}
