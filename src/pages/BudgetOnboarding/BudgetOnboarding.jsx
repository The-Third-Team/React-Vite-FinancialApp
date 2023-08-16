import React from 'react'
import { Link, useParams } from 'react-router-dom'

export default function BudgetOnboarding() {

    const { groupID } = useParams();

  return (
    <div className='flex flex-col items-center justify-center h-[100%]'>
        <div className='font-black text-xl mt-16 mb-8'>
            Category
        </div>

        <div className='w-[200px] h-[200px] bg-gray-400 border-black border-[1px]'>
            Image
        </div>

        <div className='mt-4 mb-12 text-[12px]'>
            Description/Instruction Text
        </div>

        <div className='flex flex-col w-[80%]'>
            <div className='flex justify-between mb-8'>
                <div className='flex justify-end w-[60%]'>
                    <div>Rent / Mortgage</div>
                </div>
                <div className='flex px-8 py-1 border-black border-[1px] rounded-sm'>
                    <div>
                        $
                    </div>
                    {/* <input className='bg-red-200' placeholder=''/> */}
                </div>
            </div>
            <div className='flex justify-between mb-8'>
                <div className='flex justify-end w-[60%]'>
                    <div>Car / Transportation</div>
                </div>
                <div>
                    $
                </div>
            </div>
            <div className='flex justify-between mb-8'>
                <div className='flex justify-end w-[60%]'>
                    <div>Insurance</div>
                </div>
                <div>
                    $
                </div>
            </div>
            <div className='flex justify-between mb-8'>
                <div className='flex justify-end w-[60%]'>
                    <div>Utilities</div>
                </div>
                <div>
                    $
                </div>
            </div>
        </div>
        
        <div className='flex items-center justify-end w-full mt-8'>
            <Link to={`/budget/${groupID + 1}`} className='flex justify-center items-center mr-20 px-8 py-2 bg-gray-400 rounded-lg'>
                <div className='text-[12px]'>
                    Next
                </div>
            </Link>
        </div>
        

    </div>
  )
}
