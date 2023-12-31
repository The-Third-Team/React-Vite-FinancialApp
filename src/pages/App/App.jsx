import { useState, createContext, useEffect } from 'react'
import { Routes, Route } from "react-router-dom"
import Dashboard from '../Dashboard/Dashboard'
import LoginSignupPage from '../LoginSignupPage/LoginSignupPage';
import * as usersService from '../../utilities/users-service';
import * as categoriesAPI from '../../utilities/categories-api';

// import reactLogo from '../assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import BudgetOverviewPage from '../BudgetOverviewPage/BudgetOverviewPage';
import BudgetPage from '../BudgetPage/BudgetPage';

export const AuthContext = createContext();


export default function App() {
  const [user, setUser] = useState(usersService.getUser());

  return (
    <>
      <AuthContext.Provider value={{user, setUser}}>
        {user ? 
          <>
            <Routes>
                <Route path="/" element={<Dashboard />}/>
                <Route path="/budget" element={<BudgetPage />}/>
            </Routes>
          </>
          :
          <>
            <LoginSignupPage />
          </>
        }
      </AuthContext.Provider>
    </>
  )
}


