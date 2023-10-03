import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "./context/user";

function NavBar() {
    const{user, logout, loggedIn} = useContext(UserContext)
    const navigate = useNavigate()

    const logoutUser = () => {
        fetch('/logout', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(() => {
            logout()
            navigate('/')
        })
    }

    if (loggedIn){
        return (
            <header>
                <img src="https://t3.ftcdn.net/jpg/01/13/99/88/360_F_113998820_PyE7Xqaaruarcp1VZFckSpbUG9jFVaol.jpg"/>
                {/* <h1>Hello {user.username}</h1> */}
                <button onClick={logoutUser}>Logout</button>
                <NavLink to='/trails'>
                    <button>Trails</button>
                </NavLink>
                <NavLink to='/profile'>
                    <button>My Profile</button>
                </NavLink>
                <NavLink to='/'>
                    <button>Home</button>
                </NavLink>
            </header>
        )
    } 
    else {
        return (
            <header>
                <img src="https://t3.ftcdn.net/jpg/01/13/99/88/360_F_113998820_PyE7Xqaaruarcp1VZFckSpbUG9jFVaol.jpg"/>
                <NavLink to='/login'>
                    <button>Login</button>
                </NavLink>
                <NavLink to='/signup'>
                    <button>Signup</button>
                </NavLink>
                <NavLink to='/'>
                    <button>Home</button>
                </NavLink>
            </header>
        )
    }
}


export default NavBar;