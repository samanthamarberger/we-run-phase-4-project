import React, { useContext, useState } from "react";
import { UserContext } from "./context/user";
import EditProfile from "./EditProfile";

function Profile() {
    const { user, setUser, loggedIn } = useContext(UserContext)
    const [editForm, setEditForm] = useState(false)
    const [errorList, setErrorList] = useState([])

    function canEdit() {
        if (editForm) {
           return  <EditProfile setEditForm={setEditForm} onPatchProfile={patchProfile}/>
        }
        else {
            return (
                <button onClick={() => setEditForm(true)}>Edit profile</button>
            )
        }
    }

    function patchProfile(tempUsername, tempEmail, tempBio, tempImage) {
        fetch (`/me`, {
            method: "PATCH",
            body: JSON.stringify({
                username: tempUsername,
                email: tempEmail,
                bio: tempBio,
                user_photo: tempImage
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((r) => r.json())
        .then((profile) => {
            if (!profile.errors) {
                setUser({
                    username: profile.username,
                    email: profile.email,
                    bio: profile.bio,
                    user_photo: profile.user_photo
                })
                setErrorList(null)
            }
            else {
                const errors = profile.errors.map((e, index) => <li key={index} style={{ color: 'red' }}>{e}</li>)
                setErrorList(errors)
            }
        })
    }



    if (loggedIn){
        return(
            <div>
                <h1>{user.username}'s Profile</h1>
                <img src={user.user_photo} alt={user.username}/>
                <p>{user.bio}</p>
                <p>{user.email}</p>
                <hr />
                {errorList}
                {canEdit()}
            </div>
        )
    }
    else{
        return (
            <h1>Error: Not Authorized</h1>
        )
    }
}

export default Profile