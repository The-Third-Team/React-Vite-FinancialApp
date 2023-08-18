import React, {useState, useContext} from 'react';
import * as usersService from "../../utilities/users-service"
import PageHeader from '../PageHeader/PageHeader';

import newLeafLg from '../../assets/images/newLeaf-full.svg'

import { AuthContext } from '../../pages/App/App'

export default function LoginForm() {

    const { user, setUser } = useContext(AuthContext)
  const [credentials, setCredentials] = useState({
    "email": "",
    "password": ""
  })

  const [errorMsg, setErrorMsg] = useState("")

  function handleChange(evt){
      setCredentials({...credentials, [evt.target.name]: evt.target.value})
  }

  async function handleLogin(evt){
      evt.preventDefault()
      try{
          const user = await usersService.login(credentials)
          setUser(user)
      }catch{
          setErrorMsg("Login failed, try again")
      }

  }

  return (

      <><div
      className="flex flex-col justify-center items-center ">
      <img src={newLeafLg} className='w-[160px] h-[160px] mt-8'/>
      <div className='text-[14px]'>
        Welcome Back!
      </div>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleLogin}>
              <div
                  className="m-2 mt-8">
                  <input
                      type="email"
                      name="email"
                      placeholder="E-mail"
                      value={credentials.email}
                      onChange={handleChange}
                      className="border-gray-400 border-2 p-1 rounded-[4px] w-60"
                      ></input>
              </div>  
              <div
                className="m-2">
                <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className='border-gray-400 border-2 p-1 rounded-[4px] w-60'
                />
              </div>
              <div className='flex justify-end w-[90%] mt-4'>
                <button
                    type="submit"
                    className="bg-[#4A7739] text-white mt-3 py-2 px-6 rounded-[4px]"
                    >Sign In</button>
            </div>
          </form>
      </div>
      </>
  )
}
