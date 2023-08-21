import React from 'react'
import { PropTypes } from 'prop-types';

export default function IncomeDisplayComp({ income }) {
    return (
        <>
        <div className="grid grid-cols-6 px-2 justify-items-end">
            <div className="col-span-3 text-gray-500 text-xs">{income.description}</div>
            <div className="col-span-3 text-xl font-bold">${income.amount}</div>
        </div>
        </>
    )
}

IncomeDisplayComp.propTypes = {
    income: PropTypes.object
}