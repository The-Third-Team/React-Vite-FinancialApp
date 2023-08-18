import React, { useState, useEffect } from 'react'

import bills from '../../assets/images/bills.png'
import food from '../../assets/images/food.jpeg'
import shopping from '../../assets/images/shopping.png'
import entertainment from '../../assets/images/entertainment.jpeg'

import BudgetOnboardingGroup from '../../components/BudgetOnboardingGroup/BudgetOnboardingGroup';

export default function BudgetOnboardingPage({categories, createUserBudget}) {

    const [budgetData, setBudgetData] = useState({})

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

  return (
    <>
        <BudgetOnboardingGroup budgetData={budgetData} editBudgetData={editBudgetData} createUserBudget={createUserBudget} categories={currentGroupCategories} currentGroupIdx={currentGroupIdx} groupInfo={categoryGroups[currentGroupIdx]} updateGroupIdx={updateGroupIdx}/>
    </>
  )
}
