import React, { useContext, useState } from 'react'
import { AuthContext } from "../App/App"

import SignupForm from '../../components/SignupForm/SignupForm'
import LoginForm from '../../components/LoginForm/LoginForm'
import Navbar from '../../components/NavBar/Navbar'

export default function LoginSignupPage() {
    const { user, setUser } = useContext(AuthContext)
    const [ login, setLogin ] = useState(true) 

    function toggleLogin(){
        setLogin(!login)
    }

    return (

        <div>
            <Navbar />
            <div className='ml-[15vw] w-[85vw]'>
                {login ? 
                    <LoginForm />
                    :    
                    <SignupForm />
                }
                <div className='w-full flex justify-center'>
                    <button onClick={toggleLogin} className="p-2 mt-2 text-[14px] italic">
                        {login ? 'Create an Account' : 'Already have an account? Sign in here'}
                    </button>
                </div>
            </div>
        </div>
    )
}
