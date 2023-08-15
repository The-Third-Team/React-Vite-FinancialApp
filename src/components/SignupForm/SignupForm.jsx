import React, {useState} from 'react'

export default function SignupForm() {

  const [credentials, setCredentials] = useState({
    "firstName": "",
    "lastName": "",
    "username": "",
    "password": "",
    "confirm": "",
  })

  function handleChange(evt){
    setCredentials({...credentials, [evt.target.name]: evt.target.value})
  }

  return (
    <>
        <form>
                <label>First Name</label>
                <input
                    type="text"
                    name="firstName"
                    placeholder="Jane"
                    value={credentials.username}
                    onChange={handleChange}
                    ></input>
                <label>Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    value={credentials.username}
                    onChange={handleChange}
                    ></input>
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
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                ></input>
                <label>Confirm Password</label>
                <input
                    type="password"
                    name="confirm"
                    value={credentials.password}
                    onChange={handleChange}
                ></input>
                <button
                    type="submit"
                    ></button>
            </form>
            <div>LoginPage</div>
    </>
  )
}

// firstName, lastName, username, email, password
// /login
// /register
// /session
