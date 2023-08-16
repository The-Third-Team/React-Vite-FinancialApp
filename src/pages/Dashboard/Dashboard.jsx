import React, { useState } from 'react'
import Navbar from '../../components/NavBar/Navbar'

import * as categoriesAPI from '../../utilities/categories-api'
import AccountCard from '../../components/AccountCard/AccountCard'
import AccountWidget from '../../components/AccountWidget/AccountWidget'
import TransactionDay from '../../components/TransactionDay/TransactionDay'
import TransactionItem from '../../components/TransactionItem/TransactionItem'
import PageHeader from '../../components/PageHeader/PageHeader'

const Transactions = [
  {
    date: 'Aug 13',
    merchant: '7-11',
    amount: '1234.00'
  },
  {
    date: 'Aug 13',
    merchant: '7-11',
    amount: '1234.00'
  },
  {
    date: 'Aug 13',
    merchant: '7-11',
    amount: '1234.00'
  },
  {
    date: 'Aug 13',
    merchant: '7-11',
    amount: '1234.00'
  },
  {
    date: 'Aug 13',
    merchant: '7-11',
    amount: '1234.00'
  },
  {
    date: 'Aug 13',
    merchant: '7-11',
    amount: '1234.00'
  },
  {
    date: 'Aug 13',
    merchant: '7-11',
    amount: '1234.00'
  }
]

export default function Dashboard() {

  const [categories, setCategories] = useState([])

  const [searchTerms, setSearchTerms] = useState('')

  const [focusedAccount, setFocusedAccount] = useState('')

  // we probably dont need this on this page
  const getCategories = async () => {
    const fetchedCategories = await categoriesAPI.getAllCategories();
    setCategories(fetchedCategories)
    console.log(fetchedCategories)
  }

  const getTransactionsByAccount = async (account) => {
    return
    // const fetchedTransactions = await transactionsAPI.getTransactionsByAccount(accountID)
    // setShownTransactions(fetchedTransactions)
  }

  const handleClickAccount = (account) => {
    setFocusedAccount(account)
    // ** This is an option if we want all accounts to be collapsable
    // if (focusedAccount !== account) {
    //   setFocusedAccount(account)
    // } else {
    //   setFocusedAccount('')
    // }
  }

  return (
    <div>
      <Navbar/>
      <div className='ml-[15vw] w-[85vw]'>
      {/* fixed top-0  */}
        <div className='flex flex-col items-center w-[85vw]'>

          <PageHeader>YOUR ACCOUNTS</PageHeader>

          <div className='flex flex-col items-center w-full h-[24vh]'> 
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
            <div className='flex w-[88%] p-2 border-gray-400 border-[1px] rounded-[4px] text-[12px]'>
              <span className='mr-2'>🔍</span>
              <input className='w-full' value={searchTerms} onChange={(e) => setSearchTerms(e.target.value)} placeholder='keyword, amount, or mm/dd/yy'/>
            </div>
          </div>

          <div className='w-full border-black border-[1px]'></div>
          
        </div>

        {/* Transaction history */}
        {/* Need to figure out why this isn't scrollable */}
        <div className='h-auto'>
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
  )
}
