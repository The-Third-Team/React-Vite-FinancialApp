import React, { useState } from 'react'
import Navbar from '../../components/NavBar/Navbar'

import * as categoriesAPI from '../../utilities/categories-api'
import AccountCard from '../../components/AccountCard/AccountCard'
import AccountWidget from '../../components/AccountWidget/AccountWidget'
import TransactionDay from '../../components/TransactionDay/TransactionDay'
import TransactionItem from '../../components/TransactionItem/TransactionItem'

export default function Dashboard() {

  const [categories, setCategories] = useState([])

  const [focusedAccount, setFocusedAccount] = useState('')

  const getCategories = async () => {
    const fetchedCategories = await categoriesAPI.getAllCategories();
    setCategories(fetchedCategories)
    console.log(fetchedCategories)
  }

  const handleClickAccount = (account) => {
    if (focusedAccount !== account) {
      setFocusedAccount(account)
    } else {
      setFocusedAccount('')
    }
  }

  

  return (
    <div className='grid grid-cols-[15vw_85vw]'>
      <Navbar/>
      <div>
        <div className='fixed top-8 flex flex-col items-center w-[85vw]'>

          <div className='flex flex-col items-center w-full'> 
            <AccountCard accountName={'CHECKING'} accountBalance={500} handleClickAccount={handleClickAccount} isFocused={focusedAccount === 'CHECKING'}/>
            <AccountCard accountName={'SAVINGS'} accountBalance={2000} handleClickAccount={handleClickAccount} isFocused={focusedAccount === 'SAVINGS'}/>
            <AccountCard accountName={'CREDIT'} accountBalance={1200} handleClickAccount={handleClickAccount} isFocused={focusedAccount === 'CREDIT'}/>
          </div>

          <div className='flex w-full justify-center'>
            <AccountWidget name={'Manage Card'} linkTo={''}/>
            <AccountWidget name={'Statements'} linkTo={''}/>
            <AccountWidget name={'Budget Plan'} linkTo={'/budget/1'}/>
          </div>

          <div className='flex justify-center w-full my-4'>
            <input className='w-[90%] p-2 pl-8 border-gray-400 border-[1px] rounded-[4px] text-center text-[10px]' placeholder='keyword, amount, or mm/dd/yy'/>
          </div>

          <div className='w-full border-black border-[1px]'></div>

          {/* Transaction history */}
          <div className='mt-4 h-auto'>
            <TransactionDay />
            <TransactionItem />
            <TransactionDay />
            <TransactionItem />
            <TransactionDay />
            <TransactionItem />
            <TransactionDay />
            <TransactionItem />
            <TransactionDay />
            <TransactionItem />
            <TransactionDay />
            <TransactionItem />
            <TransactionDay />
            <TransactionItem />
            <TransactionDay />
            <TransactionItem />
            <TransactionDay />
            <TransactionItem />
            <TransactionDay />
            <TransactionItem />
            <TransactionDay />
            <TransactionItem />
            <TransactionDay />
            <TransactionItem />
            <TransactionDay />
            <TransactionItem />
            <TransactionDay />
            <TransactionItem />
            <TransactionDay />
            <TransactionItem />
          </div>
          

        </div>
      </div>
    </div>
  )
}
