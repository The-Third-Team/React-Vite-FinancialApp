import React, {useState, useContext} from 'react';
import * as usersService from "../../utilities/users-service"
import PageHeader from '../PageHeader/PageHeader';

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
      <div className='w-[100px] h-[100px] bg-red-200 rounded-[50%] mt-8'>

      </div>
      <PageHeader>Welcome Back!</PageHeader>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleLogin}>
              <div
                  className="m-2 mt-16">
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
              <button
                  type="submit"
                  className="border-gray-400 border-2 mt-3 p-2 rounded-[4px]"
                  >Log in</button>
          </form>
      </div>
      </>
  )
}
