import React, { useContext } from 'react'
import { AuthContext } from "../App/App"

export default function LoginSignupPage() {
    const { user, setUser } = useContext(AuthContext)
    return (
        <div>LoginSignupPage</div>
    )
}
