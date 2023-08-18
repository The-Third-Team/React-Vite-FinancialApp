import React from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../../components/PageHeader/PageHeader';
import BudgetCategoryContainer from '../BudgetCategoryContainer/BudgetCategoryContainer.jsx';

export default function BudgetOnboardingGroup({budgetData, editBudgetData, categories, currentGroupIdx, createUserBudget, groupInfo, updateGroupIdx, updateStartOnboarding}) {


    const handleShowNext = () => {
        updateGroupIdx(1)
    }

    const handleShowPrev = () => {
        updateGroupIdx(-1)
    }

    const handleCreateBudget = () => {
        createUserBudget(budgetData)
    }

    const handleBackToLanding = () => {
        updateStartOnboarding(false)
    }

    const description = currentGroupIdx !== 3 ? 'How much do you plan to spend monthly on ' : 'Finally, how much do you plan to spend monthly on '

  return (

    
    
    <div className='flex flex-col items-center'>

    <div className='fixed top-[-600px] w-[1000px] h-[1000px] bg-[#F5EDFF] rounded-[50%] z-[-10]'></div>

    <Link to={'/'} className='flex justify-start items-center px-8 py-2 w-full mt-4'>
        <div className='text-[24px]'>
            <i className='icon flaticon-close'></i>
        </div>
    </Link>

    <PageHeader>{groupInfo.name.toUpperCase()}</PageHeader>

    <div className='flex justify-center items-center w-[300px] h-[270px] rounded-[50%]'>
        <img src={groupInfo.image} className='flex-grow'/>
    </div>

    <div className='mt-4 mb-8 text-[20px] w-[80%] text-medium text-center'>
        {description}
        <span className='font-bold text-[#9747FF]'>{groupInfo.name}</span>?
    </div>

    
    <BudgetCategoryContainer categories={categories} budgetData={budgetData} editBudgetData={editBudgetData}/>    


    {/* Buttons */}
    <div className='bottom-4 flex items-center justify-between w-[80%] mb-4'>
        {currentGroupIdx > 0 ?
            <button className='flex justify-center items-center px-10 py-3 text-[#52AD9C]' onClick={handleShowPrev}>
                <div className='text-[18px]'>
                    Back
                </div>
            </button>
        :
            <button className='flex justify-center items-center px-10 py-3 text-[#52AD9C]' onClick={handleBackToLanding}>
                <div className='text-[18px]'>
                    Back
                </div>
            </button>
        }
        
        {currentGroupIdx < 3 ?
        <button className='flex justify-center items-center px-10 py-3 bg-[#3C6B04] text-white rounded-lg' onClick={handleShowNext}>
            <div className='text-[18px] font-medium'>
                Next
            </div>
        </button>
        :
        <button className='flex justify-center items-center px-10 py-3 bg-[#3C6B04] text-white rounded-lg' onClick={handleCreateBudget}>
            <div className='text-[18px] font-medium'>
                Next
            </div>
        </button>
        }
    </div>

    </div>
  )
}
