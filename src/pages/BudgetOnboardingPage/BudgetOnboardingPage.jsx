import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import BudgetSubcategoryField from '../../components/BudgetSubcategoryField/BudgetSubcategoryField';
import PageHeader from '../../components/PageHeader/PageHeader';

import BudgetOnboardingGroup from '../../components/BudgetOnboardingGroup/BudgetOnboardingGroup';
import Loading from '../Loading/Loading'

import * as categoriesAPI from '../../utilities/categories-api'

const categoryObj = {
    1: 'Bills',
    2: 'Food & Dining',
    3: 'Shopping',
    4: 'Entertainment'
}

const emptyBudget = {
    'Restaurant': '',
    'Grocery': '',
    'Coffee Shops': '',
    'Clothing': '',
    'Jewelry': '',
    'Rent/Mortgage': '',
    'Car': '',
    'Insurance': '',
    'Utilities': '',
    'Movies': '',
    'Streaming': '',
    'Activities': '',
    'Restaurant': '',

}

export default function BudgetOnboardingPage() {

    // A method of cycling through all categories programatically using useParams
    const { groupID } = useParams();

    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategories()
    }, [])

    const getCategories = async () => {
        const fetchedCategories = await categoriesAPI.getAllCategories();
        setCategories(fetchedCategories)
        console.log(fetchedCategories)
    }

    const getSubcategoriesByGroup = (groupID) => {
        return categories.filter((category) => category.group === categoryObj[groupID])
    }

  return (
    <>
    {categories.length > 0 ?
    <BudgetOnboardingGroup groupID={groupID} groupName={categoryObj[groupID]} subCategories={() => getSubcategoriesByGroup(groupID)}/>
    :
    <Loading />
    }
    </>
  )
}
