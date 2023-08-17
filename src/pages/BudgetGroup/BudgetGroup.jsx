import React, { useState } from 'react'
import BudgetComp from '../../components/BudgetComp/BudgetComp'

export default function BudgetGroup({ group, groupName, userBudgets }) {
    //console.log(groupName)


  return (
    <>
        <div className="border-2 rounded-md p-2 mx-2 my-1">
            <div className="py-1">
                <div className="text-md font-bold">{groupName}</div>
            </div>
            <div>
                {group.map((category, idx) => 
                    <BudgetComp key={idx} category={category} userBudgets={userBudgets} />)}
            </div>
        </div>
    </>
  )
}


// const EditField = () => {

//     const exampleData = [
//         {
//             groupName: 'bills',
//             categories: [
//                 {
//                     name: 'insurance',
//                     amount: 1111
//                 },
//                 {
//                     name: 'insurasdnce',
//                     amount: 1111
//                 },
//                 {
//                     name: 'insursdance',
//                     amount: 1111
//                 }
//             ]
//         },
//         {
//             groupName: 'food',
//             categories: [
//                 {
//                     name: 'insurance',
//                     amount: 1111
//                 },
//                 {
//                     name: 'insurasdnce',
//                     amount: 1111
//                 },
//                 {
//                     name: 'insursdance',
//                     amount: 1111
//                 }
//             ]
//         }
//     ]
//     return (
//         <>
//         { exampleData.map((group, index) => (
//             <table>
//                 <thead>
//                     <th>{ group.groupName }</th>
//                 </thead>
//                 <tbody>
//                     { group.categories.map((category, index) => (
//                         <tr>
//                             <td>{ category.name }</td>
//                             <td>{ category.amount }</td>
//                         </tr>
//                     )) }
//                 </tbody>
//             </table>
//         )) }
//         </>
//     );
// }