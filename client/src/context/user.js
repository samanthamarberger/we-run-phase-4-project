
import React, { useState, useEffect } from 'react';

const UserContext = React.createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState({})
    const [loggedIn, setLoggedIn] = useState(false)
    const [trails, setTrails] = useState([])
    const [errorList, setErrorList] = useState([])

    const login = (userData) => {
        setUser(userData)
        fetchTrails()
        setLoggedIn(true)
    }

    const logout = () => {
        setUser({})
        setLoggedIn(false)
    }

    const signup = (userData) => {
        setUser(userData)
        fetchTrails()
        setLoggedIn(true)
    }

    useEffect(() => {
        fetch('/me')
            .then(r => {
                console.log(r)
                return r.json()
            })
            //What would these errors be coming from
            .then((userData) => {
                if (!userData.errors) {
                    setUser(userData)
                    fetchTrails()
                }
                else {
                    console.log(userData.errors)   
                }
            })

    }, [])

    const fetchTrails = () => {
        fetch('/trails')
        //would this one need error handling since its taken care of in the Trails.js file?
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
                if (!trail.errors) {
                    setTrails([...trails, trail])
                    setErrorList(null)
                }
                else {
                    const errorLis = trail.errors.map((e, index) => <li key={index}>{e}</li>)
                    setErrorList(errorLis)
                }
            })
    }

    return (
        <UserContext.Provider value={{ user, login, logout, signup, loggedIn, trails, addTrail, errorList }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };

