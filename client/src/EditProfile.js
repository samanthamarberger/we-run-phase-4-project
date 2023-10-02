import React, { useContext, useState } from "react";
import { UserContext } from "./context/user";

function EditProfile({ setEditForm, onPatchProfile }) {
    const { user } = useContext(UserContext)
    const [tempUsername, setTempUsername] = useState(user.username)
    const [tempEmail, setTempEmail] = useState(user.email)
    const [tempBio, setTempBio] = useState(user.bio)
    const [tempImage, setTempImage] = useState(user.user_photo)

    const handleSubmit = (e) => {
        e.preventDefault()
        onPatchProfile(tempUsername, tempEmail, tempBio, tempImage)
        setEditForm(false)
        setTempUsername("")
        setTempEmail("")
        setTempBio("")
        setTempImage("")
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Edit Profile</h2>
                <label>Change Username:</label>
                    <input 
                        type="text"
                        id="username"
                        value={tempUsername}
                        onChange={(e) => setTempUsername(e.target.value)}
                    /> <br/>
                    <label>Change Email:</label>
                    <input 
                        type="text"
                        id="email"
                        value={tempEmail}
                        onChange={(e) => setTempEmail(e.target.value)}
                    /> <br/>
                    <label>Change Bio:</label>
                    <input 
                        type="text"
                        id="bio"
                        value={tempBio}
                        onChange={(e) => setTempBio(e.target.value)}
                    /> <br/>
                    <label>Change Profile Picture:</label>
                    <input 
                        type="text"
                        id="image"
                        value={tempImage}
                        onChange={(e) => setTempImage(e.target.value)}
                    /> <br/>
                    <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default EditProfile