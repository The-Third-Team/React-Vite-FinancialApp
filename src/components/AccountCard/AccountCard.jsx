import React from 'react'

export default function AccountCard({accountName, accountBalance, accountIdx, handleClickAccount, isSelected}) {

  const accountColors = ['#52AD9C', '#137D5C', '#6EC760']

  const accountColor = accountColors[accountIdx % 3]

  return (

    <div
      style={{height: `${isSelected ? '170px' : '50px'}`, width: `${isSelected ? '82%' : '80%'}`, fontWeight: `${isSelected ? 'bold' : 'normal'}`, color: `${isSelected ? '#F3F3F3' : '#D3E6D2'}`, background: `${isSelected ? `linear-gradient(to bottom, ${accountColor}, #2C4428)` : accountColor}`}}
      className='flex justify-between w-[80%] bg-gray-400 border-white border-[2px] text-[18px] mx-2 mb-[-10px] px-6 pt-3 pb-10 rounded-[10px] shadow-gray-500 shadow-md'
      onClick={() => handleClickAccount(accountName)}
      >
        {isSelected ?
        <div className='flex flex-col justify-between w-full'>
          <div>
            {accountName.toUpperCase()}
          </div>
          <div className='flex w-full justify-end'>
            <div>
              ${accountBalance}
            </div>
          </div>
        </div>
        :
        <>
          <div>
            {accountName.toUpperCase()}
          </div>
          <div>
            ${accountBalance}
          </div>
        </>
        }
        
    </div>
  )
}
