import React, {useContext} from 'react'

import * as usersService from '../../utilities/users-service'

import { AuthContext } from '../../pages/App/App'
import { Link, Navigate } from 'react-router-dom'

export default function Navbar() {

    const { user, setUser } = useContext(AuthContext)

    const handleLogout = () => {
        usersService.logOut()
        setUser(null)
    }

  return (
    <>
        <nav
            className="fixed w-[15vw] flex flex-col bg-[#03254c] items-center px-6 py-6 h-[100vh]"
        >
            <div
                className="flex justify-center items-center text-white text-[10px] mt-[90px] bg-gray-400 h-[40px] w-[40px] rounded-[50%]"
                >
                <div>
                    Logo
                </div>
            </div>
            <div
                className="flex justify-center items-center text-white text-[10px] mt-[60px] bg-gray-400 h-[40px] w-[40px] rounded-[50%]"
                >
                <div>
                    About
                </div>
            </div>
            <div
                className="flex justify-center items-center text-white text-[9px] mt-[60px] bg-gray-400 h-[40px] w-[40px] rounded-[50%]"
                >
                <div>
                    Contact
                </div>
            </div>
            { user ?
                <Link
                to={'/'}
                className="flex justify-center items-center text-white text-[10px] mt-[60px] bg-gray-400 h-[40px] w-[40px] rounded-[50%]"
                onClick={handleLogout}>
                    <div>
                        Logout
                    </div>
                </Link>
            :
                <Link
                to={'/'}
                className="flex justify-center items-center text-white text-[10px] mt-[60px] bg-gray-400 h-[40px] w-[40px] rounded-[50%]"
                >
                    <div>
                        Login
                    </div>
                </Link>
            }
            
 
        </nav>
    </>
  )
}
