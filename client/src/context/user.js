
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
            .then(r => r.json())
            .then((userData) => {
                if (!userData.error) {
                    setUser(userData)
                    fetchTrails()
                    setLoggedIn(true)
                }
                else {
                    console.log(userData.error)
                }
            })
    }, [])

    const fetchTrails = () => {
        fetch('/trails')
            .then(r => r.json())
            .then(trails => {
                // console.log(trails)
                if (!trails.errors) {
                    setTrails(trails)
                }
                else {
                    console.log(trails.errors)
                }
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


    function frontEndAddReview(newReview, trail) {
        const updatedTrails = trails.map((tr) => {
            if (trail.id === tr.id) {
                tr.reviews.push(newReview)
                return tr
            }
            else {
                return tr
            }
        })
        setTrails(updatedTrails)
    }



    return (
        <UserContext.Provider value={{ user, login, logout, signup, loggedIn, trails, setTrails, addTrail, errorList, frontEndAddReview }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };

