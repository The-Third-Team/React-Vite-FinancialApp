import React from 'react'

export default function Navbar() {
  return (
    <>
        <nav
            className="fixed w-[15vw] flex flex-col bg-[#03254c] items-center px-6 py-6 h-[100vh]"
        >
            <div
                className="flex justify-center items-center text-white text-[10px] mt-[8vh] bg-gray-400 h-[36px] w-[36px] rounded-[50%]"
                >
                <div>
                    Logo
                </div>
            </div>
            <div
                className="flex justify-center items-center text-white text-[10px] mt-[40px] bg-gray-400 h-[36px] w-[36px] rounded-[50%]"
                >
                <div>
                    About
                </div>
            </div>
            <div
                className="flex justify-center items-center text-white text-[9px] mt-[40px] bg-gray-400 h-[36px] w-[36px] rounded-[50%]"
                >
                <div>
                    Contact
                </div>
            </div>
            <div
                className="flex justify-center items-center text-white text-[10px] mt-[40px] bg-gray-400 h-[36px] w-[36px] rounded-[50%]"
                >
                <div>
                    Login
                </div>
            </div>
 
        </nav>
    </>
  )
}
