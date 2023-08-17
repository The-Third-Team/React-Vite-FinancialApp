import React from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../../components/PageHeader/PageHeader';
import BudgetCategoryField from '../BudgetCategoryField/BudgetCategoryField';
import BudgetCategoryContainer from '../BudgetCategoryContainer/BudgetCategoryContainer.jsx';

export default function BudgetOnboardingGroup({budgetData, editBudgetData, categories, currentGroupIdx, createUserBudget, groupName, updateGroupIdx}) {


    const handleShowNext = () => {
        updateGroupIdx(1)
    }

    const handleShowPrev = () => {
        updateGroupIdx(-1)
        console.log(currentGroupIdx)
    }

    const handleCreateBudget = () => {
        console.log(createUserBudget)
        createUserBudget(budgetData)
    }

    const description = currentGroupIdx !== 3 ? 'How much do you plan to spend monthly on ' : 'Finally, how much do you plan to spend monthly on '

  return (

    
    <div className='flex flex-col items-center justify-center h-[100vh]'>

    <PageHeader>{groupName}</PageHeader>

    <div className='w-[200px] h-[200px] bg-gray-400 border-black border-[1px]'>
        Image
    </div>

    <div className='mt-4 mb-12 text-[14px] w-[60%] text-center'>
        {currentGroupIdx === 0 ? 'Let\'s get started!' : ''}
        <br />
        {description}
        <span className='font-bold'>{groupName}</span>?
    </div>

    
    <BudgetCategoryContainer categories={categories} budgetData={budgetData} editBudgetData={editBudgetData}/>    


    {/* Buttons */}
    <div className='flex items-center justify-between w-[80%] mt-8'>
        {currentGroupIdx > 0 ?
            <button className='flex justify-center items-center px-8 py-2 bg-gray-400 rounded-lg' onClick={handleShowPrev}>
                <div className='text-[12px]'>
                    Back
                </div>
            </button>
        :
            <div></div>
        }
        
        {currentGroupIdx < 3 ?
        <button className='flex justify-center items-center px-8 py-2 bg-gray-400 rounded-lg' onClick={handleShowNext}>
            <div className='text-[12px]'>
                Next
            </div>
        </button>
        :
        <button className='flex justify-center items-center px-8 py-2 bg-gray-400 border-black border-[1px] rounded-lg' onClick={handleCreateBudget}>
            <div className='text-[12px]'>
                Submit
            </div>
        </button>
        }
    </div>

    <Link to={'/'} className='flex justify-center items-center mt-4 px-8 py-2 bg-gray-400 rounded-lg'>
        <div className='text-[12px]'>
            Back to Dash (just for testing)
        </div>
    </Link>

    </div>
  )
}
