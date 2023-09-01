import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "./context/user";

function NavBar() {
    const{user, logout, loggedIn} = useContext(UserContext)
    const navigate = useNavigate()

    const logoutUser = () => {
        fetch('/logout')
        .then(() => {
            logout()
        })
    }

    if (user){
        return (
            <div>
                <h1>Hello {user.username}</h1>
                <br/>
                <button onClick={logoutUser}>Logout</button>
            </div>
        );   
    } 
    else {
        return (
            <div>
                <NavLink to='/login'>
                    <button>Login</button>
                </NavLink>
                <NavLink to='/signup'>
                    <button>Signup</button>
                </NavLink>
            </div>
        )
    }
}


export default NavBar;