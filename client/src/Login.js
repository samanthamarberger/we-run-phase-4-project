import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import { UserContext } from './context/user'

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorList, setErrorList] = useState([])
    const { login } = useContext(UserContext);
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/login', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
            .then(r => r.json())
            .then(user => {
                console.log(user)
                if(!user.error){
                    login(user)
                    navigate('/')
                }
                else {
                    setUsername("")
                    setPassword("")
                    const errorLis = <li>{user.error}</li>
                    setErrorList(errorLis)
                }
            })
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
                    /> <br />
                    <label>Password: </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    /> <br />
                    <input type="submit" />
                </form>
                <ul>
                    {errorList}
                </ul>
            </div>
        )
}

export default Login