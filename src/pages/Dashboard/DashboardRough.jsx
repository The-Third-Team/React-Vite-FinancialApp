import React, { useState } from 'react'
import Navbar from '../../components/NavBar/Navbar'

import * as categoriesAPI from '../../utilities/categories-api'

export default function DashboardRough() {

  const [categories, setCategories] = useState([])

  const getCategories = async () => {
    const fetchedCategories = await categoriesAPI.getAllCategories();
    setCategories(fetchedCategories)
    console.log(fetchedCategories)
  }

  return (
    <div className='w-full'>
      <Navbar/>
      <div className='ml-[15vw] w-[85vw]'>
        <div>Dashboard</div>
        <button onClick={getCategories}>Get Categories</button>
        <div>
        {categories.length > 0 ?
          categories.map((category, idx) => {
            return (
              <div key={idx}>{category.name}</div>
            )
          })
          :
          <>

          </>
        }
        </div>
      </div>
    </div>
  )
}
