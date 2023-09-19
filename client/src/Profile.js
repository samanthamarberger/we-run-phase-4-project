import React, { useContext } from "react";
import { UserContext } from "./context/user";

function Profile() {
    const { user, loggedIn } = useContext(UserContext)

    // console.log(user)
    if (loggedIn){
        return(
            <div>
                <h1>{user.username}'s Profile</h1>
                <img src={user.user_photo} alt={user.username}/>
                <p>{user.bio}</p>
                <p>{user.email}</p>
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