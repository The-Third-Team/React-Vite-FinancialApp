import React, { useContext, useState } from 'react'
import { AuthContext } from "../App/App"

import SignupForm from '../../components/SignupForm/SignupForm'
import LoginForm from '../../components/LoginForm/LoginForm'

export default function LoginSignupPage() {
    const { user, setUser } = useContext(AuthContext)
    const [ login, setLogin ] = useState(true) 

    function toggleLogin(){
        setLogin(!login)
        console.log(login)
    }

    return (

        <>
            {login ? 
                <LoginForm />
                :    
                <SignupForm />
                }
            <button onClick={toggleLogin} className="p-2 border-black border-[.1vmin] ml-2">Login/Signup</button>
                
        </>
    )
}
