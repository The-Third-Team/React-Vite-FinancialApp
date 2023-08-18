import React from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../../components/PageHeader/PageHeader';
import BudgetCategoryField from '../BudgetCategoryField/BudgetCategoryField';
import BudgetCategoryContainer from '../BudgetCategoryContainer/BudgetCategoryContainer.jsx';

export default function BudgetOnboardingGroup({budgetData, editBudgetData, categories, currentGroupIdx, createUserBudget, groupInfo, updateGroupIdx}) {


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

    <Link to={'/'} className='flex justify-start items-center px-8 py-2 w-full'>
        <div className='text-[24px]'>
            <i className='icon flaticon-close'></i>
        </div>
    </Link>

    <PageHeader>{groupInfo.name}</PageHeader>

    <div className='flex justify-center items-center w-[200px] h-[200px] rounded-[50%]'>
        <img src={groupInfo.image} className='rounded-[50%] h-[196px] w-[196px]'/>
    </div>

    <div className='mt-4 mb-8 text-[14px] w-[60%] text-center'>
        {currentGroupIdx === 0 ? 'Let\'s get started!' : ''}
        <br />
        {description}
        <span className='font-bold'>{groupInfo.name}</span>?
    </div>

    
    <BudgetCategoryContainer categories={categories} budgetData={budgetData} editBudgetData={editBudgetData}/>    


    {/* Buttons */}
    <div className='flex items-center justify-between w-[80%] mt-8'>
        {currentGroupIdx > 0 ?
            <button className='flex justify-center items-center px-8 py-2' onClick={handleShowPrev}>
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
        <button className='flex justify-center items-center px-8 py-2 bg-gray-400 rounded-lg' onClick={handleCreateBudget}>
            <div className='text-[12px] font-medium'>
                Submit
            </div>
        </button>
        }
    </div>

    </div>
  )
}
