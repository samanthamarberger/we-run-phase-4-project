import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from './context/user'

function Signup() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [bio, setBio] = useState("")
    const [photo, setPhoto] = useState("")
    const [errorList, setErrorList] = useState([])
    const {signup} = useContext(UserContext)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/signup', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                password_confirmation: passwordConfirmation,
                bio: bio,
                user_photo: photo
            })
        }) 
        .then(r => r.json())
        .then(user => {
            if (!user.errors){
                signup(user)
                navigate('/')
            }
            else {
                setPassword("")
                setPasswordConfirmation("")
                const errorLis = user.errors.map(e => <li>{e}</li>)
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
                    id="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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