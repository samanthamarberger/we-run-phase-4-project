import React, { useState, useContext } from 'react'
import { UserContext } from './context/user'

function Signup() {
    const [username, setUsename] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [bio, setBio] = useState("")
    const [photo, setPhoto] = useState("")
    const [errorList, setErrorList] = useState([])
    const {signup} = useContext(UserContext)

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Username: </label>
                <input
                    type="text"
                    id="Username"
                    value={username}
                    onChange={(e) => setUsename(e.target.value)}
                 /><br/>
                 <label>Email: </label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                 /><br/>
                 <label>Password: </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                 /><br/>
                 <label>Confirm Password: </label>
                <input
                    type="password"
                    id="password_confirmation"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                 /><br/>
                 <label>Bio: </label>
                <input
                    type="text"
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                 /><br/>
                 <label>Photo of you: </label>
                <input
                    type="text"
                    id="photo"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                 /><br/>
                 <input type="submit" />
            </form>
            <ul>
                {errorList}
            </ul>
        </div>
    )
}

export default Signup