import { useState, createContext } from 'react'
import { Routes, Route } from "react-router-dom"
import Dashboard from '../Dashboard/Dashboard'
import LoginSignupPage from '../LoginSignupPage/LoginSignupPage';
import * as usersService from '../../utilities/users-service'

// import reactLogo from '../assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import BudgetOnboardingPage from '../BudgetOnboardingPage/BudgetOnboardingPage';
import DashboardRough from '../Dashboard/DashboardRough';
import BudgetOverviewPage from '../BudgetOverviewPage/BudgetOverviewPage';

export const AuthContext = createContext();


export default function App() {
  const [user, setUser] = useState(usersService.getUser());
  const [count, setCount] = useState(0);

  return (
    <>
      <AuthContext.Provider value={{user, setUser}}>
        {user ? 
          <>
            <Routes>
                <Route path="/" element={<Dashboard />}/>
                <Route path="/budget/:groupID" element={<BudgetOnboardingPage />}/>
                <Route path="/budget/" element={<BudgetOverviewPage />}/>
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


