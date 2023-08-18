import React, {useContext} from 'react'

import * as usersService from '../../utilities/users-service'

import newLeafSmWhite from '../../assets/images/newLeaf-sm-white.png'

import { AuthContext } from '../../pages/App/App'
import { Link } from 'react-router-dom'

import home from '../../assets/images/home.png'
import budget from '../../assets/images/budget.png'
import settings from '../../assets/images/settings.png'
import logout from '../../assets/images/logout.png'

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
            className="fixed w-[15vw] flex flex-col bg-[#336E2A] items-center px-6 py-6 h-[100vh] z-10"
        >
            <div
                className="flex justify-center items-center text-white text-[10px] mt-[10px] mb-[40px] h-[40px] w-[40px]"
                >
                <img src={newLeafSmWhite}/>
            </div>

            <div className='flex flex-col justify-between h-[80%] mt-[20px]'>
                <div>
                    <Link
                        to='/'
                        className="flex justify-center items-center h-[40px] w-[40px] mb-[40px]"
                        >
                        <img src={home} />
                    </Link>
                    <Link
                        to='/budget'
                        className="flex justify-center items-center h-[40px] w-[40px]"
                        >
                        <img src={budget} />
                    </Link>
                </div>
                <div className='flex flex-col mb-[40px]'>
                    
                { user ?
                    <>
                        <Link
                        to={'/'}
                        className="flex justify-center items-center h-[40px] w-[40px] mb-[40px]"
                        onClick={handleLogout}>
                            <img src={logout} />
                        </Link>
                        <div className='flex justify-center items-center h-[40px] w-[40px] cursor-pointer'>
                            <img src={settings}/>
                        </div>
                    </>
                :
                    <>
                        <div className='h-[40px] w-[40px]'>

                        </div>
                        <div className='h-[40px] w-[40px]'>

                        </div>
                    </>
                }
                </div>
            </div>
            
 
        </nav>
    </>
  )
}
