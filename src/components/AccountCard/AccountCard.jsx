import React from 'react'

export default function AccountCard({accountName, accountBalance, handleClickAccount, isFocused}) {

  return (
    <div
      style={{height: `${isFocused ? '100px' : '50px'}`}}
      className='flex justify-between w-[90%] bg-gray-400 border-black border-[1px] mx-2 px-2 pt-3 rounded-t-[10px]'
      onClick={() => handleClickAccount(accountName)}
      >
        <div>
          {accountName}
        </div>
        <div>
          ${accountBalance}
        </div>
    </div>
  )
}
