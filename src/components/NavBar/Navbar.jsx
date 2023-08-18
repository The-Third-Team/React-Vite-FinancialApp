import React, {useContext} from 'react'

import * as usersService from '../../utilities/users-service'

import newLeafSmWhite from '../../assets/images/newLeaf-sm-white.png'

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
    {/* bg-[#03254c] */}
        <nav
            className="fixed w-[15vw] flex flex-col bg-[#4A7739] items-center px-6 py-6 h-[100vh] z-10"
        >
            <div
                className="flex justify-center items-center text-white text-[10px] mt-[40px] mb-[40px] h-[40px] w-[40px]"
                >
                <img src={newLeafSmWhite}/>
            </div>
            <Link
                to='/'
                className="flex justify-center items-center text-white mt-[60px] bg-white h-[40px] w-[40px] rounded-[50%]"
                >
                <i className='icon flaticon-home-1 mt-1 text-[24px] text-black'></i>
            </Link>
            <Link
                to='/budget'
                className="flex justify-center items-center text-white mt-[60px] bg-white h-[40px] w-[40px] rounded-[50%]"
                >
                <i className='icon flaticon-budget-1 mt-1 text-[24px] text-black'></i>
            </Link>
            { user ?
                <Link
                to={'/'}
                className="flex justify-center items-center text-white text-[10px] mt-[60px] bg-white h-[40px] w-[40px] rounded-[50%]"
                onClick={handleLogout}>
                    <i className='icon flaticon-logout-3 mt-1 text-[24px] text-black'></i>
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
