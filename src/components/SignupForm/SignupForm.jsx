import React, {useState, useContext} from 'react'
import PageHeader from '../PageHeader/PageHeader'

// import * as usersAPI from '../../utilities/users-api'
import * as usersService from '../../utilities/users-service'

import { AuthContext } from '../../pages/App/App'


export default function SignupForm({updateUser}) {
  
  const { user, setUser } = useContext(AuthContext)
  
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirm: "",
  })

  const handleChange = (evt) => {
    setCredentials({...credentials, [evt.target.name]: evt.target.value})
  }

  const handleSignUp = async (evt) => {
    evt.preventDefault();
    try {
        const userData = await usersService.register(credentials);
        console.log(userData)
        setUser(userData)
    }catch(err){
        console.log(err.message)
    }
    // const userData = await usersService.register(credentials);
    // console.log(userData)
    // setUser(userData)
  }

  return (
    <>
      <div
        className="flex flex-col justify-center items-center ">
        <div className='w-[100px] h-[100px] bg-red-200 rounded-[50%] mt-8'>

        </div>
        <PageHeader>Sign Up</PageHeader>
        <form
          className="flex flex-col justify-center items-center"
          onSubmit={handleSignUp}
            >
              <div
                  className="m-2">
                  <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={credentials.firstName}
                      onChange={handleChange}
                      className="border-gray-400 border-2 p-1 rounded-[4px] w-60 md:w-30 lg:w-40"
                      ></input>
              </div>
              <div
                  className="m-2">
                  <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={credentials.lastName}
                      onChange={handleChange}
                      className="border-gray-400 border-2 p-1 rounded-[4px] w-60"
                      ></input>
              </div>
              <div
                  className="m-2">
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
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={credentials.username}
                      onChange={handleChange}
                      className="border-gray-400 border-2 p-1 rounded-[4px] w-60"
                      />
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
              <div
                  className="m-2">
                  <input
                      type="password"
                      name="confirm"
                      placeholder="Confirm password"
                      value={credentials.confirm}
                      onChange={handleChange}
                      className='border-gray-400 border-2 p-1 rounded-[4px] w-60'
                  />
              </div>
              <button
                  type="submit"
                  className="border-gray-400 border-2 mt-3 p-2 rounded-[4px]"
                  >Sign up</button>
            </form>
        </div>
    </>
  )
}

// firstName, lastName, username, email, password
// /login
// /register
// /session
