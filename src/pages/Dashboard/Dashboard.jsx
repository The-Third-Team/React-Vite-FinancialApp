import React, { useState } from 'react'
import Navbar from '../../components/NavBar/Navbar'

export default function Dashboard() {

  const [categories, setCategories] = useState([])

  return (
    <>
    <Navbar/>
    <div>Dashboard</div>
    <button>Get Categories</button>
    {categories.length &&
    categories.map((category, idx) => {
      return (
        <p></p>
      )
    })
    }
    </>
  )
}
