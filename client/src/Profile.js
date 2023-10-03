import React, { useContext, useState } from "react";
import { UserContext } from "./context/user";
import { useNavigate } from "react-router-dom"
import EditProfile from "./EditProfile";
import Dialog from "./Dialog";

function Profile() {
    const { user, setUser, loggedIn, logout } = useContext(UserContext)
    const [editForm, setEditForm] = useState(false)
    const [errorList, setErrorList] = useState([])
    const navigate = useNavigate()
    const [dialog, setDialog] = useState({
        message:'',
        isLoading:false
    })

    const handleDialog = (message, isLoading) => {
        setDialog({
            message,
            isLoading
        })
    }

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

    function frontEndDelete() {
        logout()
        navigate('/')
    }

    function areUSureDelete(choose){
        if(choose) {
            fetch(`/me`, {
                method: "DELETE",
            })
            .then((r) => {
                if (!r.ok) {
                    console.log("Failed to delete user account")
                } 
                if (r.status === 204) {
                    frontEndDelete()
                }
            })
            .catch((error) => {
                console.log("Error deleting account:", error)
            })
            handleDialog('', false)
        }
        else {
            handleDialog('', false)
        }
    }

    function handleDelete() {
        handleDialog('Are you sure you would like to remove your account?', true)
    }

    if (loggedIn){
        return(
            <div>
                <div>
                    <h1>{user.username}'s Profile</h1>
                    <img src={user.user_photo} alt={user.username}/>
                    <p>{user.bio}</p>
                    <p>{user.email}</p>
                    <hr />
                    {errorList}
                    {canEdit()}
                    <br />
                    <button onClick={() => handleDelete()}>Remove Account</button>
                </div>
                { dialog.isLoading && <Dialog onDialog={areUSureDelete} message={dialog.message} /> }
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