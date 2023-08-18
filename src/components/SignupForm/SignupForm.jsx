import React, {useState, useContext} from 'react'
import PageHeader from '../PageHeader/PageHeader'

import newLeafLg from '../../assets/images/newLeaf-full.svg'

// import * as usersAPI from '../../utilities/users-api'
import * as usersService from '../../utilities/users-service'

import { AuthContext } from '../../pages/App/App'


export default function SignupForm({updateUser}) {
  
  const { user, setUser } = useContext(AuthContext)

  const [message, setMessage] = useState('Create an Account')
  
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
    } catch (error) {
      setMessage('Either an account has already been created with this email, or there is a network error. Please try again.')
      console.log(error)
    }
  }

  return (
    <>
      <div
        className="flex flex-col justify-center items-center ">
        <img src={newLeafLg} className='w-[160px] h-[160px] mt-8'/>
        <div className='text-[14px] h-12 mx-[10%] mb-4 text-center'>
          {message}
        </div>
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
                      className="border-gray-400 border-2 p-1 rounded-[4px] w-60"
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
              <div className='flex justify-end w-[90%]'>
              <button
                  type="submit"
                  className="text-white bg-[#4A7739] mt-3 py-2 px-4 rounded-[4px] shadow-black shadow-sm"
                  >Sign up
                  </button>
              </div>
            </form>
        </div>
    </>
  )
}

// firstName, lastName, username, email, password
// /login
// /register
// /session
