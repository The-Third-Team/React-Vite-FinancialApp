import React, { useState, useEffect, useContext } from 'react'
import Navbar from '../../components/NavBar/Navbar'

import AccountCard from '../../components/AccountCard/AccountCard'
import AccountWidget from '../../components/AccountWidget/AccountWidget'
import PageHeader from '../../components/PageHeader/PageHeader'

import * as transactionsAPI from '../../utilities/transactions-api'
import * as accountsAPI from '../../utilities/accounts-api'

import { AuthContext } from '../App/App'

const Transactions2 = [
	{
		"id": 101,
		"description": "UBER EATS",
		"amount": -87,
		"date": "2023-08-15T00:00:00.000Z",
		"categoryId": 259,
		"userId": 115,
		"creditDebit": "credit",
		"accountId": 123,
		"createdAt": "2023-08-17T16:16:59.913Z",
		"updatedAt": "2023-08-17T16:16:59.913Z"
	},
	{
		"id": 102,
		"description": "Starbucks",
		"amount": -5,
		"date": "2023-08-12T00:00:00.000Z",
		"categoryId": 260,
		"userId": 115,
		"creditDebit": "credit",
		"accountId": 123,
		"createdAt": "2023-08-17T16:16:59.913Z",
		"updatedAt": "2023-08-17T16:16:59.913Z"
	},
	{
		"id": 103,
		"description": "Gas Station",
		"amount": -35,
		"date": "2023-08-10T00:00:00.000Z",
		"categoryId": 264,
		"userId": 115,
		"creditDebit": "credit",
		"accountId": 123,
		"createdAt": "2023-08-17T16:16:59.913Z",
		"updatedAt": "2023-08-17T16:16:59.913Z"
	},
	{
		"id": 104,
		"description": "Rent Payment",
		"amount": -1000,
		"date": "2023-08-09T00:00:00.000Z",
		"categoryId": 263,
		"userId": 115,
		"creditDebit": "credit",
		"accountId": 123,
		"createdAt": "2023-08-17T16:16:59.913Z",
		"updatedAt": "2023-08-17T16:16:59.913Z"
	},
	{
		"id": 105,
		"description": "Movie Ticket",
		"amount": -15,
		"date": "2023-08-08T00:00:00.000Z",
		"categoryId": 267,
		"userId": 115,
		"creditDebit": "credit",
		"accountId": 123,
		"createdAt": "2023-08-17T16:16:59.913Z",
		"updatedAt": "2023-08-17T16:16:59.913Z"
	},
	{
		"id": 106,
		"description": "Grocery Shopping",
		"amount": -70,
		"date": "2023-08-05T00:00:00.000Z",
		"categoryId": 259,
		"userId": 115,
		"creditDebit": "credit",
		"accountId": 123,
		"createdAt": "2023-08-17T16:16:59.913Z",
		"updatedAt": "2023-08-17T16:16:59.913Z"
	},
	{
		"id": 107,
		"description": "Online Shopping",
		"amount": -150,
		"date": "2023-08-03T00:00:00.000Z",
		"categoryId": 261,
		"userId": 115,
		"creditDebit": "credit",
		"accountId": 123,
		"createdAt": "2023-08-17T16:16:59.913Z",
		"updatedAt": "2023-08-17T16:16:59.913Z"
	},
	{
		"id": 108,
		"description": "Amazon Purchase",
		"amount": -50,
		"date": "2023-08-01T00:00:00.000Z",
		"categoryId": 259,
		"userId": 115,
		"creditDebit": "credit",
		"accountId": 123,
		"createdAt": "2023-08-17T16:16:59.913Z",
		"updatedAt": "2023-08-17T16:16:59.913Z"
	},
	{
		"id": 109,
		"description": "Utility Bill",
		"amount": -120,
		"date": "2023-07-28T00:00:00.000Z",
		"categoryId": 266,
		"userId": 115,
		"creditDebit": "credit",
		"accountId": 123,
		"createdAt": "2023-08-17T16:16:59.913Z",
		"updatedAt": "2023-08-17T16:16:59.913Z"
	},
	{
		"id": 110,
		"description": "Streaming Service",
		"amount": -10,
		"date": "2023-07-25T00:00:00.000Z",
		"categoryId": 268,
		"userId": 115,
		"creditDebit": "credit",
		"accountId": 123,
		"createdAt": "2023-08-17T16:16:59.913Z",
		"updatedAt": "2023-08-17T16:16:59.913Z"
	},
	{
		"id": 111,
		"description": "Dinner at Restaurant",
		"amount": -40,
		"date": "2023-07-22T00:00:00.000Z",
		"categoryId": 258,
		"userId": 115,
		"creditDebit": "credit",
		"accountId": 123,
		"createdAt": "2023-08-17T16:16:59.913Z",
		"updatedAt": "2023-08-17T16:16:59.913Z"
	},
	{
		"id": 112,
		"description": "Clothing Store",
		"amount": -80,
		"date": "2023-07-20T00:00:00.000Z",
		"categoryId": 261,
		"userId": 115,
		"creditDebit": "credit",
		"accountId": 123,
		"createdAt": "2023-08-17T16:16:59.913Z",
		"updatedAt": "2023-08-17T16:16:59.913Z"
	},
	{
		"id": 113,
		"description": "Gas Refill",
		"amount": -25,
		"date": "2023-07-17T00:00:00.000Z",
		"categoryId": 264,
		"userId": 115,
		"creditDebit": "credit",
		"accountId": 123,
		"createdAt": "2023-08-17T16:16:59.913Z",
		"updatedAt": "2023-08-17T16:16:59.913Z"
	},
	{
		"id": 114,
		"description": "Online Shopping",
		"amount": -120,
		"date": "2023-07-15T00:00:00.000Z",
		"categoryId": 259,
		"userId": 115,
		"creditDebit": "credit",
		"accountId": 123,
		"createdAt": "2023-08-17T16:16:59.913Z",
		"updatedAt": "2023-08-17T16:16:59.913Z"
	},
	{
		"id": 115,
		"description": "Electric Bill",
		"amount": -80,
		"date": "2023-07-12T00:00:00.000Z",
		"categoryId": 266,
		"userId": 115,
		"creditDebit": "credit",
		"accountId": 123,
		"createdAt": "2023-08-17T16:16:59.913Z",
		"updatedAt": "2023-08-17T16:16:59.913Z"
	},
	{
		"id": 116,
		"description": "Grocery Shopping",
		"amount": -60,
		"date": "2023-07-10T00:00:00.000Z",
		"categoryId": 259,
		"userId": 115,
		"creditDebit": "credit",
		"accountId": 123,
		"createdAt": "2023-08-17T16:16:59.913Z",
		"updatedAt": "2023-08-17T16:16:59.913Z"
	},
	{
		"id": 117,
		"description": "Shopping Spree",
		"amount": -151,
		"date": "2023-08-15T00:00:00.000Z",
		"categoryId": 261,
		"userId": 115,
		"creditDebit": "credit",
		"accountId": 123,
		"createdAt": "2023-08-17T16:16:59.913Z",
		"updatedAt": "2023-08-17T16:16:59.913Z"
	},
	{
		"id": 118,
		"description": "Coffee Break",
		"amount": -5,
		"date": "2023-08-17T00:00:00.000Z",
		"categoryId": 260,
		"userId": 115,
		"creditDebit": "credit",
		"accountId": 123,
		"createdAt": "2023-08-17T16:16:59.913Z",
		"updatedAt": "2023-08-17T16:16:59.913Z"
	},
	{
		"id": 119,
		"description": "Lunch with Friends",
		"amount": -20,
		"date": "2023-08-20T00:00:00.000Z",
		"categoryId": 258,
		"userId": 115,
		"creditDebit": "credit",
		"accountId": 123,
		"createdAt": "2023-08-17T16:16:59.913Z",
		"updatedAt": "2023-08-17T16:16:59.913Z"
	},
	{
		"id": 120,
		"description": "Groceries",
		"amount": -70,
		"date": "2023-08-25T00:00:00.000Z",
		"categoryId": 259,
		"userId": 115,
		"creditDebit": "credit",
		"accountId": 123,
		"createdAt": "2023-08-17T16:16:59.913Z",
		"updatedAt": "2023-08-17T16:16:59.913Z"
	},
	{
		"id": 121,
		"description": "Coffee Break",
		"amount": -5,
		"date": "2023-08-28T00:00:00.000Z",
		"categoryId": 260,
		"userId": 115,
		"creditDebit": "credit",
		"accountId": 123,
		"createdAt": "2023-08-17T16:16:59.913Z",
		"updatedAt": "2023-08-17T16:16:59.913Z"
	},
	{
		"id": 122,
		"description": "Rent Payment",
		"amount": -1200,
		"date": "2023-09-05T00:00:00.000Z",
		"categoryId": 263,
		"userId": 115,
		"creditDebit": "credit",
		"accountId": 123,
		"createdAt": "2023-08-17T16:16:59.913Z",
		"updatedAt": "2023-08-17T16:16:59.913Z"
	},
	{
		"id": 123,
		"description": "Gas Station",
		"amount": -35,
		"date": "2023-09-10T00:00:00.000Z",
		"categoryId": 264,
		"userId": 115,
		"creditDebit": "credit",
		"accountId": 123,
		"createdAt": "2023-08-17T16:16:59.913Z",
		"updatedAt": "2023-08-17T16:16:59.913Z"
	},
	{
		"id": 124,
		"description": "Insurance Payment",
		"amount": -140,
		"date": "2023-09-15T00:00:00.000Z",
		"categoryId": 265,
		"userId": 115,
		"creditDebit": "credit",
		"accountId": 123,
		"createdAt": "2023-08-17T16:16:59.913Z",
		"updatedAt": "2023-08-17T16:16:59.913Z"
	},
	{
		"id": 125,
		"description": "Utilities Bill",
		"amount": -90,
		"date": "2023-09-20T00:00:00.000Z",
		"categoryId": 266,
		"userId": 115,
		"creditDebit": "credit",
		"accountId": 123,
		"createdAt": "2023-08-17T16:16:59.913Z",
		"updatedAt": "2023-08-17T16:16:59.913Z"
	},
	{
		"id": 126,
		"description": "Movie Night",
		"amount": -18,
		"date": "2023-09-25T00:00:00.000Z",
		"categoryId": 267,
		"userId": 115,
		"creditDebit": "credit",
		"accountId": 123,
		"createdAt": "2023-08-17T16:16:59.913Z",
		"updatedAt": "2023-08-17T16:16:59.913Z"
	},
	{
		"id": 127,
		"description": "Online Shopping",
		"amount": -49,
		"date": "2023-10-01T00:00:00.000Z",
		"categoryId": 261,
		"userId": 115,
		"creditDebit": "credit",
		"accountId": 123,
		"createdAt": "2023-08-17T16:16:59.913Z",
		"updatedAt": "2023-08-17T16:16:59.913Z"
	},
	{
		"id": 128,
		"description": "Netflix Subscription",
		"amount": -10,
		"date": "2023-10-05T00:00:00.000Z",
		"categoryId": 268,
		"userId": 115,
		"creditDebit": "credit",
		"accountId": 123,
		"createdAt": "2023-08-17T16:16:59.913Z",
		"updatedAt": "2023-08-17T16:16:59.913Z"
	},
	{
		"id": 129,
		"description": "Outdoor Activities",
		"amount": -23,
		"date": "2023-10-10T00:00:00.000Z",
		"categoryId": 269,
		"userId": 115,
		"creditDebit": "credit",
		"accountId": 123,
		"createdAt": "2023-08-17T16:16:59.913Z",
		"updatedAt": "2023-08-17T16:16:59.913Z"
	},
	{
		"id": 130,
		"description": "Gas Station",
		"amount": -25,
		"date": "2023-10-12T00:00:00.000Z",
		"categoryId": 264,
		"userId": 115,
		"creditDebit": "credit",
		"accountId": 123,
		"createdAt": "2023-08-17T16:16:59.913Z",
		"updatedAt": "2023-08-17T16:16:59.913Z"
	},
	{
		"id": 131,
		"description": "Shopping Spree",
		"amount": -110,
		"date": "2023-10-15T00:00:00.000Z",
		"categoryId": 261,
		"userId": 115,
		"creditDebit": "credit",
		"accountId": 123,
		"createdAt": "2023-08-17T16:16:59.913Z",
		"updatedAt": "2023-08-17T16:16:59.913Z"
	},
	{
		"id": 132,
		"description": "Coffee Break",
		"amount": -4,
		"date": "2023-10-17T00:00:00.000Z",
		"categoryId": 260,
		"userId": 115,
		"creditDebit": "credit",
		"accountId": 123,
		"createdAt": "2023-08-17T16:16:59.913Z",
		"updatedAt": "2023-08-17T16:16:59.913Z"
	}
]

export default function Dashboard({}) {

  const { user, setUser } = useContext(AuthContext)

  const [userAccounts, setUserAccounts] = useState([])
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [transactionData, setTransactionData] = useState([])
  const [shownTransactions, setShownTransactions] = useState([])
  const [searchTerms, setSearchTerms] = useState('')

  // formats dummy transaction data into corresponding dates and accounts

  useEffect(() => {

    const getUserAccounts = async (userId) => {
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
        transactionsByDate.push([datesSorted[i], []])
        for (let j = 0; j < accountTransactions.length; j++) {
          if (datesSorted[i] === accountTransactions[j].date) {
            transactionsByDate[i][1].push(accountTransactions[j])
          }
        }
        transactionsByDate[i][0] = new Date(transactionsByDate[i][0]).toLocaleString('en-US', {month: 'short', day: 'numeric'})
      }
      setTransactionData(transactionsByDate)
      setShownTransactions([...transactionsByDate])
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
      console.log('empty')
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

      console.log('matchingTransactions', matchingTransactions)
      setShownTransactions(matchingTransactions)
    }

  }

  return (
    <div>
      <Navbar/>
      <div className='ml-[15vw] w-[85vw]'>
      {/* fixed top-0  */}
        <div className='flex flex-col items-center w-[85vw]'>

          <PageHeader>YOUR ACCOUNTS</PageHeader>

          <div className='flex flex-col items-center w-full'>
            {userAccounts.map((account, idx) => {
              return (
                <AccountCard accountName={account.type} accountBalance={account.amount} handleClickAccount={() => setSelectedAccount(account)} isSelected={selectedAccount.type === account.type} key={idx}/>
              )
            })}
          </div>

          <div className='flex w-full justify-center mt-8'>
            <AccountWidget name={'Manage Card'} linkTo={''}/>
            <AccountWidget name={'Statements'} linkTo={''}/>
            <AccountWidget name={'Budget Plan'} linkTo={'/budget'}/>
          </div>

          <div className='flex justify-center w-full my-4'>
            <div className='flex w-[88%] items-center p-2 border-gray-400 border-[1px] rounded-[4px] text-[14px]'>
              <div className='flex justify-center items-center h-8 w-10 ml-2 mr-4 text-[18px] border-black border-[1px] rounded-[50%] bg-gray-200'>
                <div>🔍</div>
              </div>
              <input className='w-full p-2' value={searchTerms} onChange={handleSearch} placeholder='keyword, amount, or date'/>
            </div>
          </div>

          <div className='w-full border-black border-[1px]'></div>
          
        </div>

        {/* Transaction history */}
        <div className='flex flex-col items-center pt-4'>
        <div className='w-[80%] mx-10'>
          {shownTransactions.length > 0 ?
            shownTransactions.map((transactionDay, idx) => {
            return (
              <div key={idx}>
                <table className='flex flex-col justify-start'>
                  <thead>
                    <tr>
                      <th className='text-xl'>{transactionDay[0]}</th>
                    </tr>
                  </thead>
                  <tbody className='flex flex-col text-[14px]'>
                    {transactionDay[1].map((transaction, idx2) => {
                      return (
                        <tr key={idx2}>
                          <td className='flex justify-between px-2 py-2 border-black border-[1px] rounded-md mt-2'>
                            <div>
                              {transaction.description}
                            </div>
                            <div>
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
          <div>
            You do not have any transactions yet. TIP: Try spending more money!
          </div>
          }
        </div>
        </div>

        
      </div>
    </div>
  )
}
