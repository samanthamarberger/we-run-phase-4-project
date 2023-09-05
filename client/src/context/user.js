
import React, { useState, useEffect } from 'react';

const UserContext = React.createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState({})
    const [loggedIn, setLoggedIn] = useState(false)
    const [trails, setTrails] = useState([])

    const login = (userData) => {
        setUser(userData)
        fetchTrails()
        setLoggedIn(true)
        document.cookie = 'loggedIn=true; path=/'
    }

    const logout = () => {
        setUser({})
        setLoggedIn(false)
        document.cookie = 'loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    }

    const signup = (userData) => {
        setUser(userData)
        fetchTrails()
        setLoggedIn(true)
    }

    useEffect(() => {
        const loggedInCookie = document.cookie.includes('loggedIn=true')
        if (loggedInCookie) {
            setLoggedIn(true)
        }
        else {
            setLoggedIn(false)
        }

        if (loggedInCookie) {
            fetch('/me')
                .then(r => r.json())
                .then((userData) => {
                    setUser(userData)
                    fetchTrails()
                })
        }
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
                setTrails([...trails, trail])
            })
    }

    return (
        <UserContext.Provider value={{ user, login, logout, signup, loggedIn, trails, addTrail }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };

