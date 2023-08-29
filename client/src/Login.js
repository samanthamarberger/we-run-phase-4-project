import React, { useState, useContext } from 'react'
import { UserContext } from './context/user'

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState("")
    const {login} = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Username: </label>
                <input 
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                /> <br/>
                <label>Password: </label>
                <input 
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /> <br/>
                <input type="submit" />
            </form>
            <ul>
                <h3>{errors}</h3>
            </ul>
        </div>

    )
}

export default Login