import React, { useState } from 'react'
import Navbar from '../../components/NavBar/Navbar'

import * as categoriesAPI from '../../utilities/categories-api'

export default function Dashboard() {

  const [categories, setCategories] = useState([])

  const getCategories = async () => {
    const fetchedCategories = await categoriesAPI.getCategories();
    setCategories([...categories, fetchedCategories])

  }

  return (
    <>
    <Navbar/>
    <div>Dashboard</div>
    <button onClick={getCategories}>Get Categories</button>
    <div>
    {categories.length ?
    categories.map((category, idx) => {
      return (
        <p key={idx}>{category}</p>
      )
    })
    :
    <></>
    }
    </div>
    </>
  )
}
