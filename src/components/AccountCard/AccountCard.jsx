import React from 'react'

export default function AccountCard({accountName, accountBalance, handleClickAccount, isSelected}) {

  return (

    <div
      style={{height: `${isSelected ? '160px' : '50px'}`, fontWeight: `${isSelected ? 'bold' : 'normal'}`}}
      className='flex justify-between w-[80%] bg-gray-400 border-white border-[1px] mx-2 mb-[-10px] pl-4 pr-2 pt-3 pb-10 rounded-[4px]'
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
