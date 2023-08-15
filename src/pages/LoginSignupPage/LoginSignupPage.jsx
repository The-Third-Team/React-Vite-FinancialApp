import React, { useContext, useState } from 'react'
import { AuthContext } from "../App/App"

import LoginPage from '../Login/LoginPage'
import SignupForm from '../../components/SignupForm/SignupForm'

export default function LoginSignupPage() {
    const { user, setUser } = useContext(AuthContext)
    const { login, setLogin } = useState(true) 

    return (

        <>
        {login ? 
        <LoginPage />
        :    
        <SignupForm />
        }
        <button onClick={() => setLogin(!login)}></button>
            
        </>
    )
}
