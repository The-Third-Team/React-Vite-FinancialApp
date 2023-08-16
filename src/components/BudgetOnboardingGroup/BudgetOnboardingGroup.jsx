import React from 'react'
import { Link, useParams } from 'react-router-dom'
import BudgetSubcategoryField from '../../components/BudgetSubcategoryField/BudgetSubcategoryField';
import PageHeader from '../../components/PageHeader/PageHeader';

export default function BudgetOnboardingGroup({groupID, groupName, subCategories}) {
  return (
    <div className='flex flex-col items-center justify-center h-[100vh]'>

    <PageHeader>Category</PageHeader>

    <div className='w-[200px] h-[200px] bg-gray-400 border-black border-[1px]'>
        Image
    </div>

    <div className='mt-4 mb-12 text-[12px]'>
        Description/Instruction Text
    </div>

    <div className='flex flex-col w-[80%]'>
        {/* This will be a map function, mapping each category group's subcategories */}
        <BudgetSubcategoryField name={'Rent / Mortgage'} amount={0}/>
        <BudgetSubcategoryField name={'Car / Transportation'} amount={0}/>
        <BudgetSubcategoryField name={'Insurance'} amount={0}/>
        <BudgetSubcategoryField name={'Utilities'} amount={0}/>
    </div>
    
    <div className='flex items-center justify-end w-full mt-8'>
        <Link to={`/budget/${parseInt(groupID) + 1}`} className='flex justify-center items-center mr-20 px-8 py-2 bg-gray-400 rounded-lg'>
            <div className='text-[12px]'>
                Next
            </div>
        </Link>
    </div>

    <Link to={'/'} className='flex justify-center items-center mt-4 px-8 py-2 bg-gray-400 rounded-lg'>
        <div className='text-[12px]'>
            Back to Dash (just for testing)
        </div>
    </Link>

</div>
  )
}
