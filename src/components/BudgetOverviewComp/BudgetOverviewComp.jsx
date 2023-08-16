import React from 'react'


export default function BudgetOverviewComp({ budget }) {
  return (
    <>
    <div>{budget.name}</div>
    <div>{budget.budget}</div>
    </>
  )
}
