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
    accountID: 1,
    date: 'Aug 13',
    merchant: '7-11',
    amount: '1234.00'
  },
  {
    accountID: 1,
    date: 'Aug 13',
    merchant: '7-11',
    amount: '1234.00'
  },
  {
    accountID: 1,
    date: 'Aug 13',
    merchant: '7-11',
    amount: '1234.00'
  },
  {
    accountID: 2,
    date: 'Aug 13',
    merchant: 'Walmart',
    amount: '200.00'
  },
  {
    accountID: 2,
    date: 'Aug 13',
    merchant: 'Walmart',
    amount: '200.00'
  },
  {
    accountID: 2,
    date: 'Aug 13',
    merchant: 'Walmart',
    amount: '200.00'
  },
  {
    accountID: 3,
    date: 'Aug 13',
    merchant: 'CVS',
    amount: '100.00'
  },
  {
    accountID: 3,
    date: 'Aug 13',
    merchant: 'CVS',
    amount: '100.00'
  },
  {
    accountID: 3,
    date: 'Aug 13',
    merchant: 'CVS',
    amount: '100.00'
  },
  {
    accountID: 1,
    date: 'Aug 12',
    merchant: '7-11',
    amount: '1234.00'
  },
  {
    accountID: 1,
    date: 'Aug 12',
    merchant: '7-11',
    amount: '1234.00'
  },
  {
    accountID: 1,
    date: 'Aug 12',
    merchant: '7-11',
    amount: '1234.00'
  },
  {
    accountID: 2,
    date: 'Aug 12',
    merchant: 'Walmart',
    amount: '200.00'
  },
  {
    accountID: 2,
    date: 'Aug 12',
    merchant: 'Walmart',
    amount: '200.00'
  },
  {
    accountID: 2,
    date: 'Aug 12',
    merchant: 'Walmart',
    amount: '200.00'
  },
  {
    accountID: 3,
    date: 'Aug 12',
    merchant: 'CVS',
    amount: '100.00'
  },
  {
    accountID: 3,
    date: 'Aug 12',
    merchant: 'CVS',
    amount: '100.00'
  },
  {
    accountID: 3,
    date: 'Aug 12',
    merchant: 'CVS',
    amount: '100.00'
  },
  {
    accountID: 1,
    date: 'Aug 10',
    merchant: '7-11',
    amount: '1234.00'
  },
  {
    accountID: 1,
    date: 'Aug 10',
    merchant: '7-11',
    amount: '1234.00'
  },
  {
    accountID: 1,
    date: 'Aug 10',
    merchant: '7-11',
    amount: '1234.00'
  },
  {
    accountID: 2,
    date: 'Aug 10',
    merchant: 'Walmart',
    amount: '200.00'
  },
  {
    accountID: 2,
    date: 'Aug 10',
    merchant: 'Walmart',
    amount: '200.00'
  },
  {
    accountID: 2,
    date: 'Aug 10',
    merchant: 'Walmart',
    amount: '200.00'
  },
  {
    accountID: 3,
    date: 'Aug 10',
    merchant: 'CVS',
    amount: '100.00'
  },
  {
    accountID: 3,
    date: 'Aug 10',
    merchant: 'CVS',
    amount: '100.00'
  },
  {
    accountID: 3,
    date: 'Aug 10',
    merchant: 'CVS',
    amount: '100.00'
  },
]

const AccountIDs = {
  CHECKING: 1,
  SAVINGS: 2,
  CREDIT: 3
}

export default function Dashboard() {

  const [categories, setCategories] = useState([])

  const [searchTerms, setSearchTerms] = useState('')

  const [selectedAccount, setSelectedAccount] = useState('')

  const [shownTransactions, setShownTransactions] = useState()

  // formats dummy transaction data into corresponding dates and accounts
  const allTransactionDates = new Set(Transactions.map((transaction) => transaction.date))

  // we probably dont need this on this page
  const getCategories = async () => {
    const fetchedCategories = await categoriesAPI.getAllCategories();
    setCategories(fetchedCategories)
    console.log(fetchedCategories)
  }

  // stubbed this up in case we need it
  const getTransactionsByAccount = async (account) => {
    return
    // const fetchedTransactions = await transactionsAPI.getTransactionsByAccount(accountID)
    // setShownTransactions(fetchedTransactions)
  }

  const handleClickAccount = (account) => {
    setSelectedAccount(account)
    // ** This is an option if we want all accounts to be collapsable
    // if (selectedAccount !== account) {
    //   setSelectedAccount(account)
    // } else {
    //   setSelectedAccount('')
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
            <AccountCard accountName={'CHECKING'} accountBalance={500} handleClickAccount={handleClickAccount} isSelected={selectedAccount === 'CHECKING'}/>
            <AccountCard accountName={'SAVINGS'} accountBalance={2000} handleClickAccount={handleClickAccount} isSelected={selectedAccount === 'SAVINGS'}/>
            <AccountCard accountName={'CREDIT'} accountBalance={1200} handleClickAccount={handleClickAccount} isSelected={selectedAccount === 'CREDIT'}/>
          </div>

          <div className='flex w-full justify-center'>
            <AccountWidget name={'Manage Card'} linkTo={''}/>
            <AccountWidget name={'Statements'} linkTo={''}/>
            <AccountWidget name={'Budget Plan'} linkTo={'/budget'}/>
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
        {/* <div className='h-auto'>
          {allTransactionDates.map((date) => {
            Transactions.filter((transaction) => transaction.date === date && transaction.accountID === selectedAccount)
          })}
        </div> */}
        <div>
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
