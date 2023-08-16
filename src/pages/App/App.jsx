import { useState, createContext } from 'react'
import { Routes, Route } from "react-router-dom"
import Dashboard from '../Dashboard/Dashboard'
import LoginSignupPage from '../LoginSignupPage/LoginSignupPage';


// import reactLogo from '../assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import BudgetOnboarding from '../BudgetOnboarding/BudgetOnboarding';

export const AuthContext = createContext();


export default function App() {
  const [user, setUser] = useState(true);
  const [count, setCount] = useState(0);

  return (
    <>
      <AuthContext.Provider value={{user, setUser}}>
        {user ? 
        <>
          <Routes>
              <Route path="/" element={<Dashboard/>}/>
              <Route path="/budget/:id" element={<BudgetOnboarding />}/>
          </Routes>
        </>
        :
        <>
          <LoginSignupPage/>
        </>
        }
      </AuthContext.Provider>
    </>
  )
}


