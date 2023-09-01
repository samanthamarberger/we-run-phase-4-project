
import React, { useState, useEffect } from 'react';

const UserContext = React.createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState({})
    const [loggedIn, setLoggedIn] = useState(false)
    const [trails, setTrails] = useState([])

    useEffect(() => {
        fetch('/me')
        .then(r => r.json())
        .then(user => {
            setUser(user)
            if (user.error){
                setLoggedIn(false)
            }  
            else {
                setLoggedIn(true) 
                fetchTrails()
            }          
        })
    }, [])

    const fetchTrails = () => {
        fetch('/trails')
        .then(r => r.json())
        .then(trails => {
            setTrails(trails)
        })
    }

    const addTrail = (trail) => {
        fetch('/trails', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(trail)
        })
        .then(r => r.json())
        .then(trail => {
            // check for errors!!!
            setTrails([...trails, trail])
        })
    }

    const login = (user) => {
        setUser(user)
        setLoggedIn(true)
    }

    const logout = () => {
        setUser({})
        setLoggedIn(false)
    }

    const signup = () => {
        setUser(user)
        setLoggedIn(true)
    }

    return (
        <UserContext.Provider value={{user, login, logout, signup, loggedIn, trails, addTrail}}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };

