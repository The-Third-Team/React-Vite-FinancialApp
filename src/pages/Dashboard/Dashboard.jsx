import React, { useState, useEffect, useContext } from 'react'

// Auth Context
import { AuthContext } from '../App/App'

// Components
import Navbar from '../../components/NavBar/Navbar'
import AccountCard from '../../components/AccountCard/AccountCard'
import AccountWidget from '../../components/AccountWidget/AccountWidget'
import PageHeader from '../../components/PageHeader/PageHeader'

// APIs
import * as transactionsAPI from '../../utilities/transactions-api'
import * as accountsAPI from '../../utilities/accounts-api'

// Images
import manageCard from '../../assets/images/managecard.png'
import statements from '../../assets/images/statements.png'
import budgetPlan from '../../assets/images/budgetplan.png'

export default function Dashboard({}) {

  // Authorization / User Context
  const { user, setUser } = useContext(AuthContext)

  // State
  const [userAccounts, setUserAccounts] = useState([])
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [transactionData, setTransactionData] = useState([])
  const [shownTransactions, setShownTransactions] = useState([])
  const [searchTerms, setSearchTerms] = useState('')
  const [displayTransactions, setDisplayTransactions] = useState(false)

  // useEffects: 

  // Gets all accounts belonging to the current user
  useEffect(() => {

    const getUserAccounts = async (userId) => {
      try {
        await accountsAPI.getUserAccounts(userId)
        .then((res) => {
          setUserAccounts(res)
          setSelectedAccount(res[0])
        })
      } catch (error) {
        console.log(error)
      }
    }

    getUserAccounts(user.id)    
    
  }, [])

  // Formats account transaction data for display, orders data by date descending
  useEffect(() => {

    setDisplayTransactions(false)

    // Fetches all transactions belonging to a given account
    const getAccountTransactions = async (accountId) => {
      try {
        await transactionsAPI.getAccountTransactions(accountId)
        .then((res) => {
          formatTransactions(res)
        })
      } catch (error) {
        console.log(error)
      }
    }

    // Formats transactions into an array of structure [[date, [transactionsOnSaidDate]], ...]
    // Ordered by date descending
    const formatTransactions = (accountTransactions) => {
      
      // customize how the localestring will be formatted
      let options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'}

      // creates a separate array of all account dates and sorts them by date descending
      let datesSortedPre = accountTransactions.map((transaction) => new Date(transaction.date)).sort((a, b) => {
        if (a !== b) {
          return b - a
        } else {
          return a
        } 
      });

      // removes duplicates from the date array with O(n) time complexity
      let datesSorted = []
      for (let i = 0; i < datesSortedPre.length - 1; i++) {
        if (datesSortedPre[i].toString() !== datesSortedPre[i + 1].toString()) {
          datesSorted.push(datesSortedPre[i])
        }
      }

      // Format the dates of both the sorted dates array and the transactions themselves into the desired LocaleString using the options defined above
      accountTransactions.forEach((transaction) => {
        transaction.date = new Date(transaction.date).toLocaleString('en-US', options)
      })
      datesSorted = datesSorted.map((date) => date.toLocaleString('en-US', options))

      // Zip the dates and transactions together into a mappable array
      let transactionsByDate = []
      for (let i = 0; i < datesSorted.length; i++) {
        if (datesSorted[i] === 'Invalid Date') {
          transactionsByDate = []
          break
        }

        // add an array to transactionsByDate of format [unique date, [empty transaction array]]
        transactionsByDate.push([datesSorted[i], []])

        // add any transactions with said date to the 'transaction array', or datesSorted[i][1]
        for (let j = 0; j < accountTransactions.length; j++) {
          if (datesSorted[i] === accountTransactions[j].date && datesSorted[i] !== 'Invalid Date') {
            transactionsByDate[i][1].push(accountTransactions[j])
          }
        }

        // format the transaction date for display
        transactionsByDate[i][0] = new Date(transactionsByDate[i][0]).toLocaleString('en-US', {month: 'short', day: 'numeric'})
      }

      setTransactionData(transactionsByDate)
      setShownTransactions([...transactionsByDate])
      setTimeout(() => setDisplayTransactions(true), 85)
    }
    
    selectedAccount ? getAccountTransactions(selectedAccount.id) : '';
    formatTransactions(transactionData);
  }, [selectedAccount])

// Handlers
// Search will currently display a whole day even if only one transaction matches the search -- figure out how to fix this
  const handleSearch = (e) => {
    setSearchTerms(e.target.value)
  }

  return (
    <div>

      <Navbar/>

      <div className='ml-[15vw] w-[85vw]'>
        <div className='flex flex-col items-center w-[85vw] z-[5]'>
          <div className='fixed top-[-700px] w-[1000px] h-[1000px] bg-[#B0E6DB] rounded-[50%] z-[-10]'></div>
          
            <div className='mt-4 mb-4'>
              <PageHeader>Your Transactions</PageHeader>
            </div>

            <div className='w-[80%] text-[16px] italic mb-2'>Welcome back, {user.firstName}!</div>

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
              shownTransactions.filter((transactionDay) => {
                if (searchTerms === '') {
                  return transactionDay
                } else if (transactionDay[0].toLowerCase().includes(searchTerms.toLowerCase())) {
                  return transactionDay
                } else {
                  const matchingTransactions = transactionDay[1].filter((transaction) => transaction.description.toLowerCase().includes(searchTerms.toLowerCase()) || transaction.amount.toString().includes(searchTerms))
                  if (matchingTransactions.length > 0) {
                    return [transactionDay[0], matchingTransactions]
                  }
                }
              }).map((transactionDay, idx) => {
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
                              <div style={{color: `${transaction.amount > 0 ? '#009900' : '#990000'}`}} className='font-bold'>
                                ${Math.abs(transaction.amount)}
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                  <br />
                </div>
              )})
            :
            <>
              {displayTransactions ?
                <div className='text-center'>
                You do not have any transactions yet.
                <br />
                TIP: <span className='italic'>Try spending more money!</span>
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
