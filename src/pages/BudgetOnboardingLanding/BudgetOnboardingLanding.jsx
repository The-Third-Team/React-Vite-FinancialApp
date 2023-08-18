import React from 'react'
import { Link } from 'react-router-dom'

import creditCards from '../../assets/images/creditcards.png'

import exit from '../../assets/images/exit.png'

export default function BudgetOnboardingLanding({updateStartOnboarding}) {

    const handleClick = () => {
        updateStartOnboarding(true)
    }

  return (
    <div className='flex flex-col items-center h-[100vh]'>

        <div className='fixed top-[-600px] w-[1000px] h-[1000px] bg-[#F5EDFF] rounded-[50%] z-[-10]'></div>

        <Link to={'/'} className='flex justify-start items-center px-8 py-2 w-full mt-6'>
            <div className='text-[24px]'>
                <img src={exit} />
            </div>
        </Link>

        <div className='text-[36px] font-black mx-[15%] text-center leading-9 mt-4'>
            Save more each day. One plan at a time.
        </div>

        <div className='flex justify-center items-center w-[360px] h-[280px] rounded-[50%]'>
            <img src={creditCards} className='flex-grow'/>
        </div>

        <div className='text-[18px] mb-6 w-[80%] font-medium text-center'>
            Tired of overspending? We get it.
        </div>   

        <div className='text-[18px] mb-6 w-[80%] font-medium text-center'>
            Curate better habits by <span className='text-[#9747FF]'>setting your budget limits</span> in a few categories:
        </div>

        <ul className='list-disc text-[18px] font-medium'>
            <li>Bills</li>
            <li>Food & Dining</li>
            <li>Shopping</li>
            <li>Entertainment</li>
        </ul>

        <div className='text-[20px] font-bold mt-6'>
            Let's get started!
        </div>

        {/* Buttons */}
        <div className='flex items-center justify-end w-[80%] mt-8 mb-4'>

            <button className='flex justify-center items-center px-10 py-3 bg-[#3C6B04] text-white rounded-lg mb-4' onClick={handleClick}>
                <div className='text-[18px] font-medium'>
                    Next
                </div>
            </button>

        </div>

    </div>
  )
}
