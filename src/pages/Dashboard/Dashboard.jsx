import React, { useState, useEffect, useContext } from 'react'
import Navbar from '../../components/NavBar/Navbar'

import AccountCard from '../../components/AccountCard/AccountCard'
import AccountWidget from '../../components/AccountWidget/AccountWidget'
import PageHeader from '../../components/PageHeader/PageHeader'

import * as transactionsAPI from '../../utilities/transactions-api'
import * as accountsAPI from '../../utilities/accounts-api'

import manageCard from '../../assets/images/managecard.png'
import statements from '../../assets/images/statements.png'
import budgetPlan from '../../assets/images/budgetplan.png'

import { AuthContext } from '../App/App'

export default function Dashboard({}) {

  const { user, setUser } = useContext(AuthContext)

  const [userAccounts, setUserAccounts] = useState([])
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [transactionData, setTransactionData] = useState([])
  const [shownTransactions, setShownTransactions] = useState([])
  const [searchTerms, setSearchTerms] = useState('')
  const [displayTransactions, setDisplayTransactions] = useState(false)

  // formats dummy transaction data into corresponding dates and accounts

  useEffect(() => {
    console.log('here1')

    const getUserAccounts = async (userId) => {
      console.log('here2')
      try {
        await accountsAPI.getUserAccounts(userId)
        .then((res) => {
          console.log(res)
          setUserAccounts(res)
          setSelectedAccount(res[0])
        })
      } catch (error) {
        console.log(error)
      }
    }

    getUserAccounts(user.id)    
    
  }, [])

  useEffect(() => {

    setDisplayTransactions(false)

    const getAccountTransactions = async (accountId) => {
      try {
        await transactionsAPI.getAccountTransactions(accountId)
        .then((res) => {
          console.log(res)
          formatTransactions(res)
        })
      } catch (error) {
        console.log(error)
      }
    }

    const formatTransactions = (accountTransactions) => {
      // formats transactions into an array of structure [[date, [transactionsOnSaidDate]], ...]
      let options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'}
      accountTransactions.forEach((transaction) => {
        transaction.date = new Date(transaction.date).toLocaleString('en-US', options)
      })
      let datesAll = accountTransactions.map((transaction) => new Date(transaction.date))
      let dateSet = new Set(datesAll)
      let datesSorted = Array.from(dateSet).sort((a, b) => {
        return b - a
      });
      datesSorted = datesSorted.map((date) => date.toLocaleString('en-US', options))
      let transactionsByDate = []
      for (let i = 0; i < datesSorted.length; i++) {
        if (datesSorted[i] !== 'Invalid Date') {
          transactionsByDate.push([datesSorted[i], []])
        }
        for (let j = 0; j < accountTransactions.length; j++) {
          if (datesSorted[i] === accountTransactions[j].date && datesSorted[i] !== 'Invalid Date') {
            transactionsByDate[i][1].push(accountTransactions[j])
          }
        }
        if (transactionsByDate[i]) {
          transactionsByDate[i][0] = new Date(transactionsByDate[i][0]).toLocaleString('en-US', {month: 'short', day: 'numeric'})
        }
      }
      setTransactionData(transactionsByDate)
      setShownTransactions([...transactionsByDate])
      setTimeout(() => setDisplayTransactions(true), 85)
    }
    
    console.log('selectedAccount: ', selectedAccount)
    selectedAccount ? getAccountTransactions(selectedAccount.id) : '';
    formatTransactions(transactionData);
  }, [selectedAccount])


// this works as you type, however doesn't work on delete for some reason.
// For example, 's' will show shopping and UBER EATS, 'sh' will show shopping and not UBER EATS,
// but typing 'sh' and deleting the 'h', leaving just 's', will show shopping and not uber eats

  const handleSearch = (e) => {
    console.log(e.target.value)
    setSearchTerms(e.target.value)

    if (!e.target.value) {
      setShownTransactions([...transactionData])
    } else {
      setShownTransactions([...transactionData])
      const lowerSearchTerms = e.target.value.toLowerCase()
      console.log('lowerSearchTerms', lowerSearchTerms)
      const matchingTransactions = []
      shownTransactions.map((transactionDay) => {
        if (transactionDay[0].toLowerCase().includes(lowerSearchTerms)) {
          matchingTransactions.push(transactionDay)
        } else {
          const matchingDayTransactions = []
          for (let i = 0; i < transactionDay[1].length; i++) {
            if (transactionDay[1][i].amount.toString().includes(lowerSearchTerms) || transactionDay[1][i].description.toLowerCase().includes(lowerSearchTerms)) {
              matchingDayTransactions.push(transactionDay[1][i])
            }
          }
          if (matchingDayTransactions.length) {
            matchingTransactions.push([transactionDay[0], matchingDayTransactions])
          }
        }
      })

      setShownTransactions(matchingTransactions)
    }

  }

  return (
    <div>
      <Navbar/>
      {/* bg-[#F3EFEF] */}
      <div className='ml-[15vw] w-[85vw]'>
      {/* fixed top-0  */}
        <div className='flex flex-col items-center w-[85vw] z-[5]'>

          <div className='fixed top-[-700px] w-[1000px] h-[1000px] bg-[#B0E6DB] rounded-[50%] z-[-10]'></div>

          <PageHeader>Your Transactions</PageHeader>

          <div className='w-[90%] text-[14px] italic'>Welcome back, {user.firstName}!</div>

          <div className='flex flex-col items-center w-full'>
            {userAccounts.map((account, idx) => {
              return (
                <AccountCard accountName={account.type} accountBalance={account.amount} accountIdx={idx} handleClickAccount={() => setSelectedAccount(account)} isSelected={selectedAccount.type === account.type} key={idx}/>
              )
            })}
          </div>

          <div className='flex w-full justify-center mt-8'>
            <AccountWidget name={'Manage Card'} linkTo={''} imgSrc={manageCard}/>
            <AccountWidget name={'Statements'} linkTo={''} imgSrc={statements}/>
            <AccountWidget name={'Budget Plan'} linkTo={'/budget'} imgSrc={budgetPlan}/>
          </div>

          <div className='flex justify-center w-full my-4'>
            <div className='flex w-[88%] items-center p-2 bg-white border-gray-400 border-[1px] rounded-[4px] text-[14px]'>
              <div className='flex justify-center items-center mt-1 ml-2 mr-4 text-[18px]'>
                <i className='icon flaticon-search-interface-symbol'></i>
              </div>
              <input className='w-full p-2' value={searchTerms} onChange={handleSearch} placeholder='keyword, amount, or date'/>
            </div>
          </div>
          
        </div>

        {/* Transaction history */}
        <div className='flex flex-col items-center pt-4'>
        <div className='w-[88%] mx-10'>
          {shownTransactions.length > 0 && displayTransactions ?
            shownTransactions.map((transactionDay, idx) => {
            return (
              <div key={idx}>
                <table className='flex flex-col justify-start'>
                  <thead>
                    <tr>
                      <th className='text-xl text-[#15816B] tracking-wide'>{transactionDay[0]}</th>
                    </tr>
                  </thead>
                  <tbody className='flex flex-col text-[14px]'>
                    {transactionDay[1].map((transaction, idx2) => {
                      return (
                        <tr key={idx2}>
                          <td className='flex justify-between px-4 py-6 border-black border-[1px] bg-white rounded-md mt-2'>
                            <div>
                              {transaction.description}
                            </div>
                            <div className='font-bold'>
                              ${(transaction.amount)}
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                <br />
              </div>
            )
          })
          :
          <>
            {displayTransactions ?
              <div>
              You do not have any transactions yet. TIP: Try spending more money!
              </div>
              :
              <></>
            }
          </>
          }
        </div>
        </div>

        
      </div>
    </div>
  )
}
