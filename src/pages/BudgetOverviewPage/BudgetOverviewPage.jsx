import React, {useEffect} from 'react'
import Navbar from '../../components/NavBar/Navbar'
import PageHeader from '../../components/PageHeader/PageHeader'



export default function BudgetOverviewPage() {


  return (
    <>
      <Navbar/>
      <div className='ml-[15vw] w-[85vw]'>
        <div className='flex flex-col items-center w-[85vw]'>
          <PageHeader>YOUR BUDGET</PageHeader>
            <div 
              className="border-2 border-gray-100 rounded-md p-10"
                >Flowbite pie chart here</div>

            <div
                className="flex"
                >Income</div>
            <div
              className="border-2 border-gray-100 rounded-md p-5"
              >
                <div
                  className="flex flex-row justify-between ">
                    <div
                        className="text-gray-300 text-xs">
                        MEADE PUBLICATIONS*MODE</div>
                    <div
                      className="text-xl font-bold"
                      >$1,234</div>
                </div>
            </div>


            <div
              className="grid grid-cols-6 justify-between">
                <div className="col-span-2">Expenses</div>
                <div className="col-span-2">Budget</div>
                <div className="col-span-1">Remaining</div>
            </div>

        </div>


      </div>

    </>
  )
}

