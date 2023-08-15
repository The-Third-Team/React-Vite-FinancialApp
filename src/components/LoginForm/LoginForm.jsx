import React, {useState} from 'react';
import * as usersService from "../../utilities/users-service"


export default function LoginForm() {

  const [credentials, setCredentials] = useState({
    "username": "",
    "password": ""
  })

  const [errorMsg, setErrorMsg] = useState("")

  function handleChange(evt){
      setCredentials({...credentials, [evt.target.name]: evt.target.value})
  }

  async function handleSubmit(evt){
      evt.preventDefault()
      try{
          const user = await usersService.login(credentials)
          console.log(user)
          
      }catch{
          setErrorMsg("Login failed, try again")
      }

  }
  return (

      <>
          <div
              className=''>
          <form
              autoComplete="off"
              onSubmit={handleSubmit}
          >
              <label>Username</label>
              <input
                  type="text"
                  name="username"
                  placeholder="username@email.com"
                  value={credentials.username}
                  onChange={handleChange}
                  ></input>
              <label>Password</label>
              <input
                  type="text"
                  name="username"
                  value={credentials.password}
                  onChange={handleChange}
              ></input>
              <button
                  type="submit"
                  className="p-2 border-black border-[.1vmin] ml-2"
                  >Log In</button>
          </form>
          </div>
          <div>LoginPage</div>
      </>
  )
}
